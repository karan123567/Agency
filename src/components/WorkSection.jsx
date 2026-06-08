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


// 'use client'
// import { useEffect, useRef, useState } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// gsap.registerPlugin(ScrollTrigger)

// // ── Responsive breakpoint hook ──
// function useBreakpoint() {
//   const [bp, setBp] = useState({ isMobile: false, isTablet: false })
//   useEffect(() => {
//     const update = () => setBp({
//       isMobile: window.innerWidth < 768,
//       isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
//     })
//     update()
//     window.addEventListener('resize', update)
//     return () => window.removeEventListener('resize', update)
//   }, [])
//   return bp
// }

// // ─────────────────────────────────────────────
// //  ✏️  APNE PROJECTS YAHAN DAALO
// // ─────────────────────────────────────────────
// const PROJECTS = [
//   {
//     name: 'RealEstate\nPLATFORM',
//     tag: 'Brand / Web',
//     year: '2026',
//     url: 'https://parthestatemart.com/',
//     desc: 'Full-stack Real Estate platform with viewer and custom CMS.',
//     // bg: 'linear-gradient(135deg,#0d0020,#2d0060,#000d30)',
//     bg: 'transparent',
//     color: '#7b2dff',
//   },
//   {
//     name: 'Bakery\nFOOD',
//     tag: 'Web / UI',
//     year: '2026',
//     url: 'https://bakery-site-ten.vercel.app/',
//     desc: 'Bakery website with interactive UI.',
//     // bg: 'linear-gradient(135deg,#1a0000,#400010,#200020)',
//     bg:'transparent',
//     color: '#ff4466',
//   },
//   {
//     name: 'Cafe\nFOOD',
//     tag: 'Web / UI',
//     year: '2026',
//     url: 'https://cafe-site-dun-delta.vercel.app/',
//     desc: 'Modern Cafe website with attractive UI and responsive design.',
//     // bg: 'linear-gradient(135deg,#000d1a,#001a33,#0d0020)',
//     bg:'transparent',
//     color: '#00ffee',
//   },
//   {
//     name: 'RESTAURANT\nFOOD',
//     tag: 'Web / UI',
//     year: '2026',
//     url: 'https://restuarant-site-jet.vercel.app/',
//     desc: 'Full-stack restaurant site with booking system.',
//     // bg: 'linear-gradient(135deg,#0d1400,#1a2a00,#002040)',
//     bg:'transparent',
//     color: '#f5c842',
//   },
// ]

// export default function WorkSection() {
//   const trackRef = useRef(null)
//   const ref      = useRef(null)
//   const modalRef = useRef(null)
//   const { isMobile, isTablet } = useBreakpoint()

//   const [active,  setActive]  = useState(null)
//   const [loading, setLoading] = useState(false)

//   // ── Scroll animations + drag ──
//   useEffect(() => {
//     if (!ref.current) return
//     gsap.fromTo('.work-heading',
//       { opacity: 0, y: 80 },
//       { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
//         scrollTrigger: { trigger: '.work-heading', start: 'top 85%' } }
//     )
//     gsap.utils.toArray('.proj-card').forEach((c, i) =>
//       gsap.fromTo(c, { opacity: 0, y: 80 }, {
//         opacity: 1, y: 0, duration: 0.9, delay: i * 0.1, ease: 'power3.out',
//         scrollTrigger: { trigger: ref.current, start: 'top 80%' }
//       })
//     )

//     const el = trackRef.current
//     if (!el) return
//     let down = false, sx, sl
//     const md = e => { down = true; sx = (e.touches ? e.touches[0].pageX : e.pageX) - el.offsetLeft; sl = el.scrollLeft }
//     const mu = () => (down = false)
//     const mm = e => {
//       if (!down) return
//       e.preventDefault()
//       const pageX = e.touches ? e.touches[0].pageX : e.pageX
//       el.scrollLeft = sl - (pageX - el.offsetLeft - sx) * 1.5
//     }
//     el.addEventListener('mousedown', md)
//     el.addEventListener('touchstart', md, { passive: true })
//     document.addEventListener('mouseup', mu)
//     document.addEventListener('touchend', mu)
//     el.addEventListener('mousemove', mm)
//     el.addEventListener('touchmove', mm, { passive: false })
//     return () => {
//       el.removeEventListener('mousedown', md)
//       el.removeEventListener('touchstart', md)
//       document.removeEventListener('mouseup', mu)
//       document.removeEventListener('touchend', mu)
//       el.removeEventListener('mousemove', mm)
//       el.removeEventListener('touchmove', mm)
//     }
//   }, [])

