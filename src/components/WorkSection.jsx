// 'use client'
// import { useEffect, useRef } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// gsap.registerPlugin(ScrollTrigger)

// const PROJECTS = [
//   { name: 'NEXUS\nPLATFORM', tag: 'Brand / Web', year: '2025', bg: 'linear-gradient(135deg,#0d0020,#2d0060,#000d30)' },
//   { name: 'ORBIT\nFINANCE',  tag: 'App / UI',    year: '2025', bg: 'linear-gradient(135deg,#1a0000,#400010,#200020)' },
//   { name: 'EMBER\nSTUDIOS',  tag: 'Identity',    year: '2024', bg: 'linear-gradient(135deg,#000d1a,#001a33,#0d0020)' },
//   { name: 'LUMEN\nCREATIVE', tag: '3D Motion',   year: '2024', bg: 'linear-gradient(135deg,#0d1400,#1a2a00,#002040)' },
// ]

// export default function WorkSection() {
//   const trackRef = useRef(null)
//   const ref = useRef(null)

//   useEffect(() => {
//     if (!ref.current) return
//     gsap.fromTo('.work-heading', { opacity: 0, y: 80 }, {
//       opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
//       scrollTrigger: { trigger: '.work-heading', start: 'top 80%' }
//     })
//     gsap.utils.toArray('.proj-card').forEach((c, i) =>
//       gsap.fromTo(c, { opacity: 0, y: 100 }, {
//         opacity: 1, y: 0, duration: 1, delay: i * 0.15, ease: 'power3.out',
//         scrollTrigger: { trigger: ref.current, start: 'top 72%' }
//       })
//     )
//     // Drag scroll
//     const el = trackRef.current
//     if (!el) return
//     let down = false, sx, sl
//     const md = e => { down = true; sx = e.pageX - el.offsetLeft; sl = el.scrollLeft }
//     const mu = () => (down = false)
//     const mm = e => { if (!down) return; e.preventDefault(); el.scrollLeft = sl - (e.pageX - el.offsetLeft - sx) * 1.5 }
//     el.addEventListener('mousedown', md)
//     document.addEventListener('mouseup', mu)
//     el.addEventListener('mousemove', mm)
//     return () => { el.removeEventListener('mousedown', md); document.removeEventListener('mouseup', mu); el.removeEventListener('mousemove', mm) }
//   }, [])

//   return (
//     <section id="work" ref={ref} style={{ padding: '120px 0', overflow: 'hidden' }}>
//       <div style={{ padding: '0 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60 }}>
//         <h2 className="work-heading" style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(60px,9vw,130px)', fontWeight: 400, lineHeight: 0.88, letterSpacing: '0.05em' }}>
//           SELECTED<br />
//           <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(248,242,232,0.2)' }}>WORK</span><br />
//           <span style={{ background: 'linear-gradient(90deg,#ff7b2e,#f5c842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>—</span>
//         </h2>
//         <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280', letterSpacing: '0.15em', paddingBottom: 8 }}>04 Projects</div>
//       </div>
//       <div ref={trackRef} style={{ display: 'flex', gap: 20, padding: '0 60px', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'grab' }}>
//         {PROJECTS.map((p, i) => (
//           <div key={i} className="proj-card hover-target" style={{ flexShrink: 0, width: 'min(500px,78vw)', cursor: 'none' }}>
//             <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.07)' }}>
//               <div style={{ width: '100%', height: '100%', background: p.bg, transition: 'transform 0.8s cubic-bezier(.25,.46,.45,.94)' }}
//                 onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
//                 onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
//               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(4,1,14,0.9) 0%,transparent 60%)' }} />
//               <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.2em', color: '#f5c842', background: 'rgba(4,1,14,0.75)', padding: '5px 11px', backdropFilter: 'blur(8px)', border: '1px solid rgba(245,200,66,0.2)' }}>{p.tag}</div>
//             </div>
//             <div style={{ padding: '20px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//               <div style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '0.08em', whiteSpace: 'pre-line' }}>{p.name}</div>
//               <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280' }}>{p.year}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }


