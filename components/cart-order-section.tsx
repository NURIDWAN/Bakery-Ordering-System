"use client";

type CartOrderSectionProps = {
  title: string;
  icon: string;
  children: React.ReactNode;
};

export function CartOrderSection({ title, icon, children }: CartOrderSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#78350f] text-white">
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </span>
        <h2 className="font-semibold text-[#1e1b15]">{title}</h2>
      </div>
      {children}
    </section>
  );
}