//   // ── Open modal ──
//   function openPreview(project) {
//     setActive(project)
//     setLoading(true)
//     document.body.style.overflow = 'hidden'
//     requestAnimationFrame(() => {
//       if (!modalRef.current) return
//       gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
//       gsap.fromTo('.modal-panel',   { y: isMobile ? '100%' : 40, scale: isMobile ? 1 : 0.93 },
//                                     { y: 0, scale: 1, duration: 0.6, ease: 'expo.out' })
//       gsap.fromTo('.modal-info > *',{ opacity: 0, y: 16 },
//                                     { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.25 })
//     })
//   }

//   // ── Close modal ──
//   function closeModal() {
//     gsap.to('.modal-panel', { y: isMobile ? '100%' : 40, opacity: 0, duration: 0.4, ease: 'power2.in' })
//     gsap.to(modalRef.current, {
//       opacity: 0, duration: 0.4, delay: 0.1, ease: 'power2.in',
//       onComplete: () => { setActive(null); setLoading(false); document.body.style.overflow = '' }
//     })
//   }

//   useEffect(() => {
//     const onKey = e => { if (e.key === 'Escape' && active) closeModal() }
//     window.addEventListener('keydown', onKey)
//     return () => window.removeEventListener('keydown', onKey)
//   }, [active])

//   // ── Responsive values ──
//   const sectionPad = isMobile ? '80px 0' : isTablet ? '100px 0' : '120px 0'
//   const headerPad  = isMobile ? '0 20px' : isTablet ? '0 32px' : '0 60px'
//   const trackPad   = isMobile ? '0 20px' : isTablet ? '0 32px' : '0 60px'
//   const cardWidth  = isMobile ? '85vw'   : isTablet ? '360px'  : 'min(480px,78vw)'

//   return (
//     <>
//       {/* ── SECTION ── */}
//       <section id="work" ref={ref} style={{ padding: sectionPad, overflow: 'hidden' }}>

//         {/* Header */}
//         <div style={{ padding: headerPad, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: isMobile ? 32 : 60 }}>
//           <h2 className="work-heading" style={{
//             fontFamily: 'Cinzel,serif',
//             fontSize: isMobile ? 'clamp(40px,12vw,64px)' : 'clamp(60px,9vw,130px)',
//             fontWeight: 400, lineHeight: 0.88, letterSpacing: '0.05em'
//           }}>
//             SELECTED<br />
//             <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(248,242,232,0.2)' }}>WORK</span><br />
//             <span style={{ background: 'linear-gradient(90deg,#ff7b2e,#f5c842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>—</span>
//           </h2>
//           <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280', letterSpacing: '0.15em', paddingBottom: 8, flexShrink: 0, paddingLeft: 12 }}>
//             {String(PROJECTS.length).padStart(2, '0')} Projects
//           </div>
//         </div>

//         {/* Scroll track */}
//         <div ref={trackRef} style={{
//           display: 'flex', gap: isMobile ? 16 : 24,
//           padding: trackPad, overflowX: 'auto',
//           scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
//           cursor: 'grab', paddingBottom: isMobile ? 24 : 12,
//         }}>
//           {PROJECTS.map((p, i) => (
//             <ProjectCard key={i} project={p} index={i} cardWidth={cardWidth} isMobile={isMobile} onOpen={() => openPreview(p)} />
//           ))}
//           {/* End spacer */}
//           <div style={{ flexShrink: 0, width: isMobile ? 4 : 36 }} />
//         </div>

//         {/* Mobile swipe hint */}
//         {isMobile && (
//           <div style={{ padding: '12px 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
//             <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280', letterSpacing: '0.15em' }}>← SWIPE TO EXPLORE →</span>
//           </div>
//         )}
//       </section>

