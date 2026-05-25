"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/lib/cart";

type AddToCartPayload = Omit<CartItem, "quantity"> & { quantity?: number };

type CartContextValue = {
  items: CartItem[];
  addItem: (item: AddToCartPayload) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNote: (id: string, note: string) => void;
  itemCount: number;
  subtotal: number;
};

const STORAGE_KEY = "batter-days-cart";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      addItem: (item) => {
        setItems((current) => {
          const existing = current.find(
            (entry) =>
              entry.slug === item.slug &&
              entry.selectedSize === item.selectedSize &&
              (entry.note ?? "") === (item.note ?? "")
          );

          if (existing) {
            return current.map((entry) =>
              entry.id === existing.id
                ? { ...entry, quantity: entry.quantity + (item.quantity ?? 1) }
                : entry
            );
          }

          return [
            ...current,
            {
              ...item,
              id: `${item.slug}-${item.selectedSize ?? "base"}-${Date.now()}`,
              quantity: item.quantity ?? 1
            }
          ];
        });
      },
      removeItem: (id) => {
        setItems((current) => current.filter((entry) => entry.id !== id));
      },
      updateQuantity: (id, quantity) => {
        setItems((current) =>
          current
            .map((entry) => (entry.id === id ? { ...entry, quantity: Math.max(1, quantity) } : entry))
            .filter(Boolean)
        );
      },
      updateNote: (id, note) => {
        setItems((current) => current.map((entry) => (entry.id === id ? { ...entry, note } : entry)));
      },
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + item.basePrice * item.quantity, 0)
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
