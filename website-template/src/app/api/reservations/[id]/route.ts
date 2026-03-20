/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  const normalizedRole =
    typeof role === "string" ? role.trim().toLowerCase() : role;

  if (!session || normalizedRole !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { status } = await request.json();
    const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Neispravan status rezervacije" },
        { status: 400 }
      );
    }

    const updated = await prisma.reservation.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Gre\u0161ka pri a\u017euriranju rezervacije" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  const normalizedRole =
    typeof role === "string" ? role.trim().toLowerCase() : role;

  if (!session || normalizedRole !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.reservation.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Gre\u0161ka pri brisanju rezervacije" },
      { status: 500 }
    );
  }
}
