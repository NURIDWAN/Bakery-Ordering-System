"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const orderTypes = [
  {
    id: "delivery",
    title: "Delivery",
    subtitle: "We'll bring it to you",
    icon: "local_shipping"
  },
  {
    id: "pickup",
    title: "Pickup",
    subtitle: "Pick up at our store",
    icon: "storefront"
  }
];

export function OrderTypeSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(orderTypes[0]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button className="mt-2 flex w-full items-center justify-between rounded-xl border border-[#e9e1d8] bg-[#fff7ed] p-3 text-left transition active:scale-[0.98]" onClick={() => setIsOpen(true)} type="button">
        <span className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#78350f]/10 text-[#592100]">
            <span className="material-symbols-outlined">{selectedType.icon}</span>
          </span>
          <span className="flex flex-col">
            <span className="text-xs font-medium text-[#54433c]">{selectedType.title}</span>
            <span className="text-sm font-semibold tracking-wide text-[#592100]">{selectedType.subtitle}</span>
          </span>
        </span>
        <span className="material-symbols-outlined text-[#54433c]">expand_more</span>
      </button>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 z-[200] flex items-end justify-center bg-black/35 px-3"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="order-type-title"
                >
                  <button className="absolute inset-0 cursor-default" aria-label="Tutup pilihan order" onClick={() => setIsOpen(false)} type="button" />
                  <motion.div
                    animate={{ y: 0, opacity: 1 }}
                    className="relative z-[201] w-full max-w-md rounded-t-[28px] bg-white px-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-3 shadow-[0_-20px_60px_rgba(34,22,14,0.18)]"
                    exit={{ y: 40, opacity: 0 }}
                    initial={{ y: 40, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-[#e9e1d8]" />
                    <button aria-label="Tutup" className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5ede3] text-[#8c7f77]" onClick={() => setIsOpen(false)} type="button">
                      <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                    <div className="pr-12">
                      <h2 id="order-type-title" className="text-lg font-bold text-[#1e1b15]">
                        Order Type
                      </h2>
                      <p className="mt-1 text-sm text-[#8c7f77]">How would you like your order?</p>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {orderTypes.map((type) => {
                        const active = selectedType.id === type.id;

                        return (
                          <button
                            className={`relative rounded-2xl border p-3 text-left transition active:scale-[0.98] ${active ? "border-[#5c2d12] bg-[#fff8f1]" : "border-[#e9e1d8] bg-white"}`}
                            key={type.id}
                            onClick={() => {
                              setSelectedType(type);
                              setIsOpen(false);
                            }}
                            type="button"
                          >
                            {active ? (
                              <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#5c2d12] text-white">
                                <span className="material-symbols-outlined text-sm">check</span>
                              </span>
                            ) : null}
                            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${active ? "bg-[#5c2d12] text-white" : "bg-[#f5ede3] text-[#8c7f77]"}`}>
                              <span className="material-symbols-outlined">{type.icon}</span>
                            </span>
                            <span className="mt-3 block text-sm font-bold text-[#1e1b15]">{type.title}</span>
                            <span className="mt-1 block text-xs text-[#8c7f77]">{type.subtitle}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
}
