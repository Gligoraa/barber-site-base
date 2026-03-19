"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Trash2 } from "lucide-react";

export default function ReservationActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setLoading(true);
    await fetch(`/api/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setLoading(false);
    router.refresh();
  };

  const deleteReservation = async () => {
    if (!confirm("Jeste li sigurni da želite obrisati ovu rezervaciju?")) return;
    setLoading(true);
    await fetch(`/api/reservations/${id}`, {
      method: "DELETE",
    });
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="flex justify-end gap-2">
      {status === "pending" && (
        <button
          onClick={() => updateStatus("confirmed")}
          disabled={loading}
          className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-black rounded-lg transition-colors disabled:opacity-50"
          title="Potvrdi"
        >
          <Check className="w-4 h-4" />
        </button>
      )}
      {(status === "pending" || status === "confirmed") && (
        <button
          onClick={() => updateStatus("cancelled")}
          disabled={loading}
          className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-black rounded-lg transition-colors disabled:opacity-50"
          title="Otkaži"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      {(status === "cancelled" || status === "completed") && (
        <button
          onClick={deleteReservation}
          disabled={loading}
          className="p-2 bg-zinc-800 text-zinc-400 hover:bg-red-500 hover:text-black rounded-lg transition-colors disabled:opacity-50"
          title="Obriši"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
