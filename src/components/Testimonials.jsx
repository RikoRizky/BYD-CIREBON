import React from 'react'

function Testimonials() {
  const testimonials = [
  {
    id: 1,
    name: "Ahmad Rahman",
    role: "Pengusaha",
    content: "BYD ATTO 3 memberikan pengalaman berkendara yang luar biasa...",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    carImage: "/images/atto3.jpg"
  },
  {
    id: 2,
    name: "Siti Nurhaliza", 
    role: "Ibu Rumah Tangga",
    content: "Sangat puas dengan BYD DOLPHIN...",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW4lMjBmYWNlfGVufDB8fDB8fHww",
    carImage: "/images/dolphin.jpg"
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "Profesional IT", 
    content: "BYD SEALION 7 adalah mobil listrik masa depan...",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    carImage: "/images/sealion7.jpg"
  }
]

  return (
    <section
      id="testimonials"
      className="section-about relative overflow-hidden bg-[#0a0a0a] text-white"
    >
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_85%_15%,rgba(236,173,41,0.4),transparent_50%)]"></div>
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_20%_80%,rgba(88,166,255,0.3),transparent_40%)]"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 bottom-32 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
        <div className="absolute right-1/4 bottom-16 w-px h-48 bg-gradient-to-t from-white/15 to-transparent -rotate-[15deg] origin-bottom"></div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="text-center mb-16">
          <h2 className="premium-heading text-[42px] sm:text-[50px] leading-tight mb-5">
            Apa Kata Pelanggan Kami
          </h2>
          <div className="w-32 h-[3px] bg-gradient-to-r from-[#39b6ff] via-[#ecad29] to-transparent mb-8 mx-auto" />
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            Dengarkan pengalaman langsung dari pelanggan yang telah mempercayai BYD sebagai pilihan kendaraan listrik mereka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-3xl border border-white/10 bg-gradient-to-r from-black/40 to-black/10 p-6 shadow-lg shadow-black/30 hover:transform hover:scale-105 hover:border-[#ecad29] hover:shadow-[0_25px_55px_rgba(236,173,41,0.35)] transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-[#ecad29]/30"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#ecad29] fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
                <div className="rounded-lg overflow-hidden border border-white/10 hover:border-[#ecad29]/50 transition-colors duration-300">
                  <img
                    src={testimonial.carImage}
                    alt={`Mobil ${testimonial.name}`}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

              {/* Foto Bukti Pembelian */}
              <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-gray-300 italic leading-relaxed">"{testimonial.content}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-black/40 to-black/10 border border-white/10 rounded-full px-6 py-3 shadow-lg shadow-black/30">
            <svg className="w-5 h-5 text-[#ecad29]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">Lebih dari 10,000+ pelanggan puas</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
