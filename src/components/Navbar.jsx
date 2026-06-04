function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
<nav
  className="z-50"
  style={{
    position: 'fixed', 
    top: 0,
    width: '100%',
    zIndex: 50,
    backdropFilter: 'blur(10px)',
    background: '#fff5f5c4',
    borderBottom: '3px solid rgba(157,132,201,0.18)',
    padding: '12px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}
>
      {/* Small AS mark in corner */}
      <div
        style={{
          fontFamily: "'Neue Machina', 'Garet', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(18px, 2.2vw, 24px)',
          color: 'var(--purple)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span style={{ fontWeight: 300, fontSize: 'clamp(16px, 2vw, 22px)', }}>{`{`}</span>
        AS
        <span style={{ fontWeight: 300, fontSize: 'clamp(16px, 2vw, 22px)', }}>{`}`}</span>
      </div>

      {/* quick links to rest of page */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {['about', 'skills', 'projects', 'contact'].map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Courier, Monospace',
              fontSize: 'clamp(13px, 1.6vw, 20px)',
              fontWeight: 700,
              letterSpacing: '0px',
              color: '#9b89bb',
              textTransform: 'capitalize',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#6a4fa3')} 
            onMouseLeave={(e) => (e.target.style.color = '#9b89bb')}  
          >
            {id}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
