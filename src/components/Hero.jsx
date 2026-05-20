// 'use client'
// import { useEffect } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// gsap.registerPlugin(ScrollTrigger)

// export default function Hero() {
//   useEffect(() => {
//     // Marquee
//     const mq = document.getElementById('mq-inner')
//     if (mq) {
//       const clone = mq.cloneNode(true)
//       mq.parentElement.appendChild(clone)
//       gsap.to([mq, clone], { xPercent: -50, repeat: -1, duration: 28, ease: 'none' })
//     }
//   }, [])

//   return (
//     <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '140px 60px 80px', overflow: 'hidden' }}>
//       {/* Scroll indicator — 3 sections tall so Three.js scroll has space */}
//       <div className="hero-eyebrow" style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.3em', color: '#f5c842', textTransform: 'uppercase', marginBottom: 32, overflow: 'hidden' }}>
//         <span style={{ display: 'inline-block' }}>Creative Digital Agency — Est. 2025</span>
//       </div>
//       <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(52px,10vw,148px)', fontWeight: 600, lineHeight: 0.88, letterSpacing: '0.05em' }}>
//         {['WE CRAFT', 'DIGITAL', 'COSMOS'].map((word, i) => (
//           <span key={i} className="hero-line" style={{ overflow: 'hidden', display: 'block' }}>
//             <span style={{ display: 'block', color: i === 2 ? 'transparent' : undefined, WebkitTextStroke: i === 2 ? '1px rgba(248,242,232,0.3)' : undefined }}>
//               {i === 2 ? <span style={{ background: 'linear-gradient(90deg,#ff7b2e,#f5c842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{word}</span> : word}
//             </span>
//           </span>
//         ))}
//       </h1>
//       <p className="hero-desc" style={{ fontSize: 15, lineHeight: 1.9, color: '#5a5280', maxWidth: 420, marginTop: 48, opacity: 0 }}>
//         A collective of creators building extraordinary digital experiences where technology meets the divine — every pixel, an offering.
//       </p>
//       <div className="hero-scroll" style={{ position: 'absolute', bottom: 40, left: 60, fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.25em', color: '#5a5280', display: 'flex', alignItems: 'center', gap: 12 }}>
//         <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg,transparent,#5a5280,#f5c842)', position: 'relative', overflow: 'hidden' }} />
//         <span>Scroll to reveal Mahadev</span>
//       </div>
//       <div style={{ position: 'absolute', top: '50%', right: 50, transform: 'translateY(-50%)', fontFamily: 'Space Mono,monospace', fontSize: 11, color: '#5a5280', letterSpacing: '0.15em', writingMode: 'vertical-rl' }}>
//         2025 — ∞
//       </div>

//       {/* Spacer so Shiva reveals on scroll through hero */}
//       <div style={{ height: '300vh' }} />
//     </section>
//   )
// }


'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  useEffect(() => {
    // Marquee
    const mq = document.getElementById('mq-inner')
    if (mq) {
      const clone = mq.cloneNode(true)
      mq.parentElement.appendChild(clone)
      gsap.to([mq, clone], { xPercent: -50, repeat: -1, duration: 28, ease: 'none' })
    }
  }, [])

  return (
    <>
      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 140px 60px 80px;
          overflow: hidden;
          position: relative;
        }

        .hero-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: #f5c842;
          text-transform: uppercase;
          margin-bottom: 32px;
          overflow: hidden;
        }

        .hero-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(52px, 10vw, 148px);
          font-weight: 600;
          line-height: 0.88;
          letter-spacing: 0.05em;
        }

        .hero-line {
          overflow: hidden;
          display: block;
        }

        .hero-line span {
          display: block;
        }

        .hero-word-cosmos {
          background: linear-gradient(90deg, #ff7b2e, #f5c842);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-desc {
          font-size: 15px;
          line-height: 1.9;
          color: #5a5280;
          max-width: 420px;
          margin-top: 48px;
          opacity: 0;
        }

        .hero-scroll {
          position: absolute;
          bottom: 40px;
          left: 60px;
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          color: #5a5280;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hero-scroll-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #5a5280, #f5c842);
          overflow: hidden;
        }

        .hero-year {
          position: absolute;
          top: 50%;
          right: 50px;
          transform: translateY(-50%);
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #5a5280;
          letter-spacing: 0.15em;
          writing-mode: vertical-rl;
        }

        /* Mobile year badge — hidden by default */
        .hero-year-mobile {
          display: none;
        }

        /* ── TABLET (≤ 1024px) ── */
        @media (max-width: 1024px) {
          .hero-section {
            padding: 120px 40px 80px;
          }
          .hero-scroll {
            left: 40px;
          }
          .hero-year {
            right: 28px;
            font-size: 10px;
          }
          .hero-desc {
            font-size: 14px;
            max-width: 380px;
            margin-top: 40px;
          }
        }

        /* ── MOBILE (≤ 640px) ── */
        @media (max-width: 640px) {
          .hero-section {
            padding: 100px 24px 100px;
            justify-content: flex-start;
          }

          .hero-eyebrow {
            font-size: 8px;
            letter-spacing: 0.18em;
            margin-bottom: 20px;
          }

          .hero-title {
            font-size: clamp(42px, 13.5vw, 68px);
            line-height: 0.92;
            letter-spacing: 0.03em;
          }

          .hero-desc {
            font-size: 13px;
            line-height: 1.75;
            max-width: 100%;
            margin-top: 28px;
          }

          /* Reposition scroll indicator to bottom-center */
          .hero-scroll {
            left: 50%;
            transform: translateX(-50%);
            bottom: 28px;
            font-size: 8px;
            letter-spacing: 0.15em;
            white-space: nowrap;
          }

          /* Hide vertical side year on mobile — too cramped */
          .hero-year {
            display: none;
          }

          /* Show year as a small inline label below eyebrow */
          .hero-year-mobile {
            display: block;
            font-family: 'Space Mono', monospace;
            font-size: 8px;
            color: #3d3560;
            letter-spacing: 0.18em;
            margin-bottom: 16px;
          }
        }
      `}</style>

      <section id="hero" className="hero-section">
        <div className="hero-eyebrow">
          <span style={{ display: 'inline-block' }}>Creative Digital Agency — Est. 2025</span>
        </div>

        {/* Year label shown only on mobile, inline above headline */}
        <div className="hero-year-mobile">2025 — ∞</div>

        <h1 className="hero-title">
          {['WE CRAFT', 'DIGITAL', 'COSMOS'].map((word, i) => (
            <span key={i} className="hero-line">
              <span
                style={{
                  color: i === 2 ? 'transparent' : undefined,
                  WebkitTextStroke: i === 2 ? '1px rgba(248,242,232,0.3)' : undefined,
                }}
              >
                {i === 2
                  ? <span className="hero-word-cosmos">{word}</span>
                  : word}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-desc">
          A collective of creators building extraordinary digital experiences where technology meets
          the divine — every pixel, an offering.
        </p>

        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span>Scroll to reveal Mahadev</span>
        </div>

        {/* Vertical year — desktop/tablet only */}
        <div className="hero-year">2025 — ∞</div>

        {/* Spacer so Three.js scroll-linked Shiva has room */}
        <div style={{ height: '300vh' }} />
      </section>
    </>
  )
}