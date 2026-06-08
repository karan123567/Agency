// 'use client'

// export default function Nav() {
//   const openContact = () => document.dispatchEvent(new CustomEvent('openContact'))

//   return (
//     <nav style={{
//       position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
//       display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//       padding: '28px 60px', opacity: 0
//     }}>
//       <a href="#" style={{ fontFamily: 'Cinzel,serif', fontSize: 22, letterSpacing: '0.15em', color: '#f8f2e8', textDecoration: 'none' }}>
//         SHAKTI<sup style={{ fontSize: 10, color: '#f5c842' }}>®</sup>
//       </a>

//       <ul style={{ display: 'flex', gap: 40, listStyle: 'none' }}>
//         {['Work','Services','Team','Process'].map(l => (
//           <li key={l}>
//             <a href={`#${l.toLowerCase()}`}
//               style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.15em', color: '#5a5280', textDecoration: 'none', textTransform: 'uppercase', transition: 'color .3s' }}
//               onMouseEnter={e => e.target.style.color = '#f5c842'}
//               onMouseLeave={e => e.target.style.color = '#5a5280'}>
//               {l}
//             </a>
//           </li>
//         ))}
//       </ul>

//       {/* ── BEGIN PROJECT button ── fires ContactModal */}
//       <button
//         onClick={openContact}
//         className="hover-target"
//         style={{
//           fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.15em',
//           color: '#04010e', background: '#f5c842', border: 'none',
//           padding: '12px 24px', textTransform: 'uppercase',
//           cursor: 'none', transition: 'background .3s',
//           display: 'flex', alignItems: 'center', gap: 8,
//           position: 'relative', overflow: 'hidden'
//         }}
//         onMouseEnter={e => e.currentTarget.style.background = '#f8f2e8'}
//         onMouseLeave={e => e.currentTarget.style.background = '#f5c842'}
//       >
//         <span>Begin Project</span>
//         <span style={{ fontSize: 14 }}>↗</span>
//       </button>
//     </nav>
//   )
// }

'use client'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const openContact = () => {
    document.dispatchEvent(new CustomEvent('openContact'))
    setMenuOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = ['Work', 'Services','Process']

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 60px;
          opacity: 0;
          transition: background 0.4s, backdrop-filter 0.4s, padding 0.3s;
        }

        .nav-root.scrolled {
          background: rgba(12, 10, 20, 0.72);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding-top: 18px;
          padding-bottom: 18px;
        }

        /* ── Logo ── */
        .nav-logo {
          font-family: 'Cinzel', serif;
          font-size: 22px;
          letter-spacing: 0.15em;
          color: #f8f2e8;
          text-decoration: none;
          z-index: 110;
          position: relative;
        }

        /* ── Desktop links ── */
        .nav-links {
          display: flex;
          gap: 40px;
          list-style: none;
        }

        .nav-links a {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #5a5280;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.3s;
        }

        .nav-links a:hover { color: #f5c842; }

        /* ── CTA button ── */
        .nav-cta {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: #04010e;
          background: #f5c842;
          border: none;
          padding: 12px 24px;
          text-transform: uppercase;
          cursor: none;
          transition: background 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }

        .nav-cta:hover { background: #f8f2e8; }

        /* ── Hamburger ── */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 110;
          position: relative;
          padding: 4px;
        }

        .nav-hamburger span {
          display: block;
          height: 1px;
          background: #f8f2e8;
          transition: transform 0.35s cubic-bezier(0.77,0,0.175,1),
                      opacity 0.25s, width 0.35s;
          transform-origin: center;
        }

        .nav-hamburger span:nth-child(2) { width: 60%; margin-left: auto; }

        .nav-hamburger.open span:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
          width: 100%;
        }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-hamburger.open span:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* ── Mobile drawer ── */
        .nav-drawer {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 105;
          background: #0c0a14;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 100px 36px 60px;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.77,0,0.175,1);
        }

        .nav-drawer.open { transform: translateX(0); }

        .nav-drawer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
        }

        .nav-drawer-links li {
          border-bottom: 1px solid rgba(90, 82, 128, 0.2);
          overflow: hidden;
        }

        .nav-drawer-links a {
          font-family: 'Cinzel', serif;
          font-size: clamp(28px, 8vw, 44px);
          color: #5a5280;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          padding: 20px 0;
          transition: color 0.25s, padding-left 0.25s;
        }

        .nav-drawer-links a:hover {
          color: #f5c842;
          padding-left: 12px;
        }

        .nav-drawer-cta {
          margin-top: 48px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #04010e;
          background: #f5c842;
          border: none;
          padding: 16px 32px;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background 0.3s;
        }

        .nav-drawer-cta:hover { background: #f8f2e8; }

        .nav-drawer-footer {
          position: absolute;
          bottom: 40px;
          left: 36px;
          right: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-drawer-footer span {
          font-family: 'Space Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.2em;
          color: #3d3560;
          text-transform: uppercase;
        }

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .nav-root { padding: 22px 40px; }
          .nav-root.scrolled { padding: 14px 40px; }
          .nav-links { gap: 28px; }
          .nav-logo { font-size: 20px; }
        }

        /* ── MOBILE (≤ 768px) ── */
        @media (max-width: 768px) {
          .nav-root { padding: 20px 24px; }
          .nav-root.scrolled { padding: 14px 24px; }
          .nav-logo { font-size: 18px; letter-spacing: 0.1em; }

          /* Hide desktop nav elements */
          .nav-links, .nav-cta { display: none; }

          /* Show hamburger & drawer */
          .nav-hamburger { display: flex; }
          .nav-drawer { display: flex; }
        }
      `}</style>

      {/* ── Main bar ── */}
      <nav className={`nav-root${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo">
          AstraForge<sup style={{ fontSize: 10, color: '#f5c842' }}></sup>
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}>{l}</a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button onClick={openContact} className="nav-cta hover-target">
          <span>Begin Project</span>
          <span style={{ fontSize: 14 }}>↗</span>
        </button>

        {/* Hamburger (mobile only) */}
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      <div className={`nav-drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="nav-drawer-links">
          {links.map((l, i) => (
            <li key={l} style={{ transitionDelay: menuOpen ? `${i * 60 + 100}ms` : '0ms' }}>
              <a
              
                href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <button onClick={openContact} className="nav-drawer-cta">
          <span>Begin Project</span>
          <span style={{ fontSize: 16 }}>↗</span>
        </button>

        <div className="nav-drawer-footer">
          <span>© AstraForge 2025</span>
          <span>Creative Digital Agency</span>
        </div>
      </div>
    </>
  )
}