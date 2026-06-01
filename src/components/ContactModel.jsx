// 'use client'
// import { useEffect, useRef, useState } from 'react'
// import { gsap } from 'gsap'

// const PROJECT_TYPES = ['Web Design & Development','Brand Identity','3D / Motion Experience','E-Commerce / SaaS','Full Brand + Web Package','Other']
// const BUDGETS = ['₹50k – ₹1L','₹1L – ₹3L','₹3L – ₹7L','₹7L – ₹15L','₹15L+','Let\'s discuss']

// export default function ContactModal() {
//   const overlayRef = useRef(null)
//   const panelRef   = useRef(null)
//   const [open, setOpen]       = useState(false)
//   const [sent, setSent]       = useState(false)
//   const [sending, setSending] = useState(false)
//   const [form, setForm]       = useState({ name:'', email:'', company:'', type:'', budget:'', message:'' })
//   const [errors, setErrors]   = useState({})

//   // ── Listen for custom event from Nav ──
//   useEffect(() => {
//     const handler = () => openModal()
//     document.addEventListener('openContact', handler)
//     return () => document.removeEventListener('openContact', handler)
//   }, [])

//   // ── Prevent body scroll when open ──
//   useEffect(() => {
//     document.body.style.overflow = open ? 'hidden' : ''
//   }, [open])

//   function openModal() {
//     setOpen(true)
//     setSent(false)
//     setForm({ name:'', email:'', company:'', type:'', budget:'', message:'' })
//     setErrors({})
//     requestAnimationFrame(() => {
//       if (!overlayRef.current || !panelRef.current) return
//       gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
//       gsap.fromTo(panelRef.current,   { x: '100%' }, { x: '0%', duration: 0.7, ease: 'expo.out' })
//       gsap.fromTo('.cf-field', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: 'power3.out', delay: 0.3 })
//       gsap.fromTo('.cf-title span', { y: '110%' }, { y: '0%', stagger: 0.08, duration: 0.9, ease: 'expo.out', delay: 0.2 })
//     })
//   }

//   function closeModal() {
//     gsap.to(panelRef.current,   { x: '100%', duration: 0.6, ease: 'expo.in' })
//     gsap.to(overlayRef.current, { opacity: 0, duration: 0.5, delay: 0.2, ease: 'power2.in',
//       onComplete: () => setOpen(false) })
//   }

//   function validate() {
//     const e = {}
//     if (!form.name.trim())    e.name    = 'Your name is required'
//     if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
//     if (!form.type)           e.type    = 'Please select a project type'
//     if (!form.message.trim()) e.message = 'Tell us about your project'
//     return e
//   }

//   async function handleSubmit(e) {
//     e.preventDefault()
//     const errs = validate()
//     if (Object.keys(errs).length) { setErrors(errs); return }
//     setSending(true)
//     // Simulate API call
//     await new Promise(r => setTimeout(r, 1800))
//     setSending(false)
//     setSent(true)
//     gsap.fromTo('.cf-success > *', { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.8, ease: 'back.out(1.7)' })
//   }

//   if (!open) return null

//   return (
//     <div ref={overlayRef} style={{ position: 'fixed', inset: 0, zIndex: 5000, display: 'flex', justifyContent: 'flex-end' }}>
//       {/* Backdrop */}
//       <div onClick={closeModal} style={{ position: 'absolute', inset: 0, background: 'rgba(4,1,14,0.75)', backdropFilter: 'blur(8px)', cursor: 'none' }} />

//       {/* Panel */}
//       <div ref={panelRef} style={{
//         position: 'relative', zIndex: 1,
//         width: 'min(620px,100vw)', height: '100vh',
//         background: 'rgba(8,3,22,0.98)',
//         borderLeft: '1px solid rgba(245,200,66,0.15)',
//         overflowY: 'auto', overflowX: 'hidden',
//         display: 'flex', flexDirection: 'column',
//         scrollbarWidth: 'thin', scrollbarColor: 'rgba(245,200,66,0.2) transparent'
//       }}>
//         {/* Panel header */}
//         <div style={{ padding: '36px 48px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
//           <div>
//             <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.3em', color: '#f5c842', textTransform: 'uppercase', marginBottom: 20 }}>
//               ✦ New Project Inquiry
//             </div>
//             <h2 className="cf-title" style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 600, lineHeight: 0.9, letterSpacing: '0.05em' }}>
//               {['LET\'S','BUILD','TOGETHER'].map((w,i) => (
//                 <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
//                   <span style={{ display: 'block', color: i===2 ? 'transparent' : undefined, WebkitTextStroke: i===2 ? '1px rgba(248,242,232,0.3)' : undefined }}>
//                     {i===2 ? <span style={{ background: 'linear-gradient(90deg,#ff7b2e,#f5c842)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{w}</span> : w}
//                   </span>
//                 </span>
//               ))}
//             </h2>
//           </div>
//           <button onClick={closeModal} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', color: '#5a5280', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'none', flexShrink: 0, marginTop: 4, transition: 'all .3s' }}
//             onMouseEnter={e=>{e.currentTarget.style.borderColor='#f5c842';e.currentTarget.style.color='#f5c842'}}
//             onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.12)';e.currentTarget.style.color='#5a5280'}}>✕</button>
//         </div>

//         {/* Divider */}
//         <div style={{ margin: '28px 48px 0', height: 1, background: 'linear-gradient(90deg,rgba(245,200,66,0.4),transparent)' }} />

