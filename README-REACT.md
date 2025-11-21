# BYD Cirebon - React Version

Aplikasi website dealer BYD Cirebon yang telah dikonversi dari HTML biasa ke React.

## Instalasi

1. Install dependencies:
```bash
npm install
```

## Menjalankan Aplikasi

Untuk development:
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

Untuk build production:
```bash
npm run build
```

Untuk preview build production:
```bash
npm run preview
```

## Struktur Project

```
logobyd/
├── public/
│   ├── images/          # Semua gambar
│   ├── logobyd.png      # Logo BYD
│   └── bydlogo.png      # Favicon
├── src/
│   ├── components/      # Komponen React
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx      # Komponen hero dengan animasi GSAP
│   │   ├── LoadingScreen.jsx
│   │   ├── Navbar.jsx
│   │   └── PriceList.jsx
│   ├── data/            # Data untuk carousel dan price list
│   │   ├── carouselData.js
│   │   └── priceListData.js
│   ├── App.jsx          # Komponen utama
│   ├── main.jsx         # Entry point
│   └── index.css        # Styling
├── index.html           # HTML entry point
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Fitur

- ✅ Hero section dengan carousel animasi menggunakan GSAP
- ✅ Navigation bar dengan mobile menu
- ✅ About section
- ✅ Price list section dengan kartu produk
- ✅ Features section
- ✅ Contact section dengan form WhatsApp
- ✅ Footer
- ✅ Loading screen
- ✅ Responsive design

## Teknologi yang Digunakan

- React 18
- Vite
- GSAP (untuk animasi)
- Tailwind CSS
- PostCSS & Autoprefixer

## Catatan

- Semua asset (gambar) harus berada di folder `public/`
- File HTML asli disimpan sebagai `index.html.original`
- Semua fungsionalitas dan tampilan tetap sama dengan versi HTML asli

