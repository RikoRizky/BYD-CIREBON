import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NotFound() {
  const [countdown, setCountdown] = useState(5)
  const navigate = useNavigate()

  useEffect(() => {
    // Set page title
    document.title = '404 - Halaman Tidak Ditemukan | BYD Cirebon'

    // Add favicon
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link')
    favicon.rel = 'icon'
    favicon.href = '/bydlogo.png'
    favicon.type = 'image/x-icon'
    if (!document.querySelector('link[rel="icon"]')) {
      document.head.appendChild(favicon)
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer)
          navigate('/')
          return 0
        }
        return prevCount - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#FFFFFFDD',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <h1 style={{
        fontSize: 'clamp(4rem, 12vw, 8rem)',
        fontWeight: 700,
        fontFamily: "'Oswald', sans-serif",
        color: '#ecad29',
        margin: '0 0 20px 0',
        textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
        letterSpacing: '-0.02em'
      }}>
        404
      </h1>
      <p style={{
        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
        fontWeight: 600,
        margin: '0 0 10px 0',
        color: '#FFFFFFDD'
      }}>
        Halaman Tidak Ditemukan
      </p>
      <p style={{
        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
        lineHeight: 1.6,
        margin: '0 0 20px 0',
        color: '#FFFFFF99',
        maxWidth: '500px'
      }}>
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        Mari kembali ke halaman utama BYD Cirebon untuk menemukan informasi mobil listrik terbaru.
      </p>
      <p style={{
        fontSize: '0.9rem',
        color: '#ecad29',
        margin: '0 0 40px 0',
        fontWeight: 500
      }}>
        Anda akan diarahkan kembali ke beranda dalam <span style={{ fontSize: '1.2em', fontWeight: '700' }}>{countdown}</span> detik...
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '16px 32px',
          background: 'linear-gradient(135deg, #ecad29 0%, #d99a20 100%)',
          color: '#0a0a0a',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '1rem',
          textTransform: 'uppercase',
          borderRadius: '999px',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(236, 173, 41, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)'
          e.target.style.boxShadow = '0 8px 25px rgba(236, 173, 41, 0.4)'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = '0 4px 15px rgba(236, 173, 41, 0.3)'
        }}
      >
        Kembali ke Beranda Sekarang
      </Link>
      <p style={{
        marginTop: '60px',
        fontSize: '0.9rem',
        color: '#FFFFFF66'
      }}>
        Butuh bantuan? <a
          href="https://wa.me/62811668722"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#ecad29',
            textDecoration: 'none',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#d99a20'}
          onMouseLeave={(e) => e.target.style.color = '#ecad29'}
        >
          Hubungi Kami
        </a>
      </p>
    </div>
  )
}

export default NotFound
