import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://faderoom.hr"),
  title: "FadeRoom Barber | Frizerski salon Rijeka - Online rezervacija",
  description:
    "FadeRoom je premium frizerski salon u Rijeci. Rezervirajte termin online brzo i jednostavno. \u0160i\u0161anje, brijanje i styling na jednom mjestu.",
  keywords:
    "frizer Rijeka, frizerski salon Rijeka, rezervacija frizera online, brijanje Rijeka, FadeRoom barber, mu\u0161ki frizer Rijeka",
  authors: [{ name: "FadeRoom Barber" }],
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: "https://faderoom.hr",
    siteName: "FadeRoom Barber Rijeka",
    title: "FadeRoom Barber | Premium frizerski salon Rijeka",
    description:
      "Rezervirajte termin u FadeRoom barber salonu u Rijeci. Brzo, jednostavno i online.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FadeRoom Barber Rijeka",
    description: "Premium frizerski salon u Rijeci - online rezervacije.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className="custom-scrollbar">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