//         {/* Form / Success */}
//         <div style={{ padding: '32px 48px 48px', flex: 1 }}>
//           {!sent ? (
//             <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
//               {/* Name + Email row */}
//               <div className="cf-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
//                 <Field label="Full Name *" error={errors.name}>
//                   <input type="text" placeholder="Aryan Kapoor" value={form.name}
//                     onChange={e=>{ setForm({...form,name:e.target.value}); setErrors({...errors,name:''}) }}
//                     style={inputStyle(errors.name)} />
//                 </Field>
//                 <Field label="Email Address *" error={errors.email}>
//                   <input type="email" placeholder="hello@you.com" value={form.email}
//                     onChange={e=>{ setForm({...form,email:e.target.value}); setErrors({...errors,email:''}) }}
//                     style={inputStyle(errors.email)} />
//                 </Field>
//               </div>

//               {/* Company */}
//               <div className="cf-field" style={{ marginBottom: 24 }}>
//                 <Field label="Company / Brand">
//                   <input type="text" placeholder="Your Studio / Company Name (optional)" value={form.company}
//                     onChange={e=>setForm({...form,company:e.target.value})} style={inputStyle()} />
//                 </Field>
//               </div>

//               {/* Project Type */}
//               <div className="cf-field" style={{ marginBottom: 24 }}>
//                 <Field label="Project Type *" error={errors.type}>
//                   <select value={form.type}
//                     onChange={e=>{ setForm({...form,type:e.target.value}); setErrors({...errors,type:''}) }}
//                     style={{ ...inputStyle(errors.type), background: '#0c0520', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23f5c842\' stroke-width=\'1.5\' fill=\'none\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: 40 }}>
//                     <option value="">Select project type…</option>
//                     {PROJECT_TYPES.map(t => <option key={t} value={t} style={{ background: '#0c0520' }}>{t}</option>)}
//                   </select>
//                 </Field>
//               </div>

//               {/* Budget */}
//               <div className="cf-field" style={{ marginBottom: 24 }}>
//                 <Field label="Estimated Budget">
//                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
//                     {BUDGETS.map(b => (
//                       <button key={b} type="button" onClick={()=>setForm({...form,budget:b})}
//                         style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.08em', padding: '10px 8px', border: `1px solid ${form.budget===b ? '#f5c842' : 'rgba(255,255,255,0.1)'}`, background: form.budget===b ? 'rgba(245,200,66,0.12)' : 'transparent', color: form.budget===b ? '#f5c842' : '#5a5280', cursor: 'none', textAlign: 'center', transition: 'all .25s', lineHeight: 1.3 }}>
//                         {b}
//                       </button>
//                     ))}
//                   </div>
//                 </Field>
//               </div>

//               {/* Message */}
//               <div className="cf-field" style={{ marginBottom: 32 }}>
//                 <Field label="Tell Us About Your Project *" error={errors.message}>
//                   <textarea placeholder="Describe your vision, goals, timeline…" rows={5} value={form.message}
//                     onChange={e=>{ setForm({...form,message:e.target.value}); setErrors({...errors,message:''}) }}
//                     style={{ ...inputStyle(errors.message), resize: 'vertical', minHeight: 120 }} />
//                 </Field>
//               </div>

//               {/* Submit */}
//               <div className="cf-field">
//                 <button type="submit" disabled={sending}
//                   style={{ width: '100%', padding: '20px 32px', fontFamily: 'Space Mono,monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#04010e', background: sending ? '#a08800' : '#f5c842', border: 'none', cursor: 'none', transition: 'background .3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}
//                   onMouseEnter={e=>!sending&&(e.currentTarget.style.background='#f8f2e8')}
//                   onMouseLeave={e=>!sending&&(e.currentTarget.style.background='#f5c842')}>
//                   {sending ? <><Spinner />Awakening the cosmos…</> : <><span>Send My Vision</span><span>↗</span></>}
//                 </button>
//                 <p style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.1em', color: '#5a5280', textAlign: 'center', marginTop: 16 }}>
//                   We reply within 24 hours · All inquiries are confidential
//                 </p>
//               </div>
//             </form>
//           ) : (
//             <div className="cf-success" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, textAlign: 'center', gap: 28 }}>
//               <div style={{ fontSize: 72, lineHeight: 1 }}>🔱</div>
//               <div style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 600, lineHeight: 0.95, letterSpacing: '0.05em' }}>
//                 OM NAMAH<br />
//                 <span style={{ background: 'linear-gradient(90deg,#ff7b2e,#f5c842)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>SHIVAYA</span>
//               </div>
//               <p style={{ fontSize: 15, color: '#5a5280', lineHeight: 1.8, maxWidth: 340 }}>
//                 Your vision has been received. We'll reach out within 24 hours to begin our cosmic collaboration.
//               </p>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 340 }}>
//                 <div style={{ padding: '16px 24px', border: '1px solid rgba(245,200,66,0.2)', display: 'flex', justifyContent: 'space-between' }}>
//                   <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280', letterSpacing: '0.15em' }}>EMAIL</span>
//                   <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#f5c842', letterSpacing: '0.1em' }}>hello@shakti.studio</span>
//                 </div>
//                 <div style={{ padding: '16px 24px', border: '1px solid rgba(245,200,66,0.2)', display: 'flex', justifyContent: 'space-between' }}>
//                   <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280', letterSpacing: '0.15em' }}>RESPONSE</span>
//                   <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#f5c842', letterSpacing: '0.1em' }}>Within 24 Hours</span>
//                 </div>
//               </div>
//               <button onClick={closeModal}
//                 style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#04010e', background: '#f5c842', border: 'none', padding: '14px 32px', cursor: 'none', transition: 'background .3s' }}
//                 onMouseEnter={e=>e.currentTarget.style.background='#f8f2e8'}
//                 onMouseLeave={e=>e.currentTarget.style.background='#f5c842'}>
//                 Close ✕
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Decorative corner accent */}
//         <div style={{ position: 'absolute', top: 0, left: 0, width: 2, height: 80, background: 'linear-gradient(to bottom,#f5c842,transparent)', pointerEvents: 'none' }} />
//         <div style={{ position: 'absolute', bottom: 0, right: 0, width: 2, height: 80, background: 'linear-gradient(to top,#7b2dff,transparent)', pointerEvents: 'none' }} />
//         <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(123,45,255,0.4),transparent)', pointerEvents: 'none' }} />
//       </div>
//     </div>
//   )
// }

