import { useEffect, useRef, useState } from 'react'

function AnimatedCount({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const step = Math.ceil(target / 28)
          let current = 0
          const timer = setInterval(() => {
            current = Math.min(current + step, target)
            setCount(current)
            if (current >= target) clearInterval(timer)
          }, 40)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span
      ref={ref}
      style={{
        fontFamily: "'Neue Machina', 'Garet', sans-serif",
        fontSize: '30px',
        fontWeight: 800,
        color: 'var(--purple)',
        display: 'block',
      }}
    >
      {count}{suffix}
    </span>
  )
}

function About() {
  return (
    <section
      id="about"
      style={{ padding: '100px 32px', background: 'var(--cream)' }}
    >
      <div style={{ maxWidth: '660px', margin: '0 auto' }}>
        <p className="section-label">Who I Am</p>
        <h2 className="section-heading reveal">About Me</h2>

        <div
          className="reveal"
          style={{
            background: 'white',
            borderRadius: '28px',
            border: '1px solid rgba(157,132,201,0.18)',
            padding: '36px 38px',
            position: 'relative',
            overflow: 'hidden',
            transitionDelay: '0.1s',
          }}
        >
          {/* Gradient top bar */}
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, var(--pink), var(--purple), var(--gold))',
            }}
          />

          <p style={{ fontSize: '16px', lineHeight: 1.78, color: '#3a2f3e', fontWeight: 400 }}>
            Hi! I'm Angelina — an aspiring cybersecurity and full-stack
            developer passionate about building creative, secure, and
            user-friendly digital experiences. I love finding where art meets
            engineering.
          </p>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '14px',
              marginTop: '28px',
            }}
          >
            {[
              { label: 'Skills',    target: 8 },
              { label: 'Projects',  target: 3 },
              { label: 'Passion',   target: 100, suffix: '%' },
            ].map(({ label, target, suffix }) => (
              <div
                key={label}
                style={{
                  background: 'var(--purp-soft)',
                  borderRadius: '16px',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <AnimatedCount target={target} suffix={suffix} />
                <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px', fontWeight: 700, letterSpacing: '0.5px' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
