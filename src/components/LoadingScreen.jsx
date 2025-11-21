import { useEffect, useState } from 'react'

function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div id="loading-screen" className={`fixed inset-0 bg-black flex items-center justify-center z-50 ${!isVisible ? 'hidden' : ''}`}>
      <div className="text-center">
        <div className="spinner mb-4"></div>
        <p className="text-white text-xl font-semibold">Memuat...</p>
      </div>
    </div>
  )
}

export default LoadingScreen

