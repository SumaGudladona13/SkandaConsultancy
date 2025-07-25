"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [stats, setStats] = useState<{ userCount: number; propertyCount: number } | null>(null)
  const [users, setUsers] = useState<any[]>([])
  const [properties, setProperties] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [notifMsg, setNotifMsg] = useState("")
  const router = useRouter()

  // Check admin role
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return router.push("/login")
    const payload = JSON.parse(atob(token.split(".")[1]))
    if (payload.role !== "admin") return router.push("/")
  }, [router])

  // Fetch dashboard stats, users, properties, notifications
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return
    fetch("http://localhost:5000/api/admin/dashboard", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setStats)
    fetch("http://localhost:5000/api/admin/users", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setUsers)
    fetch("http://localhost:5000/api/admin/properties", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setProperties)
    fetch("http://localhost:5000/api/admin/notifications", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setNotifications)
  }, [])

  // Send notification
  const sendNotification = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if (!token) return
    await fetch("http://localhost:5000/api/admin/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ message: notifMsg })
    })
    setNotifMsg("")
    fetch("http://localhost:5000/api/admin/notifications", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setNotifications)
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>
      {stats && (
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.userCount}</div>
            <div className="text-gray-700">Total Users</div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{stats.propertyCount}</div>
            <div className="text-gray-700">Total Properties</div>
          </div>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-8">
        {/* User Management */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Service</th>
                  <th className="p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} className="border-b">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">{u.phone || '-'}</td>
                    <td className="p-2">{u.service || '-'}</td>
                    <td className="p-2">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Property Management */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Properties</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Title</th>
                  <th className="p-2">Location</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(p => (
                  <tr key={p._id} className="border-b">
                    <td className="p-2">{p.title || "-"}</td>
                    <td className="p-2">{p.location || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Notifications */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Send Notification</h2>
        <form onSubmit={sendNotification} className="flex gap-4 mb-4">
          <input value={notifMsg} onChange={e => setNotifMsg(e.target.value)} className="flex-1 border p-2 rounded" placeholder="Notification message..." />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        </form>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Recent Notifications</h3>
          <ul className="space-y-1">
            {notifications.slice().reverse().map((n, i) => (
              <li key={i} className="text-gray-700">{n.message} <span className="text-xs text-gray-400">({new Date(n.date).toLocaleString()})</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
