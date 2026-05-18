'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { num:'01', icon:'⬡', title:'Web Design &\nDevelopment',   tags:['Next.js','Three.js','GSAP','WebGL'], desc:'Immersive environments built with cutting-edge WebGL and motion.' },
  { num:'02', icon:'◈', title:'Brand Identity &\nVisual Systems', tags:['Logo','Typography','Systems'],   desc:'Mythic brand identities that command attention and inspire devotion.' },
  { num:'03', icon:'⟁', title:'Motion &\n3D Experiences',    tags:['GSAP','R3F','Lottie','Framer'],     desc:'Fluid animations that breathe cosmic life into every pixel.' },
  { num:'04', icon:'⊛', title:'E-Commerce &\nSaaS Platforms', tags:['Shopify','Stripe','CMS','API'],     desc:'Revenue-generating platforms built for scale and transcendence.' },
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

  return (
    <section id="services" ref={ref} style={{ padding: '120px 60px', background: 'rgba(4,1,14,0.82)', backdropFilter: 'blur(40px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="eyebrow" style={{ marginBottom: 80 }}>Sacred Services</div>
      <div style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(48px,7vw,100px)', fontWeight: 400, lineHeight: 0.9, letterSpacing: '0.05em', marginBottom: 80 }}>
        <div>WHAT</div>
        <div style={{ color: 'transparent', WebkitTextStroke: '1px rgba(248,242,232,0.18)' }}>WE DO</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {SERVICES.map((s, i) => (
          <div key={i} className="svc-card hover-target" style={{ padding: '56px 44px', background: 'rgba(4,1,14,0.92)', position: 'relative', overflow: 'hidden', cursor: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(20,5,40,0.98)'; e.currentTarget.querySelector('.sarr').style.transform = 'rotate(45deg)'; e.currentTarget.querySelector('.sarr').style.borderColor = '#f5c842'; e.currentTarget.querySelector('.sarr').style.color = '#f5c842' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(4,1,14,0.92)'; e.currentTarget.querySelector('.sarr').style.transform = 'rotate(0deg)'; e.currentTarget.querySelector('.sarr').style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.querySelector('.sarr').style.color = '#f8f2e8' }}>
            <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, color: '#5a5280', marginBottom: 28 }}>{s.num}</div>
            <div style={{ fontSize: 28, color: '#f5c842', opacity: 0.7, marginBottom: 20 }}>{s.icon}</div>
            <h3 style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(24px,2.8vw,40px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '0.05em', marginBottom: 20, whiteSpace: 'pre-line' }}>{s.title}</h3>
            <p style={{ fontSize: 13, color: '#5a5280', lineHeight: 1.8, marginBottom: 28 }}>{s.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {s.tags.map(t => <span key={t} style={{ fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.1em', color: '#5a5280', border: '1px solid rgba(255,255,255,0.1)', padding: '5px 11px' }}>{t}</span>)}
            </div>
            <div className="sarr" style={{ position: 'absolute', bottom: 44, right: 44, width: 42, height: 42, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, transition: 'all 0.4s' }}>↗</div>
          </div>
        ))}
      </div>
    </section>
  )
}
