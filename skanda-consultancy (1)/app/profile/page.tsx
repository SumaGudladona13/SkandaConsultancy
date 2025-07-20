"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    // Optionally, fetch user info from backend using token
    // For demo, just show a placeholder
    setUser({ name: "User", email: "user@email.com" })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
    window.location.reload()
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      {user ? (
        <>
          <p className="mb-2">Name: {user.name}</p>
          <p className="mb-4">Email: {user.email}</p>
          <button onClick={handleLogout} className="w-full bg-red-600 text-white py-2 rounded">Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
