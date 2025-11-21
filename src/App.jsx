import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import PriceList from './components/PriceList'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import DetailUnit from './components/DetailUnit'

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    // Handle hash scrolling when arriving from other pages
    if (location.hash) {
      const sectionId = location.hash.substring(1) // Remove the '#'
      const section = document.getElementById(sectionId)
      if (section) {
        // Small delay to ensure DOM is fully rendered
        setTimeout(() => {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }, 100)
      }
    }
  }, [location])

  return (
    <>
      <Navbar />
      <Hero />
      <div className="sections-container">
        <About />
        <PriceList />
        <Features />
        <Testimonials />
        <Contact />
        <div className="footer-gradient-line"></div>
        <Footer />
      </div>
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:carId" element={<DetailUnit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
