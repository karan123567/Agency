'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { num: '01', name: 'Discovery & Vision',  dur: 'Week 1–2' },
  { num: '02', name: 'Design & Prototype',  dur: 'Week 2–4' },
  { num: '03', name: 'Build & Animate',     dur: 'Week 4–8' },
  { num: '04', name: 'Launch & Evolve',     dur: 'Week 8+' },
]

export default function Process() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current.querySelectorAll('.proc-row'),
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } }
    )
  }, [])

  return (
    <section id="process" ref={ref} style={{ padding: '120px 60px', background: 'rgba(4,1,14,0.8)', backdropFilter: 'blur(40px)' }}>
      <div className="eyebrow" style={{ marginBottom: 60 }}>The Sacred Path</div>
      {STEPS.map((s, i) => (
        <div key={i} className="proc-row hover-target" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 180px auto', alignItems: 'center', padding: '40px 0', borderBottom: '1px solid rgba(255,255,255,0.07)', gap: 40, cursor: 'none', position: 'relative' }}
          onMouseEnter={e => { e.currentTarget.querySelector('.proc-line').style.width = '100%'; e.currentTarget.querySelector('.proc-name').style.background = 'linear-gradient(90deg,#ff7b2e,#f5c842)'; e.currentTarget.querySelector('.proc-name').style.WebkitBackgroundClip = 'text'; e.currentTarget.querySelector('.proc-name').style.WebkitTextFillColor = 'transparent'; e.currentTarget.querySelector('.proc-arrow').style.transform = 'translateX(12px)'; e.currentTarget.querySelector('.proc-arrow').style.color = '#f5c842' }}
          onMouseLeave={e => { e.currentTarget.querySelector('.proc-line').style.width = '0'; e.currentTarget.querySelector('.proc-name').style.background = 'none'; e.currentTarget.querySelector('.proc-name').style.WebkitTextFillColor = '#f8f2e8'; e.currentTarget.querySelector('.proc-arrow').style.transform = 'translateX(0)'; e.currentTarget.querySelector('.proc-arrow').style.color = '#5a5280' }}>
          <div className="proc-line" style={{ position: 'absolute', bottom: 0, left: 0, height: 1, width: 0, background: 'linear-gradient(90deg,#7b2dff,#ff7b2e)', transition: 'width 0.8s cubic-bezier(.76,0,.24,1)' }} />
          <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280' }}>{s.num}</span>
          <span className="proc-name" style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 400, letterSpacing: '0.05em', transition: 'all .3s', color: '#f8f2e8' }}>{s.name}</span>
          <span style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280' }}>{s.dur}</span>
          <span className="proc-arrow" style={{ fontSize: 20, color: '#5a5280', transition: 'all .4s' }}>→</span>
        </div>
      ))}
    </section>
  )
}
