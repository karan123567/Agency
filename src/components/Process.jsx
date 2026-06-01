// 'use client'
// import { useEffect, useRef } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// gsap.registerPlugin(ScrollTrigger)

// const STEPS = [
//   { num: '01', name: 'Discovery & Vision',  dur: 'Week 1–2' },
//   { num: '02', name: 'Design & Prototype',  dur: 'Week 2–4' },
//   { num: '03', name: 'Build & Animate',     dur: 'Week 4–8' },
//   { num: '04', name: 'Launch & Evolve',     dur: 'Week 8+' },
// ]

// export default function Process() {
//   const ref = useRef(null)
//   useEffect(() => {
//     if (!ref.current) return
//     gsap.fromTo(ref.current.querySelectorAll('.proc-row'),
//       { opacity: 0, x: -60 },
//       { opacity: 1, x: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }
//     )
//   }, [])

//   return (
//     <section id="process" ref={ref} style={{ padding: '120px 60px', background: 'rgba(4,1,14,0.8)', backdropFilter: 'blur(40px)' }}>
//       <div className="eyebrow" style={{ marginBottom: 60 }}>The Sacred Path</div>
//       {STEPS.map((s, i) => (
//         <div key={i} className="proc-row hover-target" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 180px auto', alignItems: 'center', padding: '40px 0', borderBottom: '1px solid rgba(255,255,255,0.07)', gap: 40, cursor: 'none', position: 'relative' }}
//           onMouseEnter={e => { e.currentTarget.querySelector('.proc-line').style.width = '100%'; e.currentTarget.querySelector('.proc-name').style.background = 'linear-gradient(90deg,#ff7b2e,#f5c842)'; e.currentTarget.querySelector('.proc-name').style.WebkitBackgroundClip = 'text'; e.currentTarget.querySelector('.proc-name').style.WebkitTextFillColor = 'transparent'; e.currentTarget.querySelector('.proc-arrow').style.transform = 'translateX(12px)'; e.currentTarget.querySelector('.proc-arrow').style.color = '#f5c842' }}
//           onMouseLeave={e => { e.currentTarget.querySelector('.proc-line').style.width = '0'; e.currentTarget.querySelector('.proc-name').style.background = 'none'; e.currentTarget.querySelector('.proc-name').style.WebkitTextFillColor = '#f8f2e8'; e.currentTarget.querySelector('.proc-arrow').style.transform = 'translateX(0)'; e.currentTarget.querySelector('.proc-arrow').style.color = '#5a5280' }}>
//           <div className="proc-line" style={{ position: 'absolute', bottom: 0, left: 0, height: 1, width: 0, background: 'linear-gradient(90deg,#7b2dff,#ff7b2e)', transition: 'width 0.8s cubic-bezier(.76,0,.24,1)' }} />
//           <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280' }}>{s.num}</span>
//           <span className="proc-name" style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 400, letterSpacing: '0.05em', transition: 'all .3s', color: '#f8f2e8' }}>{s.name}</span>
//           <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280' }}>{s.dur}</span>
//           <span className="proc-arrow" style={{ fontSize: 20, color: '#5a5280', transition: 'all .4s' }}>→</span>
//         </div>
//       ))}
//     </section>
//   )
// }


'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { num: '01', name: 'DISCOVERY & STRATEGY', dur: 'Week 1–2' },
  { num: '02', name: 'DESIGN & PROTOTYPE', dur: 'Week 2–4' },
  { num: '03', name: 'BUILD & ENGINEER',    dur: 'Week 4–8' },
  { num: '04', name: 'Launch & Scale',    dur: 'Week 8+'  },
]

