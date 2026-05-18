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
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '140px 60px 80px', overflow: 'hidden' }}>
      {/* Scroll indicator — 3 sections tall so Three.js scroll has space */}
      <div className="hero-eyebrow" style={{ fontFamily: 'Space Mono,monospace', fontSize: 10, letterSpacing: '0.3em', color: '#f5c842', textTransform: 'uppercase', marginBottom: 32, overflow: 'hidden' }}>
        <span style={{ display: 'inline-block' }}>Creative Digital Agency — Est. 2025</span>
      </div>
      <h1 style={{ fontFamily: 'Cinzel,serif', fontSize: 'clamp(52px,10vw,148px)', fontWeight: 600, lineHeight: 0.88, letterSpacing: '0.05em' }}>
        {['WE CRAFT', 'DIGITAL', 'COSMOS'].map((word, i) => (
          <span key={i} className="hero-line" style={{ overflow: 'hidden', display: 'block' }}>
            <span style={{ display: 'block', color: i === 2 ? 'transparent' : undefined, WebkitTextStroke: i === 2 ? '1px rgba(248,242,232,0.3)' : undefined }}>
              {i === 2 ? <span style={{ background: 'linear-gradient(90deg,#ff7b2e,#f5c842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{word}</span> : word}
            </span>
          </span>
        ))}
      </h1>
      <p className="hero-desc" style={{ fontSize: 15, lineHeight: 1.9, color: '#5a5280', maxWidth: 420, marginTop: 48, opacity: 0 }}>
        A collective of creators building extraordinary digital experiences where technology meets the divine — every pixel, an offering.
      </p>
      <div className="hero-scroll" style={{ position: 'absolute', bottom: 40, left: 60, fontFamily: 'Space Mono,monospace', fontSize: 9, letterSpacing: '0.25em', color: '#5a5280', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg,transparent,#5a5280,#f5c842)', position: 'relative', overflow: 'hidden' }} />
        <span>Scroll to reveal Mahadev</span>
      </div>
      <div style={{ position: 'absolute', top: '50%', right: 50, transform: 'translateY(-50%)', fontFamily: 'Space Mono,monospace', fontSize: 11, color: '#5a5280', letterSpacing: '0.15em', writingMode: 'vertical-rl' }}>
        2025 — ∞
      </div>

      {/* Spacer so Shiva reveals on scroll through hero */}
      <div style={{ height: '300vh' }} />
    </section>
  )
}
