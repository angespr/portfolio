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
      { text: 'Service Exchange', bg: 'var(--pink-soft)', color: '#b84d8a' },
      { text: 'React + API', bg: 'var(--pink-soft)', color: '#b84d8a'  },
      { text: 'System Design', bg: 'var(--pink-soft)', color: '#b84d8a'  },
    ],
    iconBg: 'var(--pink-soft)',
    link: 'https://github.com/angespr/juvo'
  },

  {
    icon: ulife,
    title: 'U-Life',
    desc: 'A student platform that helps college students stay organized, manage tasks, and discover opportunities in one place.',
    tags: [
      { text: 'Student Success', bg: '#fef3e7', color: '#a0681a' },
      { text: 'Productivity Tool', bg: '#fef3e7', color: '#a0681a'  },
      { text: 'API Integration', bg: '#fef3e7', color: '#a0681a' }
    ],
    iconBg: '#fef3e7',
    link: 'https://github.com/angespr/U-Life'
  },

  {
    icon: derma,
    title: 'DermaTech',
    desc: 'An AI-powered skin health platform to help users manage their skin health with accessible, empathetic technology.',
    tags: [
      { text: 'AI Healthcare', bg: 'var(--purp-soft)', color: '#6b55a8' },
      { text: 'User Analytics', bg: 'var(--purp-soft)', color: '#6b55a8' },
      { text: 'Flask + API', bg: 'var(--purp-soft)', color: '#6b55a8' },
    ],
    iconBg: '#f4edff',
    link: 'https://github.com/angespr/DermaTech'
  },

  {
    icon: wildtrek,
    title: 'Wildtrek',
    desc: 'An exploration social media platform that lets users capture, identify, and share nature photos to encourage outdoor discovery.',
    tags: [
      { text: 'Social Media', bg: 'var(--pink-soft)', color: '#b84d8a' },
      { text: 'Metadata Mapping', bg: 'var(--pink-soft)', color: '#b84d8a'  },
      { text: 'Image Recognition', bg: 'var(--pink-soft)', color: '#b84d8a'  },
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
          border: '3px solid #9d84c9',
          overflow: 'hidden',
          cursor: 'pointer',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered ? '0 18px 40px rgba(157,132,201,0.2)' : 'none',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
        onClick={() => project.link && window.open(project.link, '_blank')}
      >
        <div
          style={{
            height: '52px',
            background: '#B9A6D9',
            borderBottom: '4px solid #9d84c9',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '0 14px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '6px',
            }}
          >
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '5px',
                border: '2px solid #9d84c9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9d84c9',
                fontSize: '12px',
                fontWeight: 100,
              }}
            >
              −
            </div>

            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '5px',
                border: '2px solid #9d84c9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9d84c9',
                fontSize: '9px',
                fontWeight: 100,
              }}
            >
              □
            </div>

            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '5px',
                border: '2px solid #9d84c9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9d84c9',
                fontSize: '12px',
                fontWeight: 100,
              }}
            >
              ×
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '34px 26px',
          }}
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: project.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
              fontFamily: 'Cambria, serif',
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '-0.3px',
              marginBottom: '8px',
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: '15px',
              fontFamily: 'Poppins, sans-serif',
              color: 'var(--muted)',
              lineHeight: 1.55,
            }}
          >
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
    </div>
  )
}

function Projects() {
  return (
    <section
      id="projects"
      className="projects-section"
      style={{ 
        padding: '100px 32px', 
        background: 'var(--cream)' }}
    >
      <div 
        style={{ 
          maxWidth: '900px', 
          margin: '0 auto' 
        }}
      >
        <p className="section-label" 
          style={{ 
            fontSize: '15px', 
            fontWeight: 700, 
            textAlign: 'center' 
          }}
        >
          What I've Built
        </p>

        <h2
          className="section-heading reveal"
          style={{
            fontSize: '50px',
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          All My Projects!
        </h2>


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