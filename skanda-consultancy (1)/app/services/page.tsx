"use client"
import { useRouter } from "next/navigation"

export default function ServicesPage() {
  const router = useRouter()
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Choose a Service</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <button
          className="bg-blue-50 hover:bg-blue-100 p-6 rounded-lg shadow text-center"
          onClick={() => router.push("/services/real-estate")}
        >
          <div className="text-xl font-semibold mb-2">Real Estate</div>
          <div className="text-gray-600">View available properties and details</div>
        </button>
        <button
          className="bg-green-50 hover:bg-green-100 p-6 rounded-lg shadow text-center"
          onClick={() => router.push("/services/training")}
        >
          <div className="text-xl font-semibold mb-2">Training</div>
          <div className="text-gray-600">Explore certification and training courses</div>
        </button>
        <button
          className="bg-yellow-50 hover:bg-yellow-100 p-6 rounded-lg shadow text-center"
          onClick={() => router.push("/services/event-management")}
        >
          <div className="text-xl font-semibold mb-2">Event Management</div>
          <div className="text-gray-600">See event services and features</div>
        </button>
      </div>
    </div>
  )
}
