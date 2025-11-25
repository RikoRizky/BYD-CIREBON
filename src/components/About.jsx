import { useState } from 'react'
import { Link } from 'react-router-dom'

const stats = [
  {
    value: '7',
    label: 'Model Tersedia',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ecad29]">
        <path
          d="M4 7h16l2 5v7h-2v-2H4v2H2v-7l2-5Zm3 5v4m10-4v4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    value: '100%',
    label: 'Listrik',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ecad29]">
        <path
          d="M13 2 6 14h5v8l7-12h-5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    value: '24/7',
    label: 'Support',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ecad29]">
        <path
          d="M7 8V5a5 5 0 0 1 10 0v3m3 4v5a3 3 0 0 1-3 3h-3l-2 2-2-2H7a3 3 0 0 1-3-3v-5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    value: '2025',
    label: 'Terbaru',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ecad29]">
        <path
          d="M7 3v4M17 3v4M4 9h16v11H4V9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
]


// const experienceHighlights = [
//   {
//     title: 'Konsultasi Premium BYD Advisor',
//     description: 'Sesi satu-satu untuk menentukan konfigurasi dan paket kepemilikan terbaik'
//   },
//   {
//     title: 'Pendampingan Test Drive Eksklusif',
//     description: 'Tim onsite menyiapkan rute, fitur, dan simulasi kendaraan sesuai kebutuhan Anda'
//   },
//   {
//     title: 'Program Perawatan Terpadu',
//     description: 'Layanan berkala, body repair, hingga ketersediaan suku cadang resmi BYD'
//   },
// ]

const highlightCards = [
  {
    title: 'Jangkauan 400km+',
    subtitle: 'Efisiensi tinggi setiap perjalanan',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#58c2ff]">
        <path
          d="M12 3v4m0 10v4m9-9h-4M7 12H3m12.9-5.9-2.8 2.8m-3.4 3.4-2.8 2.8m11 0-2.8-2.8m-3.4-3.4-2.8-2.8"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    title: 'Fast Charging 30 min',
    subtitle: 'Pengisian cepat DC',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#ecad29]">
        <path
          d="m13 2-6 11h6l-2 9 8-13h-6l2-7Z"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    title: 'Keamanan Terpadu',
    subtitle: 'Fitur ADAS generasi terbaru',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#7df0d5]">
        <path
          d="M12 3s4 3 8 3c0 7-3.5 11.5-8 13-4.5-1.5-8-6-8-13 4 0 8-3 8-3Z"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </svg>
    )
  }
]

