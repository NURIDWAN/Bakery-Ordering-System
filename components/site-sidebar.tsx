"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type SidebarItem = {
  label: string;
  icon: string;
  href: string;
};

const sidebarItems: SidebarItem[] = [
  { label: "My Account", icon: "person", href: "/account" },
  { label: "Order History", icon: "receipt_long", href: "/account/orders" },
  { label: "Terms & Conditions", icon: "description", href: "/terms" },
  { label: "Privacy Policy", icon: "shield", href: "/privacy" }
];

export function SiteSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const openSidebar = () => setIsOpen(true);

    window.addEventListener("batter-days:open-sidebar", openSidebar);
    return () => window.removeEventListener("batter-days:open-sidebar", openSidebar);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return typeof document !== "undefined"
    ? createPortal(
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-[220] bg-black/40"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="sidebar-title"
            >
              <button
                aria-label="Tutup sidebar"
                className="absolute inset-0 cursor-default"
                onClick={() => setIsOpen(false)}
                type="button"
              />
              <motion.aside
                animate={{ x: 0, opacity: 1 }}
                className="absolute right-0 top-0 flex h-full w-[88vw] max-w-[340px] flex-col bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                exit={{ x: "100%", opacity: 1 }}
                initial={{ x: "100%", opacity: 1 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div className="flex items-start justify-between border-b border-[#efe7dd] px-5 pb-4 pt-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#78350f] text-lg font-semibold text-white">
                      M
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-[#8a7a70]">Welcome back</p>
                      <h2 id="sidebar-title" className="truncate text-base font-bold uppercase tracking-wide text-[#1e1b15]">
                        M RAKA NURIDWAN
                      </h2>
                    </div>
                  </div>
                  <button
                    aria-label="Tutup"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f1ea] text-[#8a7a70]"
                    onClick={() => setIsOpen(false)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[24px]">close</span>
                  </button>
                </div>

                <nav className="flex flex-1 flex-col px-2 py-2">
                  {sidebarItems.map((item) => (
                    <Link
                      className="flex items-center justify-between rounded-xl px-4 py-4 text-left transition hover:bg-[#fff8f1]"
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full text-[#c46c16]">
                          <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                        </span>
                        <span className="text-[15px] text-[#2a1f19]">{item.label}</span>
                      </span>
                      <span className="material-symbols-outlined text-[22px] text-[#ddd4cb]">chevron_right</span>
                    </Link>
                  ))}
                </nav>

                <div className="border-t border-[#efe7dd] p-4">
                  <button
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[#ff4d4d] transition hover:bg-[#fff5f5]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[22px]">logout</span>
                    <span className="text-[15px] font-medium">Log Out</span>
                  </button>
                </div>
              </motion.aside>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      )
    : null;
}