export default function Process() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll('.proc-row'),
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' } }
    )
  }, [])

  const handleEnter = e => {
    const el = e.currentTarget
    el.querySelector('.proc-line').style.width     = '100%'
    el.querySelector('.proc-name').style.background          = 'linear-gradient(90deg,#ff7b2e,#f5c842)'
    el.querySelector('.proc-name').style.WebkitBackgroundClip = 'text'
    el.querySelector('.proc-name').style.WebkitTextFillColor  = 'transparent'
    el.querySelector('.proc-arrow').style.transform = 'translateX(12px)'
    el.querySelector('.proc-arrow').style.color     = '#f5c842'
  }

  const handleLeave = e => {
    const el = e.currentTarget
    el.querySelector('.proc-line').style.width               = '0'
    el.querySelector('.proc-name').style.background          = 'none'
    el.querySelector('.proc-name').style.WebkitTextFillColor = '#f8f2e8'
    el.querySelector('.proc-arrow').style.transform          = 'translateX(0)'
    el.querySelector('.proc-arrow').style.color              = '#5a5280'
  }

  return (
    <>
      <style>{`
        .proc-section {
          padding: 120px 60px;
          background: rgba(4, 1, 14, 0.8);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }

        .proc-eyebrow {
          margin-bottom: 60px;
        }

        /* ── Row grid: num | name | duration | arrow ── */
        .proc-row {
          display: grid;
          grid-template-columns: 80px 1fr 180px auto;
          align-items: center;
          padding: 40px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          gap: 40px;
          cursor: none;
          position: relative;
        }

        .proc-line {
          position: absolute;
          bottom: 0; left: 0;
          height: 1px; width: 0;
          background: linear-gradient(90deg, #7b2dff, #ff7b2e);
          transition: width 0.8s cubic-bezier(.76, 0, .24, 1);
        }

        .proc-num {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: #5a5280;
        }

        .proc-name {
          font-family: 'Cinzel', serif;
          font-size: clamp(28px, 3.5vw, 48px);
          font-weight: 400;
          letter-spacing: 0.05em;
          transition: all 0.3s;
          color: #f8f2e8;
        }

        .proc-dur {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: #5a5280;
        }

        .proc-arrow {
          font-size: 20px;
          color: #5a5280;
          transition: all 0.4s;
        }

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .proc-section {
            padding: 100px 40px;
          }
          .proc-row {
            grid-template-columns: 56px 1fr 140px auto;
            gap: 24px;
            padding: 32px 0;
          }
          .proc-eyebrow { margin-bottom: 48px; }
        }

        /* ── MOBILE (≤ 640px) ── */
        @media (max-width: 640px) {
          .proc-section {
            padding: 80px 24px;
          }

          .proc-eyebrow { margin-bottom: 40px; }

          /*
           * Switch to a 2×2 mini-grid inside each row:
           *   [num]  [arrow]
           *   [name]
           *   [dur]
           * Arrow floats top-right via grid placement.
           */
          .proc-row {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto auto;
            grid-template-areas:
              "num   arrow"
              "name  name"
              "dur   dur";
            gap: 6px 0;
            padding: 28px 0;
            cursor: pointer; /* restore natural cursor on touch */
          }

          .proc-num   { grid-area: num;   font-size: 9px; }
          .proc-name  { grid-area: name;  font-size: clamp(22px, 7vw, 34px); letter-spacing: 0.03em; margin-top: 4px; }
          .proc-dur   { grid-area: dur;   font-size: 9px; margin-top: 6px; }
          .proc-arrow { grid-area: arrow; font-size: 16px; align-self: start; }
        }
      `}</style>

      <section id="process" ref={ref} className="proc-section">
        <div className="eyebrow proc-eyebrow">HOW WE BUILD</div>

        {STEPS.map((s, i) => (
          <div
            key={i}
            className="proc-row hover-target"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="proc-line" />
            <span className="proc-num">{s.num}</span>
            <span className="proc-name">{s.name}</span>
            <span className="proc-dur">{s.dur}</span>
            <span className="proc-arrow">→</span>
          </div>
        ))}
      </section>
    </>
  )
}