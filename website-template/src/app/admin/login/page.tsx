"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Pogrešan e-mail ili lozinka. Pokušajte ponovo.");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-white mb-2">Prijava za administratore</h1>
          <p className="text-white/40 text-sm">Unesite svoje podatke za pristup nadzornoj ploči</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">
              E-mail adresa
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">
              Lozinka
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold uppercase tracking-widest py-4 rounded-xl transition-all"
          >
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
}
