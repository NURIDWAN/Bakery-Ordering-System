# Product Requirements Document
# Batter Days Bakehouse — Online Ordering Website
**order.batterdaysbakehouse.com**

**Version:** 1.0  
**Tanggal:** Mei 2026  
**Status:** Draft

---

## 1. Overview

### 1.1 Latar Belakang
Batter Days Bakehouse adalah bakery & cafe yang berlokasi di kawasan Waterfront, Labuan Bajo, Nusa Tenggara Timur. Bisnis ini menyajikan kue custom, pastri, dessert, dan minuman dengan bahan-bahan lokal berkualitas. Saat ini pemesanan dilakukan melalui WhatsApp, yang membatasi skalabilitas dan pengalaman pengguna.

Website `order.batterdaysbakehouse.com` dibuat sebagai platform ordering mandiri yang memungkinkan pelanggan memesan produk secara self-service dengan pengalaman belanja yang mulus.

### 1.2 Tujuan Produk
- Menggantikan alur pemesanan WhatsApp dengan sistem ordering online yang terstruktur
- Meningkatkan konversi pelanggan dengan UX yang intuitif dan visual yang menggugah selera
- Mendukung tiga jenis fulfillment: local delivery, pick-up di kafe, dan catering/events
- Menyediakan dashboard admin untuk manajemen menu, pesanan, dan inventori
- Mendukung pemesanan kue custom dengan opsi personalisasi

### 1.3 Target Pengguna
| Segmen | Deskripsi |
|---|---|
| Wisatawan Lokal & Mancanegara | Pengunjung Labuan Bajo yang mencari bakery premium |
| Warga Lokal | Pelanggan reguler untuk kebutuhan harian & pesanan khusus |
| Event Organizer | Pemesanan dalam jumlah besar untuk event, wedding, corporate |
| Pemilik Penginapan/Villa | Bulk order untuk tamu, island hopping packages |

---

## 2. Tech Stack

### 2.1 Frontend
| Layer | Teknologi | Alasan |
|---|---|---|
| Framework | **Next.js 14** (App Router) | SSR/SSG untuk SEO, performa optimal, routing berbasis file system |
| Language | **TypeScript** | Type safety, maintainability |
| Styling | **Tailwind CSS** | Utility-first, cepat untuk styling konsisten |
| UI Components | **shadcn/ui** | Komponen accessible, customizable |
| State Management | **Zustand** | Ringan, untuk cart & session state |
| Data Fetching | **TanStack Query (React Query)** | Caching, background refetch, optimistic updates |
| Forms | **React Hook Form + Zod** | Validasi schema-based, performa tinggi |
| Animasi | **Framer Motion** | Transisi halus, micro-interactions |
| Image Optimization | **Next.js Image** (built-in) | Lazy loading, WebP, responsive |

### 2.2 Backend
| Layer | Teknologi | Alasan |
|---|---|---|
| Runtime | **Node.js** | Familiar, ekosistem besar |
| Framework | **Fastify** | Lebih cepat dari Express, schema validation built-in |
| Language | **TypeScript** | Konsisten dengan frontend |
| ORM | **Prisma** | Type-safe database access, migration tool |
| Database | **PostgreSQL** | Relasional, robust untuk data transaksi |
| Auth | **NextAuth.js v5** | Terintegrasi dengan Next.js, support OAuth & credential |
| File Storage | **Cloudflare R2** | Murah, S3-compatible, untuk foto produk & bukti pembayaran |
| Cache | **Redis (Upstash)** | Session, rate limiting, cart persistence |
| Payment | **Midtrans** | Payment gateway Indonesia, support QRIS, transfer bank, e-wallet |
| Notifications | **Fonnte / WhatsApp Business API** | Notifikasi order via WA ke customer & admin |
| Email | **Resend** | Transactional email (order confirmation, receipt) |

