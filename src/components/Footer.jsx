import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const isDetailPage = location.pathname.startsWith('/detail')

  const handleLinkClick = (sectionId) => {
    if (isDetailPage) {
      // Navigate to home page with section hash
      navigate(`/#${sectionId}`)
    } else {
      // Scroll to section on current page
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

  return (
    <footer className="bg-black text-white py-12 px-6" style={{ position: 'relative', zIndex: 30 }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="footer-section">
            <h3 className="text-lg font-bold mb-4">BYD Indonesia</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Build Your Dreams adalah perusahaan otomotif terkemuka yang berkomitmen untuk memberikan pengalaman berkendara yang luar biasa dengan teknologi terdepan dan inovasi berkelanjutan.
            </p>
          </div>
          <div className="footer-section">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleLinkClick('home')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">Home</button></li>
              <li><button onClick={() => handleLinkClick('about')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">About</button></li>
              <li><button onClick={() => handleLinkClick('features')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">Features</button></li>
              <li><button onClick={() => handleLinkClick('pricelist')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">Price List</button></li>
              <li><button onClick={() => handleLinkClick('contact')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">Contact</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="text-lg font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleLinkClick('pricelist')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">ATTO 1</button></li>
              <li><button onClick={() => handleLinkClick('pricelist')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">ATTO 3</button></li>
              <li><button onClick={() => handleLinkClick('pricelist')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">DOLPHIN</button></li>
              <li><button onClick={() => handleLinkClick('pricelist')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">M6</button></li>
              <li><button onClick={() => handleLinkClick('pricelist')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">SEAL</button></li>
              <li><button onClick={() => handleLinkClick('pricelist')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">SEALION 7</button></li>
              <li><button onClick={() => handleLinkClick('pricelist')} className="quick-link text-gray-400 hover:text-white transition-colors duration-300 text-left">DENZA D9</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400 text-sm">Jl. Raya Cirebon - Losari KM 16, Cirebon, Indonesia</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-400 text-sm">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-400 text-sm">info@bydindonesia.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-gradient-line mt-12"></div>
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            &copy; 2024 BYD Indonesia. All rights reserved. | Powered by <span className="text-[#ecad29] font-semibold">BYD Technology</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer
