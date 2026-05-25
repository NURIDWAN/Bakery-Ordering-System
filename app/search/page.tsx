import Link from "next/link";
import { products } from "@/lib/data";
import { SearchResultsList } from "@/components/search-results-list";

type SearchPageProps = {
  searchParams: {
    q?: string;
  };
};

function matchesQuery(query: string) {
  const normalized = query.toLowerCase().trim();

  if (!normalized) return [];

  return products
    .filter((product) => {
      const haystack = [
        product.name,
        product.description,
        product.longDescription,
        product.categoryLabel,
        product.badges.join(" "),
        product.tags.join(" ")
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    })
    .sort((left, right) => left.name.localeCompare(right.name));
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q ?? "";
  const results = matchesQuery(query);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#fff8f1] px-4 pb-24 pt-3 text-[#1e1b15]">
      <header className="sticky top-0 z-20 bg-[#fff8f1]/95 pb-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#592100] transition active:scale-95" href="/">
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </Link>
          <form action="/search" className="search-shell relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[#54433c]">search</span>
            <input
              autoComplete="off"
              className="home-search-shimmer w-full rounded-full border-none bg-[#f5ede3] py-3 pl-11 pr-10 text-sm outline-none ring-0 placeholder:text-[#54433c] focus:translate-y-[-1px] focus:ring-1 focus:ring-[#592100]"
              defaultValue={query}
              name="q"
              placeholder="Search products..."
              type="search"
            />
            {query ? (
              <Link
                aria-label="Clear search"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-[#8c7f77]"
                href="/search"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </Link>
            ) : null}
          </form>
        </div>
      </header>

      <section className="mt-2">
        <p className="text-sm font-medium text-[#8c7f77]">{query ? `${results.length} results` : "Type to search products"}</p>
      </section>

      <SearchResultsList query={query} results={results} />
    </main>
  );
}
