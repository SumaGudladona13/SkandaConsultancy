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
          <option value="Real Estate">Real Estate</option>
          <option value="Training">Training</option>
          <option value="Event Management">Event Management</option>
        </select>
        {/* Service Descriptions & Features */}
        {form.service === "Real Estate" && (
          <div className="bg-blue-50 p-3 rounded mb-2 text-sm">
            <div className="font-semibold">Real Estate</div>
            <div className="mb-1">We help you buy, sell, or rent properties with expert guidance and market insights.</div>
            <ul className="list-disc ml-5">
              <li>Property buying & selling assistance</li>
              <li>Rental management</li>
              <li>Legal and documentation support</li>
              <li>Market analysis & investment advice</li>
            </ul>
          </div>
        )}
        {form.service === "Training" && (
          <div className="bg-green-50 p-3 rounded mb-2 text-sm">
            <div className="font-semibold">Training</div>
            <div className="mb-1">Professional and corporate training programs to upskill your team or yourself.</div>
            <ul className="list-disc ml-5">
              <li>Soft skills & leadership workshops</li>
              <li>Technical and IT training</li>
              <li>Customized corporate programs</li>
              <li>Certification support</li>
            </ul>
          </div>
        )}
        {form.service === "Event Management" && (
          <div className="bg-yellow-50 p-3 rounded mb-2 text-sm">
            <div className="font-semibold">Event Management</div>
            <div className="mb-1">End-to-end event planning and execution for corporate and personal occasions.</div>
            <ul className="list-disc ml-5">
              <li>Corporate events & conferences</li>
              <li>Weddings & private parties</li>
              <li>Venue selection & logistics</li>
              <li>On-site coordination</li>
            </ul>
          </div>
        )}
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
      </form>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  )
}
