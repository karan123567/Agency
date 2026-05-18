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
      const numEl = box.querySelector('.num-val')
      const obj = { v: 0 }
      ScrollTrigger.create({
        trigger: ref.current, start: 'top 80%', onEnter() {
          gsap.to(obj, { v: target, duration: 2.5, ease: 'power2.out', onUpdate() { numEl.textContent = Math.round(obj.v) } })
        }
      })
    })
  }, [])

  return (
    <section ref={ref} style={{ background: 'rgba(4,1,14,0.85)', backdropFilter: 'blur(40px)', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.07)' }}>
        {STATS.map((s, i) => (
          <div key={i} className="stat-box hover-target" data-target={s.val} style={{ padding: '60px 40px', background: 'rgba(4,1,14,0.9)', position: 'relative', overflow: 'hidden', cursor: 'none' }}
            onMouseEnter={e => { e.currentTarget.querySelector('.stat-line').style.transform = 'scaleX(1)' }}
            onMouseLeave={e => { e.currentTarget.querySelector('.stat-line').style.transform = 'scaleX(0)' }}>
            <div className="stat-line" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 2, background: 'linear-gradient(90deg,#7b2dff,#ff7b2e,#f5c842)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.6s' }} />
            <div style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(56px,6vw,88px)', lineHeight: 1, color: '#f8f2e8' }}>
              <span className="num-val">0</span>
              <span style={{ fontSize: '0.45em', color: '#f5c842' }}>{s.suf}</span>
            </div>
            <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.2em', color: '#5a5280', textTransform: 'uppercase', marginTop: 16 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
