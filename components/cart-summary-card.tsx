"use client";

import type { CartItem } from "@/lib/cart";
import { formatPrice } from "@/lib/data";

type CartSummaryCardProps = {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
};

export function CartSummaryCard({ items, subtotal, shippingFee }: CartSummaryCardProps) {
  const total = subtotal + shippingFee;

  return (
    <div className="rounded-[22px] border border-[#f1e1d1] bg-white p-4 shadow-sm">
      <div className="space-y-3">
        {items.map((item) => (
          <div className="flex items-start justify-between gap-4 text-sm" key={`summary-${item.id}`}>
            <div className="min-w-0">
              <p className="text-[#c97c34]">{item.quantity}x</p>
              <p className="mt-0.5 truncate text-[#1e1b15]">{item.name}</p>
            </div>
            <p className="shrink-0 font-medium text-[#1e1b15]">{formatPrice(item.basePrice * item.quantity)}</p>
          </div>
        ))}

        <div className="border-t border-[#f1e1d1] pt-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#1e1b15]">Subtotal</span>
            <span className="text-[#1e1b15]">{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-[#1e1b15]">Ongkir</span>
            <span className="text-[#1e1b15]">{formatPrice(shippingFee)}</span>
          </div>
        </div>

        <div className="border-t border-[#f1e1d1] pt-3">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
