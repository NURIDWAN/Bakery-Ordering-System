"use client";

import Image from "next/image";
import type { CartItem } from "@/lib/cart";
import { formatPrice } from "@/lib/data";

type CartItemCardProps = {
  item: CartItem;
  onRemove: (id: string) => void;
  onDecrease: (id: string, quantity: number) => void;
  onIncrease: (id: string, quantity: number) => void;
};

export function CartItemCard({ item, onRemove, onDecrease, onIncrease }: CartItemCardProps) {
  return (
    <article className="rounded-[18px] border border-[#f1e1d1] bg-white p-3" key={item.id}>
      <div className="flex gap-3">
        <Image alt={item.name} className="h-[72px] w-[72px] shrink-0 rounded-[14px] object-cover" height={120} src={item.image} width={120} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="line-clamp-1 font-semibold text-[#1e1b15]">{item.name}</h2>
              <p className="mt-1 font-semibold text-[#592100]">{formatPrice(item.basePrice)}</p>
              {item.note ? (
                <p className="mt-1 text-xs text-[#c97c34]">{item.note}</p>
              ) : (
                <button className="mt-1 text-xs text-[#c97c34] transition active:scale-95" type="button">
                  Add note
                </button>
              )}
            </div>

            <button
              aria-label={`Hapus ${item.name}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#f1e1d1] text-[#d66a5a] transition active:scale-95"
              onClick={() => onRemove(item.id)}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">delete_outline</span>
            </button>
          </div>

          <div className="mt-3 flex items-center justify-end gap-2">
            <div className="flex items-center rounded-full border border-[#f1e1d1] bg-[#fff8f1] p-1">
              <button className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-[#592100]" onClick={() => onDecrease(item.id, item.quantity - 1)} type="button">
                -
              </button>
              <span className="min-w-8 px-2 text-center font-semibold">{item.quantity}</span>
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#78350f] text-xl text-white" onClick={() => onIncrease(item.id, item.quantity + 1)} type="button">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
