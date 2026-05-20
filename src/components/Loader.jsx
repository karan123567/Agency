// 'use client'
// import { useEffect, useRef } from 'react'
// import { gsap } from 'gsap'

// export default function Loader() {
//   const loaderRef = useRef(null)
//   const countRef  = useRef(null)
//   const barRef    = useRef(null)

//   useEffect(() => {
//     const tl = gsap.timeline()
//     tl.to('.loader-om', { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' })
//       .to('.loader-title', { opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')
//     const obj = { val: 0 }
//     tl.to(obj, {
//       val: 100, duration: 2.5, ease: 'power2.inOut',
//       onUpdate() {
//         if (countRef.current) countRef.current.textContent = Math.round(obj.val) + '%'
//         if (barRef.current) barRef.current.style.width = obj.val + '%'
//       },
//       onComplete() {
//         gsap.to(loaderRef.current, { yPercent: -100, duration: 1, ease: 'power3.inOut',
//           onComplete: () => loaderRef.current && (loaderRef.current.style.display = 'none')
//         })
//         gsap.to('nav', { opacity: 1, duration: 0.8, delay: 0.2 })
//         gsap.fromTo('.hero-eyebrow span', { y: '100%' }, { y: '0%', duration: 1, ease: 'power3.out', delay: 0.5 })
//         gsap.fromTo('.hero-line span', { y: '110%', skewY: 5 }, { y: '0%', skewY: 0, stagger: 0.12, duration: 1.5, ease: 'expo.out', delay: 0.7 })
//         gsap.fromTo('.hero-desc', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 1.3 })
//         gsap.fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.8 })
//       }
//     }, '-=0.2')
//   }, [])

//   return (
//     <div ref={loaderRef} style={{
//       position: 'fixed', inset: 0, background: '#04010e', zIndex: 8000,
//       display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28
//     }}>
//       <div className="loader-om" style={{
//         fontFamily: 'Cinzel, serif', fontSize: 'clamp(80px,14vw,160px)',
//         background: 'linear-gradient(135deg,#ff7b2e,#f5c842)',
//         WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
//         opacity: 0, transform: 'scale(0.8)'
//       }}>ॐ</div>
//       <div className="loader-title" style={{
//         fontFamily: 'Cinzel,serif', fontSize: 'clamp(20px,3.5vw,48px)',
//         letterSpacing: '0.3em', color: 'rgba(248,242,232,0.55)', opacity: 0
//       }}>SHAKTI STUDIO</div>
//       <div style={{ width: 300, height: 1, background: 'rgba(255,255,255,0.08)' }}>
//         <div ref={barRef} style={{ height: '100%', width: 0, background: 'linear-gradient(90deg,#7b2dff,#ff7b2e,#f5c842)', transition: 'none' }} />
//       </div>
//       <div ref={countRef} style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.3em', color: '#5a5280', textTransform: 'uppercase' }}>0%</div>
//       <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.3em', color: '#5a5280', textTransform: 'uppercase' }}>Awakening the Cosmos</div>
//     </div>
//   )
// }



'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader() {
  const loaderRef = useRef(null)
  const countRef  = useRef(null)
  const barRef    = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.to('.loader-om',    { opacity: 1, scale: 1, duration: 1,   ease: 'back.out(1.7)' })
      .to('.loader-title', { opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3')

    const obj = { val: 0 }
    tl.to(obj, {
      val: 100, duration: 2.5, ease: 'power2.inOut',
      onUpdate() {
        if (countRef.current) countRef.current.textContent = Math.round(obj.val) + '%'
        if (barRef.current)   barRef.current.style.width   = obj.val + '%'
      },
      onComplete() {
        gsap.to(loaderRef.current, {
          yPercent: -100, duration: 1, ease: 'power3.inOut',
          onComplete: () => loaderRef.current && (loaderRef.current.style.display = 'none')
        })
        gsap.to('nav',                    { opacity: 1, duration: 0.8, delay: 0.2 })
        gsap.fromTo('.hero-eyebrow span', { y: '100%' },           { y: '0%',   duration: 1,   ease: 'power3.out', delay: 0.5 })
        gsap.fromTo('.hero-line span',    { y: '110%', skewY: 5 }, { y: '0%',   skewY: 0, stagger: 0.12, duration: 1.5, ease: 'expo.out', delay: 0.7 })
        gsap.fromTo('.hero-desc',         { y: 30, opacity: 0 },   { y: 0,      opacity: 1, duration: 1.2, ease: 'power3.out', delay: 1.3 })
        gsap.fromTo('.hero-scroll',       { opacity: 0 },          { opacity: 1, duration: 1, delay: 1.8 })
      }
    }, '-=0.2')
  }, [])

  return (
    <>
      <style>{`
        .loader-root {
          position: fixed;
          inset: 0;
          background: #04010e;
          z-index: 8000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          /* Prevents content touching screen edges on small devices */
          padding: 24px;
        }

        .loader-om {
          font-family: 'Cinzel', serif;
          font-size: clamp(80px, 14vw, 160px);
          background: linear-gradient(135deg, #ff7b2e, #f5c842);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0;
          transform: scale(0.8);
          max-width: 100%;
          text-align: center;
        }

        .loader-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(16px, 3.5vw, 48px);
          letter-spacing: 0.3em;
          /* padding-right offsets trailing letter-spacing so text stays centred */
          padding-right: 0.3em;
          color: rgba(248, 242, 232, 0.55);
          opacity: 0;
          text-align: center;
          white-space: nowrap;
        }

        .loader-track {
          /* Fluid: 90vw on mobile, capped at 300px on desktop */
          width: min(300px, 90vw);
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }

        .loader-bar {
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, #7b2dff, #ff7b2e, #f5c842);
          transition: none;
        }

        .loader-count,
        .loader-tag {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          padding-right: 0.3em;
          color: #5a5280;
          text-transform: uppercase;
          text-align: center;
        }

        /* ── MOBILE (≤ 480px) ── */
        @media (max-width: 480px) {
          .loader-root { gap: 20px; }

          .loader-title {
            font-size: clamp(13px, 4.5vw, 22px);
            letter-spacing: 0.18em;
            padding-right: 0.18em;
          }

          .loader-count,
          .loader-tag {
            font-size: 9px;
            letter-spacing: 0.2em;
            padding-right: 0.2em;
          }
        }
      `}</style>

      <div ref={loaderRef} className="loader-root">
        <div className="loader-om">ॐ</div>
        <div className="loader-title">SHAKTI STUDIO</div>
        <div className="loader-track">
          <div ref={barRef} className="loader-bar" />
        </div>
        <div ref={countRef} className="loader-count">0%</div>
        <div className="loader-tag">Awakening the Cosmos</div>
      </div>
    </>
  )
}