const data = [
    {
        place:'BYD - Kota Cirebon',
        title:'BYD',
        title2:'ATTO1',
        description:'BYD ATTO1 adalah mobil listrik yang dirancang untuk kemudahan dan kenyamanan pengguna. Dengan desain yang modern dan teknologi terkini, mobil ini memberikan pengalaman berkendara yang tak terlupakan.',
        image:'images/BYDATTO1.jpg'
    },
    {
        place:'BYD - Kota Cirebon',
        title:'BYD',
        title2:'ATTO3',
        description:'BYD ATTO3 adalah mobil listrik yang dirancang untuk kemudahan dan kenyamanan pengguna. Dengan desain yang modern dan teknologi terkini, mobil ini memberikan pengalaman berkendara yang tak terlupakan.',
        image:'images/BYDATTO3.jpg'
    },
    {
        place:'BYD - Kota Cirebon',
        title:'BYD',
        title2:'DENZA',
        description:'BYD DENZA adalah mobil listrik yang dirancang untuk kemudahan dan kenyamanan pengguna. Dengan desain yang modern dan teknologi terkini, mobil ini memberikan pengalaman berkendara yang tak terlupakan.',
        image:'images/BYDDENZA.jpg'
    },
    {
        place:'BYD - Kota Cirebon',
        title:'BYD',
        title2:'DOLPHIN',
        description:'BYD DOLPHIN adalah mobil listrik yang dirancang untuk kemudahan dan kenyamanan pengguna. Dengan desain yang modern dan teknologi terkini, mobil ini memberikan pengalaman berkendara yang tak terlupakan.',
        image:'images/BYDDOLPHIN.jpg'
    },
    {
        place:'BYD - Kota Cirebon',
        title:'BYD',
        title2:'M6',
        description:'BYD M6 adalah mobil listrik yang dirancang untuk kemudahan dan kenyamanan pengguna. Dengan desain yang modern dan teknologi terkini, mobil ini memberikan pengalaman berkendara yang tak terlupakan.',
        image:'images/BYDM6.jpg'
    },
    {
        place:'BYD - Kota Cirebon',
        title:'BYD',
        title2:'SEAL',
        description:'BYD SEAL adalah mobil listrik yang dirancang untuk kemudahan dan kenyamanan pengguna. Dengan desain yang modern dan teknologi terkini, mobil ini memberikan pengalaman berkendara yang tak terlupakan.',
        image:'images/BYDSEAL.jpg'
    },
    {
        place:'BYD - Kota Cirebon',
        title:'BYD',
        title2:'SEALION',
        description:'BYD SEALION adalah mobil listrik yang dirancang untuk kemudahan dan kenyamanan pengguna. Dengan desain yang modern dan teknologi terkini, mobil ini memberikan pengalaman berkendara yang tak terlupakan.',
        image:'images/BYDSEALION.jpg'
  },
]

const _ = (id)=>document.getElementById(id)
const cards = data.map((i, index)=>`<div class="card" id="card${index}" style="background-image:url(${i.image})"  ></div>`).join('')



const cardContents = data.map((i, index)=>`<div class="card-content" id="card-content-${index}">
<div class="content-start"></div>
<div class="content-place">${i.place}</div>
<div class="content-title-1">${i.title}</div>
<div class="content-title-2">${i.title2}</div>

</div>`).join('')


_('demo').innerHTML =  cards + cardContents


