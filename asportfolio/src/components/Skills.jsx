import { useState } from 'react'

// ── Add / remove / reorder your skills here ────────────────────────────────
const SKILLS = [
  'React',
  'JavaScript',
  'HTML / CSS',
  'Python',
  'Cybersecurity',
  'GitHub',
  'UI / UX Design',
  'SQL',
]

function SkillPill({ label, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="reveal"
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? 'var(--purple)' : 'white',
          color: hovered ? 'white' : 'var(--black)',
          border: `1.5px solid ${hovered ? 'var(--purple)' : 'rgba(157,132,201,0.22)'}`,
          borderRadius: '100px',
          padding: '10px 22px',
          fontFamily: "'Neue Machina', 'Garet', sans-serif",
          fontSize: '13px',
          fontWeight: 800,
          cursor: 'default',
          transform: hovered ? 'translateY(-3px) scale(1.04)' : 'none',
          boxShadow: hovered ? '0 8px 20px rgba(157,132,201,0.35)' : 'none',
          transition: 'all 0.22s ease',
          userSelect: 'none',
        }}
      >
        {label}
      </div>
    </div>
  )
}

function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: '100px 32px',
        background: 'linear-gradient(180deg, var(--cream) 0%, var(--purp-soft) 100%)',
      }}
    >
      <div style={{ maxWidth: '660px', margin: '0 auto' }}>
        <p className="section-label">What I Know</p>
        <h2 className="section-heading reveal">Skills</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {SKILLS.map((skill, i) => (
            <SkillPill key={skill} label={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
