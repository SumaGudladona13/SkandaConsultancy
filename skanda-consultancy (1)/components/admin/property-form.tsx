import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/button";
import type { Property } from "../../types/property";

type Props = {
  property: Property | null;
  token: string;
  onClose: () => void;
};

export default function PropertyForm({ property, token, onClose }: Props) {
  const [form, setForm] = useState<Property>({
    title: property?.title || "",
    location: property?.location || "",
    price: property?.price || 0,
    description: property?.description || "",
    _id: property?._id,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.name === "price" ? Number(e.target.value) : e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const method = property ? "PUT" : "POST";
    const url = property && property._id
      ? `/api/admin/properties/${property._id}`
      : "/api/admin/properties";
    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    setLoading(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md min-w-[320px] relative"
      >
        <h2 className="text-lg font-bold mb-4">
          {property ? "Edit Property" : "Add Property"}
        </h2>
        <label className="block mb-2">
          Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border w-full px-2 py-1 rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Location
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="border w-full px-2 py-1 rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Price
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            className="border w-full px-2 py-1 rounded"
            required
            type="number"
          />
        </label>
        <label className="block mb-2">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border w-full px-2 py-1 rounded"
          />
        </label>
        <div className="flex gap-2 mt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