const range = (n) =>
  Array(n)
    .fill(0)
    .map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
  return `#card${index}`;
}
function getCardContent(index) {
  return `#card-content-${index}`;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

let order = [0, 1, 2, 3, 4, 5, 6];
let detailsEven = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
const ease = "sine.inOut";

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;
  
  // Responsive adjustments
  if (width <= 768) {
    offsetTop = height - 280;
    offsetLeft = width - 250;
    cardWidth = 140;
    cardHeight = 200;
    gap = 16;
  } else {
    // Desktop: posisikan kartu lebih ke kanan agar tidak menutupi teks
    offsetTop = height - 430;
    offsetLeft = width - 600;
    cardWidth = 200;
    cardHeight = 300;
    gap = 40;
  }

  const paginationTop = width <= 768 ? offsetTop + 250 : offsetTop + 330;
  const paginationLeft = width <= 768 ? 20 : offsetLeft;
  gsap.set("#pagination", {
    top: paginationTop,
    left: paginationLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });
  gsap.set("nav", { y: -200, opacity: 0 });
  gsap.set(".cover", { x: 0, y: 0 });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 25, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  const progressWidth = window.innerWidth > 768 ? 500 : Math.min(400, window.innerWidth - 40);
  gsap.set(".progress-sub-foreground", {
    width: progressWidth * (1 / order.length) * (active + 1),
  });

  const cardStartX = width <= 768 ? offsetLeft + 150 : offsetLeft + 400;
  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: cardStartX + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    gsap.set(getCardContent(i), {
      x: cardStartX + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
  });

  const startDelay = 0.6;

  // Animate cover to slide out
  gsap.to(".cover", {
    x: width + 400,
    duration: 0.6,
    delay: 0.5,
    ease: "power2.inOut",
    onComplete: () => {
      // Hide cover after animation
      gsap.set(".cover", { display: "none" });
      setTimeout(() => {
        loop();
      }, 500);
    },
  });
  
  rest.forEach((i, index) => {
    const finalX = width <= 768 ? offsetLeft + index * (cardWidth + gap) : offsetLeft + index * (cardWidth + gap);
    gsap.to(getCard(i), {
      x: finalX,
      zIndex: 30,
      delay: startDelay + 0.05 * index,
      ease,
    });
    gsap.to(getCardContent(i), {
      x: finalX,
      zIndex: 40,
      delay: startDelay + 0.05 * index,
      ease,
    });
  });
  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

let clicks = 0;

function step() {
  return new Promise((resolve) => {
    order.push(order.shift());
    detailsEven = !detailsEven;

    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    // Hide inactive details first (before card expands)
    gsap.set(detailsInactive, { zIndex: 12 });
    gsap.to(detailsInactive, { 
      opacity: 0, 
      duration: 0.3,
      ease,
      onComplete: () => {
        // Reset inactive details position
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
      }
    });

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    const progressWidth = window.innerWidth > 768 ? 500 : Math.min(400, window.innerWidth - 40);
    gsap.to(".progress-sub-foreground", {
      width: progressWidth * (1 / order.length) * (active + 1),
      ease,
    });

    // Update active details content
    document.querySelector(`${detailsActive} .place-box .text`).textContent =
      data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent =
      data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent =
      data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent =
      data[order[0]].description;

    // Set active details initial state (hidden)
    gsap.set(detailsActive, { zIndex: 25, opacity: 0 });
    gsap.set(`${detailsActive} .text`, { y: 100 });
    gsap.set(`${detailsActive} .title-1`, { y: 100 });
    gsap.set(`${detailsActive} .title-2`, { y: 100 });
    gsap.set(`${detailsActive} .desc`, { y: 50 });
    gsap.set(`${detailsActive} .cta`, { y: 60 });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      onComplete: () => {
        // Show new details AFTER card becomes full screen
        gsap.to(detailsActive, { opacity: 1, duration: 0.1, ease });
        gsap.to(`${detailsActive} .text`, {
          y: 0,
          delay: 0.05,
          duration: 0.2,
          ease,
        });
        gsap.to(`${detailsActive} .title-1`, {
          y: 0,
          delay: 0.1,
          duration: 0.2,
          ease,
        });
        gsap.to(`${detailsActive} .title-2`, {
          y: 0,
          delay: 0.1,
          duration: 0.2,
          ease,
        });
        gsap.to(`${detailsActive} .desc`, {
          y: 0,
          delay: 0.15,
          duration: 0.2,
          ease,
        });
        gsap.to(`${detailsActive} .cta`, {
          y: 0,
          delay: 0.2,
          duration: 0.2,
          onComplete: resolve,
          ease,
        });
        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
        });

        gsap.set(getCardContent(prv), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
        });

        clicks -= 1;
        if (clicks > 0) {
          step();
        }
      },
    });

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          ease,
          delay: 0.1 * (index + 1),
        });

        gsap.to(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          ease,
          delay: 0.1 * (index + 1),
        });
      }
    });
  });
}

async function loop() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  await step();
  loop();
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

async function start() {
  try {
    // Wait for GSAP to be ready
    if (typeof gsap === 'undefined') {
      console.error('GSAP is not loaded');
      return;
    }
    await loadImages();
    init();
  } catch (error) {
    console.error("One or more images failed to load", error);
    // Still try to init even if images fail
    init();
  }
}

// Handle window resize for responsive design
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Reset cover position on resize
    gsap.set(".cover", { x: 0, y: 0, display: "block" });
    init();
  }, 250);
});

// Loading screen function
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500); // Match the transition duration
  }
}

// Wait for DOM and GSAP to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen initially
    setTimeout(() => {
      start();
      // Hide loading screen after initialization
      setTimeout(hideLoadingScreen, 1000);
    }, 100);
  });
} else {
  // DOM is already ready, wait a bit for GSAP
  setTimeout(() => {
    start();
    // Hide loading screen after initialization
    setTimeout(hideLoadingScreen, 1000);
  }, 100);
}
