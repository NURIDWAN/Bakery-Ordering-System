"use client";

import Link from "next/link";

export function CartPageHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#f1e1d1] bg-[#fff8f1]/95 px-4 py-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <Link className="flex h-9 w-9 items-center justify-center rounded-full text-[#592100] transition active:scale-95" href="/">
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
        </Link>
        <h1 className="font-serif text-2xl font-bold text-[#1e1b15]">Order</h1>
      </div>
    </header>
  );
}
