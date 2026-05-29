import { useEffect, useLayoutEffect, useRef } from 'react'

const PHRASES = [
  'building secure things!',
  'crafting beautiful interfaces!',
  'solving complex problems!',
  'learning something new every day!',
]

const COLORS = ['#9d84c9', '#f79bc7', '#f3cc98', '#b8a8e0', '#f5b8d8']
const NAME = 'ANGELINA SPRAGUE'

function IntroCanvas({ wrapRef, canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')

    let W, H, frame = 0, animId
    let sparkles = [], bullets = [], particles = []
    let mouse = { x: 0, y: 0 }
    let gameOver = false

    const slotsEl = wrap.querySelector('#rocket-slots')
    slotsEl.innerHTML = ''
    let slotEls = []
    NAME.split(' ').forEach((word, wi, arr) => {
      const row = document.createElement('div')
      row.style.cssText = 'display:flex;gap:2px;justify-content:center;'
      word.split('').forEach(ch => {
        const s = document.createElement('span')
        s.className = 'rslot'
        s.textContent = ch
        s.dataset.ch = ch
        row.appendChild(s)
        slotEls.push(s)
      })
      if (wi < arr.length - 1) {
        const sp = document.createElement('span')
        sp.style.width = '12px'
        row.appendChild(sp)
      }
      slotsEl.appendChild(row)
    })

    const lettersNeeded = [...new Set(NAME.replace(/ /g, '').split(''))]
    let revealed = new Array(lettersNeeded.length).fill(false)

    function revealLetter(ch) {
      const idx = lettersNeeded.indexOf(ch)
      if (idx === -1 || revealed[idx]) return false
      revealed[idx] = true
      slotEls.forEach(el => { if (el.dataset.ch === ch) el.classList.add('rslot-revealed') })
      return true
    }

    function allRevealed() { return revealed.every(Boolean) }

    // resize 
    function resize() {
      W = canvas.width  = wrap.clientWidth
      H = canvas.height = wrap.clientHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    // spawn letter sparkle (First & Last name)
    function spawnLetterSparkle() {
      const unrevealed = lettersNeeded.filter((_, i) => !revealed[i])
      if (!unrevealed.length) return null
      const ch = unrevealed[Math.floor(Math.random() * unrevealed.length)]
      return makeSparkle(ch, 0, H * 0.62)
    }

    // spawn decorative sparkle (random others)
    function spawnDecoSparkle() {
      return makeSparkle('✦', H * 0.38, H)
    }

    function makeSparkle(ch, yMin, yMax) {
      return {
        x: 30 + Math.random() * (W - 60),
        y: yMin + Math.random() * (yMax - yMin),
        ch,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 15 + Math.random() * 10,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        spin: Math.random() * Math.PI * 2,
        spinV: (Math.random() - 0.5) * 0.045,
        pulse: Math.random() * Math.PI * 2,
        alive: true,
        opacity: 0,
        deco: ch === '✦',
      }
    }

    function initSparkles() {
      sparkles = []
      for (let i = 0; i < 8; i++) {
        const s = spawnLetterSparkle()
        if (s) sparkles.push(s)
      }
      // a few deco ones in the shooter area too
      for (let i = 0; i < 4; i++) {
        sparkles.push(spawnDecoSparkle())
      }
    }

    // Star Shape
    function drawStar(cx, cy, r, spin, color, alpha, ch, size) {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.translate(cx, cy)
      ctx.rotate(spin)
      ctx.beginPath()
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i
        const rad = i % 2 === 0 ? r : r * 0.38
        i === 0
          ? ctx.moveTo(Math.cos(angle) * rad, Math.sin(angle) * rad)
          : ctx.lineTo(Math.cos(angle) * rad, Math.sin(angle) * rad)
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.shadowColor = color
      ctx.shadowBlur = 10
      ctx.fill()
      ctx.shadowBlur = 0
      ctx.fillStyle = 'white'
      ctx.font = `700 ${Math.max(6, size * 0.5)}px 'Neue Machina', sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(ch, 0, 0)
      ctx.restore()
    }

    // Rocket Shape
    function rocketAngle() {
      return Math.atan2(mouse.x - W / 2, (H - 28) - mouse.y)
    }

    function drawRocket(cx, cy, angle) {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)
      // the body
      ctx.beginPath()
      ctx.moveTo(0, -15)
      ctx.bezierCurveTo(6, -9, 7, 0, 6, 9)
      ctx.lineTo(-6, 9)
      ctx.bezierCurveTo(-7, 0, -6, -9, 0, -15)
      ctx.closePath()
      ctx.fillStyle = '#9d84c9'
      ctx.fill()
      // tiny window
      ctx.beginPath()
      ctx.arc(0, -3, 3.5, 0, Math.PI * 2)
      ctx.fillStyle = '#ede9f8'
      ctx.fill()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 0.8
      ctx.stroke()
      // left fin
      ctx.beginPath()
      ctx.moveTo(-6, 4); ctx.lineTo(-13, 12); ctx.lineTo(-6, 9)
      ctx.closePath()
      ctx.fillStyle = '#f79bc7'
      ctx.fill()
      // right fin
      ctx.beginPath()
      ctx.moveTo(6, 4); ctx.lineTo(13, 12); ctx.lineTo(6, 9)
      ctx.closePath()
      ctx.fillStyle = '#f79bc7'
      ctx.fill()
      // flame
      const flicker = 0.9 + 0.1 * Math.sin(frame * 0.2)
      const g = ctx.createRadialGradient(0, 11, 1, 0, 17 * flicker, 7 * flicker)
      g.addColorStop(0,   'rgba(243,204,152,0.95)')
      g.addColorStop(0.4, 'rgba(247,155,199,0.8)')
      g.addColorStop(1,   'rgba(157,132,201,0)')
      ctx.beginPath()
      ctx.ellipse(0, 13 * flicker, 4, 8 * flicker, 0, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()
      // aim pointer guide
      ctx.setLineDash([3, 8])
      ctx.strokeStyle = 'rgba(157,132,201,0.22)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, -17)
      ctx.lineTo(0, -65)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.restore()
    }

    // shoot / trigger
    function shoot(mx, my) {
      const ox = W / 2, oy = H - 28
      const dx = mx - ox, dy = my - oy
      const len = Math.hypot(dx, dy)
      if (len === 0) return
      bullets.push({
        x: ox, y: oy,
        vx: (dx / len) * 14, vy: (dy / len) * 14,
        r: 4, alive: true, trail: [],
      })
    }

    // let shoot go
    function burst(x, y, color, ch) {
      for (let i = 0; i < 16; i++) {
        const angle = (Math.PI * 2 / 16) * i + Math.random() * 0.3
        const speed = 1.5 + Math.random() * 4
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          r: 2 + Math.random() * 2.5,
          color, alpha: 1, decay: 0.028 + Math.random() * 0.015,
          text: null,
        })
      }
      particles.push({ x, y, vx: 0, vy: -2.2, r: 0, color, alpha: 1, decay: 0.013, text: ch, big: true })
    }

    function updateP(p) { p.x += p.vx; p.y += p.vy; p.vy += 0.055; p.alpha -= p.decay }
    function drawP(p) {
      if (!p.text) {
        ctx.save(); ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillStyle = p.color; ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore()
      } else {
        ctx.save(); ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillStyle = p.color
        ctx.font = p.big ? `800 24px 'Neue Machina',sans-serif` : `700 12px 'Neue Machina',sans-serif`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(p.text, p.x, p.y); ctx.restore()
      }
    }

    // main loop
    function loop() {
      animId = requestAnimationFrame(loop)
      ctx.clearRect(0, 0, W, H)
      frame++

      const done = allRevealed()

      // spawn sparkles after win
      const letterAlive  = sparkles.filter(s => s.alive && !s.deco).length
      const decoAlive    = sparkles.filter(s => s.alive &&  s.deco).length
      const letterTarget = done ? 0  : 7
      const decoTarget   = done ? 14 : 5  

      if (frame % 35 === 0) {
        if (!done && letterAlive < letterTarget) {
          const s = spawnLetterSparkle(); if (s) sparkles.push(s)
        }
        if (decoAlive < decoTarget) {
          sparkles.push(spawnDecoSparkle())
        }
      }

      // update & draw sparkles
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
      sparkles = sparkles.filter(s => s.alive)

      // bullets
      bullets.forEach(b => {
        if (!b.alive) return
        b.trail.push({ x: b.x, y: b.y })
        if (b.trail.length > 8) b.trail.shift()
        b.x += b.vx; b.y += b.vy
        if (b.x < 0 || b.x > W || b.y < 0 || b.y > H) { b.alive = false; return }
        // trail
        b.trail.forEach((pt, i) => {
          ctx.save(); ctx.globalAlpha = (i / b.trail.length) * 0.4
          ctx.fillStyle = '#f79bc7'; ctx.beginPath()
          ctx.arc(pt.x, pt.y, b.r * (i / b.trail.length), 0, Math.PI * 2)
          ctx.fill(); ctx.restore()
        })
        // head
        ctx.save(); ctx.translate(b.x, b.y)
        ctx.fillStyle = '#9d84c9'; ctx.shadowColor = '#9d84c9'; ctx.shadowBlur = 8
        ctx.beginPath()
        for (let i = 0; i < 8; i++) {
          const a = (Math.PI / 4) * i, rad = i % 2 === 0 ? b.r : b.r * 0.45
          i === 0 ? ctx.moveTo(Math.cos(a) * rad, Math.sin(a) * rad)
                  : ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad)
        }
        ctx.closePath(); ctx.fill(); ctx.restore()
        // hit test
        sparkles.forEach(s => {
          if (!s.alive || !b.alive) return
          if (Math.hypot(b.x - s.x, b.y - s.y) < s.size + b.r) {
            b.alive = false; s.alive = false
            const isNew = !s.deco && revealLetter(s.ch)
            burst(s.x, s.y, s.color, isNew ? s.ch : '✦')
          }
        })
      })
      bullets = bullets.filter(b => b.alive)

      // particles
      particles.forEach(p => { updateP(p); drawP(p) })
      particles = particles.filter(p => p.alpha > 0.02)

      // rocket 
      drawRocket(W / 2, H - 28, rocketAngle())
    }

    // events
    const onMove = e => {
      const r = wrap.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const onClick = e => {
      const r = wrap.getBoundingClientRect()
      shoot(e.clientX - r.left, e.clientY - r.top)
    }
    const onTouch = e => {
      e.preventDefault()
      const r = wrap.getBoundingClientRect(), t = e.touches[0]
      shoot(t.clientX - r.left, t.clientY - r.top)
    }
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('click',     onClick)
    wrap.addEventListener('touchstart', onTouch, { passive: false })

    initSparkles()
    loop()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('click',     onClick)
      wrap.removeEventListener('touchstart', onTouch)
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
        justifyContent: 'center',
        padding: '0px 24px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Page-level gradient background */}
      <div className="gradient-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />


      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '700px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >

        {/* Floating side bubbles */}
        <div className="floating-bubbles left">
          <span />
          <span />
          <span />
        </div>

        <div className="floating-bubbles right">
          <span />
          <span />
          <span />
        </div>

        
        {/* Shooter game section */}
        <div
          ref={wrapRef}
          style={{
            position: 'relative',
            width: '150%',
            height: 'min(700px, 75vh)',
            minHeight: '700px',
            overflow: 'visible',
            cursor: 'crosshair',
            userSelect: 'none',
          }}
        >
          {/* canvas fills the whole card */}
          <canvas
            ref={canvasRef}
            style={{ 
                display: 'flex', 
                width: '100%', 
                height: 'min(800px, 75vh)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              pointerEvents: 'none',
              padding: '150px 24px 20px',
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
              <span
                style={{
                  fontFamily: "'Neue Machina', sans-serif",
                  fontSize: 'clamp(20px, 7vw, 70px)',
                  paddingTop: '32px',
                  paddingLeft: '40px',
                  fontWeight: 300,
                  transform: 'scale(4)',
                  color: '#9d84c9',
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {'{'}
              </span>

              {/* letter slots */}
              <div
                id="rocket-slots"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  flex: 1,
                  transform: 'translateY(80px) scale(2.5)'
                }}
              />

              <span
                style={{
                  fontFamily: "'Neue Machina', sans-serif",
                  fontSize: 'clamp(20px, 7vw, 70px)',
                  paddingTop: '32px',
                  paddingRight: '60px',
                  fontWeight: 300,
                  transform: 'scale(4)',
                  color: '#9d84c9',
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {'}'}
              </span>
            </div>
          </div>

          {/* mount canvas logic */}
          <IntroCanvas wrapRef={wrapRef} canvasRef={canvasRef} />
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '30px', fontWeight: 700, letterSpacing: '3px',
            fontFamily: "'Garet', sans-serif",
            textTransform: 'uppercase', color: 'var(--muted)',
            animation: 'fadeUp 0.7s 0.2s ease both',
          }}
        >
          Cybersecurity &amp; Full-Stack Dev
        </p>

        {/* Typing*/}
        <div
          ref={typingRef}
          style={{
            fontSize: '20px', color: '#555', minHeight: '26px',
            textAlign: 'center',
            fontFamily: "courier",
            fontWeight: 550,
            animation: 'fadeUp 0.7s 0.3s ease both',
          }}
        />

        {/* Buttons */}
        <div
          style={{
            display: 'flex', gap: '12px', justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeUp 0.7s 0.4s ease both',
          }}
        >
          <button
            onClick={() => scrollTo('projects')}
            style={{
              background: 'var(--black)', color: 'white', border: 'none',
              padding: '13px 28px', borderRadius: '100px',
              fontFamily: "'Garet', sans-serif", fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.5px', cursor: 'pointer',
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
              background: 'transparent', color: 'var(--black)',
              border: '1.5px solid rgba(0,0,0,0.2)',
              padding: '13px 28px', borderRadius: '100px',
              fontFamily: "'Garet', sans-serif", fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.5px', cursor: 'pointer',
              transition: 'transform 0.2s, border-color 0.2s, color 0.2s',
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
          font-size: clamp(15px, 9vw, 40px);
          font-weight: 800;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(58, 22, 119, 0.35);
          letter-spacing: -1px;
          display: inline-block;
          transition: color 0.35s ease, -webkit-text-stroke 0.35s ease;
        }
        .rslot-revealed {
          color: #1a1018 !important;
          -webkit-text-stroke: 0px transparent !important;
          animation: rslotPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
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
          transform: scale(1.75);
        }

        .floating-bubbles span {
          position: absolute;
          display: block;
          border-radius: 999px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255,255,255,0.9),
            rgba(247,155,199,0.45),
            rgba(157,132,201,0.18)
          );
          backdrop-filter: blur(4px);
          box-shadow:
            0 0 18px rgba(157,132,201,0.18),
            inset 0 0 10px rgba(255,255,255,0.25);
          animation: floatBubble 7s ease-in-out infinite;
        }

        /* Sizing + Placement */
        .floating-bubbles span:nth-child(1) {
          width: 70px;
          height: 70px;
          left: 20px;
          animation-delay: 0s;
        }

        .floating-bubbles span:nth-child(2) {
          width: 42px;
          height: 42px;
          left: 65px;
          top: 160px;
          animation-delay: 1.5s;
        }

        .floating-bubbles span:nth-child(3) {
          width: 90px;
          height: 90px;
          left: 5px;
          top: 270px;
          animation-delay: 3s;
        }

        @keyframes floatBubble {
          0% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-12px) translateX(6px); }
          50% { transform: translateY(-22px) translateX(-4px); }
          75% { transform: translateY(-10px) translateX(8px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
      `}</style>
    </section>
  )
}

export default Intro
