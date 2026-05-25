import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { SiteHeader } from "@/components/site-header";
import { MobileCartBar } from "@/components/mobile-cart-bar";
import { SiteSidebar } from "@/components/site-sidebar";

export const metadata: Metadata = {
  title: "Batter Days Bakehouse",
  description: "Online ordering for breads, pastries, custom cakes, and cafe favourites."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="font-sans">
        <CartProvider>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fffdf9,transparent_45%),linear-gradient(180deg,#fff8f1_0%,#fff3e7_100%)]">
            <SiteHeader />
            {children}
            <MobileCartBar />
            <SiteSidebar />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
