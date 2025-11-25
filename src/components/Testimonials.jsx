import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

function Testimonials() {
  const sliderItems = useMemo(
    () => [
      {
        id: 1,
        title: 'Terima Kasih BYD Family',
        message:
          'Telah mempercayai BYD Harmony Auto sebagai pilihan mobil listrik anda. Bersama kita melangkah menuju masa depan yang lebih hijau dan berkelanjutan.',
        image: '/testimonials/testimonial1.jpeg',
        badge: 'Indonesia EV Sales No.1',
        accentFrom: '#2563eb',
        accentTo: '#ecad29',
        imagePosition: 'center'
      },
      {
        id: 2,
        title: 'Thank You',
        message:
          'Thank you for choosing DENZA Harmony Auto as your trusted driving companion. #YourTrustedAutoPartner',
        image: '/testimonials/testimonial2.jpeg',
        badge: 'Harmony Auto Exclusive Delivery',
        accentFrom: '#f97316',
        accentTo: '#db2777',
        imagePosition: 'center'
      },
      {
        id: 3,
        title: 'Terima Kasih BYD Family',
        message:
          'Kami terus berkomitmen menghadirkan pengalaman serah terima yang hangat dan berkesan untuk setiap pelanggan.',
        image: '/testimonials/testimonial3.jpeg',
        badge: 'BYD Harmony Auto',
        accentFrom: '#14b8a6',
        accentTo: '#3b82f6',
        imagePosition: 'center'
      },
      {
        id: 4,
        title: 'Terima Kasih BYD Family',
        message:
          'Selamat datang di BYD Family! Semoga perjalanan baru ini selalu menyenangkan dan penuh energi positif.',
        image: '/testimonials/testimonial4.jpeg',
        badge: 'Indonesia EV Sales No.1',
        accentFrom: '#9333ea',
        accentTo: '#ec4899',
        imagePosition: '50% 35%'
      },
      {
        id: 5,
        title: 'Terima Kasih BYD Family',
        message:
          'Keceriaan pelanggan adalah prioritas kami. Terima kasih telah berbagi momen spesial bersama Harmony Auto.',
        image: '/testimonials/testimonial5.jpeg',
        badge: 'BYD Harmony Auto Indonesia',
        accentFrom: '#34d399',
        accentTo: '#facc15',
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
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }

    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides)
    }, intervalDuration)

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
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

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#050505] text-white py-20 px-4 sm:px-8 lg:px-12"
    >
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_85%_15%,rgba(236,173,41,0.35),transparent_60%)]"></div>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.4),transparent_40%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <p className="tracking-[0.4em] uppercase text-xs text-gray-400 mb-4">
            Testimoni Pelanggan
          </p>
          <h2 className="premium-heading text-[42px] sm:text-[50px] leading-tight mb-4">
            Apa Kata Keluarga BYD
          </h2>
          <div className="w-32 h-[3px] bg-gradient-to-r from-[#39b6ff] via-[#ecad29] to-transparent mx-auto mb-6" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Satu per satu momen serah terima eksklusif kami tampilkan agar Anda dapat merasakan langsung
            kebahagiaan pelanggan Harmony Auto di seluruh Indonesia.
          </p>
        </div>

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
              style={{
                objectPosition: activeSlide?.imagePosition || 'center'
              }}
              onError={(e) => {
                e.currentTarget.src = '/testimonials/testimonial1.jpeg'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40"></div>

            <div className="absolute inset-0 hidden md:flex flex-col justify-end p-6 sm:p-10 lg:p-12 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-white/80">
                <span className="w-2 h-2 rounded-full bg-[#ecad29]" />
                <span>Delivery Highlight</span>
              </div>
              <div>
                <p className="text-sm text-white/70 mb-2">Harmony Auto Indonesia</p>
                <h3 className="text-2xl sm:text-4xl font-semibold mb-4">{activeSlide?.title}</h3>
                <p className="text-base sm:text-lg text-gray-200 max-w-3xl">{activeSlide?.message}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="rounded-full border border-white/20 bg-black/40 px-4 py-1 text-xs sm:text-sm text-gray-200">
                  {activeSlide?.badge}
                </span>
                <span
                  className="h-[2px] w-20 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${activeSlide?.accentFrom}, ${activeSlide?.accentTo})`
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              aria-label="Slide sebelumnya"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur border border-white/20 p-3 text-white hover:bg-black/70 transition"
              onClick={() => handleManualNavigate('prev')}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 6l-6 6 6 6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Slide berikutnya"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur border border-white/20 p-3 text-white hover:bg-black/70 transition"
              onClick={() => handleManualNavigate('next')}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 6l6 6-6 6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Mobile Text Content */}
          <div className="md:hidden p-4 sm:p-6 space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              <span className="w-2 h-2 rounded-full bg-[#ecad29]" />
              <span>Delivery Highlight</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/40 backdrop-blur">
              <p className="text-xs text-white/70 mb-2">Harmony Auto Indonesia</p>
              <h3 className="text-2xl font-semibold mb-2">{activeSlide?.title}</h3>
              <p className="text-base text-gray-200">{activeSlide?.message}</p>
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <span className="rounded-full border border-white/20 bg-black/40 px-4 py-1 text-xs text-gray-200">
                  {activeSlide?.badge}
                </span>
                <span
                  className="h-[2px] w-20 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${activeSlide?.accentFrom}, ${activeSlide?.accentTo})`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            {sliderItems.map((item, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Tampilkan testimoni ke-${index + 1}`}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full transition-all ${
                    isActive ? 'w-12 bg-[#ecad29]' : 'w-6 bg-white/30 hover:bg-white/60'
                  }`}
                />
              )
            })}
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
