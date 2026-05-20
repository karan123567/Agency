// 'use client'
// import { useEffect, useRef } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// gsap.registerPlugin(ScrollTrigger)

// export default function CTA() {
//   const ref = useRef(null)
//   useEffect(() => {
//     if (!ref.current) return
//     gsap.fromTo(ref.current.querySelector('.cta-h'), { opacity: 0, y: 80 }, {
//       opacity: 1, y: 0, duration: 1.3, ease: 'expo.out',
//       scrollTrigger: { trigger: ref.current, start: 'top 75%' }
//     })
//   }, [])
//   return (
//     <section id="cta" ref={ref} style={{ padding: '160px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'rgba(4,1,14,0.85)', backdropFilter: 'blur(40px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
//       <div style={{ position: 'absolute', fontFamily: 'Cinzel,serif', fontSize: 'clamp(80px,16vw,260px)', color: 'transparent', WebkitTextStroke: '1px rgba(245,200,66,0.04)', lineHeight: 0.85, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', whiteSpace: 'nowrap', letterSpacing: '0.05em', zIndex: 0 }}>OM</div>
//       <div style={{ position: 'relative', zIndex: 1 }}>
//         <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.3em', color: '#f5c842', textTransform: 'uppercase', marginBottom: 40 }}>Ready to Begin?</div>
//         <h2 className="cta-h" style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(56px,9vw,128px)', fontWeight: 400, lineHeight: 0.9, letterSpacing: '0.05em', marginBottom: 60 }}>
//           LET'S BUILD<br />YOUR DIGITAL<br />
//           <span style={{ background: 'linear-gradient(90deg,#ff7b2e,#f5c842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>COSMOS</span>
//         </h2>
//         <button className="hover-target" style={{ display: 'inline-flex', alignItems: 'center', gap: 16, fontFamily: 'Space Mono,monospace', fontSize: 11, letterSpacing: '0.2em', color: '#04010e', background: '#f5c842', border: 'none', padding: '20px 48px', textTransform: 'uppercase', cursor: 'none', transition: 'background .3s' }}
//           onMouseEnter={e => e.currentTarget.style.background = '#f8f2e8'}
//           onMouseLeave={e => e.currentTarget.style.background = '#f5c842'}>
//           <span>Start a Project</span><span>↗</span>
//         </button>
//         <a href="mailto:hello@shakti.studio" style={{ display: 'block', marginTop: 32, fontFamily: 'Space Mono,monospace', fontSize: 11, letterSpacing: '0.15em', color: '#5a5280', textDecoration: 'none', transition: 'color .3s' }}
//           onMouseEnter={e => e.currentTarget.style.color = '#f5c842'}
//           onMouseLeave={e => e.currentTarget.style.color = '#5a5280'}>
//           hello@shakti.studio
//         </a>
//       </div>
//     </section>
//   )
// }


'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current.querySelector('.cta-h'), { opacity: 0, y: 80 }, {
      opacity: 1, y: 0, duration: 1.3, ease: 'expo.out',
      scrollTrigger: { trigger: ref.current, start: 'top 75%' }
    })
  }, [])

  return (
    <>
      <style>{`
        .cta-section {
          padding: 160px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
          background: rgba(4, 1, 14, 0.85);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .cta-om {
          position: absolute;
          font-family: 'Cinzel', serif;
          font-size: clamp(80px, 16vw, 260px);
          color: transparent;
          -webkit-text-stroke: 1px rgba(245, 200, 66, 0.04);
          line-height: 0.85;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          white-space: nowrap;
          letter-spacing: 0.05em;
          z-index: 0;
          user-select: none;
        }

        .cta-inner {
          position: relative;
          z-index: 1;
        }

        .cta-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: #f5c842;
          text-transform: uppercase;
          margin-bottom: 40px;
        }

        .cta-h {
          font-family: 'Cinzel', serif;
          font-size: clamp(56px, 9vw, 128px);
          font-weight: 400;
          line-height: 0.9;
          letter-spacing: 0.05em;
          margin-bottom: 60px;
        }

        .cta-gradient {
          background: linear-gradient(90deg, #ff7b2e, #f5c842);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #04010e;
          background: #f5c842;
          border: none;
          padding: 20px 48px;
          text-transform: uppercase;
          cursor: none;
          transition: background 0.3s;
        }

        .cta-btn:hover { background: #f8f2e8; }

        .cta-email {
          display: block;
          margin-top: 32px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          color: #5a5280;
          text-decoration: none;
          transition: color 0.3s;
        }

        .cta-email:hover { color: #f5c842; }

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .cta-section {
            padding: 120px 40px;
          }
          .cta-h {
            font-size: clamp(48px, 8vw, 96px);
            margin-bottom: 48px;
          }
          .cta-btn {
            padding: 18px 40px;
          }
        }

        /* ── MOBILE (≤ 640px) ── */
        @media (max-width: 640px) {
          .cta-section {
            padding: 80px 24px 100px;
          }

          .cta-eyebrow {
            font-size: 8px;
            letter-spacing: 0.22em;
            margin-bottom: 28px;
          }

          .cta-h {
            /* On narrow screens, allow natural wrapping instead of forced <br> */
            font-size: clamp(40px, 13vw, 64px);
            line-height: 0.93;
            letter-spacing: 0.03em;
            margin-bottom: 40px;
            word-break: break-word;
          }

          /* Stretch the CTA button full-width on small screens */
          .cta-btn {
            width: 100%;
            justify-content: center;
            padding: 18px 24px;
            font-size: 10px;
            letter-spacing: 0.15em;
            cursor: pointer; /* restore normal cursor on touch */
          }

          .cta-email {
            font-size: 10px;
            letter-spacing: 0.1em;
            margin-top: 24px;
            /* Ensure long email doesn't overflow */
            overflow-wrap: break-word;
            word-break: break-all;
          }

          /* Fade the OM watermark a touch more on mobile — less visual noise */
          .cta-om {
            -webkit-text-stroke: 1px rgba(245, 200, 66, 0.025);
          }
        }
      `}</style>

      <section id="cta" ref={ref} className="cta-section">
        {/* OM watermark */}
        <div className="cta-om">OM</div>

        <div className="cta-inner">
          <div className="cta-eyebrow">Ready to Begin?</div>

          <h2 className="cta-h">
            LET'S BUILD<br />
            YOUR DIGITAL<br />
            <span className="cta-gradient">COSMOS</span>
          </h2>

          <button
            className="cta-btn hover-target"
            onMouseEnter={e => e.currentTarget.style.background = '#f8f2e8'}
            onMouseLeave={e => e.currentTarget.style.background = '#f5c842'}
          >
            <span>Start a Project</span>
            <span>↗</span>
          </button>
          <a
          
            href="mailto:hello@shakti.studio"
            className="cta-email"
            onMouseEnter={e => e.currentTarget.style.color = '#f5c842'}
            onMouseLeave={e => e.currentTarget.style.color = '#5a5280'}
          >
            hello@shakti.studio
          </a>
        </div>
      </section>
    </>
  )
}