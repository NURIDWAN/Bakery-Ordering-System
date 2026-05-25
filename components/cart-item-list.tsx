"use client";

import type { CartItem } from "@/lib/cart";
import { CartItemCard } from "@/components/cart-item-card";

type CartItemListProps = {
  items: CartItem[];
  onRemove: (id: string) => void;
  onDecrease: (id: string, quantity: number) => void;
  onIncrease: (id: string, quantity: number) => void;
};

export function CartItemList({ items, onRemove, onDecrease, onIncrease }: CartItemListProps) {
  return (
    <section className="rounded-[24px] border border-[#e9e1d8] bg-white p-3 shadow-[0_8px_20px_rgba(89,33,0,0.04)]">
      <div className="space-y-3">
        {items.map((item) => (
          <CartItemCard key={item.id} item={item} onDecrease={onDecrease} onIncrease={onIncrease} onRemove={onRemove} />
        ))}
      </div>
    </section>
  );
}
