"use client";
import { useEffect, useState } from "react";
import { API_URL } from "../../lib/api";

type Reservation = {
  id: string;
  date: string;
  product?: { id: string; title: string };
};

export default function MyReservations() {
  const [items, setItems] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { location.href = "/"; return; }

    fetch(`${API_URL}/reservations`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch reservations");
        return r.json();
      })
      .then((data) => setItems(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Reservations</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">No reservations found.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((r) => (
            <li
              key={r.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow flex items-center"
            >
              <strong className="mr-2">{r.product?.title ?? "Product"}</strong>
              <span className="text-gray-500">
                — {new Date(r.date).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
