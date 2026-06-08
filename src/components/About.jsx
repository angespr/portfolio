import { useEffect, useRef, useState } from 'react'
import myPhoto from '../assets/me.png'

function AnimatedCount({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true

          const duration = 1200
          const startTime = performance.now()

          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1)
            setCount(Math.floor(progress * target))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          requestAnimationFrame(animate)
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
      style={{
        marginTop: '100px',
        padding: '0px 24px',
        background: 'var(--cream)',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <p
          className="section-label"
          style={{
            fontSize: '15px',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          Who I Am
        </p>

        <h2
          className="section-heading reveal"
          style={{
            fontSize: '50px',
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          About Me
        </h2>

        {/* main container */}
        <div
          style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'stretch',
            marginTop: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            minWidth: '280px',
            boxSizing: 'border-box',  
          }}
        >

          {/* white container*/}
          <div
            className="reveal"
            style={{
              flex: 1,
              background: 'white',
              borderRadius: '28px',
              border: '1px solid rgba(157,132,201,0.18)',
              padding: 'clamp(20px, 4vw, 45px)',
              position: 'relative',
              overflow: 'hidden',
              minWidth: '320px',
            }}
          >
            {/* gradient bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background:
                  'linear-gradient(90deg, var(--pink), var(--purple), var(--gold))',
              }}
            />

            <div
              style={{
                display: 'flex',
                gap: '25px',
                alignItems: 'center',
                flexWrap: 'wrap', // photo drops below on small screens
                justifyContent: 'center',
              }}
            >
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: 'clamp(15px, 2vw, 22px)',
                    fontFamily: 'Rockwell, serif',
                    lineHeight: 1.85,
                    minWidth: '200px',
                    color: '#3a2f3e',
                    margin: 0,
                  }}
                >
                  Hello! I'm Angelina, an aspiring cybersecurity and full-stack
                  developer passionate about building creative, secure, and
                  user-friendly digital experiences. I love finding where art meets
                  engineering, and I’m always exploring new technologies and challenging
                  myself to grow as both a developer and a problem solver.
                </p>
              </div>

              {/* photo of me! */}
              <div
                style={{
                  width: 'clamp(120px, 30vw, 250px)',   //shrinks with screen
                  flexShrink: 0,
                }}
              >
                <img
                  src={myPhoto}
                  alt="Me"
                  style={{
                    width: '100%',
                    borderRadius: '4px',
                    objectFit: 'cover',
                    border: '3px solid white',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
                  }}
                />
              </div>
            </div>

            {/* statistics! */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                gap: '14px',
                marginTop: '28px',
              }}
            >
              {[
                { label: 'Projects', target: 5 },
                { label: 'Hackathons', target: 4 },
                { label: 'Passion', target: 100, suffix: '%' },
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
                  <p
                    style={{
                      fontSize: 'clamp(8px, 4vw, 12px)',
                      color: 'var(--muted)',
                      marginTop: '2px',
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* work experience section*/}
            <div
              style={{
                marginTop: '35px',
                paddingTop: '25px',
                borderTop: '1px solid rgba(157,132,201,0.2)',
              }}
            >
              <h3
                style={{
                  fontSize: '26px',
                  fontFamily: 'Cambria, serif',
                  fontWeight: 800,
                  marginBottom: '15px',
                  color: 'var(--purple)',
                  letterSpacing: '0.5px',
                }}
              >
                Work Experience
              </h3>

              <div 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '14px' 
                }}
              >
                
                {/* all experience items */}
                <div
                  style={{
                    background: '#faf7ff',
                    borderRadius: '14px',
                    padding: '16px',
                    border: '1px solid rgba(157,132,201,0.15)',
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '17px' }}>
                    STEM Tutor — University of Washington Bothell
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
                    January 2026 – June 2026
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: '14px', lineHeight: 1.5 }}>
                    Supporting undergraduate students in Computer Science and Cybersecurity 
                    courses by strengthening conceptual understanding, reinforcing technical skills, 
                    and fostering a positive learning environment that encourages critical thinking.
                  </p>
                </div>

                <div
                  style={{
                    background: '#faf7ff',
                    borderRadius: '14px',
                    padding: '16px',
                    border: '1px solid rgba(157,132,201,0.15)',
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '17px' }}>
                    Undergraduate Research Assistant/Grader — University of Washington Bothell
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
                    September 2025 – June 2026
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: '14px', lineHeight: 1.5 }}>
                    Providing detailed, constructive feedback for CSS 370: Design & Analysis 
                    while collaborating with the instructor to ensure clear rubric criteria and fair, 
                    consistent grading across diverse student submissions.
                  </p>
                </div>

                <div
                  style={{
                    background: '#faf7ff',
                    borderRadius: '14px',
                    padding: '16px',
                    border: '1px solid rgba(157,132,201,0.15)',
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '17px' }}>
                    Full Stack Software Engineer Intern — The House of Wisdom
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
                    June 2025 – September 2025
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: '14px', lineHeight: 1.5 }}>
                    Contributed to the development of a scalable full-stack web application 
                    using React.js, Python, and Firebase by building user-focused features, 
                    writing maintainable code, conducting testing, and preparing technical documentation.
                  </p>
                </div>

                <div
                  style={{
                    background: '#faf7ff',
                    borderRadius: '14px',
                    padding: '16px',
                    border: '1px solid rgba(157,132,201,0.15)',
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '17px' }}>
                    Website Developer — University of California, Davis | Biomedical Engineering Department
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
                    June 2024 – November 2024
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: '14px', lineHeight: 1.5 }}>
                    Modernizing and redesigning a website by migrating it to WordPress, enhancing functionality 
                    with HTML and CSS, and improving navigation and accessibility.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      <style>{`
        .animated-count {
          font-size: 12px;
        }

        @media (max-width: 480px) {
          .animated-count {
            font-size: 8px;
          }
        }
      `}</style>
    </section>
  )
}

export default About