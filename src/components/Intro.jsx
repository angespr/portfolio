import { useEffect, useLayoutEffect, useRef } from 'react'
import bubble1 from '../assets/bubble1.png'
import bubblestar from '../assets/starbubble.png'
import nameLogo from '../assets/namelogo.png'
import lineImage from '../assets/dotline.png'

const PHRASES = [
  'Building secure things!',
  'Crafting beautiful interfaces!',
  'Solving complex problems!',
  'Learning something new every day!',
]

const COLORS = ['#9d84c9', '#f79bc7', '#f3cc98', '#b8a8e0', '#f5b8d8']


function IntroCanvas({ wrapRef, canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')

    let W, H, frame = 0, animId
    let sparkles = []

    function resize() {
      const dpr = window.devicePixelRatio || 1

      const rect = wrap.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      W = rect.width
      H = rect.height
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    function spawnDecoSparkle() {
      return {
        x: 30 + Math.random() * (W - 60),
        y: Math.random() * H,
        ch: '✦',
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 12 + Math.random() * 10,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        spin: Math.random() * Math.PI * 2,
        spinV: (Math.random() - 0.5) * 0.045,
        pulse: Math.random() * Math.PI * 2,
        alive: true,
        opacity: 0,
      }
    }

    function initSparkles() {
      sparkles = []
      for (let i = 0; i < 18; i++) sparkles.push(spawnDecoSparkle())
    }

    function drawStar(cx, cy, r, spin, alpha) {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(cx, cy)
      ctx.rotate(spin)

      // outer star shape 
      ctx.beginPath()
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i
        const rad = i % 2 === 0 ? r : r * 0.38
        i === 0
          ? ctx.moveTo(Math.cos(angle) * rad, Math.sin(angle) * rad)
          : ctx.lineTo(Math.cos(angle) * rad, Math.sin(angle) * rad)
      }
      ctx.closePath()

      // fill star
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.shadowColor = 'rgba(255,255,255,0.6)'
      ctx.shadowBlur = 12
      ctx.fill()

      ctx.restore()
    }

    function loop() {
      animId = requestAnimationFrame(loop)
      ctx.clearRect(0, 0, W, H)
      frame++

      if (frame % 35 === 0 && sparkles.length < 20) {
        sparkles.push(spawnDecoSparkle())
      }

      sparkles.forEach(s => {
        if (!s.alive) return
        s.x += s.vx; s.y += s.vy
        s.spin += s.spinV; s.pulse += 0.05
        s.opacity = Math.min(1, s.opacity + 0.04)
        const r = s.size * (1 + 0.08 * Math.sin(s.pulse))
        const padding = 45
        if (s.x < padding || s.x > W - padding) s.vx *= -1
        if (s.y < padding || s.y > H - padding) s.vy *= -1
        drawStar(s.x, s.y, r, s.spin, s.color, s.opacity, s.ch, s.size)
      })
    }

    initSparkles()
    loop()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return null
}

// Typing loop
function useTyping(ref) {
  useEffect(() => {
    let pi = 0, ci = 0, deleting = false, timer
    const tick = () => {
      const el = ref.current; if (!el) return
      const phrase = PHRASES[pi]
      if (!deleting) {
        ci++
        el.innerHTML = phrase.slice(0, ci) +
          '<span style="display:inline-block;width:2px;height:1em;background:var(--purple);margin-left:2px;vertical-align:middle;animation:blink 1s step-end infinite;"></span>'
        if (ci === phrase.length) { deleting = true; timer = setTimeout(tick, 1900); return }
        timer = setTimeout(tick, 50)
      } else {
        ci--
        el.innerHTML = phrase.slice(0, ci) +
          '<span style="display:inline-block;width:2px;height:1em;background:var(--purple);margin-left:2px;vertical-align:middle;animation:blink 1s step-end infinite;"></span>'
        if (ci === 0) { deleting = false; pi = (pi + 1) % PHRASES.length; timer = setTimeout(tick, 320); return }
        timer = setTimeout(tick, 28)
      }
    }
    timer = setTimeout(tick, 700)
    return () => clearTimeout(timer)
  }, [ref])
}

function Intro() {
  const wrapRef   = useRef(null)
  const canvasRef = useRef(null)
  const typingRef = useRef(null)
  useTyping(typingRef)

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

 return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '60px',
        padding: '0px 24px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      
      <svg width="0" height="0">
        <filter id="bubbleWarp">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008"
            numOctaves="2"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.008;0.012;0.008"
              dur="8s"
              repeatCount="indefinite"
            />
          </feTurbulence>

          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="12"
          />
        </filter>
      </svg>

      <div className="animated-bg" />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '700px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {/* Floating side bubbles */}
        <div className="floating-bubbles left">
            <img src={bubble1} className="bubble-img bubble-lg" />
            <img src={bubblestar} className="bubble-img bubble-sm" />
            <img src={bubble1} className="bubble-img bubble-xl" />
            <img src={bubblestar} className="bubble-img bubble-md" />
            <img src={bubble1} className="bubble-img bubble-xs" />
        </div>

        <div className="floating-bubbles right">
            <img src={bubble1} className="bubble-img bubble-lg" />
            <img src={bubblestar} className="bubble-img bubble-sm" />
            <img src={bubble1} className="bubble-img bubble-xl" />
            <img src={bubblestar} className="bubble-img bubble-md" />
            <img src={bubble1} className="bubble-img bubble-xs" />
        </div>

        {/* Canvas sparkle area */}
        <div
          ref={wrapRef}
          style={{
            position: 'relative',
            width: '150%',
            maxWidth: '1600px',
            height: '700px', 
            overflow: 'hidden', 
            userSelect: 'none',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
          />

          {/* Name display */}
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
                }}
              >
                
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                justifyContent: 'center',
              }}
            >              
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  flex: 1,
                  transform: 'translateY(40px)',
                }}
              >
                {<img
                  src={nameLogo}
                  alt="Angelina Sprague"
                  style={{
                    height: '140px',
                    width: 'auto',
                    marginTop: '-150px',
                    objectFit: 'contain',
                    transform: 'translateY(40px)',
                    filter: 'drop-shadow(0 0 20px rgba(157,132,201,0.35))',
                    transform: 'scale(6.5)'
                  }}
                />}
              </div>
            </div>
          </div>

          {/* mount canvas logic */}
          <IntroCanvas wrapRef={wrapRef} canvasRef={canvasRef} />
        </div>

        {/* Line */}
        <img
          src={lineImage}
          alt="divider line"
          style={{
            width: '80vw',
            maxWidth: '600px',
            display: 'flex',
            justifyContent: 'center',
            height: 'auto',
            marginTop: '-130px',
            marginBottom: '10px',
          }}
        />

        {/* Typing */}
        <div
          ref={typingRef}
          style={{
            fontSize: '34px',
            color: '#000000',
            minHeight: '42px',
            textAlign: 'center',
            fontFamily: 'courier',
            marginTop: '0px',
            fontWeight: 550,
            animation: 'fadeUp 0.7s 0.3s ease both',
          }}
        />

        {/* Buttons */}
        <div
          style={{
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeUp 0.7s 0.4s ease both',
            marginTop: '20px',
          }}
        >
          <button
            onClick={() => scrollTo('projects')}
            style={{
              background: 'var(--black)', 
              color: 'white', 
              border: 'none',
              padding: '25px 75px', 
              borderRadius: '100px',
              fontFamily: "'Garet', sans-serif", 
              fontSize: '18px', 
              fontWeight: 800,
              letterSpacing: '0.5px', 
              cursor: 'pointer',
              transition: 'transform 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = 'var(--purple)'; e.target.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.target.style.background = 'var(--black)'; e.target.style.transform = 'translateY(0)' }}
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo('contact')}
            style={{
              background: 'transparent', 
              color: 'var(--black)',
              border: '1.5px solid rgba(0,0,0,0.2)',
              padding: '25px 75px', 
              borderRadius: '100px',
              fontFamily: "'Garet', sans-serif", 
              fontSize: '18px', 
              fontWeight: 800,
              letterSpacing: '0.5px', 
              cursor: 'pointer',
              transition: 'transform 0.2s, background 0.2s',
            }}

            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--purple)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.color = 'var(--black)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Contact Me
          </button>
        </div>
      </div>

      <style>{`
        .rslot {
          font-family: 'Neue Machina', 'Garet', sans-serif;
          font-size: clamp(150px, 15vw, 100px); 
          font-weight: 800;
          letter-spacing: -0.06em;
        }
        .rslot-revealed {
          color: #1a1018 !important;
          -webkit-text-stroke: 0px transparent !important;
          animation: rslotPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
          text-shadow:
            0 0 10px rgba(34, 17, 59, 0.71),
            0 0 20px rgba(232, 222, 241, 0.89),
            0 10px 50px rgb(255, 255, 255);
          }
        @keyframes rslotPop {
          from { transform: scale(0.5) rotate(-8deg); opacity: 0; }
          to   { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        .floating-bubbles {
          position: absolute;
          top: 40%;
          transform: translateY(-50%);
          width: 120px;
          height: 500px;
          pointer-events: none;
          z-index: 1;
        }

        .floating-bubbles.left {
          left: -450px;
          transform: scale(1.75);
        }

        .floating-bubbles.right {
          right: -450px;
          transform: scale(1.75) scaleX(-1);
        }

        .floating-bubbles.right img {
          transform: scaleX(-1);
        }

        @keyframes floatBubble {
          0% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-12px) translateX(6px); }
          50% { transform: translateY(-22px) translateX(-4px); }
          75% { transform: translateY(-10px) translateX(8px); }
          100% { transform: translateY(0px) translateX(0px); }
        }

        .animated-bg {
          position: absolute;
          inset: 0;
          z-index: 0;

          background: linear-gradient(
            -45deg,
            #9d84c9,
            #ffd1e9,
            #fff5f5,
            #ffd1e9,
            #9d84c9
          );

          background-size: 400% 400%;
          opacity: 0.50;
          animation: gradientFlow 20s ease infinite;
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }

          25% { background-position: 100% 50%; }

          50% { background-position: 100% 100%;}

          75% { background-position: 0% 100%;}

          100% { background-position: 0% 50%; }
        }

        .bubble-img {
          position: absolute;
          object-fit: contain;

          filter:
            url(#bubbleWarp)
            drop-shadow(0 0 20px rgba(157,132,201,.25));

          animation:
            bubbleFloat 10s ease-in-out infinite,
            bubbleWobble 6s ease-in-out infinite;

          transform-origin: center;
        }

        {/* Bubble1 */}
        .bubble-xs {
            width: 45px;
            left: 125px;
            top: 195px;
            rotate: -50deg;
        }

        {/* Star Bubble */}
        .bubble-sm {
          width: 60px;
          left: 135px;
          top: 60px;
          rotate: 10deg;
        }

        {/* Star Bubble */}
        .bubble-md {
          width: 95px;
          left: 10px;
          top: 110px;
          rotate: -15deg;
        }

        {/* Bubble1 */}
        .bubble-lg {
          width: 130px;
          left: 35px;
          top: -50px;
          rotate: -20deg;
        }

        {/* Bubble1 */}
        .bubble-xl {
          width: 170px;
          left: 0;
          top: 250px;
        }

        @keyframes bubbleFloat {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(15px, -20px) rotate(3deg); }
          50% { transform: translate(-10px, -40px) rotate(-2deg); }
          75% { transform: translate(18px, -15px) rotate(2deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }

        @keyframes bubbleWobble {
          0% { transform: scale(1); }
          25% { transform: scale(1.03, 0.97); }
          50% { transform: scale(0.98, 1.04); }
          75% { transform: scale(1.02, 0.99); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  )
}

export default Intro
