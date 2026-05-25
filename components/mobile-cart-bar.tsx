"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/data";

export function MobileCartBar() {
  const pathname = usePathname();
  const { itemCount, subtotal } = useCart();

  if (pathname === "/cart" || pathname === "/search") return null;
  if (/^\/menu\/[^/]+$/.test(pathname)) return null;
  if (!itemCount) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[90]">
      <Link
        className="mx-auto flex w-[calc(100%-2rem)] max-w-md items-center justify-between rounded-[20px] bg-cocoa px-4 py-3 text-white shadow-[0_16px_40px_rgba(89,33,0,0.28)]"
        href="/cart"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-5">View Cart</p>
            <p className="text-xs text-white/70">{itemCount} item</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-right">
          <div>
            <p className="text-[11px] text-white/70">Subtotal</p>
            <p className="text-sm font-semibold">{formatPrice(subtotal)}</p>
          </div>
          <span className="material-symbols-outlined text-[20px] text-white/80">chevron_right</span>
        </div>
      </Link>
    </div>
  );
}
