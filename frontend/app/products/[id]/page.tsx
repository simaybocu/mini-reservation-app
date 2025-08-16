/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URL, apiPost } from "../../../lib/api";
import Image from "next/image";

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [date, setDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      location.href = "/";
      return;
    }

    if (!params?.id) return;
    fetch(`${API_URL}/products/${params.id}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((p) => setProduct(p))
      .catch(() => setProduct(null));
  }, [params?.id]);

  const canReserve =
    !!date && new Date(date) > new Date(new Date().toISOString().slice(0, 10));

  const reserve = async () => {
    if (!product || !date) return;
    try {
      await apiPost("/reservations", { productId: parseInt(product.id), date });
      alert("Successfully reserved!");
      router.push("/reservations");
    } catch (err: any) {
      alert("Failed to create reservation: " + (err?.message || String(err)));
    }
  };

  if (!product) return <div>Loading product...</div>;

  return (
    <div className="bg-white p-8 rounded-lg border border-gray-200 shadow max-w-4xl mx-auto min-h-[800px]">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={800}
          height={1200}
          unoptimized
          style={{
            width: "100%",
            height: "500px",
          }}
          className="mb-6"
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 rounded mb-4">
          No image
        </div>
      )}
      <p className="mb-2">{product.description}</p>
      <p className="mb-4">
        <strong>Capacity:</strong> {product.capacity}
      </p>

      <div className="flex items-center gap-3 mt-4">
        <label className="text-sm font-medium">Select date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().slice(0, 10)}
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={reserve}
          disabled={!canReserve}
          className="px-4 py-2 rounded bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors disabled:opacity-60"
        >
          Reserve
        </button>
      </div>
    </div>
  );
}
