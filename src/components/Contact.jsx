import { useState } from 'react'
import Arrow from '../assets/arrow.png'

const LINKS = [
  {
    label: 'Devpost',
    icon: '🕮',
    bg: '#9d84c9',
    color: 'white',
    href: 'https://devpost.com/angespr',
  },
  {
    label: 'LinkedIn',
    icon: 'in',
    bg: '#98c0f3',
    color: 'white',
    href: 'https://linkedin.com/in/angelinasprague',
  },
  {
  label: 'Github',
  icon: '⌨',
  bg: '#f7bc73',
  color: 'white',
  href: 'https://linkedin.com/in/angelinasprague',
  },
]

function ContactButton({ label, icon, bg, color, href }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: bg,
          color,
          border: 'none',
          padding: '14px 30px',
          borderRadius: '100px',
          fontSize: '18px',
          fontWeight: 800,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hovered ? '0 10px 24px rgba(0,0,0,0.13)' : 'none',
          transition: '0.2s',
        }}
      >
        <span style={{ fontSize: '16px' }}>{icon}</span>
        {label}
      </button>
    </a>
  )
}

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [hovered, setHovered] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const mailtoLink = `mailto:angelinaesprague@gmail.com?subject=Message from ${encodeURIComponent(
    form.name
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
  )}`

  return (
    <section
      id="contact"
      style={{
        padding: '100px 32px',
        background: 'linear-gradient(135deg, var(--pink-soft), var(--purp-soft))',
      }}
    >
      <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <p
          className="section-label"
          style={{
            fontSize: '15px',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          Say Hello
        </p>

        <h2
          className="section-heading reveal"
          style={{
            fontSize: '50px',
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          Contact Info
        </h2>

        <p 
          style={{ 
            color: 'var(--muted)',
            fontFamily: 'Rockwell, serif',
            fontSize: '16px',
            marginTop: '-16px',
          }}
        >
          Interested in hiring me or seeing what I'm up to? Reach out!
        </p>

        {/* arrows and buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '84px',
            marginTop: '32px',
            position: 'relative',
          }}
        >
          {/* left side */}
          <img
            src={Arrow}
            className="arrow-img left-arrow"
            alt="arrow left"
          />

          {/* buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            {LINKS.map((link) => (
              <ContactButton key={link.label} {...link} />
            ))}
          </div>

          {/* right side */}
          <img
            src={Arrow}
            className="arrow-img right-arrow"
            alt="arrow right"
          />
        </div>
      </div>

      <style>{`
        @keyframes floatRight {
          0% { transform: translateX(0px); }
          50% { transform: translateX(16px); }
          100% { transform: translateX(0px); }
        }

        @keyframes floatLeft {
          0% { transform: translateX(0px) scaleX(-1); }
          50% { transform: translateX(-16px) scaleX(-1); }
          100% { transform: translateX(0px) scaleX(-1); }
        }

        .arrow-img {
          width: 110px;
          pointer-events: none;
        }

        /* LEFT arrow */
        .left-arrow {
          animation: floatRight 2.5s ease-in-out infinite;
          margin-left: -500px;
          margin-top: -40px;
        }

        /* RIGHT arrow (mirrored) */
        .right-arrow {
          animation: floatLeft 2.5s ease-in-out infinite;
          margin-right: -500px;
          margin-top: -40px;
        }
      `}</style>

    </section>
  )
}

const inputStyle = {
  padding: '12px',
  borderRadius: '12px',
  border: '1px solid rgba(0,0,0,0.2)',
  fontSize: '14px',
}

const submitStyle = {
  background: '#272355',
  color: 'white',
  border: 'none',
  padding: '13px',
  borderRadius: '100px',
  fontWeight: 800,
  cursor: 'pointer',
}

export default Contact