//       {/* ── PREVIEW MODAL ── */}
//       {active && (
//         <div
//           ref={modalRef}
//           onClick={e => e.target === modalRef.current && closeModal()}
//           style={{
//             position: 'fixed', inset: 0, zIndex: 6000,
//             background: 'rgba(4,1,14,0.9)', backdropFilter: 'blur(12px)',
//             display: 'flex',
//             alignItems: isMobile ? 'flex-end' : 'center',
//             justifyContent: 'center',
//             padding: isMobile ? 0 : isTablet ? 16 : 24,
//           }}
//         >
//           <div className="modal-panel" style={{
//             width: '100%',
//             maxWidth: isMobile ? '100%' : isTablet ? '95vw' : 1100,
//             background: '#080316',
//             borderTop: `1px solid ${active.color}40`,
//             borderRight: isMobile ? 'none' : `1px solid ${active.color}30`,
//             borderBottom: isMobile ? 'none' : `1px solid ${active.color}30`,
//             borderLeft: isMobile ? 'none' : `1px solid ${active.color}30`,
//             boxShadow: `0 0 80px ${active.color}15`,
//             display: 'flex', flexDirection: 'column',
//             maxHeight: isMobile ? '95vh' : '92vh',
//             overflow: 'hidden',
//             borderRadius: isMobile ? '20px 20px 0 0' : 0,
//           }}>

//             {/* ── TOP BAR ── */}
//             <div style={{
//               display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//               padding: isMobile ? '14px 16px' : '14px 20px',
//               borderBottom: `1px solid ${active.color}18`,
//               background: 'rgba(4,1,14,0.8)', flexShrink: 0, gap: 10,
//             }}>

//               {/* Left: dots + title on mobile */}
//               <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 8 }}>
//                 <button onClick={closeModal} style={dotStyle('#ff5f56')} title="Close" />
//                 <div style={dotStyle('#ffbd2e')} />
//                 <div style={dotStyle('#27c93f')} />
//                 {isMobile && (
//                   <span style={{ fontFamily: 'Cinzel,serif', fontSize: 12, letterSpacing: '0.1em', color: '#f8f2e8', marginLeft: 6 }}>
//                     {active.name.replace('\n', ' ')}
//                   </span>
//                 )}
//               </div>

//               {/* URL bar — hidden on mobile */}
//               {!isMobile && (
//                 <div style={{
//                   flex: 1, margin: '0 14px', padding: '6px 12px',
//                   background: 'rgba(255,255,255,0.05)',
//                   border: '1px solid rgba(255,255,255,0.1)',
//                   fontFamily: 'Space Mono,monospace', fontSize: isTablet ? 10 : 11,
//                   color: '#5a5280', letterSpacing: '0.05em',
//                   display: 'flex', alignItems: 'center', gap: 8,
//                   overflow: 'hidden',
//                 }}>
//                   <span style={{ color: active.color, fontSize: 10, flexShrink: 0 }}>🔒</span>
//                   <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{active.url}</span>
//                 </div>
//               )}

//               {/* Right: action buttons */}
//               <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
//                 <a
//                   href={active.url} target="_blank" rel="noopener noreferrer"
//                   style={{
//                     fontFamily: 'Space Mono,monospace',
//                     fontSize: isMobile ? 8 : 9,
//                     letterSpacing: '0.12em',
//                     color: '#04010e', background: active.color,
//                     padding: isMobile ? '7px 12px' : '8px 16px',
//                     textDecoration: 'none', textTransform: 'uppercase',
//                     display: 'flex', alignItems: 'center', gap: 5,
//                     transition: 'opacity .2s', cursor: 'none', flexShrink: 0,
//                   }}
//                   onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
//                   onMouseLeave={e => e.currentTarget.style.opacity = '1'}
//                 >
//                   {isMobile ? 'Open ↗' : 'Visit Live ↗'}
//                 </a>
//                 <button
//                   onClick={closeModal}
//                   style={{
//                     background: 'rgba(255,255,255,0.06)',
//                     border: '1px solid rgba(255,255,255,0.1)',
//                     color: '#5a5280',
//                     width: isMobile ? 32 : 34, height: isMobile ? 32 : 34,
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     fontSize: 14, cursor: 'none', transition: 'all .2s', flexShrink: 0,
//                   }}
//                   onMouseEnter={e => { e.currentTarget.style.borderColor = '#f5c842'; e.currentTarget.style.color = '#f5c842' }}
//                   onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#5a5280' }}
//                 >✕</button>
//               </div>
//             </div>

