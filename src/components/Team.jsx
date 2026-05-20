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

const STATS = [
  { val: 120, suf: '+', label: 'Projects Delivered' },
  { val: 98,  suf: '%', label: 'Client Satisfaction' },
  { val: 40,  suf: '+', label: 'Global Clients'      },
  { val: 7,   suf: '+', label: 'Years of Mastery'    },
]

export default function Stats() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const boxes = ref.current.querySelectorAll('.stat-box')

    gsap.fromTo(boxes, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' }
    })

    boxes.forEach(box => {
      const target = parseInt(box.dataset.target)
      const numEl  = box.querySelector('.num-val')
      const obj    = { v: 0 }
      ScrollTrigger.create({
        trigger: ref.current, start: 'top 80%',
        onEnter() {
          gsap.to(obj, {
            v: target, duration: 2.5, ease: 'power2.out',
            onUpdate() { numEl.textContent = Math.round(obj.v) }
          })
        }
      })
    })
  }, [])

  return (
    <>
      <style>{`
        .stats-section {
          background: rgba(4, 1, 14, 0.85);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border-top:    1px solid rgba(255, 255, 255, 0.07);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        /* Hairline-gutter grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255, 255, 255, 0.07);
        }

        .stat-box {
          padding: 60px 40px;
          background: rgba(4, 1, 14, 0.9);
          position: relative;
          overflow: hidden;
          cursor: none;
        }

        .stat-line {
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, #7b2dff, #ff7b2e, #f5c842);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s;
        }

        .stat-number {
          font-family: 'Cinzel', serif;
          font-size: clamp(56px, 6vw, 88px);
          line-height: 1;
          color: #f8f2e8;
        }

        .stat-suf {
          font-size: 0.45em;
          color: #f5c842;
        }

        .stat-label {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #5a5280;
          text-transform: uppercase;
          margin-top: 16px;
        }

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .stat-box    { padding: 48px 28px; }
          .stat-number { font-size: clamp(44px, 5.5vw, 72px); }
          .stat-label  { font-size: 9px; letter-spacing: 0.15em; }
        }

        /*
         * ── TABLET narrow (≤ 768px) ──
         * 4-across is too tight; switch to 2 × 2.
         */
        @media (max-width: 768px) {
          .stats-grid  { grid-template-columns: repeat(2, 1fr); }
          .stat-box    { padding: 48px 32px; }
          .stat-number { font-size: clamp(48px, 10vw, 72px); }
        }

        /* ── MOBILE (≤ 480px) ── */
        @media (max-width: 480px) {
          .stat-box {
            padding: 40px 24px;
            cursor: pointer;
          }

          .stat-number {
            /* Each cell is ~50 vw; keep number from overflowing */
            font-size: clamp(38px, 11vw, 56px);
          }

          .stat-label {
            font-size: 8px;
            letter-spacing: 0.12em;
            margin-top: 12px;
          }
        }
      `}</style>

      <section ref={ref} className="stats-section">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="stat-box hover-target"
              data-target={s.val}
              onMouseEnter={e => e.currentTarget.querySelector('.stat-line').style.transform = 'scaleX(1)'}
              onMouseLeave={e => e.currentTarget.querySelector('.stat-line').style.transform = 'scaleX(0)'}
            >
              <div className="stat-line" />
              <div className="stat-number">
                <span className="num-val">0</span>
                <span className="stat-suf">{s.suf}</span>
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}