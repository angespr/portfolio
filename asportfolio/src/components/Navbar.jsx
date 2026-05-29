function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 w-full z-50"
      style={{
        background: 'rgba(255,245,245,0.82)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(157,132,201,0.18)',
        padding: '18px 32px',
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
          fontSize: '20px',
          color: 'var(--purple)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span style={{ fontWeight: 300, fontSize: '22px' }}>{`{`}</span>
        AS
        <span style={{ fontWeight: 300, fontSize: '22px' }}>{`}`}</span>
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
              fontFamily: "'Garet', sans-serif",
              fontSize: '19px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              color: 'var(--muted)',
              textTransform: 'capitalize',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--purple)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
          >
            {id}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
