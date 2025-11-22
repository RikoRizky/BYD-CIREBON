import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { priceListData } from '../data/priceListData'

function PriceList() {
  const navigate = useNavigate()
  const [selectedClasses, setSelectedClasses] = useState({})

  const handleClassChange = (carId, classIndex) => {
    setSelectedClasses({
      ...selectedClasses,
      [carId]: classIndex
    })
  }

  const handleDetailClick = (car) => {
    const selectedClassIndex = selectedClasses[car.id] ?? 0
    navigate(`/detail/${car.id}`, { 
      state: { 
        car, 
        selectedClass: car.classes[selectedClassIndex] 
      } 
    })
  }

  return (
    <section
      id="pricelist"
      className="section-pricelist relative overflow-hidden bg-[#04050c] text-white py-24 px-4 sm:px-8 lg:px-12"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060f] via-[#04050c] to-[#020308]" />
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_18%_20%,rgba(236,173,41,0.25),transparent_50%)]" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_80%_0%,rgba(57,182,255,0.25),transparent_45%)]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute right-12 bottom-16 w-24 h-24 border border-white/5 rounded-[32px]" />
        <div className="absolute left-6 top-1/3 w-12 h-12 border border-white/10 rounded-full" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20 fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white premium-heading leading-tight">
            Daftar Harga Mobil BYD Cirebon
          </h2>
          <div className="w-full max-w-32 h-1.5 bg-gradient-to-r from-[#39b6ff] via-[#ecad29] to-transparent mx-auto mb-6 rounded-full premium-glow" />
          <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Ketahui daftar harga asli mobil BYD yang sedang Anda cari langsung dari dealernya di Cirebon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {priceListData.map((car, index) => {
            const selectedClassIndex = selectedClasses[car.id] ?? 0
            const selectedClass = car.classes[selectedClassIndex]
            const displayPrice = selectedClass ? selectedClass.price : car.defaultPrice

            return (
              <div
                key={index}
                className={`rounded-3xl overflow-hidden group border border-white/10 bg-gradient-to-b from-white/5 via-black/40 to-black/60 backdrop-blur-lg shadow-[0_20px_45px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-2 hover:border-[#ecad29]/80 hover:shadow-[0_25px_55px_rgba(236,173,41,0.35)] ${
                  car.fullWidth ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                      <span className="text-xs font-semibold text-[#ecad29] uppercase tracking-[0.25em]">Baru</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-[#090b14]/90 via-[#0e0f1c]/90 to-[#0f111f]/90">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 premium-heading car-name">{car.name}</h3>
                  
                  {car.classes.length > 1 && (
                    <div className="mb-6">
                      <label className="block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide">Pilih Tipe Class:</label>
                      <select
                        value={selectedClassIndex}
                        onChange={(e) => handleClassChange(car.id, parseInt(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ecad29] focus:border-[#ecad29] transition-all backdrop-blur-sm font-medium"
                      >
                        {car.classes.map((carClass, idx) => (
                          <option key={idx} value={idx}>
                            {carClass.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mb-4 pb-4 border-b border-white/5">
                    <p className="text-transparent bg-clip-text bg-gradient-to-br from-[#ecad29] via-[#f7d382] to-[#d39412] text-3xl md:text-4xl font-bold mb-2">
                      {displayPrice}
                    </p>
                    {selectedClass && (
                      <p className="text-[#ecad29] text-sm font-semibold uppercase tracking-wide">Class: {selectedClass.name}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-2">* OTR Cirebon (IDR)</p>
                  </div>
                  <button 
                    onClick={() => handleDetailClick(car)}
                    className="w-full bg-gradient-to-r from-[#ecad29] to-[#d99a20] hover:from-[#ffd181] hover:to-[#ecad29] text-black font-semibold py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-[#ecad29]/30"
                  >
                    Detail Unit
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PriceList

