import { useState } from 'react'
import ComputerIcon from '../assets/computer.png'
import Cursor from '../assets/cursor.png'
import Boba from '../assets/boba.png'
import Paperclip from '../assets/paperclip.png'
import Star from '../assets/star.png'

const SKILLS = [
  'React',
  'Node.js',
  'Java',
  'C++',
  'HTML/CSS',
  'Python',
  'Assembly',
  'Microsoft Azure',
  'Amazon AWS',
  'Figma',
  'Firebase (Google)',
  'Flask',
  'Jinja',
  'Render',
  'MongoDB',
  'ArcGIS',
  'UI/UX Design',
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
          padding: '15px 35px',
          fontFamily: "'Neue Machina', 'Garet', sans-serif",
          fontSize: '16px',
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
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <div style={{ maxWidth: '660px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        <div className="elements left">
          <img src={Cursor} className="element-img cursor" />
          <img src={Boba} className="element-img boba" />
          <img src={Star} className="element-img star" />
          <img src={Star} className="element-img computer" />
          <img src={Paperclip} className="element-img paperclip" />
        </div>

        <div className="elements right">
          <img src={Cursor} className="element-img cursor" />
          <img src={Boba} className="element-img boba" />
          <img src={Star} className="element-img star" />
          <img src={Star} className="element-img computer" />
          <img src={Paperclip} className="element-img paperclip" />
        </div>

        <p className="section-label" 
          style={{ 
            fontSize: '15px', 
            fontWeight: 700, 
            textAlign: 'center' 
          }}
        >
          What I Know
        </p>

        <h2
          className="section-heading reveal"
          style={{
            fontSize: '50px',
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          Skills & Technologies
        </h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
          }}
        >
          {SKILLS.map((skill, i) => (
            <SkillPill key={skill} label={skill} index={i} />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes floatY {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
          100% { transform: translateY(0px); }
        }

        @media (max-width: 768px) {
          .elements.left,
          .elements.right {
            display: none;
          }
        }

        .element-img {
          position: absolute;
          animation: floatY 4s ease-in-out infinite;
          pointer-events: none;
          opacity: 0.9;
        }

        .elements {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 180px;
          height: 500px;
          pointer-events: none;
          z-index: 1;
        }

        /* LEFT */
        .elements.left {
          left: -315px;
        }

        /* RIGHT - MIRROR */
        .elements.right {
          right: -315px;
          transform: translateY(-50%) scaleX(-1);
        }

        .elements.right img {
          transform: scaleX(-1);
        }

        /* POSITIONS */
        .star {
          width: 65px;
          top: 0px;
          left: 70px;
          rotate: 10deg;
        }

        .boba {
          width: 175px;
          top: 70px;
          left: -55px;
          rotate: -15deg;
        }

        .cursor {
          width: 45px;
          top: 250px;
          left: 110px;
          rotate: -05deg;
        }

        /* Second star is computer */
        .computer {
          width: 50px;
          top: 310px;
          left: 15px;
          rotate: -10deg;
        }

        .paperclip {
          width: 85px;
          top: 410px;
          left: 70px;
          rotate: 10deg;
        }
      `}</style>

    </section>
  )
}

export default Skills