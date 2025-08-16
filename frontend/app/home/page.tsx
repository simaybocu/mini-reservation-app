"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { API_URL } from "../../lib/api";

type Product = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  capacity: number;
  location: string;
};

export default function HomePage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { location.href = "/"; return; }

    fetch(`${API_URL}/products`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch products");
        return r.json();
      })
      .then((data) => setItems(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

return (
  <div>
    <h1 className="text-2xl font-bold mb-6">Available Yachts</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
      {items.map((p) => (
        <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow flex flex-col">
          {p.imageUrl ? (
            <Image
              src={p.imageUrl}
              alt={p.title}
              width={600}
              height={400}
              className="rounded-md w-full h-40 object-cover mb-2"
            />
          ) : (
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 rounded mb-2">
              No image
            </div>
          )}

          <h3 className="font-semibold text-lg mt-2 mb-1">{p.title}</h3>
          <p className="text-gray-700 text-sm mb-2">{p.description}</p>
          <small className="block text-gray-500 mb-8">
            Capacity: {p.capacity} — Location: {p.location}
          </small>

          <Link href={`/products/${p.id}`} className="mt-auto w-full">
            <button
              type="button"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-xl shadow-lg hover:bg-gray-900 transition-transform duration-300"
            >
              View Details & Reservation
            </button>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

}
