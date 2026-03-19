/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getServerSession();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const filter = status ? { status } : {};

  try {
    const reservations = await prisma.reservation.findMany({
      where: filter,
      orderBy: { date: "desc" },
    });
    return NextResponse.json(reservations);
  } catch {
    return NextResponse.json({ error: "Greška pri dohvaćanju rezervacija" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const reservation = await prisma.reservation.create({
      data: {
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientPhone: data.clientPhone,
        service: data.service,
        price: data.price,
        date: new Date(data.date),
        notes: data.notes,
      },
    });
    return NextResponse.json(reservation, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Greška pri kreiranju rezervacije" }, { status: 500 });
  }
}
