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
          </div>

          {/* SECTION 2 */}
          <div className="footer-section">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleLinkClick('home')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">Home</button></li>
              <li><button onClick={() => handleLinkClick('about')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">About</button></li>
              <li><button onClick={() => handleLinkClick('pricelist')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">Price List</button></li>
              <li><button onClick={() => handleLinkClick('contact')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">Contact</button></li>
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
                <span className="text-gray-400 text-base">Bydcirebon.official@gmail.com</span>
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
