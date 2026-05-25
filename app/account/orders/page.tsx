import Link from "next/link";

export default function AccountOrdersPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#fff8f1] text-[#1e1b15]">
      <header className="flex items-center gap-3 border-b border-[#efe2d4] px-4 py-4">
        <Link className="flex h-10 w-10 items-center justify-center rounded-full text-[#592100]" href="/account">
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
        </Link>
        <h1 className="text-[1.05rem] font-bold text-[#5a3317]">Order History</h1>
      </header>

      <section className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="rounded-[28px] border border-[#f1e1d1] bg-white px-6 py-10 text-center shadow-sm">
          <span className="material-symbols-outlined text-[44px] text-[#e6a04b]">receipt_long</span>
          <h2 className="mt-4 text-lg font-bold text-[#1e1b15]">No orders yet</h2>
          <p className="mt-2 text-sm leading-6 text-[#f28b22]">Your completed orders will appear here after checkout.</p>
        </div>
      </section>
    </main>
  );
}
