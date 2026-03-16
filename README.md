Gasing Academy Sidebar Component

Komponen Sidebar kustom untuk platform Gasing Academy yang dirancang menggunakan pendekatan modular. Sidebar ini mendukung navigasi bertingkat, indikator status (badge), dan profil pengguna di bagian bawah.
🎨 Tampilan Visual

Sidebar ini menggunakan skema warna soft gray dengan aksen biru terang pada status aktif, memberikan kesan edukatif dan ramah pengguna.
✨ Fitur Utama

    Navigation Groups: Pengelompokan menu berdasarkan kategori (Komunitas, Materi Gasing, dll).

    Collapsible Menus: Menu dropdown untuk kategori dengan banyak sub-item.

    Active State Indicators: Penanda visual (bar biru di sisi kiri) untuk menu yang sedang diakses.

    Status Badges: Indikator titik biru untuk memberitahu pengguna adanya aktivitas baru pada menu tertentu (misal: Forum atau Challenge).

    User Profile Section: Area profil di bagian bawah dengan menu dropdown untuk pengaturan akun.

🛠️ Struktur Komponen

Komponen ini dibagi menjadi beberapa bagian utama:
Bagian Deskripsi
Header Logo GC dan tombol toggle sidebar.
Main Nav Menu utama seperti 'Home' dan 'Gasing Academy News'.
Group Nav Menu dengan sub-kategori (menggunakan chevron icon).
Footer Informasi profil pengguna (Nama & Avatar).
🚀 Cara Penggunaan

1. Instalasi

Pastikan Anda memiliki library ikon yang sesuai (seperti Lucide React atau FontAwesome) terpasang di project Anda. 2. Struktur Data (JSON)

Gunakan format berikut untuk mengisi item navigasi:
JSON

{
"title": "Komunitas",
"icon": "UsersIcon",
"isExpandable": true,
"children": [
{ "name": "Forum", "hasUpdate": true },
{ "name": "Challenge", "hasUpdate": true },
{ "name": "All Members", "hasUpdate": false }
]
}

3. Implementasi CSS

Sidebar ini menggunakan variabel warna berikut untuk konsistensi:

    Background: #F8F9FA

    Active Highlight: #2B59FF (Gasing Blue)

    Text Primary: #333333

    Text Muted: #6C757D

📂 Lokasi File
Plaintext

src/
└── components/
└── layout/
├── Sidebar/
│ ├── Sidebar.tsx # Komponen Utama
│ ├── SidebarItem.tsx # Sub-komponen baris menu
│ └── Sidebar.module.css # Styling spesifik sidebar

    Catatan: Pastikan ikon yang digunakan memiliki ukuran standar 20x20px agar tetap sejajar dengan teks menu.
