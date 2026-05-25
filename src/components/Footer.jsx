'use client'

export default function Footer() {
  const socials = ['Instagram', 'Twitter', 'Dribbble', 'LinkedIn']

  return (
    <>
      <style>{`
        .footer-root {
          padding: 50px 60px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(4, 1, 14, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 40px;
        }

        .footer-brand-name {
          font-family: 'Cinzel', serif;
          font-size: 36px;
          letter-spacing: 0.1em;
          color: #f8f2e8;
        }

        .footer-brand-sub {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: #5a5280;
          margin-top: 8px;
          text-transform: uppercase;
        }

        .footer-socials {
          display: flex;
          gap: 28px;
          list-style: none;
          flex-wrap: wrap;
          justify-content: center;
        }

        .footer-socials a {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          color: #5a5280;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.3s;
        }

        .footer-socials a:hover { color: #f5c842; }

        .footer-copy {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          color: #5a5280;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .footer-root {
            padding: 44px 40px;
            gap: 28px;
          }
          .footer-brand-name { font-size: 28px; }
          .footer-socials { gap: 20px; }
        }

        /* ── MOBILE (≤ 640px) ── */
        @media (max-width: 640px) {
          .footer-root {
            padding: 48px 24px 40px;
            flex-direction: column;
            align-items: flex-start;
            gap: 36px;
          }

          .footer-brand-name { font-size: 30px; }

          /* Socials row — allow wrap, left-align */
          .footer-socials {
            justify-content: flex-start;
            gap: 20px 24px; /* row-gap col-gap */
          }

          /* Copyright sits last, full-width, left-aligned */
          .footer-copy {
            width: 100%;
            padding-top: 24px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 8px;
          }
        }
      `}</style>

      <footer className="footer-root">
        {/* Brand */}
        <div>
          <div className="footer-brand-name">
            AstraForge<sup style={{ fontSize: 12, color: '#f5c842' }}>®</sup>
          </div>
          <div className="footer-brand-sub">Creative Digital Agency</div>
        </div>

        {/* Social links */}
        <ul className="footer-socials">
          {socials.map(l => (
            <li key={l}>
              <a
                href="#"
                onMouseEnter={e => e.currentTarget.style.color = '#f5c842'}
                onMouseLeave={e => e.currentTarget.style.color = '#5a5280'}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <div className="footer-copy">© 2025 AstraForge</div>
      </footer>
    </>
  )
}