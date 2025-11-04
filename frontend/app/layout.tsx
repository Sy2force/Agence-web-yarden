import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import DiscountBanner from "@/components/DiscountBanner";
import OrderManager from "@/components/OrderManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Yarden - Agence digitale pour les francophones en Israël",
  description: "Création de sites web, marketing digital, automatisations. Tout ce qu'il vous faut pour développer votre activité en Israël.",
  keywords: "agence web israël, site internet israël, francophone israël, création site web, marketing digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* <DiscountBanner /> */}
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <OrderManager />
        </div>
      </body>
    </html>
  );
}
