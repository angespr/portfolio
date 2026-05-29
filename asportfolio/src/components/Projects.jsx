import { useState } from 'react'
import juvo from '../assets/Juvo.png'
import ulife from '../assets/U-Life.png'
import derma from '../assets/DermaTech.png'
import wildtrek from '../assets/Wildtrek.png'

const PROJECTS = [
 {
    icon: juvo,
    title: 'Juvo',
    desc: 'A community platform to exchange services and skills directly, using their own talents instead of money.',
    tags: [
      { text: 'Community', bg: 'var(--pink-soft)', color: '#b84d8a' },
      { text: 'Market System', bg: 'var(--pink-soft)', color: '#b84d8a'  },
      { text: 'API', bg: 'var(--pink-soft)', color: '#b84d8a'  },
    ],
    iconBg: 'var(--pink-soft)',
    link: ''
  },
  {
    icon: ulife,
    title: 'U-Life',
    desc: 'A student platform that helps college students stay organized, manage tasks, and discover opportunities in one place.',
    tags: [
      { text: 'Community', bg: '#fef3e7', color: '#a0681a' },
      { text: 'Marketplace System', bg: '#fef3e7', color: '#a0681a'  },
      { text: 'API', bg: '#fef3e7', color: '#a0681a' }
    ],
    iconBg: '#fef3e7',
    link: 'https://github.com/angespr/juvo'
  },

  {
    icon: derma,
    title: 'DermaTech',
    desc: 'An AI-powered skin health platform to help users manage their skin health with accessible, empathetic technology.',
    tags: [
      { text: 'Community', bg: 'var(--purp-soft)', color: '#6b55a8' },
      { text: 'Marketplace System', bg: 'var(--purp-soft)', color: '#6b55a8' },
      { text: 'API', bg: 'var(--purp-soft)', color: '#6b55a8' },
    ],
    iconBg: '#f4edff',
    link: 'https://github.com/angespr/DermaTech'
  },

  {
    icon: wildtrek,
    title: 'Wildtrek',
    desc: 'An exploration social media platform that lets users capture, identify, and share nature photos to encourage outdoor discovery.',
    tags: [
      { text: 'Community', bg: 'var(--pink-soft)', color: '#b84d8a' },
      { text: 'Marketplace System', bg: 'var(--pink-soft)', color: '#b84d8a'  },
      { text: 'API', bg: 'var(--pink-soft)', color: '#b84d8a'  },
    ],
    iconBg: '#f4edff',
    link: 'https://github.com/dumax315/WildTrek'
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
        {/* project icon */}
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
          <img
            src={project.icon}
            alt={project.title}
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'contain',
            }}
          />
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
          
        <div
          style={{
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
            marginTop: '14px',
          }}
        >
          {project.tags?.map((tag) => (
            <span
              key={tag.text}
              style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '4px 12px',
                borderRadius: '100px',
                background: tag.bg,
                color: tag.color,
              }}
            >
              {tag.text}
            </span>
          ))}
        </div>

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
          {/* automakes new cards if more are needed */}
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
