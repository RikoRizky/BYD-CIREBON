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

    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      setIsScrolled(currentScroll > 100)

      // Hanya update active section ketika di halaman utama
      if (location.pathname !== '/') return

      const navHeight = 80
      const scrollPos = currentScroll + navHeight + 1
      const sections = [
        { id: 'home', target: 'home' },
        { id: 'about', target: 'about' },
        { id: 'pricelist', target: 'pricelist' },
        { id: 'contact', target: 'contact' }
      ]

      if (currentScroll < 100) {
        setActiveSection('home')
        return
      }

      let currentTarget = null
      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          const sectionTop = element.offsetTop
          const sectionBottom = sectionTop + element.offsetHeight

          if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            currentTarget = section.target
          }
        }
      })

      if (currentTarget) {
        setActiveSection(currentTarget)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const navHeight = 80 // approximate nav height
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset
      const offsetTop = sectionTop - navHeight
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

