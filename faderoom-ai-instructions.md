# FadeRoom – AI Instructions for Dashboard, Admin Login & SEO

> **Namjena:** Ove upute definiraju što AI treba izgraditi za FadeRoom web stranicu u Rijeci.  
> **Stack:** Next.js 14, Supabase, Prisma, NextAuth.js, Resend, Vercel  
> **Jezik sučelja:** Hrvatski (sav tekst koji vidi korisnik)

---

## 1. SEO Optimizacija

### 1.1 Metadata (app/layout.tsx)

```tsx
export const metadata: Metadata = {
  title: "FadeRoom Barber | Frizerski salon Rijeka – Online rezervacija",
  description:
    "FadeRoom je premium frizerski salon u Rijeci. Rezervirajte termin online brzo i jednostavno. Šišanje, brijanje i styling na jednom mjestu.",
  keywords: [
    "frizer Rijeka",
    "frizerski salon Rijeka",
    "rezervacija frizera online",
    "brijanje Rijeka",
    "FadeRoom barber",
    "muški frizer Rijeka",
  ],
  authors: [{ name: "FadeRoom Barber" }],
  creator: "FadeRoom",
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: "https://faderoom.hr",
    siteName: "FadeRoom Barber Rijeka",
    title: "FadeRoom Barber | Premium frizerski salon Rijeka",
    description:
      "Rezervirajte termin u FadeRoom barber salonu u Rijeci. Brzo, jednostavno i online.",
    images: [
      {
        url: "/og-image.jpg", // 1200x630px slika salona
        width: 1200,
        height: 630,
        alt: "FadeRoom Barber Salon Rijeka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FadeRoom Barber Rijeka",
    description: "Premium frizerski salon u Rijeci – online rezervacije.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://faderoom.hr",
  },
};
```

### 1.2 JSON-LD Strukturirani Podaci (LocalBusiness Schema)

