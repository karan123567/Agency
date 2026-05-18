'use client'
export default function Footer() {
  return (
    <footer style={{ padding: '50px 60px', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(4,1,14,0.98)', backdropFilter: 'blur(20px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40 }}>
      <div>
        <div style={{ fontFamily: 'Cinzel,serif', fontSize: 36, letterSpacing: '0.1em' }}>SHAKTI<sup style={{ fontSize: 12, color: '#f5c842' }}>®</sup></div>
        <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.2em', color: '#5a5280', marginTop: 8, textTransform: 'uppercase' }}>Creative Digital Agency</div>
      </div>
      <ul style={{ display: 'flex', gap: 28, listStyle: 'none' }}>
        {['Instagram','Twitter','Dribbble','LinkedIn'].map(l => (
          <li key={l}><a href="#" style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.15em', color: '#5a5280', textDecoration: 'none', textTransform: 'uppercase', transition: 'color .3s' }}
            onMouseEnter={e=>e.target.style.color='#f5c842'} onMouseLeave={e=>e.target.style.color='#5a5280'}>{l}</a></li>
        ))}
      </ul>
      <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280', letterSpacing: '0.1em' }}>© 2025 SHAKTI STUDIO</div>
    </footer>
  )
}
