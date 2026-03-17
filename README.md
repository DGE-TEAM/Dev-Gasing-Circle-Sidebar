# DGE-GC Sidebar — Merged

Theme component Discourse kustom untuk **Gasing Community**.  
Merupakan hasil merger dari dua versi sebelumnya:
- `DGE-GC Sidebar` (File 1) — struktur awal dengan multi-initializer
- `SideBar-Plugin-Custom` (File 2) — arsitektur lebih bersih dengan Glimmer component

---

## Fitur

- Sidebar kustom berdiri sendiri (tidak bergantung pada sidebar bawaan Discourse)
- Collapsible: klik tombol chevron untuk collapse/expand
- Sub-menu dropdown dengan animasi slide
- Avatar user real dari Discourse `currentUser` service
- Mobile responsive — pada layar ≤768px sidebar jadi overlay
- Logo menggunakan gambar (`gc-logo.jpeg`) dengan fallback teks "GC"

---

## Struktur File

```
DGE-GC-Sidebar-Merged/
├── about.json
├── assets/
│   └── gc-logo.jpeg                          ← logo GC (upload ke Discourse)
├── common/
│   └── common.scss                           ← semua CSS sidebar
└── javascripts/discourse/
    ├── components/
    │   ├── gasing-sidebar.js                 ← logika komponen (Glimmer)
    │   └── gasing-sidebar.hbs                ← template HTML sidebar
    ├── connectors/below-site-header/
    │   └── gasing-sidebar-connector.hbs      ← mount point ke DOM Discourse
    └── initializers/
        └── gasing-sidebar-init.js            ← integrasi Discourse + collapse sync
```

---

## Cara Install

### Via Discourse Admin UI

1. Buka **Admin → Customize → Themes**
2. Klik **Install → From a zip file**
3. Upload file `DGE-GC-Sidebar-Merged.zip`
4. Aktifkan theme component dan assign ke theme utama

### Via Git (direkomendasikan untuk produksi)

1. Buka **Admin → Customize → Themes → Install → From a git repository**
2. Masukkan URL repository

---

## Cara Upload Logo

Setelah theme terpasang:

1. Masuk ke **Admin → Customize → Themes → DGE-GC Sidebar Merged**
2. Klik tab **"Upload"** atau **"Assets"**
3. Upload `gc-logo.jpeg`
4. Salin URL yang diberikan Discourse (contoh: `/uploads/default/original/1X/abc.jpeg`)
5. Buka `javascripts/discourse/components/gasing-sidebar.js`
6. Ubah baris berikut:
   ```js
   const GC_LOGO_URL = ""; // ← isi URL logo di sini
   ```

---

## Cara Ubah Menu Navigasi

Edit konstanta `NAV_ITEMS` di dalam `gasing-sidebar.js`:

```js
const NAV_ITEMS = [
  {
    id: "home",          // ID unik (jangan duplikat)
    label: "Home",       // Teks yang tampil di sidebar
    href: "/",           // URL tujuan
    icon: `<svg .../>`,  // SVG icon (isi dari heroicons.com misalnya)
  },
  {
    id: "komunitas",
    label: "Komunitas",
    href: "/c/general",
    icon: `<svg .../>`,
    children: [          // Tambahkan "children" untuk membuat sub-menu
      { id: "forum", label: "Forum", href: "/c/general/forum", dot: true },
      // dot: true → tampilkan indikator titik biru di kanan label
    ],
  },
];
```

---

## Cara Ubah Tampilan (CSS Variables)

Edit bagian `:root { ... }` di `common/common.scss`:

```scss
:root {
  --gs-width: 220px;              /* lebar sidebar saat expand */
  --gs-width-collapsed: 64px;     /* lebar sidebar saat collapse */
  --gs-blue: #2b59ff;             /* warna utama brand GC */
  --gs-bg: #ffffff;               /* background sidebar */
  --gs-border: #e5e7eb;           /* warna border */
  --gs-text: #374151;             /* warna teks utama */
  --gs-text-muted: #6b7280;       /* warna teks sekunder/icon */
  --gs-font: "Nunito", sans-serif; /* font sidebar */
  --gs-shadow: 2px 0 12px rgba(0,0,0,0.06); /* shadow kanan sidebar */
}
```

---

## Minimum Discourse Version

`3.1.0`

---

## Changelog

### Merged version
- Menggabungkan arsitektur File 1 (DGE-GC) dan File 2 (SideBar-Plugin-Custom)
- Menghapus duplikasi initializer (dari 3 file menjadi 1)
- Menambahkan dukungan logo gambar dengan fallback teks
- Menggunakan warna brand `#2b59ff` dari File 1
- Mempertahankan arsitektur Glimmer component dari File 2
- Mempertahankan MutationObserver untuk sync collapse state dari File 2
- Menambahkan komentar di semua file untuk kemudahan maintenance
