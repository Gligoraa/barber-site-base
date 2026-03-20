import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
import { Reservation } from "@prisma/client";
import ReservationActions from "./ReservationActions";
import LogoutButton from "./LogoutButton";

export default async function AdminDashboardPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { date: "desc" },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stats = {
    total: reservations.filter((r: Reservation) => new Date(r.createdAt) >= today).length,
    upcoming: reservations.filter(
      (r: Reservation) => r.status === "pending" || r.status === "confirmed"
    ).length,
    completed: reservations.filter(
      (r: Reservation) => r.status === "completed" && new Date(r.date) >= today
    ).length,
    cancelled: reservations.filter((r: Reservation) => r.status === "cancelled").length,
  };

  const statusColors: Record<string, string> = {
    pending: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    confirmed: "text-green-500 bg-green-500/10 border-green-500/20",
    completed: "text-zinc-400 bg-zinc-800/50 border-zinc-700",
    cancelled: "text-red-500 bg-red-500/10 border-red-500/20",
  };

  const statusLabels: Record<string, string> = {
    pending: "Na \u010dekanju",
    confirmed: "Potvr\u0111eno",
    completed: "Zavr\u0161eno",
    cancelled: "Otkazano",
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-light text-white">Administracija rezervacija</h1>
          <p className="text-white/40">Upravljajte poslovanjem salona FadeRoom</p>
        </div>
        <LogoutButton />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <div className="mb-2 flex items-center gap-3">
            <Calendar className="h-5 w-5 text-amber-500" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">
              Ukupne rezervacije
            </h3>
          </div>
          <p className="text-4xl font-light text-white">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <div className="mb-2 flex items-center gap-3">
            <Clock className="h-5 w-5 text-amber-500" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">
              Predstoje\u0107e
            </h3>
          </div>
          <p className="text-4xl font-light text-white">{stats.upcoming}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <div className="mb-2 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">
              Zavr\u0161ene (danas)
            </h3>
          </div>
          <p className="text-4xl font-light text-white">{stats.completed}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <div className="mb-2 flex items-center gap-3">
            <XCircle className="h-5 w-5 text-red-500" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">
              Otkazane
            </h3>
          </div>
          <p className="text-4xl font-light text-white">{stats.cancelled}</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="bg-zinc-900/50 text-xs uppercase tracking-widest text-amber-500">
              <tr>
                <th className="px-6 py-4 font-bold">Klijent</th>
                <th className="px-6 py-4 font-bold">Usluga</th>
                <th className="px-6 py-4 font-bold">Datum</th>
                <th className="px-6 py-4 font-bold">Vrijeme</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 text-right font-bold">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation: Reservation) => (
                <tr
                  key={reservation.id}
                  className="border-b border-white/5 transition-colors hover:bg-white/5"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{reservation.clientName}</p>
                    <p className="text-xs text-white/40">{reservation.clientEmail}</p>
                    <p className="text-xs text-white/40">{reservation.clientPhone}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">{reservation.service}</td>
                  <td className="px-6 py-4">
                    {format(new Date(reservation.date), "dd.MM.yyyy.")}
                  </td>
                  <td className="px-6 py-4">
                    {format(new Date(reservation.date), "HH:mm")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${statusColors[reservation.status]}`}
                    >
                      {statusLabels[reservation.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ReservationActions id={reservation.id} status={reservation.status} />
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center italic text-white/40">
                    Nema prona\u0111enih rezervacija.
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
