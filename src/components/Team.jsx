// 'use client'
// import { useEffect, useRef } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// gsap.registerPlugin(ScrollTrigger)

// const MEMBERS = [
//   { initials: 'AK', name: 'ARYAN KAPOOR', role: 'Creative Director', bio: 'Leads brand strategy and visual direction for all major projects.', bg: 'linear-gradient(160deg,#0d0020,#200040,#0a0010)', hoverBg: 'linear-gradient(to top,rgba(123,45,255,0.95),rgba(255,123,46,0.85))' },
//   { initials: 'SM', name: 'SARA MEHTA',   role: 'Lead Developer',    bio: 'Architects scalable frontends with buttery smooth animations.',   bg: 'linear-gradient(160deg,#200010,#400020,#100010)', hoverBg: 'linear-gradient(to top,rgba(255,44,200,0.9),rgba(255,123,46,0.8))' },
//   { initials: 'RV', name: 'ROHAN VARMA',  role: '3D & Motion',       bio: 'Brings interfaces to life with cosmic, purposeful motion.',       bg: 'linear-gradient(160deg,#001020,#002040,#001a10)', hoverBg: 'linear-gradient(to top,rgba(0,200,255,0.9),rgba(0,255,170,0.8))' },
// ]

// export default function Team() {
//   const ref = useRef(null)
//   useEffect(() => {
//     if (!ref.current) return
//     gsap.fromTo(ref.current.querySelectorAll('.team-card'),
//       { opacity: 0, y: 80, scale: 0.93 },
//       { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 1, ease: 'back.out(1.2)', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }
//     )
//   }, [])

//   return (
//     <section id="team" ref={ref} style={{ padding: '120px 60px' }}>
//       <div className="eyebrow" style={{ marginBottom: 60 }}>The Collective</div>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
//         {MEMBERS.map((m, i) => (
//           <div key={i} className="team-card hover-target" style={{ position: 'relative', overflow: 'hidden', cursor: 'none', border: '1px solid rgba(255,255,255,0.07)' }}
//             onMouseEnter={e => { e.currentTarget.querySelector('.team-hover').style.opacity = '1'; e.currentTarget.querySelector('.team-hover').style.transform = 'translateY(0)' }}
//             onMouseLeave={e => { e.currentTarget.querySelector('.team-hover').style.opacity = '0'; e.currentTarget.querySelector('.team-hover').style.transform = 'translateY(20px)' }}>
//             <div style={{ aspectRatio: '3/4', position: 'relative', background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               <span style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(60px,8vw,100px)', fontWeight: 900, opacity: 0.06, userSelect: 'none' }}>{m.initials}</span>
//             </div>
//             <div style={{ padding: 24, background: 'rgba(4,1,14,0.92)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
//               <div style={{ fontFamily: 'Cinzel,serif', fontSize: 22, fontWeight: 400, letterSpacing: '0.1em' }}>{m.name}</div>
//               <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.2em', color: '#5a5280', textTransform: 'uppercase', marginTop: 6 }}>{m.role}</div>
//             </div>
//             <div className="team-hover" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 32, opacity: 0, transform: 'translateY(20px)', transition: 'all 0.5s cubic-bezier(.34,1.56,.64,1)', background: m.hoverBg }}>
//               <div style={{ fontFamily: 'Cinzel,serif', fontSize: 32, color: '#fff', letterSpacing: '0.1em' }}>{m.name.split(' ')[0]}</div>
//               <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)', marginTop: 8, textTransform: 'uppercase' }}>{m.role}</div>
//               <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 16, lineHeight: 1.7 }}>{m.bio}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }



'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const MEMBERS = [
  { initials: 'AK', name: 'ARYAN KAPOOR', role: 'Creative Director', bio: 'Leads brand strategy and visual direction for all major projects.',  bg: 'linear-gradient(160deg,#0d0020,#200040,#0a0010)', hoverBg: 'linear-gradient(to top,rgba(123,45,255,0.95),rgba(255,123,46,0.85))' },
  { initials: 'SM', name: 'SARA MEHTA',   role: 'Lead Developer',    bio: 'Architects scalable frontends with buttery smooth animations.',      bg: 'linear-gradient(160deg,#200010,#400020,#100010)', hoverBg: 'linear-gradient(to top,rgba(255,44,200,0.9),rgba(255,123,46,0.8))' },
  { initials: 'RV', name: 'ROHAN VARMA',  role: '3D & Motion',       bio: 'Brings interfaces to life with cosmic, purposeful motion.',          bg: 'linear-gradient(160deg,#001020,#002040,#001a10)', hoverBg: 'linear-gradient(to top,rgba(0,200,255,0.9),rgba(0,255,170,0.8))' },
]

