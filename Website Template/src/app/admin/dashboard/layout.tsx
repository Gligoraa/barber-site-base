/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();

  if (!session || (session.user as any)?.role !== "admin") {
    redirect("/admin/login");
  }

  return <div className="min-h-screen bg-black text-white">{children}</div>;
}
