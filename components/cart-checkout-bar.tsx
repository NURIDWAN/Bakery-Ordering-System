"use client";

export function CartCheckoutBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#f1e1d1] bg-[#fff8f1]/95 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 backdrop-blur">
      <div className="mx-auto w-full max-w-md">
        <button className="flex w-full items-center justify-center rounded-[18px] bg-[#78350f] px-5 py-4 text-white shadow-[0_16px_36px_rgba(89,33,0,0.28)]" type="button">
          <span className="text-base font-semibold">Continue to Payment</span>
        </button>
      </div>
    </div>
  );
}