### 2.3 Infrastructure & DevOps
| Layer | Teknologi |
|---|---|
| Hosting Frontend | **Vercel** |
| Hosting Backend | **Railway** atau **Fly.io** |
| Database Hosting | **Supabase** (managed PostgreSQL) |
| CDN | **Cloudflare** |
| CI/CD | **GitHub Actions** |
| Monitoring | **Sentry** (error tracking) |
| Analytics | **Vercel Analytics** + **PostHog** |

---

## 3. Fitur & Halaman

### 3.1 Halaman Publik (Customer-Facing)

#### 3.1.1 Halaman Beranda (`/`)
**Tujuan:** First impression, highlight produk unggulan, CTA ke order

**Elemen:**
- Hero section dengan foto produk full-screen + CTA "Order Now"
- Highlight 4-6 produk unggulan (carousel/grid)
- Shortcut kategori: Cakes, Savory, Pastries, Desserts & Beverages
- Banner promosi / seasonal (editable dari admin)
- Testimoni pelanggan (rating + foto)
- Section "How to Order" (3 langkah: pilih → checkout → terima)
- Info pickup & delivery area
- CTA WhatsApp untuk custom order

**Behavior:**
- SSG dengan ISR (Incremental Static Regeneration) tiap 1 jam
- Produk featured ditentukan oleh admin

---

#### 3.1.2 Halaman Menu / Katalog (`/menu`)
**Tujuan:** Browse semua produk, filter & search

**Elemen:**
- Filter sidebar/chips: kategori, tag (bestseller, seasonal, vegan-friendly)
- Search bar dengan debounce
- Product grid (2 kolom mobile, 3-4 kolom desktop)
- Setiap product card: foto, nama, harga, badge (sold out, bestseller, seasonal)
- Quick add to cart (tanpa navigasi ke detail)
- Infinite scroll atau pagination

**Behavior:**
- SSR untuk first load agar dapat di-index Google
- Filter menggunakan query params (`?category=cakes&tag=bestseller`)
- Produk "Sold Out" tetap tampil tapi non-interaktif

---

#### 3.1.3 Halaman Detail Produk (`/menu/[slug]`)
**Tujuan:** Informasi lengkap produk, customization, add to cart

**Elemen:**
- Galeri foto produk (swipeable di mobile)
- Nama, deskripsi, harga, badge
- Opsi ukuran (jika ada: Small, Medium, Large)
- Catatan khusus (freetext) untuk custom request
- Jumlah (quantity picker)
- CTA "Add to Cart"
- Info allergen / ingredients (jika tersedia)
- Produk terkait (related products dalam kategori sama)
- Review section (jika diaktifkan)

**Behavior khusus untuk Custom Cakes:**
- Form tambahan: pilih ukuran tier, warna frosting, tulisan di kue
- Upload referensi foto desain (opsional)
- Minimum order lead time: 3 hari
- Harga berbeda per konfigurasi

---

#### 3.1.4 Halaman Keranjang (`/cart`)
**Tujuan:** Review pesanan sebelum checkout

**Elemen:**
- List item: foto thumbnail, nama, custom notes, qty, subtotal
- Edit quantity inline, hapus item
- Order notes (untuk seluruh pesanan)
- Fulfillment selector: Delivery / Pick Up / Catering
- Order summary: subtotal, ongkos kirim, total
- CTA "Proceed to Checkout"
- Persist cart ke localStorage + server-side (untuk user login)

---

#### 3.1.5 Halaman Checkout (`/checkout`)
**Tujuan:** Pengisian data pemesan, fulfillment, dan pembayaran

**Step 1 — Info Pemesan:**
- Nama lengkap
- Nomor WhatsApp (wajib, untuk notifikasi)
- Email (opsional)

**Step 2 — Fulfillment:**
- **Delivery:** alamat tujuan (terbatas area Labuan Bajo), tanggal & waktu pengiriman
- **Pick Up:** tanggal & jam pickup di kafe
- **Catering:** deskripsi event, tanggal, lokasi → masuk ke "request quote" flow

