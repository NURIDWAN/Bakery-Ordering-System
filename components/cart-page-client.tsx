"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { CartPageHeader } from "@/components/cart-page-header";
import { CartEmptyState } from "@/components/cart-empty-state";
import { CartItemList } from "@/components/cart-item-list";
import { CartOrderSection } from "@/components/cart-order-section";
import { CartSummaryCard } from "@/components/cart-summary-card";
import { CartCheckoutBar } from "@/components/cart-checkout-bar";

export function CartPageClient() {
  const { items, itemCount, subtotal, removeItem, updateQuantity } = useCart();
  const [fulfillment] = useState<"delivery" | "pickup">("delivery");
  const [email] = useState("nuridwan1303@gmail.com");

  const shippingFee = fulfillment === "delivery" ? 15000 : 0;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#fff8f1] pb-36 text-[#1e1b15]">
      <CartPageHeader />

      {itemCount === 0 ? (
        <CartEmptyState />
      ) : (
        <div className="flex flex-col gap-5 px-4 py-4">
          <CartItemList
            items={items}
            onDecrease={updateQuantity}
            onIncrease={updateQuantity}
            onRemove={removeItem}
          />

          <CartOrderSection icon="local_shipping" title="Delivery Time">
            <button className="flex w-full items-center gap-3 rounded-[20px] border border-[#f1cc9a] bg-white px-4 py-4 text-left shadow-sm" type="button">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff3e6] text-[#c97c34]">
                <span className="material-symbols-outlined text-[20px]">event</span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[#1e1b15]">Mon, May 25</p>
                <p className="text-sm text-[#c97c34]">13:00 - 15:30</p>
              </div>
              <span className="material-symbols-outlined text-[#c97c34]">chevron_right</span>
            </button>
          </CartOrderSection>

          <CartOrderSection icon="location_on" title="Delivery Address">
            <Link className="flex w-full items-center gap-3 rounded-[20px] border border-dashed border-[#f1cc9a] bg-white px-4 py-4 text-left" href="/account/addresses/new">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff3e6] text-[#c97c34]">
                <span className="material-symbols-outlined text-[20px]">pin_drop</span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[#c97c34]">Add delivery address</p>
                <p className="text-sm text-[#c97c34]">Tap to add your address</p>
              </div>
              <span className="material-symbols-outlined text-[#c97c34]">chevron_right</span>
            </Link>
          </CartOrderSection>

          <CartOrderSection icon="mail" title="Email">
            <div className="rounded-[20px] border border-[#f1e1d1] bg-white px-4 py-3 text-sm text-[#1e1b15] shadow-sm">
              {email}
            </div>
          </CartOrderSection>

          <CartOrderSection icon="local_activity" title="Have a promo code?">
            <button className="flex w-full items-center justify-between rounded-[20px] border border-dashed border-[#f1cc9a] bg-white px-4 py-4 text-left" type="button">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff3e6] text-[#c97c34]">
                  <span className="material-symbols-outlined text-[20px]">local_activity</span>
                </span>
                <div>
                  <p className="font-semibold text-[#1e1b15]">Have a promo code?</p>
                  <p className="text-sm text-[#c97c34]">Tap to apply and save on your order</p>
                </div>
              </div>
              <span className="rounded-full border border-[#f1e1d1] bg-white px-4 py-2 text-sm font-semibold text-[#c97c34] shadow-sm">Apply</span>
            </button>
          </CartOrderSection>

          <CartOrderSection icon="receipt_long" title="Order Summary">
            <CartSummaryCard items={items} shippingFee={shippingFee} subtotal={subtotal} />
          </CartOrderSection>
        </div>
      )}

      {itemCount > 0 ? <CartCheckoutBar /> : null}
    </main>
  );
}
