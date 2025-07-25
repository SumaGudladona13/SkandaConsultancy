"use client"
import { useState } from "react"

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", service: "", phone: "" })
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage("Signup successful! You can now login.")
        setForm({ name: "", email: "", password: "", service: "", phone: "" })
      } else {
        setMessage(data.message || "Signup failed")
      }
    } catch {
      setMessage("Server error")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full p-2 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="w-full p-2 border rounded" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" type="tel" required className="w-full p-2 border rounded" />
        <select name="service" value={form.service} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Service</option>
          <option value="Business Strategy">Business Strategy</option>
          <option value="Financial Advisory">Financial Advisory</option>
          <option value="HR Consulting">HR Consulting</option>
          <option value="IT Solutions">IT Solutions</option>
          <option value="Marketing">Marketing</option>
          <option value="Risk Management">Risk Management</option>
        </select>
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
      </form>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  )
}
