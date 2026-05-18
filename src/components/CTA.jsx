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
    <section id="cta" ref={ref} style={{ padding: '160px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'rgba(4,1,14,0.85)', backdropFilter: 'blur(40px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ position: 'absolute', fontFamily: 'Cinzel,serif', fontSize: 'clamp(80px,16vw,260px)', color: 'transparent', WebkitTextStroke: '1px rgba(245,200,66,0.04)', lineHeight: 0.85, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', whiteSpace: 'nowrap', letterSpacing: '0.05em', zIndex: 0 }}>OM</div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.3em', color: '#f5c842', textTransform: 'uppercase', marginBottom: 40 }}>Ready to Begin?</div>
        <h2 className="cta-h" style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(56px,9vw,128px)', fontWeight: 400, lineHeight: 0.9, letterSpacing: '0.05em', marginBottom: 60 }}>
          LET'S BUILD<br />YOUR DIGITAL<br />
          <span style={{ background: 'linear-gradient(90deg,#ff7b2e,#f5c842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>COSMOS</span>
        </h2>
        <button className="hover-target" style={{ display: 'inline-flex', alignItems: 'center', gap: 16, fontFamily: 'Space Mono,monospace', fontSize: 11, letterSpacing: '0.2em', color: '#04010e', background: '#f5c842', border: 'none', padding: '20px 48px', textTransform: 'uppercase', cursor: 'none', transition: 'background .3s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#f8f2e8'}
          onMouseLeave={e => e.currentTarget.style.background = '#f5c842'}>
          <span>Start a Project</span><span>↗</span>
        </button>
        <a href="mailto:hello@shakti.studio" style={{ display: 'block', marginTop: 32, fontFamily: 'Space Mono,monospace', fontSize: 11, letterSpacing: '0.15em', color: '#5a5280', textDecoration: 'none', transition: 'color .3s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#f5c842'}
          onMouseLeave={e => e.currentTarget.style.color = '#5a5280'}>
          hello@shakti.studio
        </a>
      </div>
    </section>
  )
}
