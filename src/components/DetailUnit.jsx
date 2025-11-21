import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { priceListData } from '../data/priceListData'
import { colorOptionsByCar, interiorImagesByCar, interiorDescriptions } from '../data/detailMedia'
import Navbar from './Navbar'
import Footer from './Footer'

function DetailUnit() {
  const location = useLocation()
  const navigate = useNavigate()
  const { car: locationCar, selectedClass: locationSelectedClass } = location.state || {}
  
  // Find car from data if not in location state
  const carId = location.pathname.split('/').pop()
  const car = locationCar || priceListData.find(c => c.id === carId)
  
  const [selectedClassIndex, setSelectedClassIndex] = useState(
    locationSelectedClass 
      ? car.classes.findIndex(c => c.name === locationSelectedClass.name)
      : 0
  )
 
  if (!car) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Mobil tidak ditemukan</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-[#ecad29] text-white px-6 py-2 rounded-lg hover:bg-[#d99a20] transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    )
  }

  const selectedClass = car.classes[selectedClassIndex]
  const displayPrice = selectedClass ? selectedClass.price : car.defaultPrice

  const availableColors = colorOptionsByCar[car.id] || []

  // Determine selected class name and a helper flag
  const selectedClassName = (selectedClass?.name || '').toLowerCase()
  const isSelectedPremium = /premium|superior|performance|luxury/i.test(selectedClassName)

  // Filter colors according to explicit `classes` mapping when available.
  // Behavior:
  // - If selected class is premium-like -> show only colors that are premium (name startsWith 'premium')
  //   OR colors that explicitly list the selected class in `classes`.
  // - If selected class is NOT premium-like ->
  //   - Colors that have an explicit `classes` array are shown only if they include the selected class.
  //   - Other colors (no `classes`) are shown normally.
  const displayedColors = availableColors.filter((c) => {
    const name = (c.name || '').toLowerCase()

    // If selected class is premium-like, restrict to premium-named colors or explicitly allowed ones
    if (isSelectedPremium) {
      if (Array.isArray(c.classes) && c.classes.length > 0) {
        return c.classes.map((x) => x.toLowerCase()).includes(selectedClassName)
      }
      return name.startsWith('premium')
    }

    // selected class is not premium-like
    if (Array.isArray(c.classes) && c.classes.length > 0) {
      // show only if explicitly allowed for this class
      return c.classes.map((x) => x.toLowerCase()).includes(selectedClassName)
    }

    // normal color without classes -> show
    return true
  })

  // If selected class is premium-like but we found no matching colors,
  // If selected class has no matching colors, try to reuse colors from other classes
  // Preferential fallback order (can be adjusted): Comfort -> Premium -> Luxury -> Performance -> Superior -> Dynamic -> Advanced
  let finalDisplayedColors = displayedColors
  if (finalDisplayedColors.length === 0) {
    const fallbackOrder = ['comfort', 'premium', 'luxury', 'performance', 'superior', 'dynamic', 'advanced']
    for (const fb of fallbackOrder) {
      if (fb === selectedClassName) continue
      const fromOther = availableColors.filter((c) => Array.isArray(c.classes) && c.classes.map(x => x.toLowerCase()).includes(fb))
      if (fromOther.length > 0) {
        finalDisplayedColors = fromOther
        break
      }
    }
  }

  // Last-resort fallback: show all available colors so the UI isn't empty
  if (finalDisplayedColors.length === 0) {
    finalDisplayedColors = availableColors
  }

  const [selectedColorIndex, setSelectedColorIndex] = useState(0)

  // Reset selected color index if the displayed colors change (e.g., switching class)
  useEffect(() => {
    if (selectedColorIndex >= finalDisplayedColors.length) {
      setSelectedColorIndex(0)
    }
  }, [finalDisplayedColors.length])

  // When class changes, reset selected color index to first available
  useEffect(() => {
    setSelectedColorIndex(0)
  }, [selectedClassIndex])

  const selectedColor = finalDisplayedColors[selectedColorIndex] || null

  const selectedDisplayImage =
    selectedColor && selectedColor.imageKey
      ? (selectedColor.imageKey.startsWith('/')
          ? selectedColor.imageKey
          : `/${selectedColor.imageKey}`)
      : car.image

  const interiorImages = interiorImagesByCar[car.id] || [car.image]
  const [interiorIndex, setInteriorIndex] = useState(0)
  const autoSlideIntervalRef = useRef(null)
  const resumeTimeoutRef = useRef(null)
  const lastClickTimeRef = useRef(0)
  const interiorExperienceRef = useRef(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

const INTERIOR_SLIDE_INTERVAL = 7000
const INTERIOR_RESUME_DELAY = INTERIOR_SLIDE_INTERVAL + 1000

  const currentDescriptions = interiorDescriptions[car.id] || defaultDescriptions.slice(0, interiorImages.length)
  const currentDescription = currentDescriptions[interiorIndex] || currentDescriptions[0] || 'Interior premium dengan fitur canggih dan kenyamanan maksimal.'

  // Auto-slide carousel
  useEffect(() => {
    const startAutoSlide = () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current)
      }

      autoSlideIntervalRef.current = setInterval(() => {
        setInteriorIndex((prev) => (prev === interiorImages.length - 1 ? 0 : prev + 1))
      }, INTERIOR_SLIDE_INTERVAL)
    }

    startAutoSlide()

    return () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current)
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
      }
    }
  }, [interiorImages.length])

  // Handle click pada gambar interior premium
  const handleInteriorImageClick = (index) => {
    setInteriorIndex(index)
    // Reset auto-slide timer
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current)
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }
    // Scroll to Interior Experience section
    if (interiorExperienceRef.current) {
      const isMobile = window.innerWidth < 768 // md breakpoint
      interiorExperienceRef.current.scrollIntoView({
        behavior: 'smooth',
        block: isMobile ? 'start' : 'center'
      })
    }
    // Restart auto-slide setelah jeda
    resumeTimeoutRef.current = setTimeout(() => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current)
      }
      autoSlideIntervalRef.current = setInterval(() => {
        setInteriorIndex((prev) => (prev === interiorImages.length - 1 ? 0 : prev + 1))
      }, INTERIOR_SLIDE_INTERVAL)
    }, INTERIOR_RESUME_DELAY)
  }

  const dealerWhatsApp = '62811668722'

  // Fungsi universal untuk membuka WhatsApp dengan pesan auto-fill
  // Memastikan pesan otomatis terisi di kolom chat WhatsApp (termasuk WhatsApp Business)
  const openWhatsApp = (source) => {
    const carName = car.name
    const typeName = selectedClass ? selectedClass.name : 'Default'
    const colorName = selectedColor ? selectedColor.name : 'Belum dipilih'

    // Buat pesan dengan format yang benar
    const message =
      `*Halo Admin BYD Cirebon,*\n\n` +
      `Saya tertarik dengan mobil berikut:\n\n` +
      `*Nama Mobil:* ${carName}\n` +
      `*Tipe / Class:* ${typeName}\n` +
      `*Warna yang dipilih:* ${colorName}\n\n` +
      `Dikirim dari tombol: ${source} di halaman detail.`

    // Deteksi device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isAndroid = /Android/i.test(navigator.userAgent)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

    // Encode pesan dengan benar untuk WhatsApp
    // Pastikan encoding tepat - encodeURIComponent akan meng-encode \n sebagai %0A
    const encoded = encodeURIComponent(message)
    
    // Format URL universal: wa.me - ini paling reliable untuk semua device
    // Format: https://wa.me/NOMOR?text=PESAN (tanpa tanda + di nomor)
    // Untuk WhatsApp Business, formatnya sama dengan WhatsApp biasa
    const whatsappURL = `https://wa.me/${dealerWhatsApp}?text=${encoded}`
    
    if (isMobile) {
      if (isAndroid) {
        // Android: Coba deep link dulu untuk langsung buka aplikasi
        const androidIntentURL = `whatsapp://send?phone=${dealerWhatsApp}&text=${encoded}`
        
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
        const apiURL = `https://api.whatsapp.com/send?phone=${dealerWhatsApp}&text=${encoded}`
        // Jangan buka tab baru lagi, cukup gunakan yang sudah ada
      }, 100)
    }
  }

  // Spesifikasi detail untuk setiap mobil
  const specifications = {
    'byd-dolphin': {
      engine: 'Electric Motor',
      power: '70 kW (94 HP)',
      torque: '180 Nm',
      battery: '44.9 kWh',
      range: '405 km',
      charging: 'DC Fast Charge: 0-80% dalam 30 menit',
      acceleration: '0-100 km/h dalam 7.3 detik',
      topSpeed: '150 km/h',
      dimensions: '4,290 x 1,770 x 1,570 mm',
      weight: '1,420 kg',
      seats: '5',
      features: [
        '10.1" Rotating Touchscreen',
        'Dirac Audio System',
        '360° Camera',
        'Keyless Entry & Start',
        'LED Headlights',
        'Panoramic Sunroof',
        'Wireless Charging',
        'Bluetooth Connectivity'
      ]
    },
    'byd-atto-1': {
      engine: 'Electric Motor',
      power: '70 kW (94 HP)',
      torque: '180 Nm',
      battery: '32 kWh',
      range: '305 km',
      charging: 'DC Fast Charge: 0-80% dalam 30 menit',
      acceleration: '0-100 km/h dalam 9.8 detik',
      topSpeed: '130 km/h',
      dimensions: '4,465 x 1,875 x 1,625 mm',
      weight: '1,320 kg',
      seats: '5',
      features: [
        '10.1" Touchscreen',
        '6 Speaker Audio System',
        'Rear Camera',
        'Keyless Entry',
        'LED Headlights',
        'Manual AC',
        'USB Charging Ports',
        'Bluetooth Connectivity'
      ]
    },
    'byd-atto-3': {
      engine: 'Electric Motor',
      power: '150 kW (201 HP)',
      torque: '310 Nm',
      battery: '60.48 kWh',
      range: '480 km',
      charging: 'DC Fast Charge: 0-80% dalam 30 menit',
      acceleration: '0-100 km/h dalam 7.3 detik',
      topSpeed: '160 km/h',
      dimensions: '4,455 x 1,875 x 1,615 mm',
      weight: '1,750 kg',
      seats: '5',
      features: [
        '12.8" Rotating Touchscreen',
        'Dirac Audio System',
        '360° Camera',
        'Keyless Entry & Start',
        'LED Matrix Headlights',
        'Panoramic Sunroof',
        'Wireless Charging',
        'NFC Key Card',
        'V2L (Vehicle to Load)',
        'Heat Pump System'
      ]
    },
    'byd-seal': {
      engine: 'Dual Electric Motors',
      power: '390 kW (523 HP)',
      torque: '670 Nm',
      battery: '82.5 kWh',
      range: '700 km',
      charging: 'DC Fast Charge: 0-80% dalam 26 menit',
      acceleration: '0-100 km/h dalam 3.8 detik',
      topSpeed: '180 km/h',
      dimensions: '4,800 x 1,875 x 1,460 mm',
      weight: '2,150 kg',
      seats: '5',
      features: [
        '15.6" Rotating Touchscreen',
        'Dirac Premium Audio (12 Speakers)',
        '360° Camera + Front Camera',
        'Keyless Entry & Start',
        'Matrix LED Headlights',
        'Panoramic Glass Roof',
        'Wireless Charging',
        'NFC Key Card',
        'V2L (Vehicle to Load)',
        'Heat Pump System',
        'Adaptive Cruise Control',
        'Lane Keep Assist',
        'Blind Spot Detection'
      ]
    },
    'byd-sealion-7': {
      engine: 'Dual Electric Motors',
      power: '275 kW (369 HP)',
      torque: '500 Nm',
      battery: '82.5 kWh',
      range: '600 km',
      charging: 'DC Fast Charge: 0-80% dalam 30 menit',
      acceleration: '0-100 km/h dalam 4.9 detik',
      topSpeed: '180 km/h',
      dimensions: '4,830 x 1,925 x 1,720 mm',
      weight: '2,350 kg',
      seats: '7',
      features: [
        '15.6" Rotating Touchscreen',
        'Dirac Premium Audio (12 Speakers)',
        '360° Camera',
        'Keyless Entry & Start',
        'Matrix LED Headlights',
        'Panoramic Sunroof',
        'Wireless Charging',
        'NFC Key Card',
        'V2L (Vehicle to Load)',
        'Heat Pump System',
        'Adaptive Cruise Control',
        'Lane Keep Assist',
        'Blind Spot Detection',
        'Third Row Seating',
        'Power Tailgate'
      ]
    },
    'byd-m6': {
      engine: 'Electric Motor',
      power: '100 kW (134 HP)',
      torque: '250 Nm',
      battery: '71.7 kWh',
      range: '500 km',
      charging: 'DC Fast Charge: 0-80% dalam 35 menit',
      acceleration: '0-100 km/h dalam 9.5 detik',
      topSpeed: '150 km/h',
      dimensions: '4,820 x 1,837 x 1,650 mm',
      weight: '2,050 kg',
      seats: '7',
      features: [
        '12.8" Touchscreen',
        '8 Speaker Audio System',
        '360° Camera',
        'Keyless Entry & Start',
        'LED Headlights',
        'Panoramic Sunroof',
        'Wireless Charging',
        'USB Charging Ports',
        'Third Row Seating',
        'Power Sliding Doors',
        'Power Tailgate'
      ]
    },
    'denza-d9': {
      engine: 'Dual Electric Motors',
      power: '275 kW (369 HP)',
      torque: '500 Nm',
      battery: '103.36 kWh',
      range: '970 km',
      charging: 'DC Fast Charge: 0-80% dalam 20 menit',
      acceleration: '0-100 km/h dalam 4.9 detik',
      topSpeed: '180 km/h',
      dimensions: '5,250 x 1,960 x 1,920 mm',
      weight: '2,650 kg',
      seats: '7',
      features: [
        '17.3" Touchscreen',
        'Dirac Premium Audio (14 Speakers)',
        '360° Camera + Front Camera',
        'Keyless Entry & Start',
        'Matrix LED Headlights',
        'Panoramic Glass Roof',
        'Wireless Charging',
        'NFC Key Card',
        'V2L (Vehicle to Load)',
        'Heat Pump System',
        'Adaptive Cruise Control',
        'Lane Keep Assist',
        'Blind Spot Detection',
        'Third Row Seating',
        'Power Sliding Doors',
        'Power Tailgate',
        'Refrigerator',
        'Massage Seats',
        'Air Suspension'
      ]
    }
  }

  const classDetails = {
    'byd-dolphin': {
      Dynamic: {
        specs: {
          engine: 'Electric Motor',
          power: '150 kW',
          torque: '310 N.m',
          battery: '60.48 kWh',
          range: '490 km',
          acceleration: '0-100 km/h dalam 7.0 s',
          seats: '5'
        },
        features: [
          'Upholstery Fabric',
          '10.1" Rotating Touchscreen',
          'Dirac Audio 6 Speaker',
          'Keyless Entry',
          'Reverse Camera'
        ]
      },
      Premium: {
        specs: {
          engine: 'Electric Motor',
          power: '150 kW',
          torque: '310 N.m',
          battery: '60.48 kWh',
          range: '490 km',
          acceleration: '0-100 km/h dalam 7.0 s',
          seats: '5'
        },
        features: [
          'Leatherette Upholstery',
          'Panoramic Sunroof',
          'Dirac Audio 8 Speaker',
          '360° Surround Camera',
          'ADAS lengkap'
        ]
      }
    },
    'byd-atto-1': {
      Dynamic: {
        specs: {
          engine: 'Electric Motor',
          power: '55 kW',
          torque: '315 N.m',
          battery: '30.08 kWh',
          range: '300 km',
          acceleration: '0-100 km/h dalam 4.9 s',
          seats: '5'
        },
        features: [
          'Velg 16"',
          'Head unit 10.1"',
          'Smart Key',
          '6 Airbags',
          'BYD DiLink OS'
        ]
      },
      Premium: {
        specs: {
          engine: 'Electric Motor',
          power: '55 kW',
          torque: '690 N.m',
          battery: '38.88 kWh',
          range: '380 km',
          acceleration: '0-100 km/h dalam 4.9 s',
          seats: '5'
        },
        features: [
          'Velg 17"',
          'Head unit 12.8"',
          'Panoramic Roof',
          'Wireless Charger',
          'ADAS + Adaptive Cruise'
        ]
      }
    },
    'byd-atto-3': {
      Advanced: {
        specs: {
          engine: 'Electric Motor',
          power: '130 kW',
          torque: '310 N.m',
          battery: '60.48 kWh',
          range: '486 km',
          acceleration: '0-100 km/h dalam 7.3 s',
          seats: '5'
        },
        features: [
          '12.8" Rotating Screen',
          'Dirac Audio',
          'ADAS Basic',
          'Electric Seat Driver',
          '18" Alloy Wheels'
        ]
      },
      Superior: {
        specs: {
          engine: 'Electric Motor',
          power: '130 kW',
          torque: '310 N.m',
          battery: '60.48 kWh',
          range: '486 km',
          acceleration: '0-100 km/h dalam 7.3 s',
          seats: '5'
        },
        features: [
          '15.6" Rotating Screen',
          'Dirac Premium Audio',
          'Full ADAS + Adaptive Cruise',
          'Heated Seats',
          'Panoramic Roof'
        ]
      }
    },
    'byd-seal': {
      Premium: {
        specs: {
          engine: 'Electric Motor',
          power: '230 kW',
          torque: '360 N.m',
          battery: '82.56 kWh',
          range: '650 km',
          acceleration: '0-100 km/h dalam 5.9 s',
          seats: '5'
        },
        features: [
          '15.6" Rotating Screen',
          'Dirac Premium Audio',
          'Adaptive Cruise',
          'Head-up Display',
          'Ventilated Seats'
        ]
      },
      Performance: {
        specs: {
          engine: 'Dual Electric Motors',
          power: '390 kW',
          torque: '670 N.m',
          battery: '82.56 kWh',
          range: '580 km',
          acceleration: '0-100 km/h dalam 3.8 s',
          seats: '5'
        },
        features: [
          'e-Platform 3.0',
          'All Wheel Drive',
          'Brembo Brakes',
          'Launch Control',
          'Heat Pump'
        ]
      }
    },
    'byd-sealion-7': {
      Premium: {
        specs: {
          engine: 'Electric Motor',
          power: '230 kW',
          torque: '390 N.m',
          battery: '82.56 kWh',
          range: '567 km',
          acceleration: '0-100 km/h dalam 6.7 s',
          seats: '7'
        },
        features: [
          '15.6" Screen',
          'Dirac 12 Speaker',
          'Electric Captain Seat',
          'Panoramic Sunroof',
          'ADAS lengkap'
        ]
      },
      Performance: {
        specs: {
          engine: 'Dual Electric Motors',
          power: '390 kW',
          torque: '690 N.m',
          battery: '82.56 kWh',
          range: '542 km',
          acceleration: '0-100 km/h dalam 4.5 s',
          seats: '7'
        },
        features: [
          'Electronic Air Suspension',
          'Massage Seat',
          'Rear Entertainment',
          'Power Tailgate',
          'Enhanced Traction Control'
        ]
      }
    },
    'byd-m6': {
      Standard: {
        specs: {
          engine: 'Electric Motor',
          power: '120 kW (163 PS)',
          torque: '310 N.m',
          battery: '55.4 kWh',
          range: '420 km',
          acceleration: '0-100 km/h dalam 10.1 s',
          dimensions: '4.710 × 1.810 × 1.690 mm',
          wheelbase: '2.800 mm',
          groundClearance: '170 mm',
          batteryType: 'LFP BYD Blade (NEDC)',
          seats: '7'
        },
        features: [
          'Sliding Door Manual',
          '12.8" Touchscreen',
          '6 Speaker',
          'Fabric Seat',
          'Rear AC Control'
        ]
      },
      Superior: {
        specs: {
          engine: 'Electric Motor',
          power: '120 kW (163 PS)',
          torque: '310 N.m',
          battery: '55.4 kWh',
          range: '420 km',
          acceleration: '0-100 km/h dalam 10.1 s',
          dimensions: '4.710 × 1.810 × 1.690 mm',
          wheelbase: '2.800 mm',
          groundClearance: '170 mm',
          batteryType: 'LFP BYD Blade (NEDC)',
          seats: '7'
        },
        features: [
          'Power Sliding Door',
          'Leather Seat',
          'Surround Camera',
          'Captain Seat Row 2',
          'Wireless Charger'
        ]
      },
      'Superior Captain': {
        contactWhatsApp: true,
        specs: {
          engine: 'Electric Motor',
          power: '120 kW (163 PS)',
          torque: '310 N.m',
          battery: '55.4 kWh',
          range: '420 km',
          acceleration: '0-100 km/h dalam 10.1 s',
          dimensions: '4.710 × 1.810 × 1.690 mm',
          wheelbase: '2.800 mm',
          groundClearance: '170 mm',
          batteryType: 'LFP BYD Blade (NEDC)',
          seats: '6'
        },
        features: [
          'Individual Captain Seat',
          'Ottoman Leg Rest',
          'Ambient Light',
          'Premium Audio',
          'Panoramic Roof'
        ]
      }
    },
    'denza-d9': {
      Comfort: {
        specs: {
          engine: 'Dual Motor AWD',
          power: '275 kW (369 HP)',
          torque: '500 Nm',
          battery: '103 kWh',
          range: '620 km',
          seats: '7'
        },
        features: [
          '17.3" Touchscreen',
          '14 Speaker Dirac',
          'Captain Seat Massage',
          'Double Sunroof',
          'Tri-zone Climate'
        ]
      },
      Premium: {
        specs: {
          engine: 'Dual Motor AWD',
          power: '390 kW (523 HP)',
          torque: '700 Nm',
          battery: '103 kWh',
          range: '580 km',
          seats: '7'
        },
        features: [
          'Fridge Built-in',
          'Executive Second Row',
          'AR HUD',
          'Rear Entertainment Screen',
          'Air Suspension'
        ]
      },
      Luxury: {
        specs: {
          engine: 'Dual Motor AWD',
          power: '390 kW (523 HP)',
          torque: '700 Nm',
          battery: '103 kWh',
          range: '550 km',
          seats: '7'
        },
        features: [
          'Full Nappa Leather',
          'Massage + Ventilation All Seats',
          '24 Speaker Premium Audio',
          'Smart Glass Partition',
          'Level 2+ ADAS'
        ]
      }
    }
  }

  const selectedClassDetails =
    classDetails[car.id]?.[selectedClass?.name || ''] || null

  const specs = selectedClassDetails?.specs || specifications[car.id] || {}
  const featuresList = selectedClassDetails?.features || specifications[car.id]?.features || []
  const needsWhatsAppContact = selectedClassDetails?.contactWhatsApp || selectedClass?.contactWhatsApp || false

  return (
    <div className="min-h-screen bg-[#04050c] text-white detail-unit-page relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#05060f] via-[#04050c] to-[#020308]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_18%_10%,rgba(236,173,41,0.25)_0%,transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_80%_0%,rgba(86,129,255,0.25)_0%,transparent_40%)]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute left-10 top-1/3 w-16 h-16 border border-white/10 rounded-[28px]" />
        <div className="absolute right-10 bottom-10 w-20 h-20 border border-white/5 rounded-full" />
      </div>
      <div className="relative z-10">
        <Navbar />
        {/* Hero Image */}
        <div className="relative h-96 md:h-[500px] overflow-hidden mt-24">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 car-name">{car.name}</h1>
          <p className="text-xl text-gray-300 mb-2">{car.description}</p>
          {selectedColor && (
            <p className="text-sm text-gray-300">
              Warna yang dipilih: <span className="font-semibold">{selectedColor.name}</span>
            </p>
          )}
        </div>
      </div>

      {/* Image focus section / gallery eksterior */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-10 pb-4">
        <div className="card-premium rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <div className="md:col-span-2 relative overflow-hidden group">
              <img
                src={selectedDisplayImage}
                alt={car.name}
                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover:from-black/50" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30 pointer-events-none" />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center gap-6 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 premium-heading">
                  Tampilan Eksterior
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[#ecad29] to-[#d99a20] mb-4 rounded-full"></div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Lihat lebih dekat desain eksterior <span className="font-semibold text-[#ecad29]">{car.name}</span>{' '}
                  dengan garis bodi aerodinamis dan karakter khas BYD.
                </p>
              </div>
              {selectedColor && (
                <div className="flex items-center gap-4 mb-6 p-3 bg-black/20 rounded-xl border border-white/10">
                  <span
                    className="w-10 h-10 rounded-full border-2 border-white/60 shadow-lg"
                    style={{ backgroundColor: selectedColor.value }}
                  ></span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                      Warna yang ditampilkan
                    </p>
                    <p className="text-sm font-semibold text-white">{selectedColor.name}</p>
                  </div>
                </div>
              )}

              {finalDisplayedColors.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-medium">
                    Pilih Warna
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {finalDisplayedColors.map((color, index) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColorIndex(index)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                          selectedColorIndex === index
                            ? 'border-[#ecad29] bg-[#ecad29]/15 text-[#ecad29] shadow-[#ecad29]/20'
                            : 'border-gray-600/50 text-gray-200 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-700/40'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border-2 border-white/60 shadow-sm"
                          style={{ backgroundColor: color.value }}
                        ></span>
                        <span className="truncate">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedColor && (
                <p className="text-xs text-gray-300 font-light">
                  Warna yang dipilih:{' '}
                  <span className="font-semibold text-[#ecad29]">{selectedColor.name}</span>
                </p>
              )}

              <p className="text-[11px] text-gray-400 font-light leading-tight">
                *Pilihan warna mungkin sedikit berbeda dengan tampilan warna asli pada unit kendaraan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interior section - grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pb-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-black/35 to-black/70 backdrop-blur-lg p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition-all duration-500 hover:border-[#ecad29]/80">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 premium-heading">Interior Premium</h3>
              <div className="w-full max-w-32 h-1.5 bg-gradient-to-r from-[#ecad29] via-[#d99a20] to-[#ecad29] mb-4 rounded-full premium-glow"></div>
              <p className="text-base text-gray-300 font-light leading-relaxed">
                Klik gambar untuk melihat detail lengkap. Tiga sudut pandang interior untuk memberikan gambaran lengkap mengenai kenyamanan kabin.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {interiorImages.map((image, idx) => (
              <div 
                key={idx} 
                className={`relative h-56 md:h-64 rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer group bg-gradient-to-b from-white/5 via-black/30 to-black/70 shadow-[0_25px_45px_rgba(0,0,0,0.45)] ${
                  interiorIndex === idx 
                    ? 'border-[#ecad29] shadow-[0_25px_55px_rgba(236,173,41,0.35)]'
                    : 'border-white/5 hover:border-white/20'
                }`}
                onClick={() => handleInteriorImageClick(idx)}
              >
                <img 
                  src={image} 
                  alt={`Interior view ${idx + 1}`} 
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    interiorIndex === idx ? 'scale-105' : 'group-hover:scale-110'
                  }`} 
                />
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  interiorIndex === idx 
                    ? 'bg-gradient-to-t from-black/70 via-black/20 to-transparent' 
                    : 'bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70'
                }`} />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className={`text-lg font-semibold mb-1 transition-all duration-300 ${
                    interiorIndex === idx ? 'text-[#ecad29]' : 'text-white'
                  }`}>
                    Interior View {idx + 1}
                  </div>
                  <div className="text-xs text-gray-300 font-light">
                    Klik untuk melihat detail
                  </div>
                </div>
                <div
                  className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 ${
                    interiorIndex === idx
                      ? 'bg-gradient-to-r from-[#ecad29] to-[#f5c65c] text-black'
                      : 'bg-black/60 text-white group-hover:bg-black/70'
                  }`}
                >
                  {interiorIndex === idx ? 'Aktif' : 'Lihat'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interior section - carousel */}
      <div ref={interiorExperienceRef} className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pb-10">
        <div className="card-premium rounded-2xl overflow-hidden border-accent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="relative h-80 md:h-[500px] group overflow-hidden rounded-l-2xl">
              <img
                src={interiorImages[interiorIndex]}
                alt={`Interior slide ${interiorIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
                key={interiorIndex}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <button
                  type="button"
                  className="bg-white/95 text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg"
                  onClick={() => {
                    const now = Date.now()
                    if (now - lastClickTimeRef.current < 300) return // Debounce: ignore clicks within 300ms
                    lastClickTimeRef.current = now

                    setInteriorIndex((prev) => (prev === 0 ? interiorImages.length - 1 : prev - 1))
                    // Reset auto-slide
                    if (autoSlideIntervalRef.current) {
                      clearInterval(autoSlideIntervalRef.current)
                    }
                    if (resumeTimeoutRef.current) {
                      clearTimeout(resumeTimeoutRef.current)
                    }
                    resumeTimeoutRef.current = setTimeout(() => {
                      if (autoSlideIntervalRef.current) {
                        clearInterval(autoSlideIntervalRef.current)
                      }
                      autoSlideIntervalRef.current = setInterval(() => {
                        setInteriorIndex((prev) => (prev === interiorImages.length - 1 ? 0 : prev + 1))
                      }, INTERIOR_SLIDE_INTERVAL)
                    }, INTERIOR_RESUME_DELAY)
                  }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="bg-white/95 text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg"
                  onClick={() => {
                    const now = Date.now()
                    if (now - lastClickTimeRef.current < 300) return // Debounce: ignore clicks within 300ms
                    lastClickTimeRef.current = now

                    setInteriorIndex((prev) => (prev === interiorImages.length - 1 ? 0 : prev + 1))
                    // Reset auto-slide
                    if (autoSlideIntervalRef.current) {
                      clearInterval(autoSlideIntervalRef.current)
                    }
                    if (resumeTimeoutRef.current) {
                      clearTimeout(resumeTimeoutRef.current)
                    }
                    resumeTimeoutRef.current = setTimeout(() => {
                      if (autoSlideIntervalRef.current) {
                        clearInterval(autoSlideIntervalRef.current)
                      }
                      autoSlideIntervalRef.current = setInterval(() => {
                        setInteriorIndex((prev) => (prev === interiorImages.length - 1 ? 0 : prev + 1))
                      }, INTERIOR_SLIDE_INTERVAL)
                    }, INTERIOR_RESUME_DELAY)
                  }}
                >
                  ›
                </button>
              </div>
              <div className="absolute top-6 right-6">
                <div className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <span className="text-white text-sm font-semibold">
                    {interiorIndex + 1} / {interiorImages.length}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center gap-6 bg-gradient-to-br from-gray-900 to-gray-800">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 premium-heading">Interior Experience</h3>
                <div className="w-full max-w-24 h-1 bg-gradient-to-r from-[#ecad29] via-[#d99a20] to-[#ecad29] mb-6 rounded-full"></div>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light mb-6">
                  {currentDescription}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                {interiorImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const now = Date.now()
                      if (now - lastClickTimeRef.current < 300) return // Debounce: ignore clicks within 300ms
                      lastClickTimeRef.current = now

                      setInteriorIndex(idx)
                      // Reset auto-slide
                      if (autoSlideIntervalRef.current) {
                        clearInterval(autoSlideIntervalRef.current)
                      }
                      if (resumeTimeoutRef.current) {
                        clearTimeout(resumeTimeoutRef.current)
                      }
                      resumeTimeoutRef.current = setTimeout(() => {
                        if (autoSlideIntervalRef.current) {
                          clearInterval(autoSlideIntervalRef.current)
                        }
                        autoSlideIntervalRef.current = setInterval(() => {
                          setInteriorIndex((prev) => (prev === interiorImages.length - 1 ? 0 : prev + 1))
                        }, INTERIOR_SLIDE_INTERVAL)
                      }, INTERIOR_RESUME_DELAY)
                    }}
                    className={`transition-all duration-300 ${
                      interiorIndex === idx
                        ? 'w-10 h-3 rounded-full bg-[#ecad29] premium-glow'
                        : 'w-3 h-3 rounded-full bg-gray-600 hover:bg-gray-500'
                    }`}
                  ></button>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500 font-light italic">
                  * Gambar akan berganti otomatis setiap 7 detik. Klik tombol panah atau indikator untuk navigasi manual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        {/* Price and Class Selection */}
        <div className="card-premium rounded-2xl p-8 md:p-10 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 premium-heading">Harga & Tipe Class</h2>
              <div className="w-full max-w-24 h-1 bg-gradient-to-r from-[#ecad29] via-[#d99a20] to-[#ecad29] mb-6 rounded-full"></div>
              {car.classes.length > 1 && (
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Pilih Tipe Class:</label>
                  <select
                    value={selectedClassIndex}
                    onChange={(e) => setSelectedClassIndex(parseInt(e.target.value))}
                    className="w-full px-5 py-4 bg-gray-800/90 border border-gray-700 rounded-xl text-white transition-all backdrop-blur-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#ecad29] focus:border-[#ecad29]"
                  >
                    {car.classes.map((carClass, idx) => (
                      <option key={idx} value={idx}>
                        {carClass.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="mb-6 pb-6 border-b border-gray-700/50">
                {needsWhatsAppContact ? (
                  <div className="text-center py-4">
                    <p className="text-white text-lg font-semibold mb-4">Untuk informasi lebih lanjut mengenai tipe ini, silakan hubungi admin kami:</p>
                  </div>
                ) : (
                  <>
                    <p className="text-transparent bg-clip-text bg-gradient-to-br from-[#ecad29] to-[#d99a20] text-4xl md:text-5xl font-bold mb-3">{displayPrice}</p>
                    {selectedClass && (
                      <p className="text-[#ecad29] text-lg font-semibold uppercase tracking-wide mb-2">Class: {selectedClass.name}</p>
                    )}
                    <p className="text-gray-500 text-sm font-light">* OTR Cirebon (IDR)</p>
                  </>
                )}
              </div>
              {car.brochure && (
                <a
                  href={car.brochure}
                  download
                  className="w-full bg-gradient-to-r from-[#39b6ff] to-[#1e88e5] hover:from-[#1e88e5] hover:to-[#1565c0] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mb-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Brosur
                </a>
              )}
              {needsWhatsAppContact ? (
                <button
                  onClick={() => openWhatsApp('Chat WA Admin - ' + selectedClass?.name)}
                  className="w-full bg-gradient-to-r from-[#25D366] to-[#20BA5A] hover:from-[#20BA5A] hover:to-[#1A9C4A] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Chat WhatsApp Admin
                </button>
              ) : (
                <button
                  onClick={() => openWhatsApp('Konsultasi Sekarang')}
                  className="w-full bg-[#ecad29] hover:bg-[#d99a20] text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Konsultasi Sekarang
                </button>
              )}
            </div>
            {!needsWhatsAppContact && (
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 premium-heading">Ringkasan Spesifikasi</h3>
                <div className="w-full max-w-20 h-1 bg-gradient-to-r from-[#ecad29] via-[#d99a20] to-[#ecad29] mb-6 rounded-full"></div>
                <div className="space-y-3">
                  {specs.engine && (
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Mesin</span>
                      <span className="text-white font-medium">{specs.engine}</span>
                    </div>
                  )}
                  {specs.power && (
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Daya</span>
                      <span className="text-white font-medium">{specs.power}</span>
                    </div>
                  )}
                  {specs.battery && (
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Baterai</span>
                      <span className="text-white font-medium">{specs.battery}</span>
                    </div>
                  )}
                  {specs.range && (
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Jarak Tempuh</span>
                      <span className="text-white font-medium">{specs.range}</span>
                    </div>
                  )}
                  {specs.seats && (
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Kapasitas</span>
                      <span className="text-white font-medium">{specs.seats} Kursi</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Specifications */}
        {!needsWhatsAppContact && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="card-premium rounded-2xl p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-[#ecad29] premium-heading">Spesifikasi Teknis</h3>
            <div className="space-y-4">
              {specs.engine && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Tipe Mesin</p>
                  <p className="text-white font-medium">{specs.engine}</p>
                </div>
              )}
              {specs.power && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Daya Maksimum</p>
                  <p className="text-white font-medium">{specs.power}</p>
                </div>
              )}
                {specs.torque && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Torsi Maksimum</p>
                  <p className="text-white font-medium">{specs.torque}</p>
                </div>
              )}
                {specs.battery && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Kapasitas Baterai</p>
                  <p className="text-white font-medium">{specs.battery}</p>
                </div>
              )}
                {specs.range && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Jarak Tempuh (NEDC)</p>
                  <p className="text-white font-medium">{specs.range}</p>
                </div>
              )}
                {specs.charging && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Waktu Pengisian</p>
                  <p className="text-white font-medium">{specs.charging}</p>
                </div>
              )}
                {specs.acceleration && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Akselerasi</p>
                  <p className="text-white font-medium">{specs.acceleration}</p>
                </div>
              )}
                {specs.topSpeed && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Kecepatan Maksimum</p>
                  <p className="text-white font-medium">{specs.topSpeed}</p>
                </div>
              )}
            </div>
          </div>

          <div className="card-premium rounded-2xl p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-[#ecad29] premium-heading">Dimensi & Berat</h3>
            <div className="space-y-4">
              {specs.dimensions && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Dimensi (P × L × T)</p>
                  <p className="text-white font-medium">{specs.dimensions}</p>
                </div>
              )}
              {specs.weight && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Berat Kosong</p>
                  <p className="text-white font-medium">{specs.weight}</p>
                </div>
              )}
              {specs.wheelbase && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Jarak Sumbu Roda (Wheelbase)</p>
                  <p className="text-white font-medium">{specs.wheelbase}</p>
                </div>
              )}
              {specs.groundClearance && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Ground Clearance</p>
                  <p className="text-white font-medium">{specs.groundClearance}</p>
                </div>
              )}
              {specs.batteryType && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Tipe Baterai</p>
                  <p className="text-white font-medium">{specs.batteryType}</p>
                </div>
              )}
              {specs.seats && (
                <div>
                  <p className="text-gray-400 text-sm mb-1">Kapasitas Penumpang</p>
                  <p className="text-white font-medium">{specs.seats} Kursi</p>
                </div>
              )}
            </div>
          </div>
        </div>
        )}

        {/* Features */}
        {!needsWhatsAppContact && featuresList && featuresList.length > 0 && (
          <div className="card-premium rounded-2xl p-8 md:p-10 mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-[#ecad29] premium-heading">Fitur & Teknologi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuresList.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#ecad29] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        {/* <div className="bg-gradient-to-r from-[#a76b18] via-[#c7851f] to-[#d39727] rounded-2xl p-10 md:p-12 text-center premium-glow border border-white/10">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white premium-heading">Tertarik dengan {car.name}?</h3>
          <p className="text-lg md:text-xl mb-8 text-white/95 font-light max-w-2xl mx-auto">
            Hubungi kami sekarang untuk informasi lebih lanjut dan penawaran terbaik!
          </p>
          <button
            onClick={() => openWhatsApp('Hubungi Kami')}
            className="bg-white text-[#ecad29] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Hubungi Kami
          </button>
        </div> */}
      </div>
        <div className="footer-gradient-line"></div>
        <Footer />
      </div>
    </div>
  )
}

export default DetailUnit

