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
          y: offsetTop + cardHeight - 100,
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
              y: offsetTop + cardHeight - 100,
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
              y: offsetTop + cardHeight - 100,
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
        loopDelayRef.current = setTimeout(resolve, 2000)
      })
      if (isCancelledRef.current) return
      await step()
      if (isCancelledRef.current) return
      loop()
    }

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
      resizeTimeoutRef.current = setTimeout(handleResize, 250)
    }
    window.addEventListener('resize', resizeListener)

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
            <div key={index} className="card-content" id={`card-content-${index}`}>
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
          <div className="text">BYD - Kota Cirebon</div>
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
          <div className="text">BYD - Kota Cirebon</div>
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
    </>
  )
}

export default Hero