**Step 3 — Pembayaran:**
- Pilihan metode via Midtrans: QRIS, Transfer Bank (BCA, Mandiri, BNI), GoPay, OVO, Dana
- Ringkasan order lengkap
- CTA "Bayar Sekarang" → redirect ke Midtrans payment page
- Atau "Bayar via WhatsApp" untuk order custom / bulk

**Behavior:**
- Guest checkout diizinkan (tanpa login)
- Validasi alamat delivery dalam radius operasional
- Untuk custom cake dengan lead time < 3 hari → tampilkan warning

---

#### 3.1.6 Halaman Konfirmasi Order (`/order/confirmation/[orderId]`)
**Elemen:**
- Order ID + status
- Ringkasan pesanan
- Estimasi waktu (delivery/pickup)
- Instruksi selanjutnya (cek WA untuk update)
- Tombol "Lihat Status Pesanan"
- Share ke WA / Instagram Stories (untuk testimoni)

---

#### 3.1.7 Halaman Tracking Pesanan (`/order/[orderId]`)
**Elemen:**
- Status pesanan (timeline): Received → Confirmed → In Preparation → Ready → Delivered/Picked Up
- Detail order (ringkasan item)
- Nomor WA admin untuk pertanyaan

---

#### 3.1.8 Halaman Gifting & Events (`/gifting`)
**Tujuan:** Landing page untuk pesanan hamper, wedding cake, catering

**Elemen:**
- Hero visual wedding/event
- Gallery portofolio event sebelumnya
- Paket yang tersedia (Hamper, Wedding Cake, Catering)
- Form "Request a Quote": nama, tipe event, tanggal, estimasi tamu, budget, pesan
- Testimoni klien event

---

#### 3.1.9 Halaman About (`/about`)
- Story brand Batter Days
- Tim/founders
- Lokasi kafe (embed Google Maps)
- Jam operasional
- Instagram feed

---

### 3.2 Halaman Auth

#### 3.2.1 Login (`/login`)
- Login dengan email + password
- Login dengan Google OAuth
- Link ke halaman register

#### 3.2.2 Register (`/register`)
- Nama, email, password, nomor WA
- Verifikasi email (magic link via Resend)

#### 3.2.3 Profil Pelanggan (`/account`)
- Riwayat pesanan
- Edit profil & kontak
- Repeat order dari pesanan sebelumnya
- Saved addresses (untuk delivery)

---

### 3.3 Admin Dashboard (`/admin`)

> Diakses hanya oleh role `admin` dan `staff`. Terpisah dari halaman publik, bisa dihosting sebagai Next.js route group `(admin)`.

#### 3.3.1 Dashboard Overview
- Total pendapatan hari ini / minggu ini / bulan ini
- Jumlah pesanan (per status)
- Produk terlaris
- Alert: stok hampir habis, pesanan yang belum dikonfirmasi

#### 3.3.2 Manajemen Pesanan (`/admin/orders`)
- Tabel semua pesanan dengan filter status, tanggal, fulfillment type
- Ubah status pesanan (Received → Confirmed → dst.)
- Detail pesanan: item, customer info, notes, bukti pembayaran
- Cetak struk / nota (PDF)
- Export CSV

#### 3.3.3 Manajemen Menu (`/admin/products`)
- CRUD produk: nama, deskripsi, foto (upload ke R2), harga, kategori, tags
- Atur ketersediaan (active/inactive/sold out)
- Atur produk "featured" untuk halaman beranda
- Kelola kategori dan tags
- Manajemen opsi customization (untuk custom cake)

#### 3.3.4 Manajemen Kategori (`/admin/categories`)
- CRUD kategori (Cakes, Savory, Pastries, Desserts & Beverages)
- Urutan tampil

#### 3.3.5 Manajemen Promo & Banner (`/admin/promotions`)
- Buat banner beranda (gambar, link, periode aktif)
- Buat diskon / voucher (persen atau nominal, min. pembelian, periode)

