import { useState } from 'react'


const LINKS = [
  {
    label: 'Devpost',
    icon: '⌨',
    bg: '#000000',
    color: 'white',
    href: 'https://devpost.com/angespr',
  },
  {
    label: 'LinkedIn',
    icon: 'in',
    bg: '#0a66c2',
    color: 'white',
    href: 'https://linkedin.com/in/angelinasprague',
  },
]

function ContactButton({ label, icon, bg, color, href }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: bg,
          color,
          border: 'none',
          padding: '13px 22px',
          borderRadius: '100px',
          fontFamily: "'Neue Machina', 'Garet', sans-serif",
          fontSize: '13px',
          fontWeight: 800,
          letterSpacing: '0.3px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hovered ? '0 10px 24px rgba(0,0,0,0.13)' : 'none',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        <span style={{ fontSize: '16px' }}>{icon}</span>
        {label}
      </button>
    </a>
  )
}

function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: '100px 32px',
        background: 'linear-gradient(135deg, var(--pink-soft), var(--purp-soft))',
      }}
    >
      <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <p className="section-label">Say Hi</p>
        <h2 className="section-heading reveal">Let's Connect</h2>

        <p
          className="reveal"
          style={{
            color: 'var(--muted)',
            fontSize: '15px',
            transitionDelay: '0.1s',
          }}
        >
          Interested in hiring me or seeing what I'm up to? Reach out!
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginTop: '32px',
          }}
        >
          {LINKS.map((link) => (
            <ContactButton key={link.label} {...link} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