//             {/* ── IFRAME ── */}
//             <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
//               {loading && (
//                 <div style={{
//                   position: 'absolute', inset: 0, zIndex: 2,
//                   display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
//                   background: '#080316', gap: 20,
//                 }}>
//                   {/* <div style={{ fontSize: 32 }}>🔱</div> */}
//                   <div style={{
//                     width: 36, height: 36,
//                     borderTop: `2px solid ${active.color}`,
//                     borderRight: `2px solid ${active.color}30`,
//                     borderBottom: `2px solid ${active.color}30`,
//                     borderLeft: `2px solid ${active.color}30`,
//                     borderRadius: '50%',
//                     animation: 'spin 0.8s linear infinite',
//                   }} />
//                   <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 8, letterSpacing: '0.25em', color: '#5a5280', textTransform: 'uppercase' }}>
//                     Loading Project…
//                   </div>
//                 </div>
//               )}
//               <iframe
//                 src={active.url}
//                 title={active.name}
//                 onLoad={() => setLoading(false)}
//                 style={{
//                   width: '100%',
//                   height: isMobile ? '55vh' : isTablet ? '58vh' : '62vh',
//                   border: 'none', display: 'block', background: '#04010e',
//                 }}
//                 allow="fullscreen"
//               />
//             </div>

//             {/* ── BOTTOM INFO ── */}
//             <div className="modal-info" style={{
//               display: 'flex',
//               flexDirection: isMobile ? 'column' : 'row',
//               alignItems: isMobile ? 'flex-start' : 'center',
//               justifyContent: 'space-between',
//               gap: isMobile ? 10 : 0,
//               padding: isMobile ? '14px 16px' : '14px 24px',
//               flexShrink: 0,
//               borderTop: `1px solid ${active.color}18`,
//               background: 'rgba(4,1,14,0.7)',
//             }}>
//               {/* Left */}
//               <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
//                 <span style={{
//                   fontFamily: 'Space Mono,monospace', fontSize: 8, letterSpacing: '0.2em',
//                   color: active.color, border: `1px solid ${active.color}40`,
//                   padding: '3px 9px', textTransform: 'uppercase', flexShrink: 0,
//                 }}>{active.tag}</span>
//                 <span style={{
//                   fontFamily: 'Cinzel,serif',
//                   fontSize: isMobile ? 14 : 'clamp(14px,2vw,20px)',
//                   fontWeight: 400, letterSpacing: '0.08em',
//                 }}>{active.name.replace('\n', ' ')}</span>
//               </div>
//               {/* Right */}
//               <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
//                 <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280', letterSpacing: '0.15em', flexShrink: 0 }}>{active.year}</span>
//                 {!isMobile && (
//                   <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280', letterSpacing: '0.08em', maxWidth: 340, lineHeight: 1.5 }}>{active.desc}</span>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// // ── Project Card ──
// function ProjectCard({ project: p, index: i, cardWidth, isMobile, onOpen }) {
//   return (
//     <div
//       className="proj-card hover-target"
//       onClick={onOpen}
//       style={{ flexShrink: 0, width: cardWidth, cursor: 'none' }}
//     >
//       {/* Image area */}
//       <div style={{
//         width: '100%', aspectRatio: '4/3', overflow: 'hidden',
//         position: 'relative', border: '1px solid rgba(255,255,255,0.07)',
//       }}>
//         <div
//           style={{ width: '100%', height: '100%', background: p.bg, transition: 'transform 0.7s cubic-bezier(.25,.46,.45,.94)' }}
//           onMouseEnter={e => !isMobile && (e.currentTarget.style.transform = 'scale(1.07)')}
//           onMouseLeave={e => !isMobile && (e.currentTarget.style.transform = 'scale(1)')}
//         />
//         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(4,1,14,0.9) 0%,transparent 55%)' }} />

//         {/* Tag */}
//         <div style={{
//           position: 'absolute', top: 14, left: 14,
//           fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.18em',
//           color: p.color, background: 'rgba(4,1,14,0.8)',
//           padding: '4px 10px', backdropFilter: 'blur(8px)',
//           border: `1px solid ${p.color}40`,
//         }}>{p.tag}</div>

//         {/* Index */}
//         <div style={{
//           position: 'absolute', top: 14, right: 14,
//           fontFamily: 'Space Mono,monospace', fontSize: 9,
//           color: 'rgba(248,242,232,0.2)', letterSpacing: '0.12em',
//         }}>0{i + 1}</div>

//         {/* Hover CTA — desktop only */}
//         {!isMobile && (
//           <div
//             style={{
//               position: 'absolute', inset: 0,
//               display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
//               background: `${p.color}12`, opacity: 0, transition: 'opacity .35s', backdropFilter: 'blur(2px)',
//             }}
//             onMouseEnter={e => e.currentTarget.style.opacity = '1'}
//             onMouseLeave={e => e.currentTarget.style.opacity = '0'}
//           >
//             <div style={{
//               width: 52, height: 52, borderRadius: '50%',
//               border: `1px solid ${p.color}`,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               fontSize: 20, color: p.color,
//             }}>↗</div>
//             <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 8, letterSpacing: '0.25em', color: p.color, textTransform: 'uppercase' }}>
//               View Project
//             </span>
//           </div>
//         )}

