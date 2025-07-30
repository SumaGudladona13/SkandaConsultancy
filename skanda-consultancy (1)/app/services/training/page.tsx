"use client"
import { useEffect, useState } from "react"

export default function TrainingPage() {
  const [courses, setCourses] = useState<any[]>([])
  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then(r => r.json())
      .then(setCourses)
  }, [])
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-green-700">Training & Certification Courses</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {courses.length === 0 && <div>No courses found.</div>}
        {courses.map((c) => (
          <div key={c._id} className="bg-white rounded-lg shadow p-4">
            <img src={c.image || "/placeholder.jpg"} alt={c.title} className="w-full h-40 object-cover rounded mb-3" />
            <div className="font-semibold text-lg mb-1">{c.title}</div>
            <div className="text-gray-600 mb-1">{c.category}</div>
            <div className="text-green-700 font-bold text-xl mb-2">₹{c.price}</div>
            <div className="text-gray-500 text-sm mb-2">{c.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
