"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

function getRole() {
  if (typeof window !== "undefined") {
    try {
      const token = localStorage.getItem("token")
      if (!token) return null
      const payload = JSON.parse(atob(token.split(".")[1]))
      return payload.role
    } catch {
      return null
    }
  }
  return null
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<{ userCount: number; propertyCount: number } | null>(null)
  const [users, setUsers] = useState<any[]>([])
  const [properties, setProperties] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (getRole() !== "admin") {
      router.push("/")
      return
    }
    // Fetch dashboard stats
    fetch("http://localhost:5000/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then(setStats)
    // Fetch users
    fetch("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then(setUsers)
    // Fetch properties
    fetch("http://localhost:5000/api/admin/properties", {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then(setProperties)
    // Fetch notifications
    fetch("http://localhost:5000/api/admin/notifications", {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then(setNotifications)
  }, [router])

  const sendNotification = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch("http://localhost:5000/api/admin/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ message }),
    })
    setMessage("")
    // Refresh notifications
    fetch("http://localhost:5000/api/admin/notifications", {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then(setNotifications)
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      {stats && (
        <div className="mb-8 grid grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">{stats.userCount}</p>
          </div>
          <div className="p-4 bg-green-50 rounded">
            <h3 className="text-lg font-semibold">Total Properties</h3>
            <p className="text-2xl font-bold">{stats.propertyCount}</p>
          </div>
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Send Notification</h3>
        <form onSubmit={sendNotification} className="flex gap-2">
          <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Notification message" className="p-2 border rounded w-full" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        </form>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Recent Notifications</h4>
          <ul className="space-y-2">
            {notifications.map((n, i) => (
              <li key={i} className="bg-gray-100 p-2 rounded">{n.message} <span className="text-xs text-gray-500">{new Date(n.date).toLocaleString()}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Users</h3>
        <table className="w-full border rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Properties</h3>
        <table className="w-full border rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Title</th>
              <th className="p-2">Location</th>
              <th className="p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(p => (
              <tr key={p._id} className="border-t">
                <td className="p-2">{p.title}</td>
                <td className="p-2">{p.location}</td>
                <td className="p-2">{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