// // ── Sub-components ──
// function Field({ label, error, children }) {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//       <label style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.2em', color: error ? '#ff6b6b' : '#5a5280', textTransform: 'uppercase' }}>{label}</label>
//       {children}
//       {error && <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 8, color: '#ff6b6b', letterSpacing: '0.1em' }}>⚠ {error}</span>}
//     </div>
//   )
// }

// function inputStyle(error) {
//   return {
//     width: '100%', padding: '14px 16px',
//     fontFamily: 'Raleway,sans-serif', fontSize: 14, color: '#f8f2e8',
//     background: 'rgba(255,255,255,0.04)',
//     border: `1px solid ${error ? 'rgba(255,107,107,0.5)' : 'rgba(255,255,255,0.1)'}`,
//     outline: 'none', transition: 'border-color .3s',
//     cursor: 'none',
//     // focus handled via onFocus
//   }
// }

// function Spinner() {
//   return (
//     <span style={{
//       width: 14, height: 14,
//       border: '2px solid rgba(4,1,14,0.3)',
//       borderTopColor: '#04010e',
//       borderRadius: '50%',
//       display: 'inline-block',
//       animation: 'spin 0.8s linear infinite'
//     }} />
//   )
// }


// 'use client'
// import { useEffect, useRef, useState } from 'react'
// import { gsap } from 'gsap'

// const PROJECT_TYPES = ['Web Design & Development','Brand Identity','3D / Motion Experience','E-Commerce / SaaS','Full Brand + Web Package','Other']
// const BUDGETS = ['₹50k – ₹1L','₹1L – ₹3L','₹3L – ₹7L','₹7L – ₹15L','₹15L+','Let\'s discuss']

// export default function ContactModal() {
//   const overlayRef = useRef(null)
//   const panelRef   = useRef(null)
//   const [open, setOpen]       = useState(false)
//   const [sent, setSent]       = useState(false)
//   const [sending, setSending] = useState(false)
//   const [form, setForm]       = useState({ name:'', email:'', company:'', type:'', budget:'', message:'' })
//   const [errors, setErrors]   = useState({})

//   useEffect(() => {
//     const handler = () => openModal()
//     document.addEventListener('openContact', handler)
//     return () => document.removeEventListener('openContact', handler)
//   }, [])

//   useEffect(() => {
//     document.body.style.overflow = open ? 'hidden' : ''
//     return () => { document.body.style.overflow = '' }
//   }, [open])

//   function openModal() {
//     setOpen(true)
//     setSent(false)
//     setForm({ name:'', email:'', company:'', type:'', budget:'', message:'' })
//     setErrors({})
//     requestAnimationFrame(() => {
//       if (!overlayRef.current || !panelRef.current) return
//       gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
//       gsap.fromTo(panelRef.current,   { x: '100%' }, { x: '0%', duration: 0.7, ease: 'expo.out' })
//       gsap.fromTo('.cf-field',        { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: 'power3.out', delay: 0.3 })
//       gsap.fromTo('.cf-title span',   { y: '110%' }, { y: '0%', stagger: 0.08, duration: 0.9, ease: 'expo.out', delay: 0.2 })
//     })
//   }

//   function closeModal() {
//     gsap.to(panelRef.current,   { x: '100%', duration: 0.6, ease: 'expo.in' })
//     gsap.to(overlayRef.current, { opacity: 0, duration: 0.5, delay: 0.2, ease: 'power2.in',
//       onComplete: () => setOpen(false) })
//   }

//   function validate() {
//     const e = {}
//     if (!form.name.trim())    e.name    = 'Your name is required'
//     if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
//     if (!form.type)           e.type    = 'Please select a project type'
//     if (!form.message.trim()) e.message = 'Tell us about your project'
//     return e
//   }

//   async function handleSubmit(e) {
//     e.preventDefault()
//     const errs = validate()
//     if (Object.keys(errs).length) { setErrors(errs); return }
//     setSending(true)
//     await new Promise(r => setTimeout(r, 1800))
//     setSending(false)
//     setSent(true)
//     gsap.fromTo('.cf-success > *',
//       { opacity: 0, y: 40, scale: 0.9 },
//       { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.8, ease: 'back.out(1.7)' })
//   }

//   if (!open) return null

//   return (
//     <>
//       <style>{`
//         /* ── Spinner keyframe ── */
//         @keyframes spin { to { transform: rotate(360deg); } }

//         /* ── Overlay ── */
//         .cf-overlay {
//           position: fixed;
//           inset: 0;
//           z-index: 5000;
//           display: flex;
//           justify-content: flex-end;
//         }