#### 3.3.6 Pengaturan Toko (`/admin/settings`)
- Jam operasional
- Area delivery yang dilayani
- Biaya ongkos kirim per zona
- Pesan konfirmasi WA (template)
- Integrasi Midtrans (API key)

---

## 4. Data Model (Prisma Schema Overview)

```
User            → id, name, email, phone, role (customer/admin/staff), addresses[]
Product         → id, slug, name, description, price, images[], category, tags[], isAvailable, isFeatured, customOptions?
Category        → id, name, slug, order
Order           → id, userId?, customerInfo, items[], fulfillment, status, payment, totalAmount, notes
OrderItem       → id, orderId, productId, qty, price, customNotes, customConfig?
Payment         → id, orderId, method, status, midtransToken, paidAt
Address         → id, userId, label, street, note, coordinates?
Promotion       → id, code, type (percent/flat), value, minOrder, validFrom, validTo, isActive
Banner          → id, imageUrl, linkUrl, title, isActive, order
Quote           → id, name, phone, eventType, eventDate, guestCount, budget, message, status
Review          → id, orderId, productId, userId, rating, comment, isApproved
```

---

## 5. API Endpoints (Backend — Fastify)

### Public
| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/products` | List produk (filter, search, pagination) |
| GET | `/api/products/:slug` | Detail produk |
| GET | `/api/categories` | List kategori |
| GET | `/api/banners` | Banner aktif |
| POST | `/api/orders` | Buat pesanan baru |
| GET | `/api/orders/:id` | Status pesanan (by orderId + token) |
| POST | `/api/payment/midtrans/notification` | Webhook notifikasi Midtrans |
| POST | `/api/quotes` | Submit request quote event |
| POST | `/api/auth/register` | Registrasi user |
| POST | `/api/auth/login` | Login |

### Protected (JWT)
| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/account/orders` | Riwayat pesanan user |
| PUT | `/api/account/profile` | Update profil |
| POST | `/api/account/addresses` | Tambah alamat |

### Admin (Role: admin/staff)
| Method | Endpoint | Deskripsi |
|---|---|---|
| GET/POST/PUT/DELETE | `/api/admin/products` | CRUD produk |
| GET/PUT | `/api/admin/orders` | Kelola pesanan |
| GET/POST/PUT/DELETE | `/api/admin/categories` | CRUD kategori |
| GET/POST/PUT/DELETE | `/api/admin/promotions` | Kelola promo |
| GET | `/api/admin/dashboard` | Data overview |
| POST | `/api/admin/upload` | Upload foto ke R2 |

---

## 6. Non-Functional Requirements

### 6.1 Performa
- First Contentful Paint (FCP) < 1.5 detik
- Lighthouse score ≥ 90 (Performance, SEO, Accessibility)
- Image WebP + lazy loading untuk semua gambar produk
- API response time < 300ms untuk endpoint utama

### 6.2 SEO
- SSR/SSG untuk semua halaman publik
- Open Graph tags untuk semua halaman produk & kategori
- Sitemap.xml otomatis (Next.js sitemap)
- Structured data (JSON-LD) untuk produk dan breadcrumb
- URL slug berbasis nama produk

### 6.3 Mobile-First
- Desain responsif untuk semua breakpoint (360px – 1440px)
- Touch-friendly tap targets (min 44x44px)
- Swipe gesture untuk galeri foto produk
- Sticky bottom cart bar di mobile
- Bottom sheet untuk filter di mobile

### 6.4 Keamanan
- HTTPS wajib
- Rate limiting pada endpoint auth dan order
- Input sanitization dan validasi Zod di semua endpoint
- CSRF protection
- Webhook Midtrans diverifikasi dengan signature
- Environment variables tidak expose ke client

### 6.5 Aksesibilitas
- Keyboard navigable
- ARIA labels pada semua interactive element
- Contrast ratio WCAG AA minimum
- Focus indicator visible

---

## 7. Alur Pemesanan (Happy Path)