function About() {
  const [previewImage, setPreviewImage] = useState(null)

  return (
    <section
      id="about"
      className="section-about relative overflow-hidden bg-[#04050c] text-white"
    >
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 cursor-zoom-out"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-5xl w-full mt-12 md:mt-16" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute -top-3 -right-3 z-10 rounded-full bg-black/70 text-white p-2 hover:bg-black transition"
              aria-label="Close preview"
            >
              X
            </button>
            <img
              src={previewImage}
              alt="Preview company profile"
              className="w-full max-h-[70vh] md:max-h-[70vh] object-contain rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      )}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_15%_20%,rgba(236,173,41,0.5),transparent_45%)]"></div>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_-10%,rgba(86,129,255,0.4),transparent_35%)]"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute left-1/3 top-12 w-px h-64 bg-gradient-to-b from-white/20 to-transparent rotate-[22deg] origin-top"></div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1.05fr_1fr] items-start">
          <div className="relative order-2 lg:order-1 flex flex-col items-center lg:items-start lg:self-center">
            <div className="absolute -top-12 -left-12 hidden lg:block">
              <div className="w-24 h-24 rounded-[32px] border border-white/10 backdrop-blur-sm" />
            </div>
            <div className="absolute -bottom-16 -right-6 hidden lg:block">
              <div className="w-16 h-16 border border-white/10 rounded-full" />
            </div>

            <div className="mb-6 max-w-md">
              <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 shadow-lg shadow-black/40 hover:border-[#ecad29]/70 hover:shadow-[0_25px_55px_rgba(236,173,41,0.35)] transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/50 border border-white/10">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#ecad29]">
                      <path
                          d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.25-2.25a.998.998 0 0 1 1.01-.25c1.07.35 2.19.56 3.33.64a1 1 0 0 1 1 .99V20a1 1 0 0 1-1 1C10.59 21 3 13.41 3 4a1 1 0 0 1 1-1h3.49a1 1 0 0 1 .99 1c.08 1.14.29 2.26.64 3.33a.998.998 0 0 1-.25 1.01l-2.25 2.25z"
                          fill="currentColor"
                          opacity="0.2"
                      />
                      <path
                          d="M7 10.79a15.053 15.053 0 0 0 6.59 6.59l2.25-2.25c.29-.29.62-.42 1.01-.25a12.003 12.003 0 0 1 3.33.64V20c-7.59 0-14-6.41-14-14V4h3.49c.39 0 .72.13 1.01.25l2.25 2.25z"
                          stroke="#ecad29"
                          strokeWidth="1.2"
                          fill="none"
                      />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-semibold tracking-wide">+62 811-668-722</p>
                  <p className="text-sm text-gray-300">Buka: Senin - Jumat, 08.00 - 20.00 WIB</p>
                  <p className="text-sm text-gray-300">Buka: Sabtu, 08.30 - 15.00 WIB</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-[32px] p-1 border border-white/5 bg-transparent shadow-2xl">
              <div className="grid gap-5 md:grid-cols-2 rounded-[28px]">
                <button
                  type="button"
                  onClick={() => setPreviewImage('/images/companyprofile1.jpg')}
                  className="relative rounded-[28px] overflow-hidden border border-white/15 shadow-[0_25px_45px_rgba(0,0,0,0.45)] transform md:-rotate-2 transition hover:-translate-y-1 hover:border-[#ecad29]/60 focus:outline-none focus:ring-2 focus:ring-[#39b6ff]/60 cursor-zoom-in bg-transparent"
                  aria-label="Perbesar Company Profile 1"
                >
                  <img
                    src="/images/companyprofile1.jpg"
                    alt="Company Profile 1"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/about.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/35" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewImage('/images/companyprofile2.jpg')}
                  className="relative rounded-[28px] overflow-hidden border border-white/15 shadow-[0_25px_45px_rgba(0,0,0,0.45)] transform md:rotate-2 transition hover:-translate-y-1 hover:border-[#ecad29]/60 focus:outline-none focus:ring-2 focus:ring-[#39b6ff]/60 cursor-zoom-in bg-transparent"
                  aria-label="Perbesar Company Profile 2"
                >
                  <img
                    src="/images/companyprofile2.jpg"
                    alt="Company Profile 2"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/about.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/35" />
                </button>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-r from-black/60 via-black/30 to-transparent px-6 py-6 shadow-lg shadow-black/30 flex flex-col gap-4 hover:border-[#ecad29]/70 hover:shadow-[0_25px_55px_rgba(236,173,41,0.35)] transition-all duration-300">

  <div>
    <p className="text-sm uppercase tracking-[0.4em] text-[#ecad29] mb-2">
      Informasi Lengkap
    </p>

    <h3 className="text-2xl font-semibold text-white leading-snug">
      Silakan unduh brosur Company Profile untuk info lebih detail
    </h3>
  </div>

  <a
    href="/brochures/HARMONY AUTO ID COMPANY PROFILE Oct 2025_Ver 1.0 (Med Res).pdf"
    download
    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#b8862a] via-[#facc15] to-[#d97706] px-8 py-3 text-[#1a1505] font-semibold border border-[#fef3c7]/50 shadow-[0_12px_30px_rgba(250,204,21,0.3)] hover:shadow-[0_15px_35px_rgba(233,196,106,0.45)] transition-all duration-300"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    Unduh Brosur
  </a>
</div>


            <div className="mt-8 w-full lg:hidden">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-black/60 via-black/30 to-transparent px-6 py-6 shadow-lg shadow-black/30 flex flex-col gap-4 hover:border-[#ecad29]/70 hover:shadow-[0_25px_55px_rgba(236,173,41,0.35)] transition-all duration-300">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-[#ecad29] mb-2">Program Khusus</p>
                  <h3 className="text-2xl font-semibold text-white leading-snug">
                    Promo eksklusif untuk memiliki mobil BYD impian Anda
                  </h3>
                </div>
                <Link
                  to="/promo-program"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#b8862a] via-[#facc15] to-[#d97706] px-6 py-3 text-[#1a1505] font-semibold shadow-[0_12px_30px_rgba(250,204,21,0.25)] hover:shadow-[0_15px_35px_rgba(233,196,106,0.4)] transition-all"
                >
                  Lihat Program Promo
                  <span aria-hidden="true" className="text-xl">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3 w-full max-w-xl lg:max-w-none">
              {highlightCards.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 shadow-lg shadow-black/40 hover:border-[#ecad29]/80 hover:shadow-[0_25px_55px_rgba(236,173,41,0.35)] transition-all duration-300">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="premium-heading text-[42px] sm:text-[50px] leading-tight mb-5">
              Dealer Resmi Mobil BYD Cirebon
            </h2>
            <div className="w-full max-w-32 h-1.5 bg-gradient-to-r from-[#39b6ff] via-[#ecad29] to-transparent mb-6 rounded-full premium-glow" />
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Dealer BYD Harmony Cirebon merupakan dealer resmi mobil listrik BYD di Kota Cirebon. Kami dengan bangga menghadirkan
              kendaraan listrik premium dengan pendekatan layanan personal, memastikan setiap pengalaman test drive
              hingga serah terima terasa eksklusif dan berkesan.
            </p>

            <div className="mb-10 rounded-3xl border border-white/10 bg-gradient-to-r from-black/60 via-black/30 to-transparent px-6 py-6 shadow-lg shadow-black/30 flex flex-col md:flex-row md:items-center md:justify-between gap-5 hidden lg:flex hover:border-[#ecad29]/70 hover:shadow-[0_25px_55px_rgba(236,173,41,0.35)] transition-all duration-300">
              <div>
              <p className="text-sm uppercase tracking-[0.4em] text-[#ecad29] mb-2">Program Khusus</p>
                <h3 className="text-2xl font-semibold text-white">
                  Promo eksklusif untuk memiliki mobil BYD impian Anda
                </h3>
              </div>
              <Link
                to="/promo-program"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#b8862a] via-[#facc15] to-[#d97706] px-8 py-3 text-[#1a1505] font-semibold border border-[#b8862a]/20 shadow-[0_12px_30px_rgba(250,204,21,0.25)] hover:shadow-[0_15px_35px_rgba(233,196,106,0.4)] transition-all duration-300"
              >
                Lihat Program Promo
                <span aria-hidden="true" className="text-xl">
                  &rarr;
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-10">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent px-4 py-5 text-center shadow-lg shadow-black/40 flex flex-col items-center gap-3 hover:border-[#ecad29]/80 hover:shadow-[0_25px_55px_rgba(236,173,41,0.35)] transition-all duration-300"
                >
                  <div className="flex items-center justify-center rounded-2xl bg-black/40 border border-white/10 p-3">
                    {item.icon}
                  </div>
                  <div className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-[#ecad29] via-[#f7d382] to-[#d39412]">
                    {item.value}
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>

            {/* <div className="hidden lg:block mb-10 space-y-6">
              {experienceHighlights.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-gradient-to-r from-black/40 to-black/10 p-5 shadow-lg shadow-black/30 hover:border-[#ecad29]/80 hover:shadow-[0_25px_55px_rgba(236,173,41,0.35)] transition-all duration-300"
            >
                  <p className="text-sm font-semibold tracking-wide text-white">{item.title}</p>
                  <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>

      </div>
    </section>
  )
}

export default About