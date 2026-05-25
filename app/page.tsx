import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";
import { featuredProducts, formatPrice, products } from "@/lib/data";
import { HomeHeroSlider } from "@/components/home-hero-slider";
import { OrderTypeSheet } from "@/components/order-type-sheet";
import { HomeProductShelf } from "@/components/home-product-shelf";

const heroSlides = [
  {
    title: "Artisan Bread",
    caption: "Freshly baked and ready to browse",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2OHUi3YIOxeA9zCd4re0Px9O7fwyXEPol8ACw7yOJIAVu3JkzeRCvpUrZtLC39KtLYN3jF2ClpVy9FtSxZ0e9D-E5IEldKQOfWsqkHddK0ee-QhcEqJf7tVSLHIf1NivtiM7CAjDwAZ4WbagbmVaaadRw_ZN758ldQA4zzk2wu4y-ubXBixMPGE0hr4bRIOrABrMHH3xDs9qD4AT-gnZzYajsOwgQ5hYvXHxfhjVk1BrD97IeNTIWJhCpQXnfXe4DBrOBoBHrs_Jz"
  },
  {
    title: "Financier",
    caption: "Perfect little bites for gifting",
    image: products.find((product) => product.slug === "custom-celebration-cake")?.images[0] ?? featuredProducts[0].images[0]
  }
];

const isProduct = (product: Product | undefined): product is Product => Boolean(product);

const productsBySlug = (slugs: string[]) => slugs.map((slug) => products.find((product) => product.slug === slug)).filter(isProduct);

const productSections = [
  {
    title: "Today's Extra",
    description: "Freshly baked limited drops.",
    products: productsBySlug(["todays-extra-assortment", "butter-bites-original", "butter-bites-ube"])
  },
  {
    title: "Shokupan",
    description: "Soft milk bread loaves.",
    products: products.filter((product) => product.name.toLowerCase().includes("shokupan"))
  },
  {
    title: "Salt Bread",
    description: "Buttery savory breads.",
    products: products.filter((product) => product.name.toLowerCase().includes("salt bread"))
  },
  {
    title: "Butter Bites",
    description: "Small buttery snacks.",
    products: products.filter((product) => product.name.toLowerCase().includes("butter bites"))
  },
  {
    title: "Cakes",
    description: "Custom celebration cakes.",
    products: products.filter((product) => product.category === "cakes")
  },
  {
    title: "Bundles",
    description: "Curated sharing sets.",
    products: products.filter((product) => product.name.toLowerCase().includes("bundle"))
  }
].filter((section) => section.products.length > 0);

const justForYou = [
  products.find((product) => product.slug === "todays-extra-assortment"),
  products.find((product) => product.slug === "ube-shokupan-plain") ?? featuredProducts[0],
  products.find((product) => product.slug === "salt-bread-coffee"),
  products.find((product) => product.slug === "bundle-4in1")
].filter(Boolean);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fff8f1] pb-24 text-[#1e1b15]">
      <main className="mx-auto flex w-full max-w-md flex-col gap-4 pt-0">
        <HomeHeroSlider slides={heroSlides} />

        <section className="-mt-6 flex flex-col gap-3 px-3 relative z-20">
          <form action="/search" className="search-shell relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[22px] text-[#6a4b3a]">search</span>
            <input
              className="home-search-shimmer w-full rounded-[999px] border border-[#ebd8c7] bg-[#fff7ee] py-4 pl-12 pr-4 text-[15px] font-medium tracking-[0.01em] text-[#2a1f19] outline-none ring-0 placeholder:text-[#8c7765] focus:translate-y-[-1px] focus:ring-0"
              name="q"
              placeholder="Search for Butter Bites..."
              type="search"
            />
          </form>
          <OrderTypeSheet />
        </section>

        <section className="flex flex-col gap-4 px-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-[1.65rem] font-bold leading-tight text-[#1e1b15]">Just for you</h2>
            <div className="flex gap-2">
              <span className="animate-pulse-soft rounded-full bg-[#78350f] px-3 py-1 text-xs font-medium text-white">Today's Xtra</span>
              <span className="rounded-full bg-[#efe7dd] px-3 py-1 text-xs font-medium text-[#1e1b15]">Featured</span>
            </div>
          </div>

          <div className="rounded-lg border border-[#e9e1d8] bg-[#fff7ed] p-3 text-center">
            <p className="text-sm font-medium text-[#592100]">All Today's Extra items are freshly made ready stock...</p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {justForYou.map((product) => product ? (
              <Link className="flex min-w-[62%] flex-none snap-start flex-col gap-2 transition active:scale-[0.98] sm:min-w-[46%]" href={`/menu/${product.slug}`} key={product.id}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#f5ede3]">
                  <Image alt={product.name} className="h-full w-full object-cover" fill src={product.images[0]} sizes="(max-width: 768px) 62vw, 200px" />
                  {product.badges[0] ? (
                    <div className="animate-pulse-soft absolute left-2 top-2 rounded bg-white/80 px-2 py-0.5 text-xs font-semibold text-[#592100] backdrop-blur-sm">
                      {product.badges[0]}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <span className="line-clamp-1 text-sm font-semibold tracking-wide text-[#1e1b15]">{product.name}</span>
                  <span className="text-xs font-medium text-[#592100]">{product.sizes ? "From " : ""}{formatPrice(product.sizes?.[0]?.price ?? product.price)}</span>
                </div>
              </Link>
            ) : null)}
          </div>
        </section>

        <HomeProductShelf sections={productSections} />
      </main>

    </div>
  );
}
