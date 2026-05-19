function Footer() {
  return (
    <footer
      style={{
        padding: '26px 32px',
        textAlign: 'center',
        borderTop: '1px solid rgba(157,132,201,0.14)',
        fontSize: '13px',
        color: '#aaa',
        fontWeight: 700,
        letterSpacing: '0.5px',
      }}
    >
      © 2026{' '}
      <span style={{ color: 'var(--purple)' }}>Angelina Sprague</span>
      {' '}— Built with React + Vite
    </footer>
  )
}

export default Footer
