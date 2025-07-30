"use client";
import { useEffect, useState } from "react";
import PropertyForm from "../../../components/admin/property-form";
import { Button } from "../../../components/ui/button";
import type { Property } from "../../../types/property";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editing, setEditing] = useState<Property | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    // Fetch admin token from localStorage or context
    setToken(localStorage.getItem("token") || "");
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const res = await fetch("/api/admin/properties", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    setProperties(Array.isArray(data) ? data : []);
  }

  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }

  function handleEdit(property: Property) {
    setEditing(property);
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this property?")) return;
    await fetch(`/api/admin/properties/${id}` , {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProperties();
  }

  function handleFormClose() {
    setShowForm(false);
    setEditing(null);
    fetchProperties();
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Properties</h1>
      <Button onClick={handleAdd} className="mb-4">Add Property</Button>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Location</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id}>
              <td className="border px-2 py-1">{property.title}</td>
              <td className="border px-2 py-1">{property.location}</td>
              <td className="border px-2 py-1">{property.price}</td>
              <td className="border px-2 py-1">
                <Button onClick={() => handleEdit(property)} size="sm" className="mr-2">Edit</Button>
                <Button onClick={() => property._id && handleDelete(property._id)} size="sm" variant="destructive">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <PropertyForm
          property={editing}
          token={token}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
