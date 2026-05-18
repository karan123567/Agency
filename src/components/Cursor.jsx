'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  useEffect(() => {
    const dot  = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    const glow = document.getElementById('cursor-glow')
    if (!dot) return
    let cx = 0, cy = 0, rx = 0, ry = 0
    const onMove = e => { cx = e.clientX; cy = e.clientY; gsap.to(dot, { x: cx, y: cy, duration: 0.05, ease: 'none' }) }
    document.addEventListener('mousemove', onMove)
    const loop = () => { rx += (cx - rx) * 0.1; ry += (cy - ry) * 0.1; gsap.set(ring, { x: rx, y: ry }); gsap.set(glow, { x: rx, y: ry }); requestAnimationFrame(loop) }
    loop()
    const els = document.querySelectorAll('button, a, .hover-target')
    els.forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(ring, { scale: 2.5, opacity: 0.8, duration: 0.4 }))
      el.addEventListener('mouseleave', () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4 }))
    })
    return () => document.removeEventListener('mousemove', onMove)
  }, [])
  return (
    <>
      <div id="cursor-glow" />
      <div id="cursor-ring" />
      <div id="cursor-dot"  />
    </>
  )
}
