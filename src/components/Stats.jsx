// 'use client'
// import { useEffect, useRef } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// gsap.registerPlugin(ScrollTrigger)

// const STATS = [
//   { val: 120, suf: '+', label: 'Projects Delivered' },
//   { val: 98,  suf: '%', label: 'Client Satisfaction' },
//   { val: 40,  suf: '+', label: 'Global Clients'      },
//   { val: 7,   suf: '+', label: 'Years of Mastery'    },
// ]

// export default function Stats() {
//   const ref = useRef(null)

//   useEffect(() => {
//     if (!ref.current) return
//     const boxes = ref.current.querySelectorAll('.stat-box')

//     gsap.fromTo(boxes, { opacity: 0, y: 50 }, {
//       opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
//       scrollTrigger: { trigger: ref.current, start: 'top 80%' }
//     })

//     boxes.forEach(box => {
//       const target = parseInt(box.dataset.target)
//       const numEl  = box.querySelector('.num-val')
//       const obj    = { v: 0 }
//       ScrollTrigger.create({
//         trigger: ref.current, start: 'top 80%',
//         onEnter() {
//           gsap.to(obj, {
//             v: target, duration: 2.5, ease: 'power2.out',
//             onUpdate() { numEl.textContent = Math.round(obj.v) }
//           })
//         }
//       })
//     })
//   }, [])

//   return (
//     <>
//       <style>{`
//         .stats-section {
//           background: rgba(4, 1, 14, 0.85);
//           backdrop-filter: blur(40px);
//           -webkit-backdrop-filter: blur(40px);
//           border-top:    1px solid rgba(255, 255, 255, 0.07);
//           border-bottom: 1px solid rgba(255, 255, 255, 0.07);
//         }

//         /* Hairline-gutter grid */
//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 1px;
//           background: rgba(255, 255, 255, 0.07);
//         }

//         .stat-box {
//           padding: 60px 40px;
//           background: rgba(4, 1, 14, 0.9);
//           position: relative;
//           overflow: hidden;
//           cursor: none;
//         }

//         .stat-line {
//           position: absolute;
//           bottom: 0; left: 0;
//           width: 100%; height: 2px;
//           background: linear-gradient(90deg, #7b2dff, #ff7b2e, #f5c842);
//           transform: scaleX(0);
//           transform-origin: left;
//           transition: transform 0.6s;
//         }

//         .stat-number {
//           font-family: 'Cinzel', serif;
//           font-size: clamp(56px, 6vw, 88px);
//           line-height: 1;
//           color: #f8f2e8;
//         }

//         .stat-suf {
//           font-size: 0.45em;
//           color: #f5c842;
//         }

//         .stat-label {
//           font-family: 'Space Mono', monospace;
//           font-size: 10px;
//           letter-spacing: 0.2em;
//           color: #5a5280;
//           text-transform: uppercase;
//           margin-top: 16px;
//         }

//         /* ── TABLET (≤ 1024px) ── */
//         @media (max-width: 1024px) {
//           .stat-box    { padding: 48px 28px; }
//           .stat-number { font-size: clamp(44px, 5.5vw, 72px); }
//           .stat-label  { font-size: 9px; letter-spacing: 0.15em; }
//         }

//         /*
//          * ── TABLET narrow (≤ 768px) ──
//          * 4-across is too tight; switch to 2 × 2.
//          */
//         @media (max-width: 768px) {
//           .stats-grid  { grid-template-columns: repeat(2, 1fr); }
//           .stat-box    { padding: 48px 32px; }
//           .stat-number { font-size: clamp(48px, 10vw, 72px); }
//         }

//         /* ── MOBILE (≤ 480px) ── */
//         @media (max-width: 480px) {
//           .stat-box {
//             padding: 40px 24px;
//             cursor: pointer;
//           }

//           .stat-number {
//             /* Each cell is ~50 vw; keep number from overflowing */
//             font-size: clamp(38px, 11vw, 56px);
//           }

//           .stat-label {
//             font-size: 8px;
//             letter-spacing: 0.12em;
//             margin-top: 12px;
//           }
//         }
//       `}</style>

//       <section ref={ref} className="stats-section">
//         <div className="stats-grid">
//           {STATS.map((s, i) => (
//             <div
//               key={i}
//               className="stat-box hover-target"
//               data-target={s.val}
//               onMouseEnter={e => e.currentTarget.querySelector('.stat-line').style.transform = 'scaleX(1)'}
//               onMouseLeave={e => e.currentTarget.querySelector('.stat-line').style.transform = 'scaleX(0)'}
//             >
//               <div className="stat-line" />
//               <div className="stat-number">
//                 <span className="num-val">0</span>
//                 <span className="stat-suf">{s.suf}</span>
//               </div>
//               <div className="stat-label">{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
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
          background: rgba(4, 1, 14, 0.50);
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
          background: rgba(4, 1, 14, 0.45);
          position: relative;
          overflow: hidden;
          cursor: none;
          transition: background 0.3s;
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
              onMouseEnter={e => {
                e.currentTarget.querySelector('.stat-line').style.transform = 'scaleX(1)'
                e.currentTarget.style.background = 'rgba(20,5,40,0.35)'
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.stat-line').style.transform = 'scaleX(0)'
                e.currentTarget.style.background = 'transparent'
              }}
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