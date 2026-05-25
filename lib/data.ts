export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type ProductSize = {
  label: string;
  price: number;
};

export type ProductOption = {
  label: string;
  price: number;
  available?: boolean;
  stockLabel?: string;
};

export type ProductReview = {
  name: string;
  rating: number;
  comment: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  badges: string[];
  tags: string[];
  featured?: boolean;
  isAvailable: boolean;
  leadTimeDays?: number;
  sizes?: ProductSize[];
  options?: ProductOption[];
  allergens?: string[];
  ingredients?: string[];
  reviews?: ProductReview[];
  customCake?: boolean;
};

export const categories: Category[] = [
  {
    id: "cakes",
    name: "Cakes",
    slug: "cakes",
    description: "Custom cakes and celebration centrepieces."
  },
  {
    id: "savory",
    name: "Savory",
    slug: "savory",
    description: "Comforting savory bakes for breakfast and lunch."
  },
  {
    id: "pastries",
    name: "Pastries",
    slug: "pastries",
    description: "Flaky breads, laminated pastries, and gifting boxes."
  },
  {
    id: "desserts-beverages",
    name: "Desserts & Beverages",
    slug: "desserts-beverages",
    description: "Desserts, sweets, and drinks for a sweet finish."
  }
];

export const products: Product[] = [
  {
    id: "prd_ube_shokupan",
    slug: "ube-shokupan-plain",
    name: "Ube Shokupan (Plain)",
    category: "pastries",
    categoryLabel: "Pastries",
    description: "Soft, lightly nutty, and ideal for breakfast toast.",
    longDescription:
      "Made with purple sweet potato for a natural aroma and a pillowy crumb. Best enjoyed warm with butter, kaya, or transformed into thick-cut French toast.",
    price: 85000,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCx1q2V-np5JCciuhH6pkywu_8-nkUslVzCdGK6bGoSzlF56plZcUpddvAe9MhtwYfXcBYuBW653ArQZnWQlk7ApSu7UvHLobFLWe6TG_NVCpAsQc29PF_8Uc4RoMJagDqW14XhgIjS9fBYSHNuCogHLf3PHvIjnfZBwfPF6Tp-fcdz1O5opcWiBTB5TGHX9rUVAM3d1cT2NeQaP_sN1L5W4Rd0gwqXHCXAvkNpE4fFxUPGnDzq2JWsT7v3QIiqhrrXYBnWMbgKIvhz",
      "https://lh3.googleusercontent.com/aida/ADBb0ugiRdwwZFo4oRA_jyEwj8rM2E1pSumPTDFZHaoFfY4Vl3PPGlxpYMWiQ1utBKGFmulqX82iWZKlzinQyvxb1z9i596Ce_JuIvcKDK9gLulhLsauHYu2CC9Jbs_NKjsnB4Z15bBRusqq5p1mIMiAiss5rKD60eYOhycT4Zj5sIJLpxUG1nf6K54p8dKIiAXd3mjGYZXgxbibqVDfBNCl8FY2p56dKGrbU8NI1e3G6SnGp0G38l0FprvHSJ0"
    ],
    badges: ["Pre-order", "Bestseller"],
    tags: ["bestseller"],
    featured: true,
    isAvailable: true,
    allergens: ["Gluten", "Milk", "Egg"],
    ingredients: ["Purple sweet potato", "Butter", "Bread flour", "Milk"],
    reviews: [
      {
        name: "Maya",
        rating: 5,
        comment: "Texture-nya empuk dan wanginya khas. Enak banget buat sarapan."
      },
      {
        name: "Noah",
        rating: 5,
        comment: "The loaf stays soft the next day and tastes premium."
      }
    ]
  },
  {
    id: "prd_original_shokupan",
    slug: "original-shokupan-plain",
    name: "Original Shokupan (Plain)",
    category: "pastries",
    categoryLabel: "Pastries",
    description: "Classic milk bread loaf with a shiny crust and airy crumb.",
    longDescription:
      "A classic daily loaf designed for toast, sandwiches, and buttered afternoon snacks. Baked fresh every morning in limited batches.",
    price: 80000,
    images: [
      "https://lh3.googleusercontent.com/aida/ADBb0ujni8P3OjQvznOz05ekoEoo2j1C6B6NMc90R0ew2i_FYzOhXGHvV5VE3m4OuAsew6JbffiFA6BPwXrQXnT8WY0_Isr99xG9IYZcFk4nltrlKN7eldHf4Yq3Ctb0M5CVKIkqtBX8P0290NLvXSpytvl90ttIojSQWUxsSkzzMoMwrOMCzmuU43J3gX9lfNsFoDXdtCZzwx1k0mzccqpwm3p_U26zF8wmAU4VlNINaKXKtVwj-pUrHDbjctiV"
    ],
    badges: ["Featured"],
    tags: ["featured"],
    featured: true,
    isAvailable: true
  },
  {
    id: "prd_salt_bread",
    slug: "salt-bread",
    name: "Salt Bread",
    category: "savory",
    categoryLabel: "Savory",
    description: "Buttery salt bread with a crisp bottom and soft middle.",
    longDescription:
      "Our daily salt bread is small, savory, and dangerously snackable. A great add-on for coffee runs and villa breakfast orders.",
    price: 20000,
    images: [
      "https://lh3.googleusercontent.com/aida/ADBb0uiAThO6kRsaLHbRVb1bGTZYZpXERpZYR8pzCD7pSe2crYQtCwCpCw0nnUs-yHTQ76P1zacXtNoj7encrybYQrBT3eygQzt7wPG9IlqaQOej6vxah-3wm_bdhFJ3sttvZ0Ms8BgQcJUZpEL0dcP03cQtI17j1AWOPGyNO_nAy0JEumnVgzsEVac0hbT-GM0hvSZkE5d82LTO_yvGKGO6CygF9R-uHLFnLyZyB56rKlBjj3VvckE-6pb15_ts"
    ],
    badges: ["Ready stock"],
    tags: ["seasonal"],
    featured: true,
    isAvailable: true
  },
  {
    id: "prd_salt_bread_abon",
    slug: "salt-bread-abon",
    name: "Salt Bread Abon",
    category: "savory",
    categoryLabel: "Savory",
    description: "Salt bread finished with savoury floss for extra depth.",
    longDescription:
      "A local favourite for guests wanting something salty and satisfying. Packed fresh and suited for quick pick-up.",
    price: 25000,
    images: [
      "https://lh3.googleusercontent.com/aida/ADBb0uigjJCfxhMtXK8Erxb9zcgvjuG919XfOuDNPZpVM_eQF8O0biRSJDklbwxLdvsNbPiYinu7lSDW1VlZnBJkfHfZZydcTwBuhGFSyEQ_xaYfNQJ2AoNpQTfi9Yo2GJyiY_hcAG77Ce5ylWXGNOPjnrfMkH-Mol5kPn0EwPXrfvDEtQ6W3JH2K-ZoVt-YfSzpxpU6M3W6kyY38CqYTyMzf5I_8BwtTQhQ_5B7155OFf5RURU5tRvD2Xxz7tav"
    ],
    badges: ["Bestseller"],
    tags: ["bestseller"],
    isAvailable: true
  },
  {
    id: "prd_salt_bread_coffee",
    slug: "salt-bread-coffee",
    name: "Salt Bread Coffee",
    category: "savory",
    categoryLabel: "Savory",
    description: "Salt bread with coffee butter cream filling.",
    longDescription:
      "A richer version of our salt bread with a soft coffee butter center. Best served slightly warm with an iced latte.",
    price: 30000,
    images: [
      "https://lh3.googleusercontent.com/aida/ADBb0uiAThO6kRsaLHbRVb1bGTZYZpXERpZYR8pzCD7pSe2crYQtCwCpCw0nnUs-yHTQ76P1zacXtNoj7encrybYQrBT3eygQzt7wPG9IlqaQOej6vxah-3wm_bdhFJ3sttvZ0Ms8BgQcJUZpEL0dcP03cQtI17j1AWOPGyNO_nAy0JEumnVgzsEVac0hbT-GM0hvSZkE5d82LTO_yvGKGO6CygF9R-uHLFnLyZyB56rKlBjj3VvckE-6pb15_ts"
    ],
    badges: ["New"],
    tags: ["featured"],
    isAvailable: true
  },
  {
    id: "prd_butter_bites_original",
    slug: "butter-bites-original",
    name: "Butter Bites Original",
    category: "pastries",
    categoryLabel: "Pastries",
    description: "Bite-size buttery pastry pieces for snacking.",
    longDescription:
      "Small, crisp-edged pastry bites made for sharing. A simple add-on for coffee runs, hampers, or afternoon snacks.",
    price: 45000,
    images: [
      "https://lh3.googleusercontent.com/aida/ADBb0ug49J8gYUhZO7LoxreRwbgmXAjCrbse1Sw3MnVCXCBb3KHWuX-QcDP63pC5Iqt-wtiFDt2_62afWgKt95NV-TqqofwziwF80sUSWnjUp4P8ngSKRgQFdREpXHonVp8xoCs4YowGaRY6yVjgWnEQyATTqetOYV9Kc4Vqx-Wbsn0ak9NLvX4HtcS8Md1gPUaKq0-jkEBJ8msmUt137bJttA-wyLUAg0OZ-vvZYumByHxIKY0e9RN5C7BtcJg"
    ],
    badges: ["Ready stock"],
    tags: ["featured"],
    isAvailable: true
  },
  {
    id: "prd_butter_bites_ube",
    slug: "butter-bites-ube",
    name: "Ube Butter Bites",
    category: "pastries",
    categoryLabel: "Pastries",
    description: "Mini pastry bites with ube glaze and butter aroma.",
    longDescription:
      "A sweet purple yam variation of our butter bites with a mellow nutty finish and crisp pastry base.",
    price: 52000,
    images: [
      "https://lh3.googleusercontent.com/aida/ADBb0ugiRdwwZFo4oRA_jyEwj8rM2E1pSumPTDFZHaoFfY4Vl3PPGlxpYMWiQ1utBKGFmulqX82iWZKlzinQyvxb1z9i596Ce_JuIvcKDK9gLulhLsauHYu2CC9Jbs_NKjsnB4Z15bBRusqq5p1mIMiAiss5rKD60eYOhycT4Zj5sIJLpxUG1nf6K54p8dKIiAXd3mjGYZXgxbibqVDfBNCl8FY2p56dKGrbU8NI1e3G6SnGp0G38l0FprvHSJ0"
    ],
    badges: ["Limited"],
    tags: ["seasonal"],
    isAvailable: true
  },
  {
    id: "prd_bundle_3in1",
    slug: "bundle-3in1",
    name: "Bundle 3in1",
    category: "desserts-beverages",
    categoryLabel: "Desserts & Beverages",
    description: "Sharing bundle for gifting or villa breakfast spreads.",
    longDescription:
      "A curated bundle that combines best sellers into one order-friendly package. Good for guests, gifting, and airport pickups.",
    price: 75000,
    images: [
      "https://lh3.googleusercontent.com/aida/ADBb0uiqMjKplwKDjBmcZh-mz7qbv_Mpfp5drqTf7MJZonxAvbtYOgHHHnc09ZSSf8CT81jIdfTHf7u5pup95-eAe-x0FcKKveE1A1b4TyEecJnurH9-gqngElGfdnJwBc_WOSFcM2bdCxEsRX555w5sbo93IcEeGGsVj_91vTVOEHA1s60T2sWYD6KDsdvXXcT115bi9oSxWENt7DgWRG-OJgickK176MRJKa8bLuPyGzZofp_IfXf1UtRfXdg"
    ],
    badges: ["Featured"],
    tags: ["featured"],
    isAvailable: true,
    options: [
      { label: "Standard", price: 75000, available: true, stockLabel: "8 left" },
      { label: "Family Pack", price: 140000, available: true, stockLabel: "4 left" },
      { label: "Gift Box", price: 160000, available: false }
    ]
  },
  {
    id: "prd_bundle_4in1",
    slug: "bundle-4in1",
    name: "Bundle 4in1",
    category: "desserts-beverages",
    categoryLabel: "Desserts & Beverages",
    description: "Four-piece bakery set for gifting and breakfast tables.",
    longDescription:
      "A larger bundle with sweet and savory picks in one box. Built for families, gifting, and villa breakfast orders.",
    price: 100000,
    images: [
      "https://lh3.googleusercontent.com/aida/ADBb0uiqMjKplwKDjBmcZh-mz7qbv_Mpfp5drqTf7MJZonxAvbtYOgHHHnc09ZSSf8CT81jIdfTHf7u5pup95-eAe-x0FcKKveE1A1b4TyEecJnurH9-gqngElGfdnJwBc_WOSFcM2bdCxEsRX555w5sbo93IcEeGGsVj_91vTVOEHA1s60T2sWYD6KDsdvXXcT115bi9oSxWENt7DgWRG-OJgickK176MRJKa8bLuPyGzZofp_IfXf1UtRfXdg"
    ],
    badges: ["Best value"],
    tags: ["bestseller"],
    isAvailable: true
  },
  {
    id: "prd_seasonal_extra",
    slug: "todays-extra-assortment",
    name: "Today's Extra Assortment",
    category: "desserts-beverages",
    categoryLabel: "Desserts & Beverages",
    description: "Freshly baked, limited quantity seasonal selection.",
    longDescription:
      "A rotating assortment announced daily. Quantities are intentionally limited to keep the display case fresh and surprising.",
    price: 20000,
    images: [
      "https://lh3.googleusercontent.com/aida/ADBb0ug49J8gYUhZO7LoxreRwbgmXAjCrbse1Sw3MnVCXCBb3KHWuX-QcDP63pC5Iqt-wtiFDt2_62afWgKt95NV-TqqofwziwF80sUSWnjUp4P8ngSKRgQFdREpXHonVp8xoCs4YowGaRY6yVjgWnEQyATTqetOYV9Kc4Vqx-Wbsn0ak9NLvX4HtcS8Md1gPUaKq0-jkEBJ8msmUt137bJttA-wyLUAg0OZ-vvZYumByHxIKY0e9RN5C7BtcJg"
    ],
    badges: ["Limited", "Seasonal"],
    tags: ["seasonal"],
    featured: true,
    isAvailable: true,
    options: [
      { label: "Cranberry Cheese", price: 30000, available: false },
      { label: "Choco Lava", price: 30000, available: false },
      { label: "Dubai Choco Bread", price: 55000, available: false },
      { label: "Shokupan Original Full", price: 80000, available: false },
      { label: "Shokupan Ube Full", price: 85000, available: false },
      { label: "Shokupan Ube Cheese Full", price: 140000, available: false },
      { label: "Granola Almond Butter 100g", price: 75000, available: true, stockLabel: "2 left" },
      { label: "Granola Almond Butter 300g", price: 200000, available: true, stockLabel: "1 left" }
    ]
  },
  {
    id: "prd_granola_almond_butter",
    slug: "granola-almond-butter",
    name: "Granola Almond Butter",
    category: "desserts-beverages",
    categoryLabel: "Desserts & Beverages",
    description: "Crunchy granola with almond butter and honey glaze.",
    longDescription:
      "A pantry-friendly snack box that works for breakfast bowls, villa hampers, and coffee pairings.",
    price: 75000,
    images: [
      "https://lh3.googleusercontent.com/aida/ADBb0uiqMjKplwKDjBmcZh-mz7qbv_Mpfp5drqTf7MJZonxAvbtYOgHHHnc09ZSSf8CT81jIdfTHf7u5pup95-eAe-x0FcKKveE1A1b4TyEecJnurH9-gqngElGfdnJwBc_WOSFcM2bdCxEsRX555w5sbo93IcEeGGsVj_91vTVOEHA1s60T2sWYD6KDsdvXXcT115bi9oSxWENt7DgWRG-OJgickK176MRJKa8bLuPyGzZofp_IfXf1UtRfXdg"
    ],
    badges: ["New"],
    tags: ["featured"],
    isAvailable: true,
    options: [
      { label: "100g Jar", price: 75000, available: true, stockLabel: "2 left" },
      { label: "300g Jar", price: 200000, available: true, stockLabel: "1 left" }
    ]
  },
  {
    id: "prd_dubai_choco_bread",
    slug: "dubai-choco-bread",
    name: "Dubai Choco Bread",
    category: "pastries",
    categoryLabel: "Pastries",
    description: "Chocolate bread with rich filling and premium finish.",
    longDescription:
      "A special chocolate loaf with a dense, glossy crumb. Designed as a treat for gifting or indulgent late-night orders.",
    price: 55000,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCx1q2V-np5JCciuhH6pkywu_8-nkUslVzCdGK6bGoSzlF56plZcUpddvAe9MhtwYfXcBYuBW653ArQZnWQlk7ApSu7UvHLobFLWe6TG_NVCpAsQc29PF_8Uc4RoMJagDqW14XhgIjS9fBYSHNuCogHLf3PHvIjnfZBwfPF6Tp-fcdz1O5opcWiBTB5TGHX9rUVAM3d1cT2NeQaP_sN1L5W4Rd0gwqXHCXAvkNpE4fFxUPGnDzq2JWsT7v3QIiqhrrXYBnWMbgKIvhz"
    ],
    badges: ["Featured"],
    tags: ["featured"],
    isAvailable: true,
    options: [
      { label: "Single Loaf", price: 55000, available: true, stockLabel: "3 left" },
      { label: "Box of 4", price: 200000, available: true, stockLabel: "1 left" },
      { label: "Gift Box", price: 240000, available: false }
    ]
  },
  {
    id: "prd_chocolate_shokupan",
    slug: "chocolate-shokupan",
    name: "Chocolate Shokupan",
    category: "pastries",
    categoryLabel: "Pastries",
    description: "Rich chocolate loaf available in multiple sizes.",
    longDescription:
      "A cocoa-infused loaf with a deeper flavour profile. Best for gifting or indulgent weekend breakfasts.",
    price: 85000,
    images: [
      "https://lh3.googleusercontent.com/aida/ADBb0uiN2aqR1Rvy0K9gCJl6tirT0ICiIuK9S2AWERw7t63vxex6FXRGqilT0XzgANfyr9pErfXVuc9OcyOwKK8hJHXjidB9QULcMLBB4rrVxGk9EmRB0UAdQswQmaVXMd4vcW63gXVmKw37m7ojQtvMDB84DwS_q3c1rzuWb-TyOZolrQzGGrF6hr2jOpFNTSrqu_syRFslsFYhI2Y1PpqKXkeJqSh1fmjcPy4t9nc7jGxHrA3UA__Zvq7qxaY"
    ],
    badges: ["From"],
    tags: ["featured"],
    isAvailable: true,
    sizes: [
      { label: "Mini", price: 85000 },
      { label: "Large", price: 120000 }
    ],
    options: [
      { label: "Mini", price: 85000, available: true, stockLabel: "5 left" },
      { label: "Large", price: 120000, available: true, stockLabel: "2 left" },
      { label: "Party Box", price: 220000, available: false }
    ]
  },
  {
    id: "prd_custom_cake",
    slug: "custom-celebration-cake",
    name: "Custom Celebration Cake",
    category: "cakes",
    categoryLabel: "Cakes",
    description: "Custom tiered cake with frosting colour and message options.",
    longDescription:
      "Designed for birthdays, villa surprises, and intimate events. Final pricing depends on size, flavour, and decorative complexity.",
    price: 450000,
    images: [
      "https://lh3.googleusercontent.com/aida/ADBb0uhzFTrY3fuUNXTBE6J8diBf7pKSpuzK1ZpnwsQiDqDVkvb-WzwbO0hLecfw0LtYM7c6ao2brnHeuMpOlcEYvsGWnXechBMgPU3nJhHqf4DEULfRNQ0gau07ke_hWWhU-BfFQYwqBJUHakyoP0VKAWji_QcDgQy6e0rPX-T8MugGmoI7gAee71xN2QD_ZX0UPx990EyzijxNN_igMZg5sZ6tyzaZ-nWh82flQlQy4Ao8QDLwpf8e9gnNfTfG"
    ],
    badges: ["Custom", "Lead time 3 days"],
    tags: ["seasonal"],
    isAvailable: true,
    leadTimeDays: 3,
    sizes: [
      { label: "6 inch", price: 450000 },
      { label: "8 inch", price: 650000 },
      { label: "2 tiers", price: 1200000 }
    ],
    allergens: ["Gluten", "Milk", "Egg"],
    ingredients: ["Buttercream", "Vanilla sponge", "Fresh cream"],
    customCake: true
  }
];

export const featuredProducts = products.filter((product) => product.featured);

export const testimonials = [
  {
    name: "Ayu",
    role: "Villa host",
    rating: 5,
    text: "Order pagi untuk tamu villa, pickup siang, semuanya rapi dan cepat."
  },
  {
    name: "Lena",
    role: "Frequent customer",
    rating: 5,
    text: "Produk featured-nya selalu bikin penasaran. Website ini harus terasa semudah chat WA."
  },
  {
    name: "Daniel",
    role: "Traveller",
    rating: 5,
    text: "Easy to browse, easy to pre-order, and the bread quality is excellent."
  }
];

export const promoBanner = {
  title: "Seasonal Breakfast Drop",
  caption: "Free local pickup before 10:00 for selected pastry bundles this week.",
  link: "/"
};

export function formatPrice(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product) {
  return products
    .filter((entry) => entry.category === product.category && entry.id !== product.id)
    .slice(0, 3);
}