//         .cf-backdrop {
//           position: absolute;
//           inset: 0;
//           background: rgba(4, 1, 14, 0.75);
//           backdrop-filter: blur(8px);
//           -webkit-backdrop-filter: blur(8px);
//           cursor: none;
//         }

//         /* ── Slide panel ── */
//         .cf-panel {
//           position: relative;
//           z-index: 1;
//           /* Full width on mobile, capped at 620px on desktop */
//           width: min(620px, 100vw);
//           height: 100vh;
//           /* On mobile the panel IS the full screen — no left border needed */
//           background: rgba(8, 3, 22, 0.98);
//           border-left: 1px solid rgba(245, 200, 66, 0.15);
//           overflow-y: auto;
//           overflow-x: hidden;
//           display: flex;
//           flex-direction: column;
//           scrollbar-width: thin;
//           scrollbar-color: rgba(245, 200, 66, 0.2) transparent;
//           /* iOS momentum scroll */
//           -webkit-overflow-scrolling: touch;
//         }

//         /* ── Panel header ── */
//         .cf-header {
//           padding: 36px 48px 0;
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           flex-shrink: 0;
//         }

//         .cf-eyebrow {
//           font-family: 'Space Mono', monospace;
//           font-size: 9px;
//           letter-spacing: 0.3em;
//           color: #f5c842;
//           text-transform: uppercase;
//           margin-bottom: 20px;
//         }

//         .cf-title {
//           font-family: 'Cinzel', serif;
//           font-size: clamp(28px, 5vw, 52px);
//           font-weight: 600;
//           line-height: 0.9;
//           letter-spacing: 0.05em;
//         }

//         .cf-title-line {
//           display: block;
//           overflow: hidden;
//         }

//         .cf-title-line span { display: block; }

//         .cf-title-gradient {
//           background: linear-gradient(90deg, #ff7b2e, #f5c842);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .cf-close-btn {
//           background: none;
//           border: 1px solid rgba(255, 255, 255, 0.12);
//           color: #5a5280;
//           width: 44px;
//           height: 44px;
//           flex-shrink: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 20px;
//           cursor: none;
//           margin-top: 4px;
//           transition: all 0.3s;
//         }

//         .cf-close-btn:hover {
//           border-color: #f5c842;
//           color: #f5c842;
//         }

//         /* ── Divider ── */
//         .cf-divider {
//           margin: 28px 48px 0;
//           height: 1px;
//           background: linear-gradient(90deg, rgba(245,200,66,0.4), transparent);
//           flex-shrink: 0;
//         }

//         /* ── Form body ── */
//         .cf-body {
//           padding: 32px 48px 48px;
//           flex: 1;
//         }

//         .cf-form {
//           display: flex;
//           flex-direction: column;
//           gap: 0;
//         }

//         /* Name + Email: 2-col on desktop, stacked on mobile */
//         .cf-row-2 {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 20px;
//           margin-bottom: 24px;
//         }

//         .cf-field-wrap { margin-bottom: 24px; }
//         .cf-field-wrap-last { margin-bottom: 32px; }

//         /* Budget pill grid: 3 cols → 2 cols on mobile */
//         .cf-budget-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 8px;
//         }

//         /* ── Submit button ── */
//         .cf-submit {
//           width: 100%;
//           padding: 20px 32px;
//           font-family: 'Space Mono', monospace;
//           font-size: 11px;
//           letter-spacing: 0.2em;
//           text-transform: uppercase;
//           color: #04010e;
//           background: #f5c842;
//           border: none;
//           cursor: none;
//           transition: background 0.3s;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 12px;
//         }

//         .cf-submit:disabled { background: #a08800; }
//         .cf-submit:not(:disabled):hover { background: #f8f2e8; }

//         .cf-submit-note {
//           font-family: 'Space Mono', monospace;
//           font-size: 9px;
//           letter-spacing: 0.1em;
//           color: #5a5280;
//           text-align: center;
//           margin-top: 16px;
//         }

//         /* ── Field component ── */
//         .cf-field-label {
//           font-family: 'Space Mono', monospace;
//           font-size: 9px;
//           letter-spacing: 0.2em;
//           text-transform: uppercase;
//           display: block;
//           margin-bottom: 8px;
//         }

//         .cf-field-error {
//           font-family: 'Space Mono', monospace;
//           font-size: 8px;
//           color: #ff6b6b;
//           letter-spacing: 0.1em;
//           margin-top: 6px;
//           display: block;
//         }

//         /* ── Success state ── */
//         .cf-success {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           min-height: 400px;
//           text-align: center;
//           gap: 28px;
//         }

//         .cf-success-title {
//           font-family: 'Cinzel', serif;
//           font-size: clamp(24px, 4vw, 42px);
//           font-weight: 600;
//           line-height: 0.95;
//           letter-spacing: 0.05em;
//           color: #f8f2e8;
//         }

//         .cf-success-desc {
//           font-size: 15px;
//           color: #5a5280;
//           line-height: 1.8;
//           max-width: 340px;
//         }

//         .cf-success-info {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           width: 100%;
//           max-width: 340px;
//         }

//         .cf-info-row {
//           padding: 16px 24px;
//           border: 1px solid rgba(245, 200, 66, 0.2);
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 12px;
//           flex-wrap: wrap;
//         }

//         .cf-info-key {
//           font-family: 'Space Mono', monospace;
//           font-size: 9px;
//           color: #5a5280;
//           letter-spacing: 0.15em;
//         }

//         .cf-info-val {
//           font-family: 'Space Mono', monospace;
//           font-size: 9px;
//           color: #f5c842;
//           letter-spacing: 0.1em;
//         }

