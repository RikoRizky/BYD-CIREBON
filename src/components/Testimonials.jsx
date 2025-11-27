import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

function Testimonials() {
  const sliderItems = useMemo(
    () => [
      {
        id: 1,
        title: 'Terima Kasih BYD Family',
        message:
          'Telah mempercayai BYD Harmony Cirebon sebagai pilihan mobil listrik anda. Bersama kita melangkah menuju masa depan yang lebih hijau dan berkelanjutan.',
        image: '/testimonials/testimonial1.jpeg',
        badge: 'Mobil Listrik Terbaik',
        imagePosition: 'center'
      },
      {
        id: 2,
        title: 'Thank You',
        message:
          'Thank you for choosing DENZA Harmony Cirebon as your trusted driving companion. #YourTrustedAutoPartner',
        image: '/testimonials/testimonial2.jpeg',
        badge: 'The Best Electric Car',
        imagePosition: 'center'
      },
      {
        id: 3,
        title: 'Terima Kasih BYD Family',
        message:
          'Kami terus berkomitmen menghadirkan pengalaman serah terima yang hangat dan berkesan untuk setiap pelanggan.',
        image: '/testimonials/testimonial3.jpeg',
        badge: 'Pelayanan Memuaskan',
        imagePosition: 'center'
      },
      {
        id: 4,
        title: 'Terima Kasih BYD Family',
        message:
          'Selamat datang di BYD Family! Semoga perjalanan baru ini selalu menyenangkan dan penuh energi positif.',
        image: '/testimonials/testimonial4.jpeg',
        badge: 'Mobil Listrik Masa Depan',
        imagePosition: '50% 35%'
      },
      {
        id: 5,
        title: 'Terima Kasih BYD Family',
        message:
          'Keceriaan pelanggan adalah prioritas kami. Terima kasih telah berbagi momen spesial bersama Harmony Cirebon.',
        image: '/testimonials/testimonial5.jpeg',
        badge: 'Keceriaan Pelanggan',
        imagePosition: 'center'
      }
    ],
    []
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const autoplayRef = useRef(null)
  const totalSlides = sliderItems.length
  const intervalDuration = 7000

  const goToIndex = useCallback(
    (newIndex) => {
      if (totalSlides === 0) return
      const normalizedIndex = (newIndex + totalSlides) % totalSlides
      setActiveIndex(normalizedIndex)
    },
    [totalSlides]
  )

  const handleNext = useCallback(() => {
    goToIndex(activeIndex + 1)
  }, [activeIndex, goToIndex])

  const handlePrev = useCallback(() => {
    goToIndex(activeIndex - 1)
  }, [activeIndex, goToIndex])

  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)

    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides)
    }, intervalDuration)

    return () => clearInterval(autoplayRef.current)
  }, [totalSlides, activeIndex])

  const handleManualNavigate = useCallback(
    (direction) => {
      direction === 'next' ? handleNext() : handlePrev()
    },
    [handleNext, handlePrev]
  )

  const handleDotClick = useCallback(
    (index) => {
      goToIndex(index)
    },
    [goToIndex]
  )

  const activeSlide = sliderItems[activeIndex]

  // ⭐⭐ PREMIUM GOLD STAR COMPONENT
  const Star = () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="#f4c542"
      stroke="#f8e29a"
      strokeWidth="1"
      className="drop-shadow-[0_0_6px_rgba(244,197,66,0.6)]"
    >
      <path d="M12 .587l3.668 7.568L24 9.748l-6 5.848L19.335 24 12 19.897 4.665 24 6 15.596l-6-5.848 8.332-1.593z" />
    </svg>
  )

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#050505] text-white py-20 px-4 sm:px-8 lg:px-12"
    >

      {/* GOLD LIGHT – ATAS KANAN */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_85%_15%,rgba(236,173,41,0.35),transparent_60%)]"></div>

      {/* 🔵 BIRU GELAP ELEGAN – BAWAH KIRI (PERMINTAANMU) */}
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_20%_80%,rgba(20,60,120,0.45),transparent_45%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          {/* <p className="tracking-[0.4em] uppercase text-xs text-gray-400 mb-4">
            Testimoni Pelanggan
          </p> */}
          <h2 className="premium-heading text-[42px] sm:text-[50px] leading-tight mb-4">
            Apa Kata Keluarga BYD
          </h2>
          <div className="w-full max-w-32 h-1.5 bg-gradient-to-r from-[#39b6ff] via-[#ecad29] to-transparent mx-auto mb-6 rounded-full premium-glow" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Satu per satu momen serah terima eksklusif kami tampilkan agar Anda dapat merasakan langsung
            kebahagiaan pelanggan Harmony Cirebon.
          </p>
        </div>

        {/* SLIDER */}
        <div
          aria-live="polite"
          className="relative rounded-[30px] overflow-hidden border border-white/10 bg-gradient-to-r from-white/5 to-transparent shadow-[0_25px_55px_rgba(0,0,0,0.35)]"
        >
          <div className="relative aspect-[16/9] w-full">
            <img
              src={activeSlide?.image}
              alt={activeSlide?.title}
              className="h-full w-full object-cover"
              loading="lazy"
              style={{ objectPosition: activeSlide?.imagePosition || 'center' }}
              onError={(e) => {
                e.currentTarget.src = '/testimonials/testimonial1.jpeg'
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40"></div>

            {/* DESKTOP TEXT */}
            <div className="absolute inset-0 hidden md:flex flex-col justify-end p-6 sm:p-10 lg:p-12 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-white/80">
                <span className="w-2 h-2 rounded-full bg-[#ecad29]" />
                <span>Delivery Highlight</span>
              </div>
              <div>
                <p className="text-sm text-white/70 mb-2">BYD Harmony Cirebon</p>
                <h3 className="text-2xl sm:text-4xl font-semibold mb-4">{activeSlide?.title}</h3>
                <p className="text-base sm:text-lg text-gray-200 max-w-3xl">{activeSlide?.message}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="rounded-full border border-white/20 bg-black/40 px-4 py-1 text-xs sm:text-sm text-gray-200">
                  {activeSlide?.badge}
                </span>

                <div className="flex gap-1">
                  <Star /> <Star /> <Star /> <Star /> <Star />
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur border border-white/20 p-3 text-white hover:bg-black/70 transition"
              onClick={() => handleManualNavigate('prev')}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M15 6l-6 6 6 6" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur border border-white/20 p-3 text-white hover:bg-black/70 transition"
              onClick={() => handleManualNavigate('next')}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 6l6 6-6 6" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* MOBILE TEXT */}
          <div className="md:hidden p-4 sm:p-6 space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              <span className="w-2 h-2 rounded-full bg-[#ecad29]" />
              <span>Delivery Highlight</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/40 backdrop-blur">
              <p className="text-xs text-white/70 mb-2">BYD Harmony Cirebon</p>
              <h3 className="text-2xl font-semibold mb-2">{activeSlide?.title}</h3>
              <p className="text-base text-gray-200">{activeSlide?.message}</p>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <span className="rounded-full border border-white/20 bg-black/40 px-4 py-1 text-xs text-gray-200">
                  {activeSlide?.badge}
                </span>

                <div className="flex gap-1">
                  <Star /> <Star /> <Star /> <Star /> <Star />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DOTS */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            {sliderItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? 'w-12 bg-[#ecad29]' : 'w-6 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-400">
            {String(activeIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