export default function Team() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll('.team-card'),
      { opacity: 0, y: 80, scale: 0.93 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 1, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' } }
    )
  }, [])

  const handleEnter = e => {
    const hover = e.currentTarget.querySelector('.team-hover')
    hover.style.opacity   = '1'
    hover.style.transform = 'translateY(0)'
  }

  const handleLeave = e => {
    const hover = e.currentTarget.querySelector('.team-hover')
    hover.style.opacity   = '0'
    hover.style.transform = 'translateY(20px)'
  }

  return (
    <>
      <style>{`
        .team-section {
          padding: 120px 60px;
        }

        .team-eyebrow { margin-bottom: 60px; }

        /* ── 3-col card grid ── */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .team-card {
          position: relative;
          overflow: hidden;
          cursor: none;
          border: 1px solid rgba(255, 255, 255, 0.07);
        }

        .team-portrait {
          aspect-ratio: 3 / 4;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .team-initials {
          font-family: 'Cinzel', serif;
          font-size: clamp(60px, 8vw, 100px);
          font-weight: 900;
          opacity: 0.06;
          user-select: none;
        }

        .team-info {
          padding: 24px;
          background: rgba(4, 1, 14, 0.92);
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .team-name {
          font-family: 'Cinzel', serif;
          font-size: 22px;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: #f8f2e8;
        }

        .team-role {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: #5a5280;
          text-transform: uppercase;
          margin-top: 6px;
        }

        .team-hover {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s cubic-bezier(.34, 1.56, .64, 1);
        }

        .team-hover-first {
          font-family: 'Cinzel', serif;
          font-size: 32px;
          color: #fff;
          letter-spacing: 0.1em;
        }

        .team-hover-role {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.55);
          margin-top: 8px;
          text-transform: uppercase;
        }

        .team-hover-bio {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 16px;
          line-height: 1.7;
        }

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .team-section { padding: 100px 40px; }
          .team-name    { font-size: 18px; }
          .team-hover-first { font-size: 26px; }
          .team-grid    { gap: 16px; }
        }

        /*
         * ── TABLET narrow (≤ 768px) ──
         * 3-col portrait cards at this width are ~220px each — initials,
         * name, and hover bio all start to collide. Switch to 1-col stacked
         * layout where portrait + info sit side-by-side horizontally.
         */
        @media (max-width: 768px) {
          .team-section { padding: 80px 32px; }
          .team-eyebrow { margin-bottom: 48px; }

          .team-grid {
            grid-template-columns: 1fr;
            gap: 1px;                         /* hairline between rows */
            background: rgba(255,255,255,0.07);
          }

          /* Horizontal card: portrait left, info right */
          .team-card {
            display: grid;
            grid-template-columns: 180px 1fr;
            cursor: pointer;
          }

          .team-portrait {
            aspect-ratio: unset;  /* let the row height drive it */
            min-height: 200px;
          }

          .team-initials { font-size: clamp(48px, 10vw, 72px); }

          .team-info {
            border-top: none;
            border-left: 1px solid rgba(255, 255, 255, 0.07);
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 28px 24px;
          }

          .team-name  { font-size: 16px; letter-spacing: 0.08em; }
          .team-role  { font-size: 8px; }

          /* Hover overlay still spans the full card */
          .team-hover { padding: 24px 28px; }
          .team-hover-first { font-size: 24px; }
          .team-hover-bio   { font-size: 12px; margin-top: 10px; }
        }

        /* ── MOBILE (≤ 480px) ── */
        @media (max-width: 480px) {
          .team-section { padding: 72px 24px; }

          /* Shrink portrait column so name isn't crushed on 320px */
          .team-card {
            grid-template-columns: 120px 1fr;
          }

          .team-portrait { min-height: 160px; }
          .team-initials { font-size: clamp(36px, 12vw, 56px); }

          .team-info  { padding: 20px 18px; }
          .team-name  { font-size: 14px; letter-spacing: 0.06em; }
          .team-role  { font-size: 7px; margin-top: 4px; }

          .team-hover         { padding: 18px 20px; }
          .team-hover-first   { font-size: 20px; }
          .team-hover-role    { font-size: 7px; }
          .team-hover-bio     { font-size: 11px; line-height: 1.6; margin-top: 8px; }
        }
      `}</style>

      <section id="team" ref={ref} className="team-section">
        <div className="eyebrow team-eyebrow">The Collective</div>

        <div className="team-grid">
          {MEMBERS.map((m, i) => (
            <div
              key={i}
              className="team-card hover-target"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              {/* Portrait */}
              <div className="team-portrait" style={{ background: m.bg }}>
                <span className="team-initials">{m.initials}</span>
              </div>

              {/* Name / role strip */}
              <div className="team-info">
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
              </div>

              {/* Hover overlay */}
              <div className="team-hover" style={{ background: m.hoverBg }}>
                <div className="team-hover-first">{m.name.split(' ')[0]}</div>
                <div className="team-hover-role">{m.role}</div>
                <div className="team-hover-bio">{m.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}