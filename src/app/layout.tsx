import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B3 Dividendos Analyzer | Análise de Ações com Foco em Dividendos",
  description: "Analise, selecione e acompanhe as melhores ações pagadoras de dividendos da B3. Construa uma carteira sólida focada em renda passiva recorrente.",
  keywords: ["dividendos", "B3", "ações", "investimentos", "renda passiva", "bolsa de valores", "análise fundamentalista"],
  authors: [{ name: "B3 Dividendos Analyzer" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "B3 Dividendos Analyzer",
    description: "Analise as melhores ações pagadoras de dividendos da B3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B3 Dividendos Analyzer",
    description: "Analise as melhores ações pagadoras de dividendos da B3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
