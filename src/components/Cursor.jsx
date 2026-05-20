// 'use client'
// import { useEffect } from 'react'
// import { gsap } from 'gsap'

// export default function Cursor() {
//   useEffect(() => {
//     const dot  = document.getElementById('cursor-dot')
//     const ring = document.getElementById('cursor-ring')
//     const glow = document.getElementById('cursor-glow')
//     if (!dot) return
//     let cx = 0, cy = 0, rx = 0, ry = 0
//     const onMove = e => { cx = e.clientX; cy = e.clientY; gsap.to(dot, { x: cx, y: cy, duration: 0.05, ease: 'none' }) }
//     document.addEventListener('mousemove', onMove)
//     const loop = () => { rx += (cx - rx) * 0.1; ry += (cy - ry) * 0.1; gsap.set(ring, { x: rx, y: ry }); gsap.set(glow, { x: rx, y: ry }); requestAnimationFrame(loop) }
//     loop()
//     const els = document.querySelectorAll('button, a, .hover-target')
//     els.forEach(el => {
//       el.addEventListener('mouseenter', () => gsap.to(ring, { scale: 2.5, opacity: 0.8, duration: 0.4 }))
//       el.addEventListener('mouseleave', () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4 }))
//     })
//     return () => document.removeEventListener('mousemove', onMove)
//   }, [])
//   return (
//     <>
//       <div id="cursor-glow" />
//       <div id="cursor-ring" />
//       <div id="cursor-dot"  />
//     </>
//   )
// }


'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  useEffect(() => {
    // ── Bail out entirely on touch-primary devices ──────────────────────────
    // matchMedia hover:none = no hover capability (touch screens).
    // matchMedia pointer:coarse = finger-sized pointer (touch).
    // Either condition means no custom cursor needed — and cursor:none on
    // interactive elements would break tap UX on mobile.
    const isTouch =
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches

    if (isTouch) return   // leave native cursor & tap behaviour intact

    // ── Desktop cursor setup ─────────────────────────────────────────────────
    const dot  = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    const glow = document.getElementById('cursor-glow')
    if (!dot) return

    // Make elements visible only after we confirm pointer device
    // (they're hidden by default via CSS so touch users never see a flash)
    dot.style.opacity  = '1'
    ring.style.opacity = '1'
    glow.style.opacity = '1'

    let cx = 0, cy = 0, rx = 0, ry = 0
    let rafId

    const onMove = e => {
      cx = e.clientX
      cy = e.clientY
      gsap.to(dot, { x: cx, y: cy, duration: 0.05, ease: 'none' })
    }

    document.addEventListener('mousemove', onMove)

    const loop = () => {
      rx += (cx - rx) * 0.1
      ry += (cy - ry) * 0.1
      gsap.set(ring, { x: rx, y: ry })
      gsap.set(glow, { x: rx, y: ry })
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    // Hover-target expansion
    const targets = document.querySelectorAll('button, a, .hover-target')
    const onEnter = () => gsap.to(ring, { scale: 2.5, opacity: 0.8, duration: 0.4 })
    const onLeave = () => gsap.to(ring, { scale: 1,   opacity: 1,   duration: 0.4 })

    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Hide system cursor on desktop only (not set globally, so mobile is unaffected)
    document.documentElement.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      // Restore system cursor on unmount
      document.documentElement.style.cursor = ''
    }
  }, [])

  return (
    <>
      <style>{`
        /*
         * All three cursor layers start hidden.
         * The useEffect above sets opacity:1 only when a true
         * pointer device is confirmed — so touch users never see
         * a flash of the cursor elements.
         */
        #cursor-dot,
        #cursor-ring,
        #cursor-glow {
          opacity: 0;
          pointer-events: none;
          position: fixed;
          top: 0; left: 0;
          z-index: 9999;
          transform: translate(-50%, -50%);
          will-change: transform;
          border-radius: 50%;
        }

        #cursor-dot {
          width: 6px;
          height: 6px;
          background: #f5c842;
        }

        #cursor-ring {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(245, 200, 66, 0.6);
          background: transparent;
        }

        #cursor-glow {
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(245,200,66,0.06) 0%, transparent 70%);
        }

        /*
         * Safety net: on any device that can't hover (touch/stylus-only),
         * force-restore the native cursor and make the layers invisible,
         * even if JS hasn't run yet (SSR, slow hydration).
         */
        @media (hover: none), (pointer: coarse) {
          #cursor-dot,
          #cursor-ring,
          #cursor-glow {
            display: none !important;
          }

          /* Restore pointer cursor on all interactive elements */
          a, button, [role="button"], .hover-target {
            cursor: pointer !important;
          }
        }
      `}</style>

      <div id="cursor-glow" />
      <div id="cursor-ring" />
      <div id="cursor-dot"  />
    </>
  )
}