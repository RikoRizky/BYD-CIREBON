import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Reset active section when route changes
    if (location.pathname !== '/') {
      setActiveSection('')
    }

    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      
      ticking = true
      window.requestAnimationFrame(() => {
        ticking = false
        
        const currentScroll = window.pageYOffset
        setIsScrolled(currentScroll > 100)

        // Hanya update active section ketika di halaman utama
        if (location.pathname !== '/') return

        const sections = [
          { id: 'home', target: 'home' },
          { id: 'about', target: 'about' },
          { id: 'pricelist', target: 'pricelist' },
          { id: 'testimonials', target: 'testimonials' },
          { id: 'contact', target: 'contact' }
        ]

        if (currentScroll < 100) {
          setActiveSection('home')
          return
        }

        // Gunakan getBoundingClientRect untuk akurasi posisi relatif ke viewport
        const viewportHeight = window.innerHeight
        const viewportCenter = viewportHeight / 2
        
        let currentTarget = null
        let bestScore = -1

        sections.forEach((section) => {
          const element = document.getElementById(section.id)
          if (element) {
            const rect = element.getBoundingClientRect()
            const elementTop = rect.top
            const elementBottom = rect.bottom
            const elementHeight = rect.height

            // Hitung berapa banyak section yang terlihat di viewport
            const visibleTop = Math.max(0, elementTop)
            const visibleBottom = Math.min(viewportHeight, elementBottom)
            const visibleHeight = Math.max(0, visibleBottom - visibleTop)
            const visibleRatio = visibleHeight / Math.max(elementHeight, 1)

            // Cek apakah viewport center berada di dalam section
            const isCenterInSection = viewportCenter >= elementTop && viewportCenter <= elementBottom

            // Skor: prioritaskan section yang:
            // 1. Viewport center berada di dalamnya (skor +1000)
            // 2. Paling banyak terlihat di viewport (visibleRatio * 100)
            // 3. Lebih dekat ke tengah viewport (bonus)
            let score = 0
            
            if (isCenterInSection) {
              score += 1000 // Prioritas tinggi jika center di dalam section
            }
            
            score += visibleRatio * 100 // Bonus untuk section yang lebih banyak terlihat
            
            // Bonus tambahan jika section berada di tengah viewport
            if (elementTop <= viewportCenter && elementBottom >= viewportCenter) {
              const centerDistance = Math.abs(viewportCenter - (elementTop + elementHeight / 2))
              score += Math.max(0, 50 - centerDistance / 10) // Bonus semakin besar jika lebih dekat ke center
            }

            // Hanya pertimbangkan section yang minimal 30% terlihat
            if (visibleRatio >= 0.3 && score > bestScore) {
              bestScore = score
              currentTarget = section.target
            }
          }
        })

        // Hanya update jika ada section yang terdeteksi
        if (currentTarget) {
          setActiveSection(currentTarget)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const navHeight = 80 // approximate nav height
      const extraOffset = sectionId === 'about' ? 60 : 0
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset
      const offsetTop = Math.max(0, sectionTop - navHeight - extraOffset)
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const handleNavClick = (target) => {
    setActiveSection(target)
    setIsMobileMenuOpen(false)

    const performScroll = () => {
      if (target === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        scrollToSection(target)
      }
    }

    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(performScroll, 100)
    } else {
      performScroll()
    }
  }

  return (
    <>
      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="brand nav-link" onClick={() => {
          if (location.pathname !== '/') {
            navigate('/')
          } else {
            handleNavClick('home')
          }
        }}>
          <img src="/logobyd.png" alt="BYD Logo" className="logo-byd" />
        </div>

        <div className="nav-links">
          <div 
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </div>
          <div 
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            Tentang Kami
          </div>
          <div 
            className={`nav-link ${activeSection === 'pricelist' ? 'active' : ''}`}
            onClick={() => handleNavClick('pricelist')}
          >
            Model
          </div>
          <div 
            className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`}
            onClick={() => handleNavClick('testimonials')}
          >
            Testimoni
          </div>
          <div 
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            Test Drive
          </div>
        </div>

        <button 
          className={`navbar-toggler ${isMobileMenuOpen ? 'active' : ''}`}
          id="hamburger"
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`} id="mobile-menu">
        <button
          type="button"
          className="mobile-menu-close"
          aria-label="Tutup menu"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
        <div className="mobile-menu-content">
          <div 
            className={`mobile-nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </div>
          <div 
            className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            Tentang Kami
          </div>
          <div 
            className={`mobile-nav-link ${activeSection === 'pricelist' ? 'active' : ''}`}
            onClick={() => handleNavClick('pricelist')}
          >
            Model
          </div>
          <div 
            className={`mobile-nav-link ${activeSection === 'testimonials' ? 'active' : ''}`}
            onClick={() => handleNavClick('testimonials')}
          >
            Testimoni
          </div>
          <div 
            className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            Test Drive
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar

