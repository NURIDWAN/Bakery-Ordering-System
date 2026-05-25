"use client";

import type { Product } from "@/lib/data";
import { useCart } from "@/components/cart-provider";

type QuickAddButtonProps = {
  product: Product;
  variant?: "pill" | "icon";
};

export function QuickAddButton({ product, variant = "pill" }: QuickAddButtonProps) {
  const { addItem } = useCart();
  const isIcon = variant === "icon";

  return (
    <button
      aria-label={`Tambah ${product.name} ke cart`}
      className={
        isIcon
          ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#78350f] text-white transition hover:bg-[#592100]"
          : "rounded-full bg-cocoa px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#48220e]"
      }
      onClick={() =>
        addItem({
          id: product.id,
          slug: product.slug,
          name: product.name,
          image: product.images[0],
          basePrice: product.sizes?.[0]?.price ?? product.price
        })
      }
      type="button"
    >
      {isIcon ? <span className="material-symbols-outlined text-xl">add</span> : "Quick add"}
    </button>
  );
}
