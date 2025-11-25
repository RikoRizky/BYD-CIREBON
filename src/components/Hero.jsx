import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { carouselData } from '../data/carouselData'

function Hero() {
  const demoRef = useRef(null)
  const detailsEvenElementRef = useRef(null)
  const detailsOddElementRef = useRef(null)
  const coverRef = useRef(null)
  const detailsEvenRef = useRef(true)
  const orderRef = useRef([0, 1, 2, 3, 4, 5, 6])
  const loopDelayRef = useRef(null)
  const coverTimeoutRef = useRef(null)
  const resizeTimeoutRef = useRef(null)
  const isCancelledRef = useRef(false)
  const prevWidthRef = useRef(window.innerWidth)
  const touchStartXRef = useRef(null)
  const touchStartYRef = useRef(null)
  const isSwipingRef = useRef(false)
  const stepFunctionRef = useRef(null)
  const loopFunctionRef = useRef(null)
  const mouseDownXRef = useRef(null)
  const mouseDownYRef = useRef(null)
  const isDraggingRef = useRef(false)
  const clickStartTimeRef = useRef(null)
  const hasMovedRef = useRef(false)
  const lastSwipeTimeRef = useRef(0)
  const isProcessingSwipeRef = useRef(false)

  useEffect(() => {
    isCancelledRef.current = false
    if (!demoRef.current) return

    let offsetTop = 200
    let offsetLeft = 700
    let cardWidth = 200
    let cardHeight = 300
    let gap = 40
    const ease = "sine.inOut"

    const getCard = (index) => `#card${index}`
    const getCardContent = (index) => `#card-content-${index}`

    const init = () => {
      const [active, ...rest] = orderRef.current
      const currentDetailsEven = detailsEvenRef.current
      const detailsActive = currentDetailsEven ? "#details-even" : "#details-odd"
      const detailsInactive = currentDetailsEven ? "#details-odd" : "#details-even"
      const { innerHeight: height, innerWidth: width } = window

      // Responsive adjustments
      if (width <= 768) {
        offsetTop = height - 280
        offsetLeft = width - 250
        cardWidth = 140
        cardHeight = 200
        gap = 16
      } else {
        offsetTop = height - 430
        offsetLeft = width - 600
        cardWidth = 200
        cardHeight = 300
        gap = 40
      }

      gsap.set("nav", { y: -200, opacity: 0 })
      gsap.set(coverRef.current, { x: 0, y: 0 })

      gsap.set(getCard(active), {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      })
      gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 })
      
      // Update active details content
      document.querySelector(`${detailsActive} .place-box .text`).textContent =
        carouselData[active].place
      document.querySelector(`${detailsActive} .title-1`).textContent =
        carouselData[active].title
      document.querySelector(`${detailsActive} .title-2`).textContent =
        carouselData[active].title2
      document.querySelector(`${detailsActive} .desc`).textContent =
        carouselData[active].description
      
      gsap.set(detailsActive, { opacity: 0, zIndex: 25, x: -200 })
      gsap.set(detailsInactive, { opacity: 0, zIndex: 12 })
      gsap.set(`${detailsInactive} .text`, { y: 100 })
      gsap.set(`${detailsInactive} .title-1`, { y: 100 })
      gsap.set(`${detailsInactive} .title-2`, { y: 100 })
      gsap.set(`${detailsInactive} .desc`, { y: 50 })
      gsap.set(`${detailsInactive} .cta`, { y: 60 })

      const cardStartX = width <= 768 ? offsetLeft + 150 : offsetLeft + 400
      rest.forEach((i, index) => {
        gsap.set(getCard(i), {
          x: cardStartX + index * (cardWidth + gap),
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
        })
        gsap.set(getCardContent(i), {
          x: cardStartX + index * (cardWidth + gap),
          zIndex: 40,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
        })
      })

      const startDelay = 0.6

      // Animate cover to slide out
      gsap.to(coverRef.current, {
        x: width + 400,
        duration: 0.6,
        delay: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(coverRef.current, { display: "none" })
          if (coverTimeoutRef.current) {
            clearTimeout(coverTimeoutRef.current)
          }
          coverTimeoutRef.current = setTimeout(() => {
            if (!isCancelledRef.current) {
              loop()
            }
          }, 500)
        },
      })

      rest.forEach((i, index) => {
        const finalX = width <= 768 ? offsetLeft + index * (cardWidth + gap) : offsetLeft + index * (cardWidth + gap)
        gsap.to(getCard(i), {
          x: finalX,
          zIndex: 30,
          delay: startDelay + 0.05 * index,
          ease,
        })
        gsap.to(getCardContent(i), {
          x: finalX,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 40,
          delay: startDelay + 0.05 * index,
          ease,
        })
      })
      gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay })
      gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay })
    }

    const step = () => {
      return new Promise((resolve) => {
        if (isCancelledRef.current) {
          resolve()
          return
        }
        orderRef.current.push(orderRef.current.shift())
        detailsEvenRef.current = !detailsEvenRef.current
        const newDetailsEven = detailsEvenRef.current
        const detailsActive = newDetailsEven ? "#details-even" : "#details-odd"
        const detailsInactive = newDetailsEven ? "#details-odd" : "#details-even"

        const [active, ...rest] = orderRef.current
        const prv = rest[rest.length - 1]

        gsap.set(detailsInactive, { zIndex: 12 })
        gsap.to(detailsInactive, {
          opacity: 0,
          duration: 0.3,
          ease,
          onComplete: () => {
            gsap.set(`${detailsInactive} .text`, { y: 100 })
            gsap.set(`${detailsInactive} .title-1`, { y: 100 })
            gsap.set(`${detailsInactive} .title-2`, { y: 100 })
            gsap.set(`${detailsInactive} .desc`, { y: 50 })
            gsap.set(`${detailsInactive} .cta`, { y: 60 })
          }
        })

        gsap.set(getCard(prv), { zIndex: 10 })
        gsap.set(getCard(active), { zIndex: 20 })
        gsap.to(getCard(prv), { scale: 1.5, ease })

        gsap.to(getCardContent(active), {
          y: offsetTop + cardHeight - 10,
          opacity: 0,
          duration: 0.3,
          ease,
        })

        // Update active details content BEFORE animation
        document.querySelector(`${detailsActive} .place-box .text`).textContent =
          carouselData[active].place
        document.querySelector(`${detailsActive} .title-1`).textContent =
          carouselData[active].title
        document.querySelector(`${detailsActive} .title-2`).textContent =
          carouselData[active].title2
        document.querySelector(`${detailsActive} .desc`).textContent =
          carouselData[active].description

        // Set active details initial state (hidden)
        gsap.set(detailsActive, { zIndex: 25, opacity: 0 })
        gsap.set(`${detailsActive} .text`, { y: 100 })
        gsap.set(`${detailsActive} .title-1`, { y: 100 })
        gsap.set(`${detailsActive} .title-2`, { y: 100 })
        gsap.set(`${detailsActive} .desc`, { y: 50 })
        gsap.set(`${detailsActive} .cta`, { y: 60 })

        gsap.to(getCard(active), {
          x: 0,
          y: 0,
          ease,
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
          onComplete: () => {
            // Show new details AFTER card becomes full screen

            gsap.to(detailsActive, { opacity: 1, duration: 0.1, ease })
            gsap.to(`${detailsActive} .text`, {
              y: 0,
              delay: 0.05,
              duration: 0.2,
              ease,
            })
            gsap.to(`${detailsActive} .title-1`, {
              y: 0,
              delay: 0.1,
              duration: 0.2,
              ease,
            })
            gsap.to(`${detailsActive} .title-2`, {
              y: 0,
              delay: 0.1,
              duration: 0.2,
              ease,
            })
            gsap.to(`${detailsActive} .desc`, {
              y: 0,
              delay: 0.15,
              duration: 0.2,
              ease,
            })
            gsap.to(`${detailsActive} .cta`, {
              y: 0,
              delay: 0.2,
              duration: 0.2,
              ease,
              onComplete: resolve,
            })

            const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap)
            gsap.set(getCard(prv), {
              x: xNew,
              y: offsetTop,
              width: cardWidth,
              height: cardHeight,
              zIndex: 30,
              borderRadius: 10,
              scale: 1,
            })

            gsap.set(getCardContent(prv), {
              x: xNew,
              y: offsetTop,
              width: cardWidth,
              height: cardHeight,
              opacity: 1,
              zIndex: 40,
            })
          },
        })

        rest.forEach((i, index) => {
          if (i !== prv) {
            const xNew = offsetLeft + index * (cardWidth + gap)
            gsap.set(getCard(i), { zIndex: 30 })
            gsap.to(getCard(i), {
              x: xNew,
              y: offsetTop,
              width: cardWidth,
              height: cardHeight,
              ease,
              delay: 0.1 * (index + 1),
            })

            gsap.to(getCardContent(i), {
              x: xNew,
              y: offsetTop,
              width: cardWidth,
              height: cardHeight,
              opacity: 1,
              zIndex: 40,
              ease,
              delay: 0.1 * (index + 1),
            })
          }
        })
      })
    }

    const loop = async () => {
      if (isCancelledRef.current) return
      await new Promise(resolve => {
        loopDelayRef.current = setTimeout(resolve, 7000)
      })
      if (isCancelledRef.current) return
      await step()
      if (isCancelledRef.current) return
      loop()
    }
    
    // Store references for external access
    stepFunctionRef.current = step
    loopFunctionRef.current = loop

    const loadImages = async () => {
      const promises = carouselData.map(({ image }) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve(img)
          img.onerror = reject
          img.src = image
        })
      })
      return Promise.all(promises)
    }

    const start = async () => {
      try {
        await loadImages()
        init()
      } catch (error) {
        console.error("One or more images failed to load", error)
        init()
      }
    }

    const resetTimer = () => {
      if (loopDelayRef.current) {
        clearTimeout(loopDelayRef.current)
        loopDelayRef.current = null
      }
      if (!isCancelledRef.current && loopFunctionRef.current) {
        loopFunctionRef.current()
      }
    }

    const handleSwipeAction = async () => {
      // Throttle: hanya bisa swipe sekali per detik
      const now = Date.now()
      if (isProcessingSwipeRef.current || (now - lastSwipeTimeRef.current) < 1000) {
        return
      }
      
      isProcessingSwipeRef.current = true
      lastSwipeTimeRef.current = now
      
      if (loopDelayRef.current) {
        clearTimeout(loopDelayRef.current)
        loopDelayRef.current = null
      }
      
      // Swipe left - next card only
      if (stepFunctionRef.current) {
        await stepFunctionRef.current()
      }
      
      if (!isCancelledRef.current && loopFunctionRef.current) {
        loopFunctionRef.current()
      }
      
      // Reset processing flag after a short delay
      setTimeout(() => {
        isProcessingSwipeRef.current = false
      }, 1000)
    }

    const handleTouchStart = (e) => {
      // Don't handle swipe if touching card-content
      if (e.target.closest('.card-content')) {
        return
      }
      touchStartXRef.current = e.touches[0].clientX
      touchStartYRef.current = e.touches[0].clientY
      isSwipingRef.current = false
      clickStartTimeRef.current = Date.now()
      hasMovedRef.current = false
    }

    const handleTouchMove = (e) => {
      if (touchStartXRef.current === null || touchStartYRef.current === null) return
      
      const touchX = e.touches[0].clientX
      const touchY = e.touches[0].clientY
      const deltaX = touchX - touchStartXRef.current
      const deltaY = touchY - touchStartYRef.current
      
      // Mark as moved if movement is significant
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        hasMovedRef.current = true
      }
      
      // Determine if this is a horizontal swipe
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isSwipingRef.current = true
      }
    }

    const handleTouchEnd = async (e) => {
      if (touchStartXRef.current === null || touchStartYRef.current === null) {
        touchStartXRef.current = null
        touchStartYRef.current = null
        isSwipingRef.current = false
        return
      }
      
      const touchX = e.changedTouches[0].clientX
      const touchY = e.changedTouches[0].clientY
      const deltaX = touchX - touchStartXRef.current
      const deltaY = touchY - touchStartYRef.current
      
      // Check if it's a horizontal swipe to the left only
      if (isSwipingRef.current && deltaX < -50 && Math.abs(deltaX) > Math.abs(deltaY)) {
        await handleSwipeAction()
      }
      
      touchStartXRef.current = null
      touchStartYRef.current = null
      isSwipingRef.current = false
    }

    const handleMouseDown = (e) => {
      // Don't handle drag if clicking on card-content
      if (e.target.closest('.card-content')) {
        return
      }
      mouseDownXRef.current = e.clientX
      mouseDownYRef.current = e.clientY
      isDraggingRef.current = false
      clickStartTimeRef.current = Date.now()
      hasMovedRef.current = false
    }

    const handleMouseMove = (e) => {
      if (mouseDownXRef.current === null || mouseDownYRef.current === null) return
      
      const mouseX = e.clientX
      const mouseY = e.clientY
      const deltaX = mouseX - mouseDownXRef.current
      const deltaY = mouseY - mouseDownYRef.current
      
      // Mark as moved if movement is significant
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        hasMovedRef.current = true
      }
      
      // Determine if this is a horizontal drag
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isDraggingRef.current = true
      }
    }

    const handleMouseUp = async (e) => {
      if (mouseDownXRef.current === null || mouseDownYRef.current === null) {
        mouseDownXRef.current = null
        mouseDownYRef.current = null
        isDraggingRef.current = false
        return
      }
      
      const mouseX = e.clientX
      const mouseY = e.clientY
      const deltaX = mouseX - mouseDownXRef.current
      const deltaY = mouseY - mouseDownYRef.current
      
      // Check if it's a horizontal drag to the left only
      if (isDraggingRef.current && deltaX < -50 && Math.abs(deltaX) > Math.abs(deltaY)) {
        await handleSwipeAction()
      }
      
      mouseDownXRef.current = null
      mouseDownYRef.current = null
      isDraggingRef.current = false
    }
    
    const handleGlobalMouseMove = (e) => {
      if (mouseDownXRef.current !== null) {
        handleMouseMove(e)
      }
    }
    
    const handleGlobalMouseUp = async (e) => {
      if (mouseDownXRef.current !== null) {
        await handleMouseUp(e)
      }
    }

    start()

    const handleResize = () => {
      if (isCancelledRef.current) return
      if (loopDelayRef.current) {
        clearTimeout(loopDelayRef.current)
      }
      gsap.set(coverRef.current, { x: 0, y: 0, display: "block" })
      init()
    }

    const resizeListener = () => {
      clearTimeout(resizeTimeoutRef.current)
      resizeTimeoutRef.current = setTimeout(() => {
        if (window.innerWidth !== prevWidthRef.current) {
          prevWidthRef.current = window.innerWidth
          handleResize()
        }
      }, 250)
    }
    window.addEventListener('resize', resizeListener)
    
    // Add touch and mouse event listeners for swipe
    const demoElement = demoRef.current
    if (demoElement) {
      demoElement.addEventListener('touchstart', handleTouchStart, { passive: true })
      demoElement.addEventListener('touchmove', handleTouchMove, { passive: true })
      demoElement.addEventListener('touchend', handleTouchEnd, { passive: true })
      demoElement.addEventListener('mousedown', handleMouseDown)
    }
    // Add global mouse listeners for drag handling
    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('mouseup', handleGlobalMouseUp)

    return () => {
      isCancelledRef.current = true
      if (loopDelayRef.current) {
        clearTimeout(loopDelayRef.current)
      }
      if (coverTimeoutRef.current) {
        clearTimeout(coverTimeoutRef.current)
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      window.removeEventListener('resize', resizeListener)
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('mouseup', handleGlobalMouseUp)
      if (demoElement) {
        demoElement.removeEventListener('touchstart', handleTouchStart)
        demoElement.removeEventListener('touchmove', handleTouchMove)
        demoElement.removeEventListener('touchend', handleTouchEnd)
        demoElement.removeEventListener('mousedown', handleMouseDown)
      }
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToAbout = () => {
    scrollToSection('about')
  }

  const handleCardClick = async (cardIndex, e) => {
    if (e) {
      e.stopPropagation()
    }
    
    // Prevent click if component is cancelled or if swipe is processing
    if (isCancelledRef.current || isProcessingSwipeRef.current) {
      return
    }
    
    // Throttle: hanya bisa klik sekali per detik
    const now = Date.now()
    if ((now - lastSwipeTimeRef.current) < 1000) {
      return
    }
    
    isProcessingSwipeRef.current = true
    lastSwipeTimeRef.current = now
    
    // Langsung ke gambar selanjutnya (bukan ke kartu yang diklik)
    if (loopDelayRef.current) {
      clearTimeout(loopDelayRef.current)
      loopDelayRef.current = null
    }
    
    if (stepFunctionRef.current) {
      await stepFunctionRef.current()
    }
    
    if (!isCancelledRef.current && loopFunctionRef.current) {
      loopFunctionRef.current()
    }
    
    // Reset processing flag after a short delay
    setTimeout(() => {
      isProcessingSwipeRef.current = false
    }, 1000)
  }

  return (
    <>
      <div id="home">
        <div id="demo" ref={demoRef}>
          {carouselData.map((item, index) => (
            <div
              key={index}
              className="card"
              id={`card${index}`}
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
          ))}
          {carouselData.map((item, index) => (
            <div 
              key={index} 
              className="card-content" 
              id={`card-content-${index}`}
              onClick={(e) => {
                e.stopPropagation()
                handleCardClick(index, e)
              }}
              onMouseDown={(e) => {
                clickStartTimeRef.current = Date.now()
                hasMovedRef.current = false
              }}
              style={{ 
                cursor: 'pointer', 
                userSelect: 'none',
                pointerEvents: 'auto',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <div className="content-start"></div>
              <div className="content-place">{item.place}</div>
              <div className="content-title-1">{item.title}</div>
              <div className="content-title-2">{item.title2}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="details" id="details-even" ref={detailsEvenElementRef}>
        <div className="place-box">
          <div className="text">BYD Harmony Cirebon</div>
        </div>
        <div className="title-box-1">
          <div className="title-1">BYD</div>
        </div>
        <div className="title-box-2">
          <div className="title-2">ATTO1</div>
        </div>
        <div className="desc">
          BYD ATTO1 adalah mobil listrik yang dirancang untuk kemudahan dan kenyamanan pengguna. Dengan desain yang modern dan teknologi terkini, mobil ini memberikan pengalaman berkendara yang tak terlupakan.
        </div>
        <div className="cta">
          <button className="bookmark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="discover" onClick={() => scrollToSection('pricelist')}>
            Lihat Selengkapnya
          </button>
        </div>
      </div>

      <div className="details" id="details-odd" ref={detailsOddElementRef}>
        <div className="place-box">
          <div className="text">BYD Harmony Cirebon</div>
        </div>
        <div className="title-box-1">
          <div className="title-1">BYD</div>
        </div>
        <div className="title-box-2">
          <div className="title-2">ATTO1</div>
        </div>
        <div className="desc">
          BYD ATTO1 adalah mobil listrik yang dirancang untuk kemudahan dan kenyamanan pengguna. Dengan desain yang modern dan teknologi terkini, mobil ini memberikan pengalaman berkendara yang tak terlupakan.
        </div>
        <div className="cta">
          <button className="bookmark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="discover" onClick={() => scrollToSection('pricelist')}>
            Lihat Selengkapnya
          </button>
        </div>
      </div>

      <div className="cover" ref={coverRef}></div>

      {/* Scroll Down Arrow Indicator */}
      <div 
        className="scroll-down-arrow"
        onClick={scrollToAbout}
        aria-label="Scroll to About section"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="arrow-icon"
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="#ecad29"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  )
}

export default Hero