'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────
//  ✏️  APNE PROJECTS YAHAN DAALO
//  Har project mein:
//    name      → card par dikhne wala naam
//    tag       → category badge
//    year      → saal
//    url       → live project ka link
//    desc      → ek line description
//    bg        → card ka background gradient (CSS)
//    color     → accent color (hex)
// ─────────────────────────────────────────────
const PROJECTS = [
  {
    name: 'RealEstate\nPLATFORM',
    tag: 'Brand / Web',
    year: '2026',
    url: 'https://parthestatemart.com/',   // ← apna URL daalo
    desc: 'Full-stack Real Estate platform with viewer and custom CMS.',
    bg: 'linear-gradient(135deg,#0d0020,#2d0060,#000d30)',
    color: '#7b2dff',
  },
  {
    name: 'Bakery\nFOOD',
    tag: 'web / UI',
    year: '2026',
    url: 'https://bakery-site-ten.vercel.app/',
    desc: 'Bakery website with interactive ui.',
    bg: 'linear-gradient(135deg,#1a0000,#400010,#200020)',
    color: '#ff4466',
  },
  {
    name: 'Cafe\nFOOD',
    tag: 'web / UI',
    year: '2026',
    url: 'https://cafe-site-dun-delta.vercel.app/',
    desc: 'Modern Cafe website with attractive ui and responsive.',
    bg: 'linear-gradient(135deg,#000d1a,#001a33,#0d0020)',
    color: '#00ffee',
  },
  {
    name: 'RESTURANT\nFOOD',
    tag: 'web / ui',
    year: '2026',
    url: 'https://restuarant-site-jet.vercel.app/',
    desc: 'Modern resturant full stact website with booking system and attractive ui.',
    bg: 'linear-gradient(135deg,#0d1400,#1a2a00,#002040)',
    color: '#f5c842',
  },
]
// ─────────────────────────────────────────────

