import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useEffect } from 'react'

const promoItems = [
  {
    title: 'Warranty',
    highlight: '6 Tahun / 150.000 Km',
    description: 'Perlindungan menyeluruh untuk kendaraan BYD Anda agar tetap terlindungi lebih lama.'
  },
  {
    title: '0% Financing',
    highlight: 'Cicilan bunga 0%',
    description: 'Dapatkan promo pembiayaan spesial dengan bunga 0% untuk tenor pilihan Anda.'
  },
  {
    title: 'Maintenance Packages',
    highlight: 'Free 4 Tahun Service / 60.000 Km',
    description: 'Perawatan gratis mencakup labor & parts sehingga kepemilikan makin tenang.'
  },
  {
    title: 'Free Test Drives',
    highlight: 'Untuk semua tipe BYD',
    description: 'Nikmati test drive gratis untuk merasakan langsung teknologi BYD terbaru.'
  },
  {
    title: 'Spare Parts',
    highlight: 'Suku cadang asli BYD',
    description: 'Komponen resmi yang telah teruji dan berkualitas tinggi untuk menjaga performa.'
  },
  {
    title: 'Buy, Sell, Trade',
    highlight: 'Tukar tambah mobil lama',
    description: 'Kami menerima trade-in kendaraan lama Anda untuk memudahkan upgrade ke BYD.'
  }
]

function PromoPrograms() {

  // OTOMATIS SCROLL KE ATAS
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    })
  }, [])

  const waMessage = encodeURIComponent(
    "Halo, saya ingin tahu informasi lebih lanjut tentang program promo terbaik BYD."
  )

  const waURL = `https://wa.me/62811668722?text=${waMessage}`

  return (
    <div className="min-h-screen bg-[#030308] text-white">
      <Navbar />
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#04050c] to-[#030308]" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,rgba(57,182,255,0.3),transparent_55%)]" />

        <section className="relative z-10 pt-28 pb-16 px-4 md:px-8 lg:px-16">

          <div className="max-w-5xl mx-auto text-center mb-16">
            <p className="text-base uppercase tracking-[0.4em] text-[#ecad29] mb-4">Program Khusus</p>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white">
              Miliki Mobil BYD dengan Program Terbaik
            </h1>

            <p className="text-gray-300 text-lg md:text-xl font-light">
              Promo eksklusif BYD Cirebon sesuai informasi resmi program yang sedang berjalan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {promoItems.map(item => (
              <div
                key={item.title}
                className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_25px_50px_rgba(0,0,0,0.45)] hover:border-[#ecad29]/80 transition-all duration-300"
              >
                <p className="text-base tracking-wide font-semibold text-[#ecad29] mb-3">{item.title}</p>
                <h3 className="text-2xl font-bold text-white mb-4">{item.highlight}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6">

            <div className="text-gray-300 text-base font-light">
              Ingin informasi lebih detail? Tim BYD Cirebon siap membantu Anda merencanakan pembelian.
            </div>

            <div className="flex flex-wrap gap-4">

              <a
                href={waURL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#b8862a] to-[#ecad29] text-black font-semibold shadow-lg shadow-[#ecad29]/20 hover:shadow-[#b8862a]/40 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Hubungi Kami
              </a>

              <Link
                to="/"
                className="px-6 py-3 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>

        </section>
      </main>

      <div className="footer-gradient-line"></div>
      <Footer />
    </div>
  )
}

export default PromoPrograms
