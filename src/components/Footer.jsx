function Footer() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <footer className="relative bg-[#03040b] py-20 px-4 md:px-8 lg:px-16 overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060f] via-[#04050c] to-[#010106]" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_0%,rgba(236,173,41,0.25)_0%,transparent_45%)]" />
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_85%_10%,rgba(86,129,255,0.2)_0%,transparent_40%)]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute right-12 top-1/4 w-20 h-20 border border-white/10 rounded-[32px]" />
        <div className="absolute left-8 bottom-12 w-16 h-16 border border-white/5 rounded-full" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="fade-in-up">
            <img src="/logobyd.png" alt="BYD Logo" className="h-16 w-auto mb-8 brightness-0 invert drop-shadow-lg" />
            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
              BYD Cirebon adalah dealer resmi BYD yang berlokasi di Kota Cirebon. Kami menawarkan berbagai
              pilihan kendaraan listrik BYD terbaru dengan fokus pada inovasi, efisiensi, dan keberlanjutan.
            </p>
            <div className="flex space-x-5">
              <a href="https://www.instagram.com/bydcirebonofficial?igsh=MThpazF6MHp3Y3JldA%3D%3D" target="_blank" className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#ecad29] hover:to-[#d99a20] transition-all duration-300 hover:scale-110 hover:rotate-3 premium-glow border border-gray-700/50 hover:border-transparent">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/people/Bydcirebonofficial/61577662801203/?rdid=JAs4Hd8UXaNY7gna&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ACPNHt8XL%2F" target="_blank" className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#ecad29] hover:to-[#d99a20] transition-all duration-300 hover:scale-110 hover:rotate-3 premium-glow border border-gray-700/50 hover:border-transparent">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@bydcirebonofficial?_r=1&_t=ZS-91RruGO6q5n" target="_blank" className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#ecad29] hover:to-[#d99a20] transition-all duration-300 hover:scale-110 hover:rotate-3 premium-glow border border-gray-700/50 hover:border-transparent">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-section fade-in-up">
            <h4 className="text-white font-bold text-xl md:text-2xl mb-8 premium-heading">Quick Links</h4>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="quick-link hover:text-[#ecad29] transition-colors duration-300 font-medium">Home</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }} className="quick-link hover:text-[#ecad29] transition-colors duration-300 font-medium">Tentang Kami</a></li>
              <li><a href="#pricelist" onClick={(e) => { e.preventDefault(); scrollToSection('pricelist') }} className="quick-link hover:text-[#ecad29] transition-colors duration-300 font-medium">Harga</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }} className="quick-link hover:text-[#ecad29] transition-colors duration-300 font-medium">Kontak</a></li>
              <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features') }} className="quick-link hover:text-[#ecad29] transition-colors duration-300 font-medium">Keunggulan</a></li>
            </ul>
          </div>
          <div className="footer-section fade-in-up">
            <h4 className="text-white font-bold text-xl md:text-2xl mb-8 premium-heading">Kontak</h4>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-center">
                <svg className="w-6 h-6 text-[#ecad29] mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>+62 811-668-722</span>
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 text-[#ecad29] mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>Bydcirebon.official@gmail.com</span>
              </li>
              <li className="flex flex-col items-start">
                <div className="flex items-start mb-2">
                  <svg className="w-6 h-6 text-[#ecad29] mr-4 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Jl. DR. Cipto Mangunkusumo No. 115, Pekiringan, Kec. Kesambi, Kota Cirebon, Jawa Barat 45131</span>
                </div>
                <div className="ml-10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.902!2d108.473!3d-6.711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee1b8b8b8b8b8%3A0x2e6ee1b8b8b8b8b8!2sJl.%20DR.%20Cipto%20Mangunkusumo%20No.%20115%2C%20Pekiringan%2C%20Kec.%20Kesambi%2C%20Kota%20Cirebon%2C%20Jawa%20Barat%2045131!5e0!3m2!1sen!2sid!4v1690000000000!5m2!1sen!2sid"
                    width="100%"
                    height="100"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BYD Cirebon Location Map"
                  >
                  </iframe>
                </div>
              </li>
            </ul>
          </div>
          <div className="fade-in-up">
            <h4 className="text-white font-bold text-xl md:text-2xl mb-8 premium-heading">Head Office</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
              Jl. Jenderal Sudirman No. Kav 7-8, RT 10/RW 11, Karet Tengsin, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10250
            </p>
            <div className="card-premium p-6 rounded-xl border-accent">
              <h5 className="text-white font-bold mb-3 text-lg">Jam Operasional</h5>
              <p className="text-[#ecad29] font-semibold text-sm">Senin - Jumat: 08:00 - 20:00 WIB</p>
              <p className="text-[#ecad29] font-semibold text-sm">Sabtu: 08:30 - 15:00 WIB</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700/50 pt-10 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0 font-light">
              ©2025 BYD Cirebon. All Rights Reserved. <span className="text-[#ecad29] font-semibold">Build Your Dream</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

