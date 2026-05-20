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
//       const numEl = box.querySelector('.num-val')
//       const obj = { v: 0 }
//       ScrollTrigger.create({
//         trigger: ref.current, start: 'top 80%', onEnter() {
//           gsap.to(obj, { v: target, duration: 2.5, ease: 'power2.out', onUpdate() { numEl.textContent = Math.round(obj.v) } })
//         }
//       })
//     })
//   }, [])

//   return (
//     <section ref={ref} style={{ background: 'rgba(4,1,14,0.85)', backdropFilter: 'blur(40px)', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.07)' }}>
//         {STATS.map((s, i) => (
//           <div key={i} className="stat-box hover-target" data-target={s.val} style={{ padding: '60px 40px', background: 'rgba(4,1,14,0.9)', position: 'relative', overflow: 'hidden', cursor: 'none' }}
//             onMouseEnter={e => { e.currentTarget.querySelector('.stat-line').style.transform = 'scaleX(1)' }}
//             onMouseLeave={e => { e.currentTarget.querySelector('.stat-line').style.transform = 'scaleX(0)' }}>
//             <div className="stat-line" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 2, background: 'linear-gradient(90deg,#7b2dff,#ff7b2e,#f5c842)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.6s' }} />
//             <div style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(56px,6vw,88px)', lineHeight: 1, color: '#f8f2e8' }}>
//               <span className="num-val">0</span>
//               <span style={{ fontSize: '0.45em', color: '#f5c842' }}>{s.suf}</span>
//             </div>
//             <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.2em', color: '#5a5280', textTransform: 'uppercase', marginTop: 16 }}>{s.label}</div>
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

const SERVICES = [
  { num: '01', icon: '⬡', title: 'Web Design &\nDevelopment',      tags: ['Next.js', 'Three.js', 'GSAP', 'WebGL'], desc: 'Immersive environments built with cutting-edge WebGL and motion.' },
  { num: '02', icon: '◈', title: 'Brand Identity &\nVisual Systems', tags: ['Logo', 'Typography', 'Systems'],        desc: 'Mythic brand identities that command attention and inspire devotion.' },
  { num: '03', icon: '⟁', title: 'Motion &\n3D Experiences',        tags: ['GSAP', 'R3F', 'Lottie', 'Framer'],      desc: 'Fluid animations that breathe cosmic life into every pixel.' },
  { num: '04', icon: '⊛', title: 'E-Commerce &\nSaaS Platforms',    tags: ['Shopify', 'Stripe', 'CMS', 'API'],       desc: 'Revenue-generating platforms built for scale and transcendence.' },
]

export default function Services() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const cards = ref.current.querySelectorAll('.svc-card')
    gsap.fromTo(cards, { opacity: 0, y: 80 }, {
      opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' }
    })
  }, [])

  const handleEnter = e => {
    const el = e.currentTarget
    el.style.background = 'rgba(20,5,40,0.98)'
    el.querySelector('.sarr').style.transform   = 'rotate(45deg)'
    el.querySelector('.sarr').style.borderColor = '#f5c842'
    el.querySelector('.sarr').style.color       = '#f5c842'
  }

  const handleLeave = e => {
    const el = e.currentTarget
    el.style.background = 'rgba(4,1,14,0.92)'
    el.querySelector('.sarr').style.transform   = 'rotate(0deg)'
    el.querySelector('.sarr').style.borderColor = 'rgba(255,255,255,0.1)'
    el.querySelector('.sarr').style.color       = '#f8f2e8'
  }

  return (
    <>
      <style>{`
        .svc-section {
          padding: 120px 60px;
          background: rgba(4, 1, 14, 0.82);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .svc-eyebrow { margin-bottom: 80px; }

        .svc-headline {
          font-family: 'Cinzel', serif;
          font-size: clamp(48px, 7vw, 100px);
          font-weight: 400;
          line-height: 0.9;
          letter-spacing: 0.05em;
          margin-bottom: 80px;
        }

        .svc-headline-ghost {
          color: transparent;
          -webkit-text-stroke: 1px rgba(248, 242, 232, 0.18);
        }

        /* ── 2-col grid with hairline gutters ── */
        .svc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.07);
        }

        .svc-card {
          padding: 56px 44px;
          background: rgba(4, 1, 14, 0.92);
          position: relative;
          overflow: hidden;
          cursor: none;
          transition: background 0.3s;
        }

        .svc-num {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: #5a5280;
          margin-bottom: 28px;
        }

        .svc-icon {
          font-size: 28px;
          color: #f5c842;
          opacity: 0.7;
          margin-bottom: 20px;
        }

        .svc-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(24px, 2.8vw, 40px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: 0.05em;
          margin-bottom: 20px;
          white-space: pre-line;
          color: #f8f2e8;
        }

        .svc-desc {
          font-size: 13px;
          color: #5a5280;
          line-height: 1.8;
          margin-bottom: 28px;
        }

        .svc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .svc-tag {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          color: #5a5280;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 5px 11px;
        }

        .sarr {
          position: absolute;
          bottom: 44px;
          right: 44px;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #f8f2e8;
          transition: all 0.4s;
        }

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .svc-section  { padding: 100px 40px; }
          .svc-eyebrow  { margin-bottom: 56px; }
          .svc-headline { margin-bottom: 56px; }
          .svc-card     { padding: 44px 32px; }
          .sarr         { bottom: 32px; right: 32px; }
        }

        /* ── TABLET narrow / large mobile (≤ 768px) ── */
        @media (max-width: 768px) {
          /* Stack grid to single column */
          .svc-grid { grid-template-columns: 1fr; }

          .svc-section  { padding: 80px 32px; }
          .svc-headline { margin-bottom: 48px; }

          .svc-card {
            padding: 40px 28px 72px; /* extra bottom for absolute arrow */
          }

          .svc-title {
            font-size: clamp(22px, 6vw, 34px);
          }
        }

        /* ── MOBILE (≤ 640px) ── */
        @media (max-width: 640px) {
          .svc-section  { padding: 72px 24px; }
          .svc-eyebrow  { margin-bottom: 40px; }
          .svc-headline { margin-bottom: 40px; }

          .svc-card {
            padding: 36px 24px 68px;
            cursor: pointer;
          }

          .svc-num  { font-size: 9px;  margin-bottom: 20px; }
          .svc-icon { font-size: 22px; margin-bottom: 14px; }

          .svc-title {
            font-size: clamp(20px, 6.5vw, 30px);
            margin-bottom: 14px;
            letter-spacing: 0.03em;
          }

          .svc-desc {
            font-size: 12px;
            line-height: 1.75;
            margin-bottom: 20px;
          }

          .svc-tag { font-size: 8px; padding: 4px 9px; }

          .sarr {
            bottom: 28px;
            right: 24px;
            width: 36px;
            height: 36px;
            font-size: 15px;
          }
        }
      `}</style>

      <section id="services" ref={ref} className="svc-section">
        <div className="eyebrow svc-eyebrow">Sacred Services</div>

        <div className="svc-headline">
          <div>WHAT</div>
          <div className="svc-headline-ghost">WE DO</div>
        </div>

        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="svc-card hover-target"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <div className="svc-num">{s.num}</div>
              <div className="svc-icon">{s.icon}</div>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
              <div className="svc-tags">
                {s.tags.map(t => <span key={t} className="svc-tag">{t}</span>)}
              </div>
              <div className="sarr">↗</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}