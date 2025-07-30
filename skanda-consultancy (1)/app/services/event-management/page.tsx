"use client"
import { useEffect, useState } from "react"

export default function EventManagementPage() {
  const [features, setFeatures] = useState<any[]>([])
  useEffect(() => {
    fetch("http://localhost:5000/api/event-features")
      .then(r => r.json())
      .then(setFeatures)
  }, [])
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-yellow-700">Event Management Services</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {features.length === 0 && <div>No event features found.</div>}
        {features.map((f) => (
          <div key={f._id} className="bg-white rounded-lg shadow p-4">
            <div className="font-semibold text-lg mb-1">{f.title}</div>
            <div className="text-gray-600 mb-1">{f.category}</div>
            <div className="text-yellow-700 font-bold text-xl mb-2">{f.price ? `₹${f.price}` : ''}</div>
            <div className="text-gray-500 text-sm mb-2">{f.description}</div>
            <ul className="list-disc ml-5 text-gray-700 text-sm">
              {f.features && f.features.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
