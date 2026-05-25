"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart-provider";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/cart", label: "Cart" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  const isProductDetail = /^\/menu\/[^/]+$/.test(pathname);

  if (
    pathname === "/" ||
    pathname === "/cart" ||
    pathname === "/search" ||
    pathname.startsWith("/account") ||
    isProductDetail
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cocoa text-sm font-semibold text-white">
              BD
            </div>
            <div>
              <p className="font-serif text-xl font-bold">Batter Days</p>
              <p className="text-xs uppercase tracking-[0.2em] text-copper">Bakehouse</p>
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? "bg-cocoa text-white" : "text-stone-700 hover:bg-white"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
                {item.href === "/cart" && itemCount > 0 ? ` (${itemCount})` : ""}
              </Link>
            );
          })}
        </nav>
        <Link className="action-button md:hidden" href="/cart">
          Cart{itemCount > 0 ? ` (${itemCount})` : ""}
        </Link>
      </div>
    </header>
  );
}