//         .cf-success-close {
//           font-family: 'Space Mono', monospace;
//           font-size: 10px;
//           letter-spacing: 0.2em;
//           text-transform: uppercase;
//           color: #04010e;
//           background: #f5c842;
//           border: none;
//           padding: 14px 32px;
//           cursor: none;
//           transition: background 0.3s;
//         }

//         .cf-success-close:hover { background: #f8f2e8; }

//         /* ── Decorative accents ── */
//         .cf-accent-tl {
//           position: absolute; top: 0; left: 0;
//           width: 2px; height: 80px;
//           background: linear-gradient(to bottom, #f5c842, transparent);
//           pointer-events: none;
//         }

//         .cf-accent-br {
//           position: absolute; bottom: 0; right: 0;
//           width: 2px; height: 80px;
//           background: linear-gradient(to top, #7b2dff, transparent);
//           pointer-events: none;
//         }

//         .cf-accent-bottom {
//           position: absolute; bottom: 0; left: 0; right: 0;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(123,45,255,0.4), transparent);
//           pointer-events: none;
//         }

//         /* ── TABLET (≤ 768px) ── */
//         @media (max-width: 768px) {
//           .cf-header { padding: 28px 32px 0; }
//           .cf-divider { margin: 24px 32px 0; }
//           .cf-body { padding: 28px 32px 40px; }
//           .cf-panel { border-left: none; } /* full-width, no left border */
//         }

//         /* ── MOBILE (≤ 480px) ── */
//         @media (max-width: 480px) {
//           .cf-header { padding: 20px 20px 0; }
//           .cf-divider { margin: 20px 20px 0; }
//           .cf-body { padding: 24px 20px 36px; }

//           .cf-eyebrow { font-size: 8px; letter-spacing: 0.2em; margin-bottom: 14px; }

//           /* Stack name + email vertically */
//           .cf-row-2 {
//             grid-template-columns: 1fr;
//             gap: 0;
//             margin-bottom: 0;
//           }

//           /* Each stacked field needs its own bottom margin */
//           .cf-row-2 > * { margin-bottom: 20px; }

//           /* Budget: 2 cols instead of 3 on narrow screens */
//           .cf-budget-grid { grid-template-columns: repeat(2, 1fr); }

//           .cf-close-btn {
//             width: 38px;
//             height: 38px;
//             font-size: 16px;
//             /* Restore pointer for touch */
//             cursor: pointer;
//           }

//           .cf-submit {
//             padding: 18px 24px;
//             font-size: 10px;
//             letter-spacing: 0.15em;
//             /* Restore pointer for touch */
//             cursor: pointer;
//           }

//           .cf-success { gap: 20px; min-height: 300px; }
//           .cf-success-desc { font-size: 13px; }

//           .cf-info-row {
//             padding: 12px 16px;
//             font-size: 8px;
//           }

//           .cf-success-close {
//             padding: 14px 28px;
//             cursor: pointer;
//           }
//         }
//       `}</style>

//       <div ref={overlayRef} className="cf-overlay">
//         {/* Backdrop */}
//         <div className="cf-backdrop" onClick={closeModal} />

//         {/* Panel */}
//         <div ref={panelRef} className="cf-panel">

//           {/* Header */}
//           <div className="cf-header">
//             <div>
//               <div className="cf-eyebrow">✦ New Project Inquiry</div>
//               <h2 className="cf-title">
//                 {['LET\'S', 'BUILD', 'TOGETHER'].map((w, i) => (
//                   <span key={i} className="cf-title-line">
//                     <span style={{
//                       color: i === 2 ? 'transparent' : undefined,
//                       WebkitTextStroke: i === 2 ? '1px rgba(248,242,232,0.3)' : undefined
//                     }}>
//                       {i === 2
//                         ? <span className="cf-title-gradient">{w}</span>
//                         : w}
//                     </span>
//                   </span>
//                 ))}
//               </h2>
//             </div>
//             <button className="cf-close-btn hover-target" onClick={closeModal}>✕</button>
//           </div>

//           {/* Divider */}
//           <div className="cf-divider" />

//           {/* Body */}
//           <div className="cf-body">
//             {!sent ? (
//               <form className="cf-form" onSubmit={handleSubmit}>

//                 {/* Name + Email */}
//                 <div className="cf-field cf-row-2">
//                   <Field label="Full Name *" error={errors.name}>
//                     <input type="text" placeholder="Aryan Kapoor" value={form.name}
//                       onChange={e => { setForm({...form, name: e.target.value}); setErrors({...errors, name: ''}) }}
//                       style={iS(errors.name)} />
//                   </Field>
//                   <Field label="Email Address *" error={errors.email}>
//                     <input type="email" placeholder="hello@you.com" value={form.email}
//                       onChange={e => { setForm({...form, email: e.target.value}); setErrors({...errors, email: ''}) }}
//                       style={iS(errors.email)} />
//                   </Field>
//                 </div>

//                 {/* Company */}
//                 <div className="cf-field cf-field-wrap">
//                   <Field label="Company / Brand">
//                     <input type="text" placeholder="Your Studio / Company Name (optional)" value={form.company}
//                       onChange={e => setForm({...form, company: e.target.value})}
//                       style={iS()} />
//                   </Field>
//                 </div>

