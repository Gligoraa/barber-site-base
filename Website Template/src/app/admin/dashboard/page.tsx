import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
import { Reservation } from "@prisma/client";
import ReservationActions from "./ReservationActions";
import LogoutButton from "./LogoutButton";

export default async function AdminDashboardPage() {
  // Fetch reservations
  const reservations = await prisma.reservation.findMany({
    orderBy: { date: "desc" },
  });

  // Calculate stats today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stats = {
    total: reservations.filter((r: Reservation) => new Date(r.createdAt) >= today).length,
    upcoming: reservations.filter((r: Reservation) => r.status === "pending" || r.status === "confirmed").length,
    completed: reservations.filter((r: Reservation) => r.status === "completed" && new Date(r.date) >= today).length,
    cancelled: reservations.filter((r: Reservation) => r.status === "cancelled").length,
  };

  const statusColors: Record<string, string> = {
    pending: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    confirmed: "text-green-500 bg-green-500/10 border-green-500/20",
    completed: "text-zinc-400 bg-zinc-800/50 border-zinc-700",
    cancelled: "text-red-500 bg-red-500/10 border-red-500/20",
  };

  const statusLabels: Record<string, string> = {
    pending: "Na čekanju",
    confirmed: "Potvrđeno",
    completed: "Završeno",
    cancelled: "Otkazano",
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-light text-white mb-2">Administracija Rezervacija</h1>
          <p className="text-white/40">Upravljajte poslovanjem salona FadeRoom</p>
        </div>
        <LogoutButton />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            <h3 className="text-white/60 text-sm uppercase tracking-widest font-bold">Ukupne rezervacije</h3>
          </div>
          <p className="text-4xl text-white font-light">{stats.total}</p>
        </div>
        <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-amber-500" />
            <h3 className="text-white/60 text-sm uppercase tracking-widest font-bold">Predstojeće</h3>
          </div>
          <p className="text-4xl text-white font-light">{stats.upcoming}</p>
        </div>
        <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h3 className="text-white/60 text-sm uppercase tracking-widest font-bold">Završene (Danas)</h3>
          </div>
          <p className="text-4xl text-white font-light">{stats.completed}</p>
        </div>
        <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <h3 className="text-white/60 text-sm uppercase tracking-widest font-bold">Otkazane</h3>
          </div>
          <p className="text-4xl text-white font-light">{stats.cancelled}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="text-xs uppercase bg-zinc-900/50 text-amber-500 tracking-widest">
              <tr>
                <th className="px-6 py-4 font-bold">Klijent</th>
                <th className="px-6 py-4 font-bold">Usluga</th>
                <th className="px-6 py-4 font-bold">Datum</th>
                <th className="px-6 py-4 font-bold">Vrijeme</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r: Reservation) => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{r.clientName}</p>
                    <p className="text-xs text-white/40">{r.clientEmail}</p>
                    <p className="text-xs text-white/40">{r.clientPhone}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">{r.service}</td>
                  <td className="px-6 py-4">{format(new Date(r.date), "dd.MM.yyyy.")}</td>
                  <td className="px-6 py-4">{format(new Date(r.date), "HH:mm")}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[r.status]}`}
                    >
                      {statusLabels[r.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ReservationActions id={r.id} status={r.status} />
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/40 italic">
                    Nema pronađenih rezervacija.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
