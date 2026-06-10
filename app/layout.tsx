import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { FavoritesProvider } from "@/context/FavoritesContext";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CineStream — Assista Filmes e Séries",
    template: "%s | CineStream",
  },
  description: "Seu destino premium para filmes e séries. Descubra os títulos em alta, os melhores avaliados e crie sua lista de favoritos.",
  keywords: ["filmes", "séries", "streaming", "cinema", "favoritos"],
  openGraph: {
    title: "CineStream — Assista Filmes e Séries",
    description: "Descubra os melhores filmes e séries num só lugar.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${geistMono.variable}`}>
        <FavoritesProvider>
          <Navbar />
          {children}
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
