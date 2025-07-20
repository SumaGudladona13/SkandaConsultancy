"use client"
import { useState } from "react"

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("token", data.token)
        setMessage("Login successful!")
        setForm({ email: "", password: "" })
      } else {
        setMessage(data.message || "Login failed")
      }
    } catch {
      setMessage("Server error")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="w-full p-2 border rounded" />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  )
}
