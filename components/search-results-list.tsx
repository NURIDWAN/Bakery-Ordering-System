"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice, type Product } from "@/lib/data";

type SearchResultsListProps = {
  query: string;
  results: Product[];
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.03
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export function SearchResultsList({ query, results }: SearchResultsListProps) {
  return (
    <section className="mt-4 space-y-3">
      {results.length === 0 ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[24px] border border-[#e9e1d8] bg-white p-6 text-center shadow-sm"
          initial={{ opacity: 0, y: 8 }}
        >
          <p className="text-sm leading-7 text-stone-700">{query ? "Tidak ada produk yang cocok untuk pencarian ini." : "Type to search products"}</p>
        </motion.div>
      ) : (
        <motion.div animate="visible" className="space-y-3" initial="hidden" variants={listVariants}>
          {results.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Link
                className="flex items-center gap-3 rounded-[22px] border border-[#f1e1d1] bg-white p-3 shadow-[0_8px_20px_rgba(89,33,0,0.04)] transition active:scale-[0.99]"
                href={`/menu/${product.slug}`}
              >
                <Image alt={product.name} className="h-[88px] w-[88px] shrink-0 rounded-[16px] object-cover" height={160} src={product.images[0]} width={160} />
                <div className="min-w-0 flex-1">
                  <h2 className="line-clamp-1 font-semibold text-[#1e1b15]">{product.name}</h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#8c7f77]">{product.description}</p>
                  <p className="mt-2 text-sm font-semibold text-[#592100]">{product.sizes?.[0]?.price ? `From ${formatPrice(product.sizes[0].price)}` : formatPrice(product.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