//                 {/* Project Type */}
//                 <div className="cf-field cf-field-wrap">
//                   <Field label="Project Type *" error={errors.type}>
//                     <select value={form.type}
//                       onChange={e => { setForm({...form, type: e.target.value}); setErrors({...errors, type: ''}) }}
//                       style={{
//                         ...iS(errors.type),
//                         background: '#0c0520',
//                         appearance: 'none',
//                         backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23f5c842\' stroke-width=\'1.5\' fill=\'none\'/%3E%3C/svg%3E")',
//                         backgroundRepeat: 'no-repeat',
//                         backgroundPosition: 'right 16px center',
//                         paddingRight: 40,
//                       }}>
//                       <option value="">Select project type…</option>
//                       {PROJECT_TYPES.map(t => (
//                         <option key={t} value={t} style={{ background: '#0c0520' }}>{t}</option>
//                       ))}
//                     </select>
//                   </Field>
//                 </div>

//                 {/* Budget */}
//                 <div className="cf-field cf-field-wrap">
//                   <Field label="Estimated Budget">
//                     <div className="cf-budget-grid">
//                       {BUDGETS.map(b => (
//                         <button key={b} type="button" onClick={() => setForm({...form, budget: b})}
//                           style={{
//                             fontFamily: 'Space Mono,monospace',
//                             fontSize: 9,
//                             letterSpacing: '0.08em',
//                             padding: '10px 8px',
//                             border: `1px solid ${form.budget === b ? '#f5c842' : 'rgba(255,255,255,0.1)'}`,
//                             background: form.budget === b ? 'rgba(245,200,66,0.12)' : 'transparent',
//                             color: form.budget === b ? '#f5c842' : '#5a5280',
//                             cursor: 'pointer',
//                             textAlign: 'center',
//                             transition: 'all .25s',
//                             lineHeight: 1.3,
//                           }}>
//                           {b}
//                         </button>
//                       ))}
//                     </div>
//                   </Field>
//                 </div>

//                 {/* Message */}
//                 <div className="cf-field cf-field-wrap-last">
//                   <Field label="Tell Us About Your Project *" error={errors.message}>
//                     <textarea placeholder="Describe your vision, goals, timeline…" rows={5} value={form.message}
//                       onChange={e => { setForm({...form, message: e.target.value}); setErrors({...errors, message: ''}) }}
//                       style={{ ...iS(errors.message), resize: 'vertical', minHeight: 120 }} />
//                   </Field>
//                 </div>

//                 {/* Submit */}
//                 <div className="cf-field">
//                   <button type="submit" disabled={sending} className="cf-submit hover-target"
//                     onMouseEnter={e => !sending && (e.currentTarget.style.background = '#f8f2e8')}
//                     onMouseLeave={e => !sending && (e.currentTarget.style.background = sending ? '#a08800' : '#f5c842')}>
//                     {sending
//                       ? <><Spinner />Awakening the cosmos…</>
//                       : <><span>Send My Vision</span><span>↗</span></>}
//                   </button>
//                   <p className="cf-submit-note">
//                     We reply within 24 hours · All inquiries are confidential
//                   </p>
//                 </div>
//               </form>
//             ) : (
//               <div className="cf-success">
//                 <div style={{ fontSize: 72, lineHeight: 1 }}>🔱</div>
//                 <div className="cf-success-title">
//                   OM NAMAH<br />
//                   <span className="cf-title-gradient">SHIVAYA</span>
//                 </div>
//                 <p className="cf-success-desc">
//                   Your vision has been received. We'll reach out within 24 hours to begin our cosmic collaboration.
//                 </p>
//                 <div className="cf-success-info">
//                   <div className="cf-info-row">
//                     <span className="cf-info-key">EMAIL</span>
//                     <span className="cf-info-val">hello@shakti.studio</span>
//                   </div>
//                   <div className="cf-info-row">
//                     <span className="cf-info-key">RESPONSE</span>
//                     <span className="cf-info-val">Within 24 Hours</span>
//                   </div>
//                 </div>
//                 <button className="cf-success-close hover-target" onClick={closeModal}
//                   onMouseEnter={e => e.currentTarget.style.background = '#f8f2e8'}
//                   onMouseLeave={e => e.currentTarget.style.background = '#f5c842'}>
//                   Close ✕
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Decorative accents */}
//           <div className="cf-accent-tl" />
//           <div className="cf-accent-br" />
//           <div className="cf-accent-bottom" />
//         </div>
//       </div>
//     </>
//   )
// }

// // ── Sub-components ──────────────────────────────────────────────────────────

// function Field({ label, error, children }) {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
//       <label className="cf-field-label" style={{ color: error ? '#ff6b6b' : '#5a5280' }}>{label}</label>
//       {children}
//       {error && <span className="cf-field-error">⚠ {error}</span>}
//     </div>
//   )
// }

// // Kept as a function (not inline object) to stay reusable across all inputs
// function iS(error) {
//   return {
//     width: '100%',
//     padding: '14px 16px',
//     fontFamily: 'Raleway, sans-serif',
//     fontSize: 14,
//     color: '#f8f2e8',
//     background: 'rgba(255,255,255,0.04)',
//     border: `1px solid ${error ? 'rgba(255,107,107,0.5)' : 'rgba(255,255,255,0.1)'}`,
//     outline: 'none',
//     transition: 'border-color .3s',
//     cursor: 'auto',  // inputs always need native cursor
//   }
// }

// function Spinner() {
//   return (
//     <span style={{
//       width: 14, height: 14,
//       border: '2px solid rgba(4,1,14,0.3)',
//       borderTopColor: '#04010e',
//       borderRadius: '50%',
//       display: 'inline-block',
//       animation: 'spin 0.8s linear infinite',
//     }} />
//   )
// }

