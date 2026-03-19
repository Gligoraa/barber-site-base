/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  console.log("DEBUG: Dashboard Layout Session found:", !!session, (session?.user as any)?.email);

  if (!session || (session.user as any)?.role !== "admin") {
    console.log("DEBUG: Redirecting back to login from dashboard layout because session is missing or role is wrong.");
    redirect("/admin/login");
  }

  return <div className="min-h-screen bg-black text-white">{children}</div>;
}
