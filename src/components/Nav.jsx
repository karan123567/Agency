'use client'

export default function Nav() {
  const openContact = () => document.dispatchEvent(new CustomEvent('openContact'))

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '28px 60px', opacity: 0
    }}>
      <a href="#" style={{ fontFamily: 'Cinzel,serif', fontSize: 22, letterSpacing: '0.15em', color: '#f8f2e8', textDecoration: 'none' }}>
        SHAKTI<sup style={{ fontSize: 10, color: '#f5c842' }}>®</sup>
      </a>

      <ul style={{ display: 'flex', gap: 40, listStyle: 'none' }}>
        {['Work','Services','Team','Process'].map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`}
              style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.15em', color: '#5a5280', textDecoration: 'none', textTransform: 'uppercase', transition: 'color .3s' }}
              onMouseEnter={e => e.target.style.color = '#f5c842'}
              onMouseLeave={e => e.target.style.color = '#5a5280'}>
              {l}
            </a>
          </li>
        ))}
      </ul>

      {/* ── BEGIN PROJECT button ── fires ContactModal */}
      <button
        onClick={openContact}
        className="hover-target"
        style={{
          fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.15em',
          color: '#04010e', background: '#f5c842', border: 'none',
          padding: '12px 24px', textTransform: 'uppercase',
          cursor: 'none', transition: 'background .3s',
          display: 'flex', alignItems: 'center', gap: 8,
          position: 'relative', overflow: 'hidden'
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#f8f2e8'}
        onMouseLeave={e => e.currentTarget.style.background = '#f5c842'}
      >
        <span>Begin Project</span>
        <span style={{ fontSize: 14 }}>↗</span>
      </button>
    </nav>
  )
}
