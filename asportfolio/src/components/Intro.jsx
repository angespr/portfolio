import { useEffect, useRef } from 'react'

// ── Bubble config ──────────────────────────────────────────────────────────
const BUBBLES = [
  { size: 120, top: '8%',  left: '5%',  dur: '10s', delay: '0s'    },
  { size: 80,  top: '55%', left: '72%', dur: '8s',  delay: '-3s'   },
  { size: 55,  top: '18%', left: '82%', dur: '7s',  delay: '-1.5s' },
  { size: 95,  top: '70%', left: '12%', dur: '11s', delay: '-5s'   },
  { size: 40,  top: '40%', left: '60%', dur: '6s',  delay: '-2s'   },
  { size: 65,  top: '82%', left: '50%', dur: '9s',  delay: '-4s'   },
  { size: 30,  top: '28%', left: '45%', dur: '7s',  delay: '-6s'   },
]

// ── Sparkle config ─────────────────────────────────────────────────────────
const SPARKLES = [
  { top: '14%', left: '62%', size: '22px', dur: '2.8s', delay: '0s',    color: 'var(--purple)' },
  { top: '72%', left: '78%', size: '14px', dur: '3.5s', delay: '-1s',   color: 'var(--purple)' },
  { top: '38%', left: '8%',  size: '18px', dur: '2.2s', delay: '-2s',   color: 'var(--purple)' },
  { top: '85%', left: '35%', size: '12px', dur: '4s',   delay: '-0.5s', color: 'var(--purple)' },
  { top: '22%', left: '30%', size: '10px', dur: '3.1s', delay: '-3s',   color: 'var(--pink)'   },
  { top: '60%', left: '90%', size: '16px', dur: '2.6s', delay: '-1.5s', color: 'var(--gold)'   },
]

// ── Typing phrases — edit these! ───────────────────────────────────────────
const PHRASES = [
  'building secure things 🔐',
  'crafting beautiful interfaces ✦',
  'solving complex problems 🧩',
  'learning something new every day 🌱',
]

function Bubble({ size, top, left, dur, delay }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        top,
        left,
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85) 0%, rgba(247,155,199,0.25) 40%, rgba(157,132,201,0.18) 70%, rgba(200,180,240,0.08) 100%)',
        border: '1px solid rgba(255,255,255,0.7)',
        boxShadow:
          'inset 0 0 12px rgba(255,255,255,0.6), inset -4px -4px 10px rgba(157,132,201,0.15), 0 4px 20px rgba(157,132,201,0.12)',
        animation: `floatBubble ${dur} ease-in-out infinite`,
        animationDelay: delay,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

function Sparkle({ top, left, size, dur, delay, color }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        top,
        left,
        fontSize: size,
        color,
        opacity: 0.55,
        animation: `twinkle ${dur} ease-in-out infinite`,
        animationDelay: delay,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      ✦
    </span>
  )
}

function Intro() {
  const typingRef = useRef(null)

  // ── Typing effect ──────────────────────────────────────────────────────
  useEffect(() => {
    let phraseIndex = 0
    let charIndex = 0
    let deleting = false
    let timer

    const tick = () => {
      const el = typingRef.current
      if (!el) return

      const phrase = PHRASES[phraseIndex]

      if (!deleting) {
        charIndex++
        el.innerHTML =
          phrase.slice(0, charIndex) +
          '<span style="display:inline-block;width:2px;height:1em;background:var(--purple);margin-left:2px;vertical-align:middle;animation:blink 1s step-end infinite;"></span>'

        if (charIndex === phrase.length) {
          deleting = true
          timer = setTimeout(tick, 1900)
          return
        }
        timer = setTimeout(tick, 50)
      } else {
        charIndex--
        el.innerHTML =
          phrase.slice(0, charIndex) +
          '<span style="display:inline-block;width:2px;height:1em;background:var(--purple);margin-left:2px;vertical-align:middle;animation:blink 1s step-end infinite;"></span>'

        if (charIndex === 0) {
          deleting = false
          phraseIndex = (phraseIndex + 1) % PHRASES.length
          timer = setTimeout(tick, 320)
          return
        }
        timer = setTimeout(tick, 28)
      }
    }

    timer = setTimeout(tick, 700)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 32px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Mesh gradient background */}
      <div
        className="gradient-bg"
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />

      {/* Bubbles */}
      {BUBBLES.map((b, i) => (
        <Bubble key={i} {...b} />
      ))}

      {/* Sparkles */}
      {SPARKLES.map((s, i) => (
        <Sparkle key={i} {...s} />
      ))}

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '680px',
          width: '100%',
        }}
      >
        {/* Curly brace + name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '14px',
            marginBottom: '14px',
            animation: 'fadeUp 0.7s 0.1s ease both',
          }}
        >
          <span
            style={{
              fontFamily: "'Neue Machina', sans-serif",
              fontSize: '72px',
              fontWeight: 300,
              color: 'var(--purple)',
              lineHeight: 1,
              marginTop: '8px',
            }}
          >
            {'{'}
          </span>
          <div>
            <h1
              style={{
                fontFamily: "'Neue Machina', 'Garet', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(48px, 9vw, 82px)',
                lineHeight: 0.95,
                letterSpacing: '-2px',
              }}
            >
              Angelina
            </h1>
            <h1
              style={{
                fontFamily: "'Neue Machina', 'Garet', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(48px, 9vw, 82px)',
                lineHeight: 0.95,
                letterSpacing: '-2px',
              }}
            >
              Sprague{' '}
              <span
                aria-hidden="true"
                style={{
                  fontSize: '0.4em',
                  color: 'var(--purple)',
                  verticalAlign: 'super',
                  display: 'inline-block',
                  animation: 'twinkle 2.5s ease-in-out infinite',
                }}
              >
                ✦
              </span>
            </h1>
          </div>
        </div>

        {/* Subtitle tag */}
        <p
          style={{
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '22px',
            animation: 'fadeUp 0.7s 0.2s ease both',
          }}
        >
          Cybersecurity &amp; Full-Stack Dev
        </p>

        {/* Typing text */}
        <div
          ref={typingRef}
          style={{
            fontSize: '16px',
            color: '#555',
            minHeight: '26px',
            marginBottom: '36px',
            animation: 'fadeUp 0.7s 0.3s ease both',
          }}
        />

        {/* CTA buttons */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeUp 0.7s 0.4s ease both',
          }}
        >
          <button
            onClick={() => scrollTo('projects')}
            style={{
              background: 'var(--black)',
              color: 'white',
              border: 'none',
              padding: '13px 28px',
              borderRadius: '100px',
              fontFamily: "'Garet', sans-serif",
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              cursor: 'pointer',
              transition: 'transform 0.2s, background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--purple)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--black)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            View Projects
          </button>

          <button
            onClick={() => scrollTo('contact')}
            style={{
              background: 'transparent',
              color: 'var(--black)',
              border: '1.5px solid rgba(0,0,0,0.2)',
              padding: '13px 28px',
              borderRadius: '100px',
              fontFamily: "'Garet', sans-serif",
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              cursor: 'pointer',
              transition: 'transform 0.2s, border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--purple)'
              e.currentTarget.style.color = 'var(--purple)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'
              e.currentTarget.style.color = 'var(--black)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#aaa',
          animation: 'fadeUp 1s 0.9s ease both',
          zIndex: 2,
        }}
      >
        <span>Scroll</span>
        <div
          style={{
            width: '1px',
            height: '36px',
            background: 'linear-gradient(to bottom, #aaa, transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}

export default Intro
