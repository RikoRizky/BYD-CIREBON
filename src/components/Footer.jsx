import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { priceListData } from '../data/priceListData'

function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const isDetailPage = location.pathname.startsWith('/detail')

  const handleLinkClick = (sectionId) => {
    if (isDetailPage) {
      navigate(`/#${sectionId}`)
    } else {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

  const handleProductClick = (productId) => {
    navigate(`/detail/${productId}`)
  }

  return (
    <footer className="bg-black text-white py-12 px-6" style={{ position: 'relative', zIndex: 30 }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* SECTION 1 */}
          <div className="footer-section">
            <h3 className="text-lg font-bold mb-4">BYD Harmony Cirebon</h3>

            {/* Perbesar jadi text-base */}
            <p className="text-gray-400 text-base leading-relaxed"> 
              Build Your Dreams adalah perusahaan otomotif terkemuka yang berkomitmen 
              untuk memberikan pengalaman berkendara yang luar biasa dengan teknologi 
              terdepan dan inovasi berkelanjutan.
            </p>
            <div className="flex space-x-5 mt-4">
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

          {/* SECTION 2 */}
          <div className="footer-section">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleLinkClick('home')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">Home</button></li>
              <li><button onClick={() => handleLinkClick('about')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">About</button></li>
              <li><button onClick={() => handleLinkClick('pricelist')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">Price List</button></li>
              <li><button onClick={() => handleLinkClick('testimonials')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">Testimoni</button></li>
              <li><button onClick={() => handleLinkClick('contact')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">Test Drive</button></li>
            </ul>
          </div>

          {/* SECTION 3 */}
          <div className="footer-section">
            <h3 className="text-lg font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              {priceListData.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => handleProductClick(p.id)}
                    className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 4 */}
          <div className="footer-section">
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>

            <div className="space-y-3">

              {/* Perbesar text-sm jadi text-base */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400 text-base">
                  Jl. DR. Cipto Mangunkusumo No. 115, Pekiringan, Cirebon
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-400 text-base">+62 811-668-722</span>
              </div>

              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-400 text-base">bydcirebon.official@gmail.com</span>
              </div>

              <div className="ml-0 mt-4 rounded-xl overflow-hidden premium-shadow">
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.902!2d108.473!3d-6.711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee1b8b8b8b8b8%3A0x2e6ee1b8b8b8b8b8!2sJl.%20DR.%20Cipto%20Mangunkusumo%20No.%20115%2C%20Pekiringan%2C%20Kec.%20Kesambi%2C%20Kota%20Cirebon%2C%20Jawa%20Barat%2045131!5e0!3m2!1sen!2sid!4v1690000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BYD Cirebon Location"
                >
                </iframe>
              </div>

            </div>
          </div>
        </div>

        <div className="footer-gradient-line mt-12"></div>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            &copy; 2025 BYD Harmony Cirebon. All rights reserved. | Powered by <span className="text-[#ecad29] font-semibold">BYD Technology</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
