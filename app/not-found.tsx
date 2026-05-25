import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell flex items-center justify-center">
      <div className="soft-card max-w-lg p-10 text-center">
        <p className="section-kicker">404</p>
        <h1 className="mt-2 font-serif text-4xl font-bold">Halaman tidak ditemukan</h1>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          Slug produk atau route belum tersedia. Kembali ke beranda untuk melanjutkan order.
        </p>
        <Link className="action-button mt-6" href="/">
          Buka beranda
        </Link>
      </div>
    </main>
  );
}