'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const PROJECT_TYPES = ['Business Website','Landing Page','Web Application','SaaS Platform','E-commerce Store','AI Application','Custom Solution']
const BUDGETS = ['₹25k – ₹50k','₹50k – ₹1L','₹1L – ₹2L','₹2L+','Let\'s discuss']

export default function ContactModal() {
  const overlayRef = useRef(null)
  const panelRef   = useRef(null)
  const [open, setOpen]       = useState(false)
  const [sent, setSent]       = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm]       = useState({ name:'', email:'', company:'', type:'', budget:'', message:'' })
  const [errors, setErrors]   = useState({})

  // ── Listen for custom event from Nav ──
  useEffect(() => {
    const handler = () => openModal()
    document.addEventListener('openContact', handler)
    return () => document.removeEventListener('openContact', handler)
  }, [])

  // ── Prevent body scroll when open ──
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  function openModal() {
    setOpen(true)
    setSent(false)
    setForm({ name:'', email:'', company:'', type:'', budget:'', message:'' })
    setErrors({})
    requestAnimationFrame(() => {
      if (!overlayRef.current || !panelRef.current) return
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
      gsap.fromTo(panelRef.current,   { x: '100%' }, { x: '0%', duration: 0.7, ease: 'expo.out' })
      gsap.fromTo('.cf-field', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: 'power3.out', delay: 0.3 })
      gsap.fromTo('.cf-title span', { y: '110%' }, { y: '0%', stagger: 0.08, duration: 0.9, ease: 'expo.out', delay: 0.2 })
    })
  }

  function closeModal() {
    gsap.to(panelRef.current,   { x: '100%', duration: 0.6, ease: 'expo.in' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.5, delay: 0.2, ease: 'power2.in',
      onComplete: () => setOpen(false) })
  }

  function validate() {
    const e = {}
    if (!form.name.trim())    e.name    = 'Your name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.type)           e.type    = 'Please select a project type'
    if (!form.message.trim()) e.message = 'Tell us about your project'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setSending(false)
      setSent(true)
      gsap.fromTo('.cf-success > *', { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.8, ease: 'back.out(1.7)' })
    } catch (err) {
      setSending(false)
      setErrors({ message: `Send failed: ${err.message}. Email us at hello@shakti.studio` })
    }
  }

  if (!open) return null

  return (
    <div ref={overlayRef} style={{ position: 'fixed', inset: 0, zIndex: 5000, display: 'flex', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div onClick={closeModal} style={{ position: 'absolute', inset: 0, background: 'rgba(4,1,14,0.75)', backdropFilter: 'blur(8px)', cursor: 'none' }} />

      {/* Panel */}
      <div ref={panelRef} style={{
        position: 'relative', zIndex: 1,
        width: 'min(620px,100vw)', height: '100vh',
        background: 'rgba(8,3,22,0.98)',
        borderLeft: '1px solid rgba(245,200,66,0.15)',
        overflowY: 'auto', overflowX: 'hidden',
        display: 'flex', flexDirection: 'column',
        scrollbarWidth: 'thin', scrollbarColor: 'rgba(245,200,66,0.2) transparent'
      }}>
        {/* Panel header */}
        <div style={{ padding: '36px 48px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.3em', color: '#f5c842', textTransform: 'uppercase', marginBottom: 20 }}>
              ✦ New Project Inquiry
            </div>
            <h2 className="cf-title" style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 600, lineHeight: 0.9, letterSpacing: '0.05em' }}>
              {['LET\'S','BUILD','YOUR NEXT PRODUCT'].map((w,i) => (
                <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                  <span style={{ display: 'block', color: i===2 ? 'transparent' : undefined, WebkitTextStroke: i===2 ? '1px rgba(248,242,232,0.3)' : undefined }}>
                    {i===2 ? <span style={{ background: 'linear-gradient(90deg,#ff7b2e,#f5c842)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{w}</span> : w}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <button onClick={closeModal} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', color: '#5a5280', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'none', flexShrink: 0, marginTop: 4, transition: 'all .3s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='#f5c842';e.currentTarget.style.color='#f5c842'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.12)';e.currentTarget.style.color='#5a5280'}}>✕</button>
        </div>

        {/* Divider */}
        <div style={{ margin: '28px 48px 0', height: 1, background: 'linear-gradient(90deg,rgba(245,200,66,0.4),transparent)' }} />

        {/* Form / Success */}
        <div style={{ padding: '32px 48px 48px', flex: 1 }}>
          {!sent ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {/* Name + Email row */}
              <div className="cf-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                <Field label="Full Name *" error={errors.name}>
                  <input type="text" placeholder="Aryan Kapoor" value={form.name}
                    onChange={e=>{ setForm({...form,name:e.target.value}); setErrors({...errors,name:''}) }}
                    style={inputStyle(errors.name)} />
                </Field>
                <Field label="Email Address *" error={errors.email}>
                  <input type="email" placeholder="hello@you.com" value={form.email}
                    onChange={e=>{ setForm({...form,email:e.target.value}); setErrors({...errors,email:''}) }}
                    style={inputStyle(errors.email)} />
                </Field>
              </div>

              {/* Company */}
              <div className="cf-field" style={{ marginBottom: 24 }}>
                <Field label="Company / Brand">
                  <input type="text" placeholder="Company / Startup Name (optional)" value={form.company}
                    onChange={e=>setForm({...form,company:e.target.value})} style={inputStyle()} />
                </Field>
              </div>

              {/* Project Type */}
              <div className="cf-field" style={{ marginBottom: 24 }}>
                <Field label="Project Type *" error={errors.type}>
                  <select value={form.type}
                    onChange={e=>{ setForm({...form,type:e.target.value}); setErrors({...errors,type:''}) }}
                    style={{ ...inputStyle(errors.type), background: '#0c0520', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23f5c842\' stroke-width=\'1.5\' fill=\'none\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: 40 }}>
                    <option value="">Select project type…</option>
                    {PROJECT_TYPES.map(t => <option key={t} value={t} style={{ background: '#0c0520' }}>{t}</option>)}
                  </select>
                </Field>
              </div>

              {/* Budget */}
              <div className="cf-field" style={{ marginBottom: 24 }}>
                <Field label="Estimated Budget">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                    {BUDGETS.map(b => (
                      <button key={b} type="button" onClick={()=>setForm({...form,budget:b})}
                        style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.08em', padding: '10px 8px', border: `1px solid ${form.budget===b ? '#f5c842' : 'rgba(255,255,255,0.1)'}`, background: form.budget===b ? 'rgba(245,200,66,0.12)' : 'transparent', color: form.budget===b ? '#f5c842' : '#5a5280', cursor: 'none', textAlign: 'center', transition: 'all .25s', lineHeight: 1.3 }}>
                        {b}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              {/* Message */}
              <div className="cf-field" style={{ marginBottom: 32 }}>
                <Field label="Tell Us About Your Project *" error={errors.message}>
                  <textarea placeholder="Tell us about your project, goals, timeline, and any references you'd like us to review." rows={5} value={form.message}
                    onChange={e=>{ setForm({...form,message:e.target.value}); setErrors({...errors,message:''}) }}
                    style={{ ...inputStyle(errors.message), resize: 'vertical', minHeight: 120 }} />
                </Field>
              </div>

              {/* Submit */}
              <div className="cf-field">
                <button type="submit" disabled={sending}
                  style={{ width: '100%', padding: '20px 32px', fontFamily: 'Space Mono,monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#04010e', background: sending ? '#a08800' : '#f5c842', border: 'none', cursor: 'none', transition: 'background .3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}
                  onMouseEnter={e=>!sending&&(e.currentTarget.style.background='#f8f2e8')}
                  onMouseLeave={e=>!sending&&(e.currentTarget.style.background='#f5c842')}>
                  {sending ? <><Spinner />Sending the details...</> : <><span>Send Project Details</span><span>↗</span></>}
                </button>
                <p style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.1em', color: '#5a5280', textAlign: 'center', marginTop: 16 }}>
                  We reply within 24 hours · All inquiries are confidential
                </p>
              </div>
            </form>
          ) : (
            <div className="cf-success" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, textAlign: 'center', gap: 28 }}>
              <div style={{ fontSize: 72, lineHeight: 1 }}>🔱</div>
              <div style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 600, lineHeight: 0.95, letterSpacing: '0.05em' }}>
                OM NAMAH<br />
                <span style={{ background: 'linear-gradient(90deg,#ff7b2e,#f5c842)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>SHIVAYA</span>
              </div>
              <p style={{ fontSize: 15, color: '#5a5280', lineHeight: 1.8, maxWidth: 340 }}>
                Your vision has been received. We'll reach out within 24 hours to begin our cosmic collaboration.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 340 }}>
                <div style={{ padding: '16px 24px', border: '1px solid rgba(245,200,66,0.2)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280', letterSpacing: '0.15em' }}>EMAIL</span>
                  <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#f5c842', letterSpacing: '0.1em' }}>hello@shakti.studio</span>
                </div>
                <div style={{ padding: '16px 24px', border: '1px solid rgba(245,200,66,0.2)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#5a5280', letterSpacing: '0.15em' }}>RESPONSE</span>
                  <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, color: '#f5c842', letterSpacing: '0.1em' }}>Within 24 Hours</span>
                </div>
              </div>
              <button onClick={closeModal}
                style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#04010e', background: '#f5c842', border: 'none', padding: '14px 32px', cursor: 'none', transition: 'background .3s' }}
                onMouseEnter={e=>e.currentTarget.style.background='#f8f2e8'}
                onMouseLeave={e=>e.currentTarget.style.background='#f5c842'}>
                Close ✕
              </button>
            </div>
          )}
        </div>

        {/* Decorative corner accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 2, height: 80, background: 'linear-gradient(to bottom,#f5c842,transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 2, height: 80, background: 'linear-gradient(to top,#7b2dff,transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(123,45,255,0.4),transparent)', pointerEvents: 'none' }} />
      </div>
    </div>
  )
}

// ── Sub-components ──
function Field({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.2em', color: error ? '#ff6b6b' : '#5a5280', textTransform: 'uppercase' }}>{label}</label>
      {children}
      {error && <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 8, color: '#ff6b6b', letterSpacing: '0.1em' }}>⚠ {error}</span>}
    </div>
  )
}

function inputStyle(error) {
  return {
    width: '100%', padding: '14px 16px',
    fontFamily: 'Raleway,sans-serif', fontSize: 14, color: '#f8f2e8',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${error ? 'rgba(255,107,107,0.5)' : 'rgba(255,255,255,0.1)'}`,
    outline: 'none', transition: 'border-color .3s',
    cursor: 'none',
    // focus handled via onFocus
  }
}

function Spinner() {
  return (
    <span style={{
      width: 14, height: 14,
      border: '2px solid rgba(4,1,14,0.3)',
      borderTopColor: '#04010e',
      borderRadius: '50%',
      display: 'inline-block',
      animation: 'spin 0.8s linear infinite'
    }} />
  )
}