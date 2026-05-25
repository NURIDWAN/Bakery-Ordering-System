import Link from "next/link";

export default function AccountPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#fff8f1] text-[#1e1b15]">
      <header className="flex items-center gap-3 border-b border-[#efe2d4] px-4 py-4">
        <Link className="flex h-10 w-10 items-center justify-center rounded-full text-[#592100]" href="/">
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
        </Link>
        <h1 className="text-[1.05rem] font-bold text-[#5a3317]">My Account</h1>
      </header>

      <section className="border-b border-[#efe2d4] px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#a76a35] text-xl font-semibold text-white shadow-sm">
            MN
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-[1.05rem] font-bold uppercase tracking-wide text-[#1e1b15]">M RAKA NURIDWAN</h2>
            <p className="mt-1 text-sm text-[#f28b22]">nuridwan1303@gmail.com</p>
          </div>
        </div>
      </section>

      <section className="flex flex-1 flex-col gap-3 px-4 py-4">
        <Link className="flex items-center justify-between rounded-2xl border border-[#f1e1d1] bg-white px-4 py-4 shadow-sm transition active:scale-[0.99]" href="/account/addresses">
          <span className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff3e6] text-[#c97c34]">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
            </span>
            <span>
              <span className="block text-[15px] font-semibold text-[#1e1b15]">My Addresses</span>
              <span className="block text-sm text-[#f28b22]">Manage your delivery addresses</span>
            </span>
          </span>
          <span className="material-symbols-outlined text-[#d7c7b7]">chevron_right</span>
        </Link>

        <button className="mt-1 flex items-center justify-center gap-2 rounded-2xl border border-[#ffc1c1] bg-white px-4 py-4 text-[#ff3a3a] shadow-sm transition active:scale-[0.99]" type="button">
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="text-[15px] font-semibold">Sign Out</span>
        </button>
      </section>
    </main>
  );
}
