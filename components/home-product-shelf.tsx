"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import { QuickAddButton } from "@/components/quick-add-button";

type ShelfSection = {
  title: string;
  description: string;
  products: Product[];
};

type HomeProductShelfProps = {
  sections: ShelfSection[];
};

type LayoutMode = "grid" | "list";
type SortMode = "default" | "name" | "price-asc" | "price-desc";

const sortOptions: { label: string; value: SortMode }[] = [
  { label: "Default", value: "default" },
  { label: "Nama A-Z", value: "name" },
  { label: "Harga rendah", value: "price-asc" },
  { label: "Harga tinggi", value: "price-desc" }
];

function productPrice(product: Product) {
  return product.sizes?.[0]?.price ?? product.price;
}

export function HomeProductShelf({ sections }: HomeProductShelfProps) {
  const [layout, setLayout] = useState<LayoutMode>("grid");
  const [activeSection, setActiveSection] = useState(sections.find((section) => section.title === "Bundles")?.title ?? sections[0]?.title ?? "");
  const [sort, setSort] = useState<SortMode>("default");

  const visibleSections = (activeSection ? sections.filter((section) => section.title === activeSection) : sections).map((section) => ({
    ...section,
    products: [...section.products].sort((left, right) => {
      if (sort === "name") return left.name.localeCompare(right.name);
      if (sort === "price-asc") return productPrice(left) - productPrice(right);
      if (sort === "price-desc") return productPrice(right) - productPrice(left);
      return 0;
    })
  }));

  return (
    <section className="flex flex-col gap-5">
      <div className="sticky top-0 z-30 -mx-3 border-b border-[#e9e1d8] bg-[#fff8f1]/95 px-3 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <label className="relative">
            <select
              aria-label="Pilih kategori"
              className="appearance-none rounded-full bg-[#78350f] py-2 pl-4 pr-9 text-sm font-semibold text-white outline-none transition active:scale-95"
              onChange={(event) => setActiveSection(event.target.value)}
              value={activeSection}
            >
              <option className="bg-white text-[#1e1b15]" value="">
                Semua
              </option>
              {sections.map((section) => (
                <option className="bg-white text-[#1e1b15]" key={section.title} value={section.title}>
                  {section.title}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white">expand_more</span>
          </label>
          <div className="flex gap-1 rounded-lg bg-[#efe7dd] p-1">
            <button
              aria-label="Card layout"
              className={`flex h-9 w-9 items-center justify-center rounded-md transition ${layout === "grid" ? "bg-[#fff8f1] text-[#592100] shadow-sm" : "text-[#54433c]"}`}
              onClick={() => setLayout("grid")}
              type="button"
            >
              <span className="material-symbols-outlined text-xl">grid_view</span>
            </button>
            <button
              aria-label="List layout"
              className={`flex h-9 w-9 items-center justify-center rounded-md transition ${layout === "list" ? "bg-[#fff8f1] text-[#592100] shadow-sm" : "text-[#54433c]"}`}
              onClick={() => setLayout("list")}
              type="button"
            >
              <span className="material-symbols-outlined text-xl">view_list</span>
            </button>
          </div>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {sortOptions.map((option) => (
            <button
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                sort === option.value ? "border-[#78350f] bg-[#78350f] text-white" : "border-[#e9e1d8] bg-[#fff8f1] text-[#54433c]"
              }`}
              key={option.value}
              onClick={() => setSort(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {visibleSections.map((section, sectionIndex) => (
        <div className={`${sectionIndex === 0 ? "" : "mt-4"} space-y-3`} key={section.title}>
          <h3 className="border-b border-[#e9e1d8] pb-2 font-serif text-[1.7rem] font-bold leading-tight text-[#1e1b15]">{section.title}</h3>
          <div className={layout === "grid" ? "grid grid-cols-2 gap-3" : "grid gap-0"}>
            {section.products.map((product) =>
              layout === "grid" ? (
                <article className="overflow-hidden rounded-xl border border-[#e9e1d8] bg-[#fff7ed]" key={product.id}>
                  <Link className="relative block aspect-square w-full bg-[#f5ede3] text-left" href={`/menu/${product.slug}`}>
                    <Image alt={product.name} className="h-full w-full object-cover" fill src={product.images[0]} sizes="(max-width: 768px) 50vw, 200px" />
                    {product.badges[0] ? <span className="absolute left-2 top-2 rounded bg-white/85 px-2 py-0.5 text-[10px] font-semibold text-[#592100]">{product.badges[0]}</span> : null}
                  </Link>
                  <div className="flex min-h-[98px] flex-col justify-between p-3">
                    <Link className="text-left" href={`/menu/${product.slug}`}>
                      <h4 className="line-clamp-2 text-sm font-semibold tracking-wide text-[#1e1b15]">{product.name}</h4>
                      <p className="mt-1 text-xs font-medium text-[#592100]">{product.sizes ? "From " : ""}{formatPrice(productPrice(product))}</p>
                    </Link>
                    <div className="mt-3 flex justify-end">
                      <QuickAddButton product={product} variant="icon" />
                    </div>
                  </div>
                </article>
              ) : (
                <article className="group flex items-center gap-4 border-b border-[#e9e1d8]/70 py-3" key={product.id}>
                  <Link className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-lg bg-[#f5ede3] text-left transition group-active:scale-95" href={`/menu/${product.slug}`}>
                    <Image alt={product.name} className="h-full w-full object-cover" height={120} src={product.images[0]} width={120} />
                  </Link>
                  <Link className="min-w-0 flex-1 text-left" href={`/menu/${product.slug}`}>
                    <h4 className="line-clamp-2 text-sm font-semibold tracking-wide text-[#1e1b15]">{product.name}</h4>
                    {product.sizes ? <p className="mt-0.5 text-xs text-[#54433c]">From</p> : null}
                    <p className="mt-0.5 text-base font-medium text-[#592100]">{formatPrice(productPrice(product))}</p>
                  </Link>
                  <QuickAddButton product={product} variant="icon" />
                </article>
              )
            )}
          </div>
        </div>
      ))}

    </section>
  );
}
