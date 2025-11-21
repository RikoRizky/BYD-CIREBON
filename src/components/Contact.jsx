import { useState } from 'react'
import { priceListData } from '../data/priceListData'

function Contact() {
  const [formData, setFormData] = useState({
    nama: '',
    telepon: '',
    email: '',
    model: '',
    pesan: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const { nama, telepon, email, model, pesan } = formData
    
    // Format pesan untuk WhatsApp
    let whatsappMessage = `*Halo, Saya tertarik dengan mobil listrik BYD*\n\n`
    whatsappMessage += `*Nama:* ${nama}\n`
    whatsappMessage += `*No. Telepon/WhatsApp:* ${telepon}\n`
    if (email) {
      whatsappMessage += `*Email:* ${email}\n`
    }
    whatsappMessage += `*Model yang Diminati:* ${model}\n\n`
    whatsappMessage += `*Pesan:*\n${pesan}`
    
    // Nomor WhatsApp (WhatsApp Business)
    const dealerWhatsApp = '62811668722'
    
    // Deteksi device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isAndroid = /Android/i.test(navigator.userAgent)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

    // Encode pesan dengan benar untuk WhatsApp
    // Pastikan encoding tepat - encodeURIComponent akan meng-encode \n sebagai %0A
    const encodedMessage = encodeURIComponent(whatsappMessage)
    
    // Format URL universal: wa.me - ini paling reliable untuk semua device
    // Format: https://wa.me/NOMOR?text=PESAN (tanpa tanda + di nomor)
    // Untuk WhatsApp Business, formatnya sama dengan WhatsApp biasa
    const whatsappURL = `https://wa.me/${dealerWhatsApp}?text=${encodedMessage}`
    
    if (isMobile) {
      if (isAndroid) {
        // Android: Coba deep link dulu untuk langsung buka aplikasi
        const androidIntentURL = `whatsapp://send?phone=${dealerWhatsApp}&text=${encodedMessage}`
        
        // Coba buka dengan intent
        window.location.href = androidIntentURL
        
        // Fallback ke wa.me jika deep link tidak bekerja (dalam 1 detik)
        setTimeout(() => {
          window.location.href = whatsappURL
        }, 1000)
      } else if (isIOS) {
        // iOS: Langsung gunakan wa.me - ini akan redirect ke WhatsApp app dengan pesan terisi
        window.location.href = whatsappURL
      } else {
        // Mobile lain: gunakan wa.me
        window.location.href = whatsappURL
      }
    } else {
      // Desktop: Gunakan wa.me yang akan redirect ke WhatsApp Web atau Desktop app
      // Catatan: WhatsApp Web kadang tidak auto-fill pesan meskipun parameter text ada
      // Ini adalah keterbatasan dari WhatsApp Web sendiri
      // Solusi: User perlu klik "Continue to WhatsApp Web" dan pesan akan muncul di chat box
      window.open(whatsappURL, '_blank')
      
      // Alternatif: Coba buka dengan api.whatsapp.com juga (dalam tab yang sama)
      // Ini kadang lebih reliable untuk auto-fill
      setTimeout(() => {
        const apiURL = `https://api.whatsapp.com/send?phone=${dealerWhatsApp}&text=${encodedMessage}`
        // Jangan buka tab baru lagi, cukup gunakan yang sudah ada
      }, 100)
    }
    
    // Reset form
    setFormData({
      nama: '',
      telepon: '',
      email: '',
      model: '',
      pesan: ''
    })
  }

  return (
    <section
      id="contact"
      className="section-contact py-24 px-4 md:px-8 lg:px-12 relative overflow-hidden bg-[#04050c] text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060f] via-[#04050c] to-[#020308]" />
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_25%_15%,rgba(236,173,41,0.3)_0%,transparent_45%)]" />
      <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_80%_90%,rgba(57,182,255,0.2)_0%,transparent_40%)]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute left-12 top-1/4 w-16 h-16 border border-white/10 rounded-[28px]" />
        <div className="absolute right-20 bottom-16 w-20 h-20 border border-white/5 rounded-full" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white premium-heading leading-tight">
            Hubungi Kami
          </h2>
          <div className="w-full max-w-32 h-1.5 bg-gradient-to-r from-[#39b6ff] via-[#ecad29] to-transparent mx-auto mb-6 rounded-full premium-glow" />
          <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Ingin informasi lebih lanjut tentang layanan kami? Hubungi kami sekarang!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          <div className="p-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-black/40 to-black/70 backdrop-blur-lg shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 premium-heading">Informasi Kontak</h3>
            <div className="space-y-6">
              <div className="flex items-start group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ecad29] to-[#d99a20] rounded-xl flex items-center justify-center mr-4 mt-1 flex-shrink-0 premium-glow group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold mb-1">Telephone</p>
                  <p className="text-white font-bold text-lg">+62 811-668-722</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ecad29] to-[#d99a20] rounded-xl flex items-center justify-center mr-4 mt-1 flex-shrink-0 premium-glow group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold mb-1">Email</p>
                  <p className="text-white font-bold text-lg break-all">Bydcirebon.official@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ecad29] to-[#d99a20] rounded-xl flex items-center justify-center mr-4 mt-1 flex-shrink-0 premium-glow group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold mb-1">Alamat</p>
                  <p className="text-white font-semibold text-base leading-relaxed">Jl. DR. Cipto Mangunkusumo No. 115, Pekiringan, Kec. Kesambi, Kota Cirebon, Jawa Barat 45131</p>
                </div>
              </div>
              <div className="ml-16 mt-6 rounded-xl overflow-hidden premium-shadow">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.902!2d108.473!3d-6.711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee1b8b8b8b8b8%3A0x2e6ee1b8b8b8b8b8!2sJl.%20DR.%20Cipto%20Mangunkusumo%20No.%20115%2C%20Pekiringan%2C%20Kec.%20Kesambi%2C%20Kota%20Cirebon%2C%20Jawa%20Barat%2045131!5e0!3m2!1sen!2sid!4v1690000000000!5m2!1sen!2sid"
                  width="100%"
                  height="300"
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

          <div className="p-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-black/40 to-black/70 backdrop-blur-lg shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 premium-heading">Form Konsultasi</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="nama" className="block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide">Nama Lengkap *</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  required
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ecad29] focus:border-[#ecad29] transition-all backdrop-blur-sm font-medium"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>
              <div>
                <label htmlFor="telepon" className="block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide">No. Telepon/WhatsApp *</label>
                <input
                  type="tel"
                  id="telepon"
                  name="telepon"
                  required
                  value={formData.telepon}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ecad29] focus:border-[#ecad29] transition-all backdrop-blur-sm font-medium"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ecad29] focus:border-[#ecad29] transition-all backdrop-blur-sm font-medium"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label htmlFor="model" className="block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide">Model yang Diminati *</label>
                <select
                  id="model"
                  name="model"
                  required
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#ecad29] focus:border-[#ecad29] transition-all backdrop-blur-sm font-medium"
                >
                  <option value="">Pilih Model</option>
                  {priceListData.map((car) => (
                    <option key={car.id} value={car.name}>
                      {car.name}
                    </option>
                  ))}
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label htmlFor="pesan" className="block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide">Pesan *</label>
                <textarea
                  id="pesan"
                  name="pesan"
                  rows="4"
                  required
                  value={formData.pesan}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ecad29] focus:border-[#ecad29] transition-all resize-none backdrop-blur-sm font-medium"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#ecad29] hover:bg-[#d99a20] text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Kirim ke WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