//         {/* Mobile tap hint — bottom of image */}
//         {isMobile && (
//           <div style={{
//             position: 'absolute', bottom: 12, right: 12,
//             width: 36, height: 36, borderRadius: '50%',
//             border: `1px solid ${p.color}`,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontSize: 16, color: p.color, background: 'rgba(4,1,14,0.7)',
//           }}>↗</div>
//         )}
//       </div>

//       {/* Meta */}
//       <div style={{
//         padding: '16px 0 16px',
//         display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
//         borderBottom: `1px solid ${p.color}15`,
//       }}>
//         <div style={{ flex: 1, minWidth: 0 }}>
//           <div style={{
//             fontFamily: 'Cinzel,serif',
//             fontSize: isMobile ? 'clamp(18px,5vw,26px)' : 'clamp(22px,3vw,34px)',
//             fontWeight: 400, lineHeight: 1.1, letterSpacing: '0.08em', whiteSpace: 'pre-line',
//           }}>{p.name}</div>
//           {!isMobile && (
//             <div style={{
//               fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280',
//               marginTop: 8, letterSpacing: '0.05em', lineHeight: 1.6,
//             }}>{p.desc}</div>
//           )}
//         </div>
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0, paddingLeft: 12 }}>
//           <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280' }}>{p.year}</span>
//           <a
//             href={p.url} target="_blank" rel="noopener noreferrer"
//             onClick={e => e.stopPropagation()}
//             style={{
//               fontFamily: 'Space Mono,monospace', fontSize: 8, letterSpacing: '0.12em',
//               color: p.color, textDecoration: 'none', textTransform: 'uppercase',
//               border: `1px solid ${p.color}40`, padding: isMobile ? '5px 10px' : '4px 10px',
//               transition: 'all .3s', display: 'flex', alignItems: 'center', gap: 4,
//               cursor: 'none', whiteSpace: 'nowrap',
//             }}
//             onMouseEnter={e => { e.currentTarget.style.background = `${p.color}15`; e.currentTarget.style.borderColor = p.color }}
//             onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = `${p.color}40` }}
//           >
//             Live ↗
//           </a>
//         </div>
//       </div>
//     </div>
//   )
// }

// const dotStyle = (color) => ({
//   width: 11, height: 11, borderRadius: '50%',
//   background: color, border: 'none', cursor: 'none', flexShrink: 0,
// })

