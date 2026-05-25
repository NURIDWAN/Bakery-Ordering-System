"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/components/cart-provider";
import { ProductOptionsList } from "@/components/product-options-list";

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.options?.[0]?.label ?? product.sizes?.[0]?.label);
  const [note, setNote] = useState("");
  const [frosting, setFrosting] = useState("Warm ivory");
  const [cakeMessage, setCakeMessage] = useState("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { addItem, items, itemCount, subtotal } = useCart();

  const activePrice = useMemo(() => {
    const selectableOptions = product.options?.length ? product.options : product.sizes;
    if (!selectableOptions?.length) return product.price;
    return selectableOptions.find((option) => option.label === selectedSize)?.price ?? product.price;
  }, [product, selectedSize]);

  const orderNote = [note, product.customCake ? `Frosting: ${frosting}` : "", cakeMessage ? `Message: ${cakeMessage}` : ""].filter(Boolean).join(" | ");

  const addToCart = () =>
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.customCake && cakeMessage ? `${product.name} · ${cakeMessage}` : product.name,
      image: product.images[0],
      basePrice: activePrice,
      quantity,
      note: orderNote,
      selectedSize
    });

  const hasProductInCart = items.some((item) => item.slug === product.slug);

  const customCakeConfigurator = product.customCake ? (
    <div className="mt-8 grid gap-4 rounded-[28px] bg-cream p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-copper">Custom configuration</p>
        <p className="mt-2 text-sm leading-7 text-stone-700">PRD mensyaratkan opsi tier, warna frosting, tulisan kue, dan lead time minimum 3 hari.</p>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-ink">
        Warna frosting
        <select className="rounded-[18px] border border-line bg-white px-4 py-3 font-normal outline-none" onChange={(event) => setFrosting(event.target.value)} value={frosting}>
          <option>Warm ivory</option>
          <option>Sage green</option>
          <option>Soft peach</option>
          <option>Chocolate brown</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-ink">
        Tulisan di kue
        <input className="rounded-[18px] border border-line bg-white px-4 py-3 font-normal outline-none" onChange={(event) => setCakeMessage(event.target.value)} placeholder="Contoh: Happy Birthday Ayu" value={cakeMessage} />
      </label>
      <div className="rounded-[20px] border border-dashed border-copper/40 bg-white p-4 text-sm text-stone-700">
        Upload referensi foto belum dihubungkan ke backend. Placeholder ini sengaja disiapkan untuk integrasi storage berikutnya.
      </div>
      <div className="rounded-[20px] bg-white p-4 text-sm text-cocoa">Lead time minimum: {product.leadTimeDays} hari.</div>
    </div>
  ) : null;

  const orderControls = (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">Quantity</p>
        <div className="inline-flex w-fit items-center rounded-full border border-line bg-white p-1">
          <button className="h-10 w-10 rounded-full text-xl" onClick={() => setQuantity((value) => Math.max(1, value - 1))} type="button">
            -
          </button>
          <span className="w-10 text-center text-lg font-semibold">{quantity}</span>
          <button className="h-10 w-10 rounded-full bg-cocoa text-xl text-white" onClick={() => setQuantity((value) => value + 1)} type="button">
            +
          </button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
          Notes <span className="normal-case tracking-normal text-ink/70">(optional)</span>
        </p>
        <textarea
          className="min-h-[140px] w-full resize-none rounded-[18px] border border-line bg-white px-4 py-3 text-sm leading-5 outline-none"
          onChange={(event) => {
            event.target.style.height = "0px";
            event.target.style.height = `${event.target.scrollHeight}px`;
            setNote(event.target.value);
          }}
          placeholder="Catatan produk, contoh: tolong slice lebih tebal"
          rows={1}
          value={note}
        />
      </div>
    </div>
  );

  const mobileProductMeta = (
    <>
      <div className="flex flex-wrap gap-2">
        {product.badges.map((badge) => (
          <span className="chip !px-2.5 !py-1 text-[10px]" key={badge}>
            {badge}
          </span>
        ))}
      </div>
      <h1 className="mt-3 text-left font-serif text-[2rem] font-bold leading-[0.95]">{product.name}</h1>
      <p className="mt-1.5 text-left text-[1.2rem] font-semibold text-cocoa">{formatPrice(activePrice)}</p>
      <p className="mt-3 text-left text-sm leading-5 text-ink">{product.description}</p>
      <p className={`mt-2 text-left text-xs leading-5 text-ink ${isDescriptionExpanded ? "whitespace-pre-line" : "overflow-hidden text-ellipsis whitespace-nowrap"}`}>
        {product.longDescription}
      </p>
      <button className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-cocoa" onClick={() => setIsDescriptionExpanded((value) => !value)} type="button">
        {isDescriptionExpanded ? "Show less" : "Read more"}
        <span aria-hidden="true">{isDescriptionExpanded ? "⌃" : "⌄"}</span>
      </button>
      <ProductOptionsList onSelectSize={setSelectedSize} product={product} selectedSize={selectedSize} />
      {customCakeConfigurator}
      {orderControls}
    </>
  );

  const ingredientsPanel =
    product.allergens?.length || product.ingredients?.length ? (
      <div className="mt-8 grid gap-4 rounded-[28px] border border-line bg-white p-5 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-copper">Allergens</p>
          <p className="mt-2 text-sm leading-7 text-stone-700">{product.allergens?.join(", ") ?? "-"}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-copper">Ingredients</p>
          <p className="mt-2 text-sm leading-7 text-stone-700">{product.ingredients?.join(", ") ?? "-"}</p>
        </div>
      </div>
    ) : null;

  return (
    <main className="animate-detail-enter mx-auto min-h-screen w-full max-w-md space-y-8 pb-10 pt-0 lg:pb-28">
      <section className="isolate">
        <div className="sticky top-0 z-0">
          <div className="relative h-[34svh] min-h-[250px] overflow-hidden bg-surface">
            <Image alt={product.name} className="h-full w-full object-cover" height={900} src={product.images[activeImage]} width={900} />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/25 to-transparent" />
            <Link
              aria-label="Kembali ke menu"
              className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-xl text-cocoa shadow-sm backdrop-blur"
              href="/"
            >
              ×
            </Link>
          </div>
        </div>

        <div className="animate-detail-panel relative z-10 -mt-1 rounded-t-[32px] bg-surface px-4 pb-24 pt-3 shadow-[0_-12px_32px_rgba(62,33,14,0.12)]">
          <div>
            <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-stone-200" />
            {mobileProductMeta}
            {ingredientsPanel}

            {product.images.length > 1 ? (
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-copper">Galeri</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {product.images.map((image, index) => (
                    <button className={`overflow-hidden rounded-[22px] border ${index === activeImage ? "border-cocoa" : "border-line"}`} key={image} onClick={() => setActiveImage(index)} type="button">
                      <Image alt={`${product.name} ${index + 1}`} className="h-28 w-full object-cover" height={180} src={image} width={220} />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line/70 bg-surface/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur">
          <div className="mx-auto w-full max-w-md">
            {hasProductInCart ? (
              <Link className="flex items-center justify-between rounded-[20px] bg-cocoa px-4 py-3 text-white shadow-[0_16px_40px_rgba(89,33,0,0.28)]" href="/cart">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-5">View Cart</p>
                    <p className="text-xs text-white/70">{itemCount} item</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <div>
                    <p className="text-[11px] text-white/70">Subtotal</p>
                    <p className="text-sm font-semibold">{formatPrice(subtotal)}</p>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-white/80">chevron_right</span>
                </div>
              </Link>
            ) : (
              <button className="flex w-full items-center justify-between rounded-[20px] bg-cocoa px-4 py-3 text-white shadow-[0_16px_40px_rgba(89,33,0,0.28)]" onClick={addToCart} type="button">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-5">Add to Cart</p>
                    <p className="text-xs text-white/70">Simpan pesanan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <div>
                    <p className="text-[11px] text-white/70">Total</p>
                    <p className="text-sm font-semibold">{formatPrice(activePrice * quantity)}</p>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-white/80">chevron_right</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </section>

      {product.reviews?.length ? (
        <section className="soft-card p-6">
          <p className="section-kicker">Reviews</p>
          <h2 className="mt-2 font-serif text-3xl font-bold">Ulasan pelanggan</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {product.reviews.map((review) => (
              <div className="rounded-[24px] border border-line bg-white p-5" key={review.name}>
                <div className="text-butter">{Array.from({ length: review.rating }, (_, index) => <span key={index}>★</span>)}</div>
                <p className="mt-3 text-sm leading-7 text-stone-700">{review.comment}</p>
                <p className="mt-4 text-sm font-semibold text-ink">{review.name}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

    </main>
  );
}
