import { useState } from 'react'

// ── Edit your projects here ────────────────────────────────────────────────
const PROJECTS = [
  {
    icon: '🔐',
    title: 'Cybersecurity Dashboard',
    desc: 'Monitor security events and analytics in real-time.',
    tag: 'Security',
    tagColor: { bg: 'var(--pink-soft)', text: '#b84d8a' },
    iconBg: 'var(--pink-soft)',
    // link: 'https://github.com/yourusername/project'
  },
  {
    icon: '✦',
    title: 'Portfolio Website',
    desc: 'Modern responsive portfolio built with React + Vite.',
    tag: 'Design',
    tagColor: { bg: 'var(--purp-soft)', text: '#6b55a8' },
    iconBg: 'var(--purp-soft)',
  },
  {
    icon: '🐉',
    title: 'D&D Campaign Manager',
    desc: 'Organize campaigns, maps, and NPCs in one place.',
    tag: 'Full-Stack',
    tagColor: { bg: '#fef3e7', text: '#a0681a' },
    iconBg: '#fef3e7',
  },
]

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="reveal"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'white',
          borderRadius: '22px',
          border: '1px solid rgba(157,132,201,0.14)',
          padding: '26px 22px',
          cursor: 'pointer',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered ? '0 18px 40px rgba(157,132,201,0.2)' : 'none',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
        onClick={() => project.link && window.open(project.link, '_blank')}
      >
        {/* Icon */}
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            background: project.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            marginBottom: '16px',
          }}
        >
          {project.icon}
        </div>

        <h3
          style={{
            fontFamily: "'Neue Machina', 'Garet', sans-serif",
            fontSize: '15px',
            fontWeight: 800,
            letterSpacing: '-0.3px',
            marginBottom: '8px',
          }}
        >
          {project.title}
        </h3>

        <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.55 }}>
          {project.desc}
        </p>

        <span
          style={{
            display: 'inline-block',
            marginTop: '14px',
            background: project.tagColor.bg,
            color: project.tagColor.text,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: '100px',
          }}
        >
          {project.tag}
        </span>
      </div>
    </div>
  )
}

function Projects() {
  return (
    <section
      id="projects"
      style={{ padding: '100px 32px', background: 'var(--cream)' }}
    >
      <div style={{ maxWidth: '660px', margin: '0 auto' }}>
        <p className="section-label">What I've Built</p>
        <h2 className="section-heading reveal">Projects</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '16px',
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
