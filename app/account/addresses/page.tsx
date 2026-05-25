import Link from "next/link";

export default function AccountAddressesPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#fff8f1] text-[#1e1b15]">
      <header className="flex items-center gap-3 border-b border-[#efe2d4] px-4 py-4">
        <Link className="flex h-10 w-10 items-center justify-center rounded-full text-[#592100]" href="/account">
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
        </Link>
        <h1 className="text-[1.05rem] font-bold text-[#5a3317]">My Addresses</h1>
      </header>

      <section className="px-4 py-4">
        <div className="flex items-center justify-between rounded-3xl border border-[#f1e1d1] bg-white px-4 py-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f28b22]">Saved Addresses</p>
            <p className="mt-1 text-lg font-bold text-[#1e1b15]">0 addresses</p>
          </div>
          <Link className="inline-flex items-center gap-2 rounded-full bg-[#78350f] px-4 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.99]" href="/account/addresses/new">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Address
          </Link>
        </div>
      </section>

      <section className="flex flex-1 px-4 pb-6">
        <div className="flex flex-1 flex-col items-center justify-center rounded-[28px] border border-[#f1e1d1] bg-white px-6 py-10 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1dc] text-[#e6a04b]">
            <span className="material-symbols-outlined text-[28px]">location_on</span>
          </div>
          <h2 className="mt-5 text-[1.05rem] font-bold text-[#1e1b15]">No saved addresses</h2>
          <p className="mt-2 max-w-[18rem] text-sm leading-6 text-[#f28b22]">Add your first delivery address so checkout is faster next time.</p>
          <Link className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#78350f] px-5 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.99]" href="/account/addresses/new">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Address
          </Link>
        </div>
      </section>
    </main>
  );
}
