"use client";

import Link from "next/link";

export function CartEmptyState() {
  return (
    <section className="flex flex-1 items-center px-4 py-10">
      <div className="w-full rounded-[24px] border border-[#e9e1d8] bg-white p-6 text-center shadow-sm">
        <p className="text-sm leading-7 text-stone-700">Cart masih kosong. Tambahkan produk dari beranda atau halaman detail.</p>
        <Link className="action-button mt-6" href="/">
          Buka beranda
        </Link>
      </div>
    </section>
  );
}
