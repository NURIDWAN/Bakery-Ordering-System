import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#fff8f1] text-[#1e1b15]">
      <header className="flex items-center gap-3 border-b border-[#efe2d4] px-4 py-4">
        <Link className="flex h-10 w-10 items-center justify-center rounded-full text-[#592100]" href="/">
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
        </Link>
        <h1 className="text-[1.05rem] font-bold text-[#5a3317]">Terms &amp; Conditions</h1>
      </header>

      <section className="px-4 py-4">
        <div className="rounded-[28px] border border-[#f1e1d1] bg-white px-5 py-6 shadow-sm">
          <p className="text-sm leading-7 text-[#1e1b15]">
            This placeholder page is ready for the store policy content. Add your ordering, payment, and fulfillment terms here.
          </p>
        </div>
      </section>
    </main>
  );
}