'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// ── Responsive breakpoint hook ──
function useBreakpoint() {
  const [bp, setBp] = useState({ isMobile: false, isTablet: false })
  useEffect(() => {
    const update = () => setBp({
      isMobile: window.innerWidth < 768,
      isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return bp
}

const PROJECTS = [
  {
    name: 'RealEstate\nPLATFORM',
    tag: 'Brand / Web',
    year: '2026',
    url: 'https://parthestatemart.com/',
    desc: 'Full-stack Real Estate platform with viewer and custom CMS.',
    bg: 'transparent',
    color: '#7b2dff',
  },
  {
    name: 'Bakery\nFOOD',
    tag: 'Web / UI',
    year: '2026',
    url: 'https://bakery-site-ten.vercel.app/',
    desc: 'Bakery website with interactive UI.',
    bg: 'transparent',
    color: '#ff4466',
  },
  {
    name: 'Cafe\nFOOD',
    tag: 'Web / UI',
    year: '2026',
    url: 'https://cafe-site-dun-delta.vercel.app/',
    desc: 'Modern Cafe website with attractive UI and responsive design.',
    bg: 'transparent',
    color: '#00ffee',
  },
  {
    name: 'RESTAURANT\nFOOD',
    tag: 'Web / UI',
    year: '2026',
    url: 'https://restuarant-site-jet.vercel.app/',
    desc: 'Full-stack restaurant site with booking system.',
    bg: 'transparent',
    color: '#f5c842',
  },
]

export default function WorkSection() {
  const trackRef = useRef(null)
  const ref      = useRef(null)
  const modalRef = useRef(null)
  const { isMobile, isTablet } = useBreakpoint()

  const [active,  setActive]  = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo('.work-heading',
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: '.work-heading', start: 'top 85%' } }
    )
    gsap.utils.toArray('.proj-card').forEach((c, i) =>
      gsap.fromTo(c, { opacity: 0, y: 80 }, {
        opacity: 1, y: 0, duration: 0.9, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      })
    )

    const el = trackRef.current
    if (!el) return
    let down = false, sx, sl
    const md = e => { down = true; sx = (e.touches ? e.touches[0].pageX : e.pageX) - el.offsetLeft; sl = el.scrollLeft }
    const mu = () => (down = false)
    const mm = e => {
      if (!down) return
      e.preventDefault()
      const pageX = e.touches ? e.touches[0].pageX : e.pageX
      el.scrollLeft = sl - (pageX - el.offsetLeft - sx) * 1.5
    }
    el.addEventListener('mousedown', md)
    el.addEventListener('touchstart', md, { passive: true })
    document.addEventListener('mouseup', mu)
    document.addEventListener('touchend', mu)
    el.addEventListener('mousemove', mm)
    el.addEventListener('touchmove', mm, { passive: false })
    return () => {
      el.removeEventListener('mousedown', md)
      el.removeEventListener('touchstart', md)
      document.removeEventListener('mouseup', mu)
      document.removeEventListener('touchend', mu)
      el.removeEventListener('mousemove', mm)
      el.removeEventListener('touchmove', mm)
    }
  }, [])

  function openPreview(project) {
    setActive(project)
    setLoading(true)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => {
      if (!modalRef.current) return
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      gsap.fromTo('.modal-panel',   { y: isMobile ? '100%' : 40, scale: isMobile ? 1 : 0.93 },
                                    { y: 0, scale: 1, duration: 0.6, ease: 'expo.out' })
      gsap.fromTo('.modal-info > *',{ opacity: 0, y: 16 },
                                    { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.25 })
    })
  }

  function closeModal() {
    gsap.to('.modal-panel', { y: isMobile ? '100%' : 40, opacity: 0, duration: 0.4, ease: 'power2.in' })
    gsap.to(modalRef.current, {
      opacity: 0, duration: 0.4, delay: 0.1, ease: 'power2.in',
      onComplete: () => { setActive(null); setLoading(false); document.body.style.overflow = '' }
    })
  }

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape' && active) closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  const sectionPad = isMobile ? '80px 0' : isTablet ? '100px 0' : '120px 0'
  const headerPad  = isMobile ? '0 20px' : isTablet ? '0 32px' : '0 60px'
  const trackPad   = isMobile ? '0 20px' : isTablet ? '0 32px' : '0 60px'
  const cardWidth  = isMobile ? '85vw'   : isTablet ? '360px'  : 'min(480px,78vw)'

  return (
    <>
      <section id="work" ref={ref} style={{ padding: sectionPad, overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: headerPad, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: isMobile ? 32 : 60 }}>
          <h2 className="work-heading" style={{
            fontFamily: 'Cinzel,serif',
            fontSize: isMobile ? 'clamp(40px,12vw,64px)' : 'clamp(60px,9vw,130px)',
            fontWeight: 400, lineHeight: 0.88, letterSpacing: '0.05em'
          }}>
            SELECTED<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(248,242,232,0.2)' }}>WORK</span><br />
            <span style={{ background: 'linear-gradient(90deg,#ff7b2e,#f5c842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>—</span>
          </h2>
          <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280', letterSpacing: '0.15em', paddingBottom: 8, flexShrink: 0, paddingLeft: 12 }}>
            {String(PROJECTS.length).padStart(2, '0')} Projects
          </div>
        </div>

        {/* Scroll track */}
        <div ref={trackRef} style={{
          display: 'flex', gap: isMobile ? 16 : 24,
          padding: trackPad, overflowX: 'auto',
          scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
          cursor: 'grab', paddingBottom: isMobile ? 24 : 12,
        }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={i} project={p} index={i}
              cardWidth={cardWidth} isMobile={isMobile} isTablet={isTablet}
              onOpen={() => openPreview(p)}
            />
          ))}
          <div style={{ flexShrink: 0, width: isMobile ? 4 : 36 }} />
        </div>

        {/* Mobile/tablet swipe hint */}
        {(isMobile || isTablet) && (
          <div style={{ padding: '12px 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280', letterSpacing: '0.15em' }}>← SWIPE TO EXPLORE →</span>
          </div>
        )}
      </section>

      {/* ── PREVIEW MODAL ── */}
      {active && (
        <div
          ref={modalRef}
          onClick={e => e.target === modalRef.current && closeModal()}
          style={{
            position: 'fixed', inset: 0, zIndex: 6000,
            background: 'rgba(4,1,14,0.9)', backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: isMobile ? 'flex-end' : 'center',
            justifyContent: 'center',
            padding: isMobile ? 0 : isTablet ? 16 : 24,
          }}
        >
          <div className="modal-panel" style={{
            width: '100%',
            maxWidth: isMobile ? '100%' : isTablet ? '95vw' : 1100,
            background: '#080316',
            borderTop: `1px solid ${active.color}40`,
            borderRight: isMobile ? 'none' : `1px solid ${active.color}30`,
            borderBottom: isMobile ? 'none' : `1px solid ${active.color}30`,
            borderLeft: isMobile ? 'none' : `1px solid ${active.color}30`,
            boxShadow: `0 0 80px ${active.color}15`,
            display: 'flex', flexDirection: 'column',
            maxHeight: isMobile ? '95vh' : '92vh',
            overflow: 'hidden',
            borderRadius: isMobile ? '20px 20px 0 0' : 0,
          }}>

            {/* TOP BAR */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: isMobile ? '14px 16px' : '14px 20px',
              borderBottom: `1px solid ${active.color}18`,
              background: 'rgba(4,1,14,0.8)', flexShrink: 0, gap: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 8 }}>
                <button onClick={closeModal} style={dotStyle('#ff5f56')} title="Close" />
                <div style={dotStyle('#ffbd2e')} />
                <div style={dotStyle('#27c93f')} />
                {isMobile && (
                  <span style={{ fontFamily: 'Cinzel,serif', fontSize: 12, letterSpacing: '0.1em', color: '#f8f2e8', marginLeft: 6 }}>
                    {active.name.replace('\n', ' ')}
                  </span>
                )}
              </div>

              {!isMobile && (
                <div style={{
                  flex: 1, margin: '0 14px', padding: '6px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: 'Space Mono,monospace', fontSize: isTablet ? 10 : 11,
                  color: '#5a5280', letterSpacing: '0.05em',
                  display: 'flex', alignItems: 'center', gap: 8,
                  overflow: 'hidden',
                }}>
                  <span style={{ color: active.color, fontSize: 10, flexShrink: 0 }}>🔒</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{active.url}</span>
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <a
                  href={active.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: 'Space Mono,monospace',
                    fontSize: isMobile ? 8 : 9,
                    letterSpacing: '0.12em',
                    color: '#04010e', background: active.color,
                    padding: isMobile ? '7px 12px' : '8px 16px',
                    textDecoration: 'none', textTransform: 'uppercase',
                    display: 'flex', alignItems: 'center', gap: 5,
                    transition: 'opacity .2s', cursor: 'none', flexShrink: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  {isMobile ? 'Open ↗' : 'Visit Live ↗'}
                </a>
                <button
                  onClick={closeModal}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#5a5280',
                    width: isMobile ? 32 : 34, height: isMobile ? 32 : 34,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, cursor: 'none', transition: 'all .2s', flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#f5c842'; e.currentTarget.style.color = '#f5c842' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#5a5280' }}
                >✕</button>
              </div>
            </div>

            {/* IFRAME */}
            <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
              {loading && (
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 2,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: '#080316', gap: 20,
                }}>
                  <div style={{
                    width: 36, height: 36,
                    borderTop: `2px solid ${active.color}`,
                    borderRight: `2px solid ${active.color}30`,
                    borderBottom: `2px solid ${active.color}30`,
                    borderLeft: `2px solid ${active.color}30`,
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 8, letterSpacing: '0.25em', color: '#5a5280', textTransform: 'uppercase' }}>
                    Loading Project…
                  </div>
                </div>
              )}
              <iframe
                src={active.url}
                title={active.name}
                onLoad={() => setLoading(false)}
                style={{
                  width: '100%',
                  height: isMobile ? '55vh' : isTablet ? '58vh' : '62vh',
                  border: 'none', display: 'block', background: '#04010e',
                }}
                allow="fullscreen"
              />
            </div>

            {/* BOTTOM INFO */}
            <div className="modal-info" style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              justifyContent: 'space-between',
              gap: isMobile ? 10 : 0,
              padding: isMobile ? '14px 16px' : '14px 24px',
              flexShrink: 0,
              borderTop: `1px solid ${active.color}18`,
              background: 'rgba(4,1,14,0.7)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'Space Mono,monospace', fontSize: 8, letterSpacing: '0.2em',
                  color: active.color, border: `1px solid ${active.color}40`,
                  padding: '3px 9px', textTransform: 'uppercase', flexShrink: 0,
                }}>{active.tag}</span>
                <span style={{
                  fontFamily: 'Cinzel,serif',
                  fontSize: isMobile ? 14 : 'clamp(14px,2vw,20px)',
                  fontWeight: 400, letterSpacing: '0.08em',
                }}>{active.name.replace('\n', ' ')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280', letterSpacing: '0.15em', flexShrink: 0 }}>{active.year}</span>
                {!isMobile && (
                  <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280', letterSpacing: '0.08em', maxWidth: 340, lineHeight: 1.5 }}>{active.desc}</span>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

// ── Project Card ──
function ProjectCard({ project: p, index: i, cardWidth, isMobile, isTablet, onOpen }) {
  const isTouch = isMobile || isTablet

  return (
    <div
      className="proj-card hover-target"
      onClick={onOpen}
      style={{ flexShrink: 0, width: cardWidth, cursor: isTouch ? 'pointer' : 'none' }}
    >
      {/* Image area */}
      <div style={{
        width: '100%', aspectRatio: '4/3', overflow: 'hidden',
        position: 'relative', border: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div
          style={{ width: '100%', height: '100%', background: p.bg, transition: 'transform 0.7s cubic-bezier(.25,.46,.45,.94)' }}
          onMouseEnter={e => !isTouch && (e.currentTarget.style.transform = 'scale(1.07)')}
          onMouseLeave={e => !isTouch && (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(4,1,14,0.9) 0%,transparent 55%)' }} />

        {/* Tag */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.18em',
          color: p.color, background: 'rgba(4,1,14,0.8)',
          padding: '4px 10px', backdropFilter: 'blur(8px)',
          border: `1px solid ${p.color}40`,
        }}>{p.tag}</div>

        {/* Index */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          fontFamily: 'Space Mono,monospace', fontSize: 9,
          color: 'rgba(248,242,232,0.2)', letterSpacing: '0.12em',
        }}>0{i + 1}</div>

        {/* Desktop hover CTA */}
        {!isTouch && (
          <div
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
              background: `${p.color}12`, opacity: 0, transition: 'opacity .35s', backdropFilter: 'blur(2px)',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0'}
          >
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              border: `1px solid ${p.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, color: p.color,
            }}>↗</div>
            <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 8, letterSpacing: '0.25em', color: p.color, textTransform: 'uppercase' }}>
              View Project
            </span>
          </div>
        )}

        {/* Mobile/Tablet — always visible TAP TO VIEW */}
        {isTouch && (
          <div style={{
            position: 'absolute', bottom: 12, right: 12,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              fontFamily: 'Space Mono,monospace', fontSize: 8,
              letterSpacing: '0.15em', color: p.color,
              textTransform: 'uppercase', textShadow: '0 0 8px rgba(0,0,0,0.8)',
            }}>TAP TO VIEW</span>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              border: `1px solid ${p.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, color: p.color,
              background: 'rgba(4,1,14,0.7)', flexShrink: 0,
            }}>↗</div>
          </div>
        )}
      </div>

      {/* Meta */}
      <div style={{
        padding: '16px 0 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        borderBottom: `1px solid ${p.color}15`,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'Cinzel,serif',
            fontSize: isMobile ? 'clamp(18px,5vw,26px)' : 'clamp(22px,3vw,34px)',
            fontWeight: 400, lineHeight: 1.1, letterSpacing: '0.08em', whiteSpace: 'pre-line',
          }}>{p.name}</div>
          {!isMobile && (
            <div style={{
              fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280',
              marginTop: 8, letterSpacing: '0.05em', lineHeight: 1.6,
            }}>{p.desc}</div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0, paddingLeft: 12 }}>
          <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280' }}>{p.year}</span>
          <a
            href={p.url} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              fontFamily: 'Space Mono,monospace', fontSize: 8, letterSpacing: '0.12em',
              color: p.color, textDecoration: 'none', textTransform: 'uppercase',
              border: `1px solid ${p.color}40`, padding: isMobile ? '5px 10px' : '4px 10px',
              transition: 'all .3s', display: 'flex', alignItems: 'center', gap: 4,
              cursor: isTouch ? 'pointer' : 'none', whiteSpace: 'nowrap',
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

const dotStyle = (color) => ({
  width: 11, height: 11, borderRadius: '50%',
  background: color, border: 'none', cursor: 'none', flexShrink: 0,
})