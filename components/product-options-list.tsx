"use client";

import type { Product, ProductOption, ProductSize } from "@/lib/data";
import { formatPrice } from "@/lib/data";

type ProductOptionsListProps = {
  product: Product;
  selectedSize?: string;
  onSelectSize: (size: string) => void;
};

type OptionLike = (ProductOption | ProductSize) & {
  available?: boolean;
  stockLabel?: string;
};

function normalizeOptions(product: Product): OptionLike[] {
  if (product.options?.length) return product.options;
  return product.sizes ?? [];
}

export function ProductOptionsList({ product, selectedSize, onSelectSize }: ProductOptionsListProps) {
  const options = normalizeOptions(product);
  if (!options.length) return null;

  return (
    <section className="mt-6 space-y-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-copper">Options</p>
        <p className="mt-1 text-sm text-stone-500">Pilih varian yang kamu mau sebelum masuk cart.</p>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => {
          const active = selectedSize === option.label;
          const soldOut = option.available === false || (!product.isAvailable && index % 2 === 0);

          return (
            <button
              className={`flex w-full items-center gap-3 rounded-[22px] border px-4 py-4 text-left transition ${
                soldOut
                  ? "cursor-not-allowed border-[#f0ede8] bg-white/60 text-[#c7c0b8]"
                  : active
                    ? "border-cocoa bg-[#fff8f1] shadow-[0_10px_24px_rgba(89,33,0,0.08)]"
                    : "border-[#f1e1d1] bg-white"
              }`}
              disabled={soldOut}
              key={option.label}
              onClick={() => onSelectSize(option.label)}
              type="button"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className={`font-semibold ${soldOut ? "line-through" : "text-[#1e1b15]"}`}>{option.label}</p>
                  {soldOut ? <span className="rounded-full bg-[#ffe8e8] px-2 py-0.5 text-[10px] font-semibold text-[#ff6b6b]">Out of stock</span> : null}
                  {!soldOut && option.stockLabel ? <span className="rounded-full bg-[#fff3e6] px-2 py-0.5 text-[10px] font-semibold text-[#c97c34]">{option.stockLabel}</span> : null}
                  {!soldOut && active ? <span className="rounded-full bg-[#fff3e6] px-2 py-0.5 text-[10px] font-semibold text-[#c97c34]">Selected</span> : null}
                </div>
                <p className={`mt-1 text-sm font-semibold ${soldOut ? "text-[#c7c0b8]" : "text-[#c97c34]"}`}>{formatPrice(option.price)}</p>
              </div>

              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                  soldOut ? "bg-[#f4f1ec] text-[#d9d3ca]" : active ? "bg-cocoa text-white" : "bg-[#f5ede3] text-[#592100]"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{soldOut ? "remove" : "add"}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