```
1. Customer buka /menu
2. Browse & pilih produk → klik "Add to Cart"
3. Cek cart di /cart → review items
4. Klik "Checkout" → isi info pemesan
5. Pilih fulfillment (delivery/pickup)
6. Pilih metode pembayaran → redirect ke Midtrans
7. Bayar → Midtrans kirim webhook ke backend
8. Backend update status pesanan → kirim notif WA ke customer
9. Admin terima notif WA → proses pesanan
10. Status update → customer terima notif WA setiap perubahan
11. Order selesai → customer bisa kasih review
```

---

## 8. Alur Custom Cake

```
1. Customer buka /menu/custom-cake
2. Isi form konfigurasi: ukuran, flavor, frosting, tulisan, upload referensi
3. Sistem cek tanggal minimal (T+3 hari)
4. Add to cart → checkout normal
5. Atau klik "Diskusikan via WhatsApp" → redirect WA dengan pre-filled message
6. Admin konfirmasi feasibility & harga → update order
7. Customer bayar DP 50% → proses dimulai
8. Pelunasan saat pickup/delivery
```

---

## 9. Notifikasi

### WhatsApp (via Fonnte)
| Trigger | Penerima | Konten |
|---|---|---|
| Order baru masuk | Admin | Detail pesanan lengkap |
| Order confirmed | Customer | Konfirmasi + estimasi waktu |
| Order in preparation | Customer | "Pesananmu sedang dibuat 🍰" |
| Order ready | Customer | "Pesananmu siap diambil / dalam perjalanan!" |
| Order delivered | Customer | "Terima kasih! Mau kasih review?" |
| Payment failed | Customer | "Pembayaran gagal, coba lagi" |

### Email (via Resend)
- Order confirmation (summary + invoice PDF)
- Akun berhasil dibuat
- Reset password

---

## 10. Fase Development

### Fase 1 — MVP (8 minggu)
- [ ] Setup project Next.js + Fastify + PostgreSQL
- [ ] Halaman beranda, menu, detail produk
- [ ] Cart & checkout (guest)
- [ ] Integrasi Midtrans
- [ ] Notifikasi WA basic
- [ ] Admin: manajemen produk & kelola pesanan
- [ ] Deploy ke Vercel + Railway

### Fase 2 — Enhancement (4 minggu)
- [ ] Auth pelanggan (register/login/profil)
- [ ] Halaman tracking pesanan
- [ ] Custom cake form lengkap
- [ ] Sistem promo & voucher
- [ ] Review produk
- [ ] Admin dashboard analytics

### Fase 3 — Scaling (ongoing)
- [ ] Multiple bahasa (ID/EN)
- [ ] Loyalty points program
- [ ] Push notification (PWA)
- [ ] Integrasi POS untuk manajemen stok real-time
- [ ] App mobile (React Native)

---

## 11. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Koneksi internet tidak stabil di Labuan Bajo | Checkout gagal di tengah jalan | Simpan cart di localStorage, handle network error gracefully dengan retry |
| Penipuan / fake order | Rugi bahan baku | Verifikasi nomor WA saat checkout, DP wajib untuk custom order |
| Perubahan menu mendadak | Customer kecewa | Admin bisa instant toggle "sold out" per produk |
| Midtrans downtime | Tidak bisa bayar | Fallback ke "bayar via WA / COD pickup" |
| Skalabilitas saat promo viral | Server down | Vercel + Railway auto-scale, Redis rate limiting |

---

## 12. Definisi Selesai (Definition of Done)

Sebuah fitur dianggap selesai ketika:
- Fungsional sesuai spesifikasi di atas
- Lulus unit test (coverage ≥ 70%)
- Lulus E2E test untuk happy path (Playwright)
- Responsive di mobile (360px) dan desktop (1440px)
- Lighthouse score ≥ 90
- Tidak ada console error di production
- Dokumentasi API di-update (Swagger/OpenAPI)
- Di-review oleh minimal 1 developer lain

---

*Dokumen ini akan diperbarui seiring perkembangan produk. Hubungi tim untuk pertanyaan lebih lanjut.*
