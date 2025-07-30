"use client"
import { useEffect, useState } from "react"

export default function RealEstatePage() {
  const [properties, setProperties] = useState<any[]>([])
  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then(r => r.json())
      .then(setProperties)
  }, [])
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Available Properties</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {properties.length === 0 && <div>No properties found.</div>}
        {properties.map((p) => (
          <div key={p._id} className="bg-white rounded-lg shadow p-4">
            <img src={p.image || "/placeholder.jpg"} alt={p.title} className="w-full h-48 object-cover rounded mb-3" />
            <div className="font-semibold text-lg mb-1">{p.title}</div>
            <div className="text-gray-600 mb-1">{p.location}</div>
            <div className="text-blue-700 font-bold text-xl mb-2">₹{p.price}</div>
            <div className="text-gray-500 text-sm mb-2">{p.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