Postavi u `app/layout.tsx` unutar `<head>` koristeći `<Script>`:

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "FadeRoom Barber",
  description: "Premium muški frizerski salon u Rijeci.",
  url: "https://faderoom.hr",
  telephone: "+385-XX-XXX-XXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ulica...",
    addressLocality: "Rijeka",
    postalCode: "51000",
    addressCountry: "HR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.3271,
    longitude: 14.4422,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "15:00",
    },
  ],
  priceRange: "€€",
};
```

### 1.3 Ostale SEO Prakse

- Svaka stranica ima **jedinstveni `<title>` i `<description>`** putem `generateMetadata()`.
- Sve slike imaju `alt` atribut na **hrvatskom jeziku**.
- Koristi `next/image` za automatsku optimizaciju slika (WebP, lazy loading).
- Dodaj `sitemap.ts` u `app/` koji automatski generira `/sitemap.xml`.
- Dodaj `robots.ts` koji dozvoljava indeksiranje svih javnih ruta, a blokira `/admin/*` i `/api/*`.
- Rute moraju biti na hrvatskom: `/rezervacija`, `/usluge`, `/kontakt`.

---

## 2. Admin Login

### 2.1 Ruta i Stranica

- **Ruta:** `/admin/login`
- Stranica nije indeksirana (meta robots: noindex, nofollow).
- Cijeli `/admin` layout ima middleware zaštitu – neautorizirani korisnik se preusmjerava na `/admin/login`.

### 2.2 UI Tekst (Hrvatski)

```
Naslov:       "Prijava za administratore"
Email label:  "E-mail adresa"
Lozinka:      "Lozinka"
Gumb:         "Prijavi se"
Greška:       "Pogrešan e-mail ili lozinka. Pokušajte ponovo."
```

### 2.3 NextAuth Konfiguracija

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Lozinka", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) return null;
        const isValid = await bcrypt.compare(
          credentials!.password,
          user.passwordHash
        );
        if (!isValid) return null;
        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

### 2.4 Middleware Zaštita

```ts
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/admin/login" },
});

export const config = {
  matcher: ["/admin/:path*"],
};
```

### 2.5 Prisma Schema (User)

```prisma
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  role         String   @default("admin")
  createdAt    DateTime @default(now())
}
```

---

## 3. Dashboard za Rezervacije

### 3.1 Ruta

- **Ruta:** `/admin/dashboard`
- Dostupno samo autoriziranim korisnicima (role: "admin").

### 3.2 Komponente Dashboarda

#### A) Statistike (gornji red kartica)

| Kartica             | Opis                            |
| ------------------- | ------------------------------- |
| Ukupne rezervacije  | Broj svih rezervacija danas     |
| Predstojeće         | Broj nadolazećih termina        |
| Završene            | Broj završenih termina danas    |
| Otkazane            | Broj otkazanih rezervacija      |

Sav tekst na hrvatskom.

#### B) Tablica Rezervacija

Stupci:
```
Klijent | Usluga | Datum | Vrijeme | Status | Akcije
```

- **Status badge** vrijednosti (na hrvatskom):
  - `"Na čekanju"` – žuta
  - `"Potvrđeno"` – zelena
  - `"Završeno"` – siva
  - `"Otkazano"` – crvena

- **Akcije po retku:**
  - ✅ Potvrdi – mijenja status u "Potvrđeno"
  - ❌ Otkaži – mijenja status u "Otkazano", šalje email klijentu
  - 🗑 Obriši – soft delete (za arhivu)

#### C) Filter i Pretraživanje

```
[ Pretraži klijenta... ]  [ Sve usluge ▼ ]  [ Sve datume ▼ ]  [ Svi statusi ▼ ]
```

Tekst filtera na hrvatskom.

#### D) Detalji Rezervacije (modal ili side panel)

Prikazuje:
- Puno ime klijenta
- Broj telefona
- E-mail adresa
- Odabrana usluga i cijena
- Datum i vrijeme termina
- Napomena klijenta (ako postoji)
- Gumb: "Pošalji podsjetnik" (šalje email putem Resend)

### 3.3 Prisma Schema (Reservation)

```prisma
model Reservation {
  id          String   @id @default(cuid())
  clientName  String
  clientEmail String
  clientPhone String
  service     String
  price       Int      // u centima (npr. 2000 = 20,00 €)
  date        DateTime
  status      String   @default("pending")
  // "pending" | "confirmed" | "completed" | "cancelled"
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 3.4 API Rute

```
GET    /api/reservations          – dohvati sve rezervacije (s filterima)
PATCH  /api/reservations/[id]     – promijeni status
DELETE /api/reservations/[id]     – soft delete
POST   /api/reservations/[id]/remind – pošalji podsjetnik emailom
```

Sve API rute su zaštićene `getServerSession()` provjerom.

### 3.5 Email Predlošci (Resend)

**Potvrdni email (na hrvatskom):**
```
Naslov: "Vaša rezervacija je potvrđena – FadeRoom Barber"
Tijelo:
  Poštovani [Ime],
  Vaša rezervacija za uslugu [Usluga] potvrđena je za [Datum] u [Vrijeme].
  Adresa salona: [Adresa, Rijeka]
  Vidimo se!
  – FadeRoom tim
```

**Email otkazivanja:**
```
Naslov: "Vaša rezervacija je otkazana – FadeRoom Barber"
Tijelo:
  Poštovani [Ime],
  Nažalost, vaša rezervacija za [Datum] u [Vrijeme] je otkazana.
  Za novi termin posjetite: https://faderoom.hr/rezervacija
  – FadeRoom tim
```

---

## 4. Struktura Datoteka

```
app/
├── layout.tsx                  ← globalni metadata + JSON-LD
├── page.tsx                    ← početna stranica (hr)
├── rezervacija/
│   └── page.tsx                ← javna stranica za rezervacije
├── usluge/
│   └── page.tsx
├── kontakt/
│   └── page.tsx
├── admin/
│   ├── layout.tsx              ← zaštićeni layout
│   ├── login/
│   │   └── page.tsx            ← forma za prijavu
│   └── dashboard/
│       ├── page.tsx            ← glavni dashboard
│       └── components/
│           ├── StatsCards.tsx
│           ├── ReservationTable.tsx
│           ├── ReservationFilters.tsx
│           └── ReservationModal.tsx
├── api/
│   ├── auth/[...nextauth]/route.ts
│   └── reservations/
│       ├── route.ts
│       └── [id]/
│           ├── route.ts
│           └── remind/route.ts
├── sitemap.ts
└── robots.ts
```

---

## 5. Ključne Napomene za AI

1. **Sav tekst koji vidi korisnik mora biti na hrvatskom.** Varijable, nazivi funkcija i komentari mogu biti na engleskom.
2. **Svi novčani iznosi** prikazuju se u eurima (€) s formatom `XX,XX €`.
3. **Format datuma** u tablici: `DD.MM.YYYY.` (npr. `24.03.2025.`)
4. **Format vremena:** `HH:MM` (npr. `10:30`)
5. **Zaštita:** svaki API poziv mora provjeri session – nikad ne izloži endpoint bez autentikacije.
6. **Error poruke** u UI-ju moraju biti na hrvatskom (npr. "Greška pri učitavanju rezervacija. Pokušajte ponovo.").
7. **Loading stanje** dashboarda: prikaži skeleton loader, ne samo "Loading...".
8. **Responsive:** dashboard mora raditi i na mobilnim uređajima (frizer može koristiti mobitel).