export default function WorkSection() {
  const trackRef = useRef(null)
  const ref      = useRef(null)
  const modalRef = useRef(null)
  const iframeRef= useRef(null)

  const [active,  setActive]  = useState(null)   // currently previewed project
  const [loading, setLoading] = useState(false)   // iframe loading state

  // ── scroll + drag setup ──
  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo('.work-heading',
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: '.work-heading', start: 'top 80%' } }
    )
    gsap.utils.toArray('.proj-card').forEach((c, i) =>
      gsap.fromTo(c,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 72%' } }
      )
    )

    // Drag-to-scroll
    const el = trackRef.current
    if (!el) return
    let down = false, sx, sl
    const md = e => { down = true; sx = e.pageX - el.offsetLeft; sl = el.scrollLeft }
    const mu = () => (down = false)
    const mm = e => {
      if (!down) return
      e.preventDefault()
      el.scrollLeft = sl - (e.pageX - el.offsetLeft - sx) * 1.5
    }
    el.addEventListener('mousedown', md)
    document.addEventListener('mouseup', mu)
    el.addEventListener('mousemove', mm)
    return () => {
      el.removeEventListener('mousedown', md)
      document.removeEventListener('mouseup', mu)
      el.removeEventListener('mousemove', mm)
    }
  }, [])

  // ── open modal ──
  function openPreview(project) {
    setActive(project)
    setLoading(true)
    document.body.style.overflow = 'hidden'

    requestAnimationFrame(() => {
      if (!modalRef.current) return
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      gsap.fromTo('.modal-panel',
        { scale: 0.92, y: 40 },
        { scale: 1, y: 0, duration: 0.6, ease: 'expo.out' }
      )
      gsap.fromTo('.modal-info > *',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.25 }
      )
    })
  }

  // ── close modal ──
  function closeModal() {
    gsap.to(modalRef.current, {
      opacity: 0, duration: 0.35, ease: 'power2.in',
      onComplete: () => {
        setActive(null)
        setLoading(false)
        document.body.style.overflow = ''
      }
    })
  }

  // ESC key
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape' && active) closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <>
      {/* ─── SECTION ─── */}
      <section id="work" ref={ref} style={{ padding: '120px 0', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '0 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60 }}>
          <h2 className="work-heading" style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(60px,9vw,130px)', fontWeight: 400, lineHeight: 0.88, letterSpacing: '0.05em' }}>
            SELECTED<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(248,242,232,0.2)' }}>WORK</span><br />
            <span style={{ background: 'linear-gradient(90deg,#ff7b2e,#f5c842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>—</span>
          </h2>
          <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280', letterSpacing: '0.15em', paddingBottom: 8 }}>
            {String(PROJECTS.length).padStart(2,'0')} Projects
          </div>
        </div>

        {/* Scroll Track */}
        <div ref={trackRef} style={{ display: 'flex', gap: 24, padding: '0 60px', overflowX: 'auto', scrollbarWidth: 'none', cursor: 'grab', paddingBottom: 12 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} onOpen={() => openPreview(p)} />
          ))}
        </div>
      </section>

      {/* ─── PREVIEW MODAL ─── */}
      {active && (
        <div
          ref={modalRef}
          style={{
            position: 'fixed', inset: 0, zIndex: 6000,
            background: 'rgba(4,1,14,0.88)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}
          onClick={e => e.target === modalRef.current && closeModal()}
        >
          <div className="modal-panel" style={{
            width: '100%', maxWidth: 1100,
            background: '#080316',
            border: `1px solid ${active.color}30`,
            boxShadow: `0 0 80px ${active.color}18`,
            display: 'flex', flexDirection: 'column',
            maxHeight: '92vh', overflow: 'hidden',
          }}>

            {/* Modal top bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 24px',
              borderBottom: `1px solid ${active.color}20`,
              background: 'rgba(4,1,14,0.7)', flexShrink: 0,
            }}>
              {/* Browser chrome dots */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={closeModal} style={dotBtn('#ff5f56')} title="Close" />
                <div style={dotBtn('#ffbd2e')} />
                <div style={dotBtn('#27c93f')} />
              </div>

              {/* URL bar */}
              <div style={{
                flex: 1, margin: '0 16px', padding: '6px 14px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'Space Mono,monospace', fontSize: 11,
                color: '#5a5280', letterSpacing: '0.05em',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ color: active.color, fontSize: 10 }}>🔒</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{active.url}</span>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                <a
                  href={active.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.15em',
                    color: '#04010e', background: active.color,
                    padding: '8px 16px', textDecoration: 'none',
                    textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'opacity .2s', cursor: 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Visit Live ↗
                </a>
                <button
                  onClick={closeModal}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#5a5280', width: 34, height: 34,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, cursor: 'none', transition: 'all .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#f5c842'; e.currentTarget.style.color = '#f5c842' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#5a5280' }}
                >✕</button>
              </div>
            </div>

            {/* iframe area */}
            <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
              {loading && (
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 2,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: '#080316', gap: 20,
                }}>
                  <div style={{ fontSize: 36 }}>🔱</div>
                  <div style={{
                    width: 40, height: 40,
                    border: `2px solid ${active.color}30`,
                    borderTopColor: active.color,
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.25em', color: '#5a5280', textTransform: 'uppercase' }}>
                    Loading Project…
                  </div>
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={active.url}
                title={active.name}
                onLoad={() => setLoading(false)}
                style={{
                  width: '100%', height: '65vh',
                  border: 'none', display: 'block',
                  background: '#04010e',
                }}
                allow="fullscreen"
              />
            </div>

            {/* Modal bottom info bar */}
            <div className="modal-info" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 28px', flexShrink: 0,
              borderTop: `1px solid ${active.color}18`,
              background: 'rgba(4,1,14,0.6)',
            }}>
              <div style={{ display: 'flex', align: 'center', gap: 20 }}>
                <span style={{
                  fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.2em',
                  color: active.color, border: `1px solid ${active.color}40`,
                  padding: '4px 10px', textTransform: 'uppercase',
                }}>{active.tag}</span>
                <span style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(16px,2vw,22px)', fontWeight: 400, letterSpacing: '0.1em', whiteSpace: 'pre-line' }}>{active.name.replace('\n', ' ')}</span>
              </div>
              <div style={{ display: 'flex', align: 'center', gap: 20 }}>
                <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280', letterSpacing: '0.15em' }}>{active.year}</span>
                <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280', letterSpacing: '0.1em' }}>
                  {active.desc}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Project Card ───
function ProjectCard({ project: p, index: i, onOpen }) {
  const cardRef = useRef(null)

  return (
    <div
      ref={cardRef}
      className="proj-card hover-target"
      onClick={onOpen}
      style={{ flexShrink: 0, width: 'min(480px,78vw)', cursor: 'none' }}
    >
      {/* Thumbnail */}
      <div style={{
        width: '100%', aspectRatio: '4/3', overflow: 'hidden',
        position: 'relative', border: '1px solid rgba(255,255,255,0.07)',
      }}>
        {/* BG gradient */}
        <div
          className="proj-bg"
          style={{ width: '100%', height: '100%', background: p.bg, transition: 'transform 0.8s cubic-bezier(.25,.46,.45,.94)' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(4,1,14,0.9) 0%,transparent 55%)' }} />

        {/* Tag badge */}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.2em',
          color: p.color, background: 'rgba(4,1,14,0.75)',
          padding: '5px 11px', backdropFilter: 'blur(8px)',
          border: `1px solid ${p.color}40`,
        }}>{p.tag}</div>

        {/* Index */}
        <div style={{
          position: 'absolute', top: 16, right: 16,
          fontFamily: 'Space Mono,monospace', fontSize: 9, color: 'rgba(248,242,232,0.25)', letterSpacing: '0.15em',
        }}>0{i+1}</div>

        {/* Hover overlay — "View Project" */}
        <div
          className="proj-overlay-hover"
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12,
            background: `${p.color}15`,
            opacity: 0,
            transition: 'opacity .4s',
            backdropFilter: 'blur(2px)',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0'}
        >
          <div style={{
            width: 56, height: 56,
            border: `1px solid ${p.color}`,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, color: p.color,
          }}>↗</div>
          <span style={{
            fontFamily: 'Space Mono,monospace', fontSize: 9,
            letterSpacing: '0.25em', color: p.color, textTransform: 'uppercase',
          }}>View Project</span>
        </div>
      </div>

      {/* Meta row */}
      <div style={{
        padding: '20px 0 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        borderBottom: `1px solid ${p.color}15`, paddingBottom: 20,
      }}>
        <div>
          <div style={{
            fontFamily: 'Cinzel,serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 400,
            lineHeight: 1.1, letterSpacing: '0.08em', whiteSpace: 'pre-line',
          }}>{p.name}</div>
          <div style={{
            fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280',
            marginTop: 10, letterSpacing: '0.05em', lineHeight: 1.6, maxWidth: 300,
          }}>{p.desc}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0, paddingLeft: 20 }}>
          <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280' }}>{p.year}</span>
          {/* Live link */}
          <a
            href={p.url} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              fontFamily: 'Space Mono,monospace', fontSize: 8, letterSpacing: '0.15em',
              color: p.color, textDecoration: 'none', textTransform: 'uppercase',
              border: `1px solid ${p.color}40`, padding: '4px 10px',
              transition: 'all .3s', display: 'flex', alignItems: 'center', gap: 4,
              cursor: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${p.color}15`; e.currentTarget.style.borderColor = p.color }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = `${p.color}40` }}
          >
            Live ↗
          </a>
        </div>
      </div>
    </div>
  )
}

// helper: browser dot button style
const dotBtn = (color) => ({
  width: 12, height: 12,
  borderRadius: '50%',
  background: color,
  border: 'none',
  cursor: 'none',
  flexShrink: 0,
})