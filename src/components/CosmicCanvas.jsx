'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const gauss = (center, sigma) => center + (Math.random() - 0.5) * sigma * 2

// ── Build Shiva targets — scale controls overall size ──
function buildShivaTargets(scale = 1, qualityMult = 1) {
  const positions = []
  const colors = []
  const push = (x, y, z, r, g, b) => {
    positions.push(x * scale, y * scale, z * scale)
    colors.push(r, g, b)
  }
  const q = qualityMult // 1 = full, 0.5 = half particles

  // JATA
  const strands = Math.round(28 * q)
  for (let s = 0; s < strands; s++) {
    const angle  = (s / strands) * Math.PI * 2
    const spread = 0.8 + Math.random() * 2.5
    const height = 6 + Math.random() * 9
    const curve  = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 9.5, 0),
      new THREE.Vector3(Math.cos(angle) * 0.6, 12, Math.sin(angle) * 0.25),
      new THREE.Vector3(Math.cos(angle) * spread * 1.1, 13.5, Math.sin(angle) * spread * 0.22),
      new THREE.Vector3(Math.cos(angle) * spread * 1.6, 9.5 + height, Math.sin(angle) * spread * 0.12),
    ])
    curve.getPoints(Math.round(55 * q)).forEach((p, i, arr) => {
      const t = i / arr.length
      push(p.x + gauss(0, 0.08), p.y + gauss(0, 0.04), p.z + gauss(0, 0.08),
        0.1 + t * 0.2, 0.35 + t * 0.2, 1)
    })
  }

  // HEAD
  for (let i = 0; i < Math.round(900 * q); i++) {
    const phi = Math.acos(2 * Math.random() - 1), theta = Math.random() * Math.PI * 2
    const r = 1.55 * (0.88 + Math.random() * 0.12)
    push(r * Math.sin(phi) * Math.cos(theta), 8 + r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta) * 0.75,
      0, 0.75 + Math.random() * 0.25, 0.9 + Math.random() * 0.1)
  }

  // FACE CONTOUR
  for (let i = 0; i < Math.round(200 * q); i++) {
    const a = (i / 200) * Math.PI * 2, r = 1.3 + Math.random() * 0.15
    push(Math.cos(a) * r, 8 + Math.sin(a) * 1.2, 1.1 + Math.random() * 0.15, 0.1, 0.85, 1)
  }

  // THIRD EYE
  for (let i = 0; i < 60; i++)
    push(gauss(0, 0.06), gauss(8.35, 0.05), gauss(1.42, 0.04), 1, 0.55 + Math.random() * 0.2, 0)

  // NECK
  for (let i = 0; i < Math.round(200 * q); i++) {
    const a = Math.random() * Math.PI * 2, r = 0.6 + Math.random() * 0.1
    push(Math.cos(a) * r, 6.3 + Math.random() * 1.2, Math.sin(a) * r * 0.6, 0, 0.8, 1)
  }

  // SERPENT
  for (let i = 0; i < Math.round(500 * q); i++) {
    const t = i / 500, ca = t * Math.PI * 5, cr = 2.2 - t * 0.5
    push(Math.cos(ca) * cr, 3 + t * 5, Math.sin(ca) * cr * 0.5 - 0.5, 0, 1, 0.6 + Math.random() * 0.3)
  }

  // SHOULDERS
  for (let i = 0; i < Math.round(400 * q); i++) {
    const side = i < 200 ? -1 : 1, x = side * (1.5 + Math.random() * 2.5)
    push(x + gauss(0, 0.3), 5.8 + gauss(0, 0.3), gauss(0, 0.4), 0, 0.7, 0.9)
  }

  // TORSO
  for (let i = 0; i < Math.round(1400 * q); i++) {
    const y = 1.2 + Math.random() * 4.8, t = (y - 1.2) / 4.8
    const maxR = 0.8 + t * 2.2, r = Math.random() * maxR, angle = Math.random() * Math.PI * 2
    push(Math.cos(angle) * r + gauss(0, 0.1), y, Math.sin(angle) * r * 0.55, 0.05, 0.65 + t * 0.2, 0.9)
  }

  // ARMS
  const armPts = Math.round(80 * q)
  ;[
    new THREE.CatmullRomCurve3([new THREE.Vector3(-3.2,6,0),new THREE.Vector3(-4,4.5,0.3),new THREE.Vector3(-3.8,2.5,0.5),new THREE.Vector3(-2.2,1.2,0.8)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(3.2,6,0),new THREE.Vector3(4,4.5,0.3),new THREE.Vector3(3.8,2.5,0.5),new THREE.Vector3(2.2,1.2,0.8)]),
  ].forEach(curve => curve.getPoints(armPts).forEach((p, i) => {
    const t = i / armPts
    push(p.x + gauss(0, 0.18), p.y + gauss(0, 0.1), p.z + gauss(0, 0.12), 0.1 + t * 0.1, 0.6, 0.95)
  }))

  // HANDS
  for (let i = 0; i < Math.round(200 * q); i++) {
    const side = i < 100 ? -1 : 1
    push(side * 1.8 + gauss(0, 0.25), 1.0 + gauss(0, 0.15), 0.9 + gauss(0, 0.12), 0.2, 0.8, 1)
  }

  // LEGS
  const legPts = Math.round(90 * q)
  ;[
    new THREE.CatmullRomCurve3([new THREE.Vector3(-1.5,1.2,0.5),new THREE.Vector3(-3.5,0.2,0.6),new THREE.Vector3(-4.5,-1.0,0.5),new THREE.Vector3(-3,-2,0.4),new THREE.Vector3(0,-2.2,0.5)]),
    new THREE.CatmullRomCurve3([new THREE.Vector3(1.5,1.2,0.5),new THREE.Vector3(3.5,0.2,0.6),new THREE.Vector3(4.5,-1.0,0.5),new THREE.Vector3(3,-2,0.4),new THREE.Vector3(0,-2.2,0.5)]),
  ].forEach(curve => curve.getPoints(legPts).forEach(p =>
    push(p.x + gauss(0, 0.2), p.y + gauss(0, 0.15), p.z + gauss(0, 0.12), 0, 0.65, 0.9)
  ))

  // BASE
  for (let i = 0; i < Math.round(300 * q); i++) {
    const a = Math.random() * Math.PI * 2, r = Math.random() * 5
    push(Math.cos(a) * r, -2.2 + Math.random() * 0.3, Math.sin(a) * r * 0.3, 0.05, 0.35, 0.7)
  }

  // CRESCENT MOON
  for (let i = 0; i < 180; i++) {
    const a = (i / 180) * Math.PI, r = 0.9
    push(1.8 + Math.cos(a) * r + gauss(0, 0.06), 11.5 + Math.sin(a) * r + gauss(0, 0.06), 0.3 + gauss(0, 0.05), 0.85, 0.9, 1)
  }
  for (let i = 0; i < 100; i++) {
    const a = (i / 100) * Math.PI
    push(2.1 + Math.cos(a) * 0.75, 11.5 + Math.sin(a) * 0.75, 0.35, 0.5, 0.6, 0.9)
  }

  // AURA
  for (let i = 0; i < Math.round(1200 * q); i++) {
    const angle = Math.random() * Math.PI * 2, r = 5 + Math.random() * 4, y = -3 + Math.random() * 20
    push(Math.cos(angle) * r, y, Math.sin(angle) * r * 0.4,
      0.1 + Math.random() * 0.2, 0.3 + Math.random() * 0.3, 0.8 + Math.random() * 0.2)
  }

  return { positions, colors }
}

function buildScatteredPositions(count, scale = 1) {
  const out = []
  for (let i = 0; i < count; i++) {
    const r = (15 + Math.random() * 30) * scale
    const theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1)
    out.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta) * 0.5, r * Math.cos(phi))
  }
  return out
}

const BH_PROJECTS = [
  { color: '#7b2dff' }, { color: '#ff7b2e' }, { color: '#f5c842' },
  { color: '#00ffee' }, { color: '#ff44cc' }, { color: '#4488ff' },
]

export default function CosmicCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── DETECT DEVICE ──
    const W = window.innerWidth
    const isMobile = W < 768
    const isTablet = W >= 768 && W < 1024

    // Quality multiplier: mobile=0.4, tablet=0.65, desktop=1
    const Q    = isMobile ? 0.4 : isTablet ? 0.65 : 1
    // Shiva scale: smaller on mobile so it fits viewport
    const SCALE = isMobile ? 0.62 : isTablet ? 0.8 : 1
    // Particle size
    const PSIZE = isMobile ? 0.13 : isTablet ? 0.11 : 0.1
    // Star count
    const STARS = isMobile ? 2500 : isTablet ? 4000 : 6000

    // ── RENDERER ──
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.setSize(W, window.innerHeight)

    // ── SCENE + CAMERA ──
    const scene  = new THREE.Scene()
    scene.fog    = new THREE.FogExp2(0x04010e, isMobile ? 0.012 : isTablet ? 0.01 : 0.008)
    const fov    = isMobile ? 70 : isTablet ? 62 : 55
    const camera = new THREE.PerspectiveCamera(fov, W / window.innerHeight, 0.1, 500)

    // Camera starting position — pull back more on mobile (figure is smaller)
    const initZ = isMobile ? 22 : isTablet ? 28 : 35
    const initY = isMobile ? 3  : isTablet ? 4  : 5
    camera.position.set(0, initY, initZ)
    camera.lookAt(0, isMobile ? 3 : 5, 0)

    // ── LIGHTS ──
    scene.add(new THREE.AmbientLight(0x110022, 1))
    const ptGold = new THREE.PointLight(0xf5c842, 6, 30 * SCALE)
    const ptBlue = new THREE.PointLight(0x0088ff, 4, 40 * SCALE)
    const ptPurp = new THREE.PointLight(0x7b2dff, 3, 50 * SCALE)
    ptGold.position.set(0, 8 * SCALE, 5)
    ptBlue.position.set(-10 * SCALE, 5 * SCALE, 5)
    ptPurp.position.set(10 * SCALE, 0, 5)
    scene.add(ptGold, ptBlue, ptPurp)

    // ── STAR FIELD ──
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(STARS * 3)
    for (let i = 0; i < STARS; i++) {
      const r = 60 + Math.random() * 140, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1)
      starPos[i*3] = r * Math.sin(ph) * Math.cos(th); starPos[i*3+1] = r * Math.sin(ph) * Math.sin(th); starPos[i*3+2] = r * Math.cos(ph)
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      size: isMobile ? 0.18 : 0.12, color: 0xaaccff, transparent: true,
      opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false
    })))

    // ── BUILD SHIVA ──
    const { positions: tgtRaw, colors: colRaw } = buildShivaTargets(SCALE, Q)
    const N          = tgtRaw.length / 3
    const targetPos  = new Float32Array(tgtRaw)
    const scatterPos = new Float32Array(buildScatteredPositions(N, SCALE))
    const currentPos = new Float32Array(scatterPos)
    const colorsArr  = new Float32Array(colRaw)

    const shivaGeo = new THREE.BufferGeometry()
    shivaGeo.setAttribute('position', new THREE.BufferAttribute(currentPos, 3))
    shivaGeo.setAttribute('color',    new THREE.BufferAttribute(colorsArr, 3))

    const shivaMat = new THREE.PointsMaterial({
      size: PSIZE, vertexColors: true, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false
    })
    const shivaPoints = new THREE.Points(shivaGeo, shivaMat)
    // Center Shiva vertically — shift up less on mobile
    shivaPoints.position.set(0, isMobile ? -1.5 : -2, 0)
    scene.add(shivaPoints)

    // ── THIRD EYE ──
    const thirdEye = new THREE.Mesh(
      new THREE.SphereGeometry(0.12 * SCALE, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff9900, emissiveIntensity: 8 })
    )
    thirdEye.position.set(0, 6.4 * SCALE, 1.45 * SCALE)
    thirdEye.visible = false
    scene.add(thirdEye)
    for (const s of [0.25, 0.45, 0.8]) {
      const h = new THREE.Mesh(new THREE.SphereGeometry(s * SCALE, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0xff6600, transparent: true, opacity: 0.06, blending: THREE.AdditiveBlending, depthWrite: false }))
      h.position.copy(thirdEye.position)
      scene.add(h)
    }

    // ── MANDALA RINGS ──
    const mandalaGroup = new THREE.Group()
    mandalaGroup.position.set(0, 5 * SCALE, -3)
    const ringData = isMobile
      ? [[6 * SCALE, 0.2, 0.004], [9 * SCALE, 0.12, -0.003]]     // 2 rings on mobile
      : [[8 * SCALE, 0.2, 0.003], [10 * SCALE, 0.15, -0.002], [13 * SCALE, 0.08, 0.0015]]
    for (const [r, col, spd] of ringData) {
      const geo  = new THREE.TorusGeometry(r, 0.025, 6, isMobile ? 60 : 90)
      const mat  = new THREE.MeshStandardMaterial({ color: col < 0.15 ? 0x7b2dff : 0x00aaff, transparent: true, opacity: col, emissive: 0x4466ff, emissiveIntensity: 0.5 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x  = Math.PI / 2
      mesh.userData.spd = spd
      mandalaGroup.add(mesh)
    }
    mandalaGroup.visible = false
    scene.add(mandalaGroup)

    // ── BLACK HOLE ──
    const bhGroup = new THREE.Group()
    // On mobile, position BH centered; on desktop, slightly offset
    bhGroup.position.set(0, isMobile ? 1 : 2, -5)
    bhGroup.visible = false
    scene.add(bhGroup)

    const bhRadius = isMobile ? 2.2 : isTablet ? 2.8 : 3.5
    bhGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(bhRadius, isMobile ? 20 : 32, isMobile ? 20 : 32),
      new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 1 })
    ))

    // Accretion disk
    const adCount  = isMobile ? 1000 : isTablet ? 1800 : 2500
    const adGeo    = new THREE.BufferGeometry()
    const adPos    = new Float32Array(adCount * 3)
    const adCol    = new Float32Array(adCount * 3)
    const adInner  = bhRadius + 0.5
    const adOuter  = isMobile ? adInner + 5 : adInner + 7
    for (let i = 0; i < adCount; i++) {
      const angle = Math.random() * Math.PI * 2, r = adInner + Math.random() * (adOuter - adInner)
      const yOff  = (Math.random() - 0.5) * 0.4 * (1 - (r - adInner) / (adOuter - adInner))
      adPos[i*3] = Math.cos(angle) * r; adPos[i*3+1] = yOff; adPos[i*3+2] = Math.sin(angle) * r
      const t = (r - adInner) / (adOuter - adInner)
      adCol[i*3] = 1; adCol[i*3+1] = 0.3 + t * 0.5; adCol[i*3+2] = t * 0.3
    }
    adGeo.setAttribute('position', new THREE.BufferAttribute(adPos, 3))
    adGeo.setAttribute('color',    new THREE.BufferAttribute(adCol, 3))
    const accretionDisk = new THREE.Points(adGeo, new THREE.PointsMaterial({
      size: isMobile ? 0.14 : 0.1, vertexColors: true, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false
    }))
    accretionDisk.rotation.x = Math.PI / 9
    bhGroup.add(accretionDisk)

    // Lens ring
    const lensGeo  = new THREE.TorusGeometry(bhRadius + 0.2, 0.18, 8, isMobile ? 50 : 80)
    const lensMat  = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0, emissive: 0xffa500, emissiveIntensity: 3 })
    const lensRing = new THREE.Mesh(lensGeo, lensMat)
    lensRing.rotation.x = Math.PI / 2
    bhGroup.add(lensRing)

    // Orbit cards
    const orbitR     = isMobile ? 7 : isTablet ? 9 : 12
    const cardW      = isMobile ? 2.5 : isTablet ? 3 : 4
    const cardH      = isMobile ? 1.6 : isTablet ? 2 : 2.5
    const orbitCards = BH_PROJECTS.map((proj, i) => {
      const angle   = (i / BH_PROJECTS.length) * Math.PI * 2
      const card    = new THREE.Group()
      const planeMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(proj.color), transparent: true, opacity: 0, emissive: new THREE.Color(proj.color), emissiveIntensity: 0.4 })
      const edgeMat  = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0, emissive: 0xffffff, emissiveIntensity: 1 })
      card.add(new THREE.Mesh(new THREE.PlaneGeometry(cardW, cardH), planeMat))
      card.add(new THREE.Mesh(new THREE.EdgesGeometry(new THREE.PlaneGeometry(cardW, cardH)), edgeMat))
      card.userData = { angle, orbitR, speed: 0.002 + i * 0.0003, planeMat, edgeMat }
      card.position.set(Math.cos(angle) * orbitR, Math.sin(angle * 0.3) * 2, Math.sin(angle) * orbitR)
      bhGroup.add(card)
      return card
    })

    // ── SCROLL STATE ──
    const state = {
      particleProgress: 0, shivaOpacity: 0,
      bodyProg: 0, fullProg: 0, bhProg: 0,
      camZ: initZ, camY: initY,
    }

    // Camera path — tighter on mobile
    const camPath = isMobile
      ? [
          { z: initZ,      y: initY      },  // hero
          { z: initZ - 4,  y: initY - 1  },  // services
          { z: initZ - 7,  y: initY - 2  },  // work
          { z: initZ - 8,  y: initY + 2  },  // stats
          { z: initZ - 9,  y: initY - 1  },  // process
          { z: initZ - 10, y: initY      },  // team
          { z: 10,         y: 1          },  // cta — zoom in
        ]
      : [
          { z: 35, y: 5 }, { z: 30, y: 4 }, { z: 26, y: 2 },
          { z: 28, y: 5 }, { z: 24, y: 1 }, { z: 22, y: 3 }, { z: 14, y: 1 },
        ]

    // ── SCROLL TIMELINE ──
    const masterTl = gsap.timeline({
      scrollTrigger: { trigger: '.site-content', start: 'top top', end: 'bottom bottom', scrub: isMobile ? 2 : 1.5 }
    })
    masterTl.to(state, { particleProgress: 0.3, shivaOpacity: 0.6, duration: 2 }, 0)
    masterTl.to(state, { bodyProg: 1, particleProgress: 0.7, shivaOpacity: 0.85, duration: 2.5 }, 2)
    masterTl.to(state, { fullProg: 1, particleProgress: 1, shivaOpacity: 0.95, duration: 1.5 }, 4.5)
    masterTl.to(state, { camZ: camPath[3].z, camY: camPath[3].y, duration: 2 }, 4.5)
    masterTl.to(state, { bhProg: 1, camZ: camPath[camPath.length - 1].z, camY: camPath[camPath.length - 1].y, duration: 3 }, 6)

    // ── MOUSE + TOUCH PARALLAX ──
    let mx = 0, my = 0
    const onMouseMove = e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onTouchMove = e => {
      if (!e.touches.length) return
      mx = (e.touches[0].clientX / window.innerWidth  - 0.5) * 2
      my = (e.touches[0].clientY / window.innerHeight - 0.5) * 2
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onTouchMove, { passive: true })

    // Parallax strength — gentler on mobile (touch is coarser)
    const mxStr = isMobile ? 1.0 : 2.5
    const myStr = isMobile ? 0.6 : 1.5

    // ── RENDER LOOP ──
    let time = 0, animId
    function animate() {
      animId = requestAnimationFrame(animate)
      time  += 0.012

      // Camera smooth follow
      camera.position.x += (mx * mxStr - camera.position.x) * 0.03
      camera.position.y += (state.camY + my * -myStr - camera.position.y) * 0.03
      camera.position.z += (state.camZ - camera.position.z) * 0.025
      camera.lookAt(0, isMobile ? 3 * SCALE : 5 * SCALE, 0)

      // Update Shiva particles
      const pp  = state.particleProgress
      const pos = shivaGeo.attributes.position.array
      for (let i = 0; i < N; i++) {
        const idx   = i * 3
        const delay = (i / N) * 0.4
        const lp    = Math.max(0, Math.min(1, (pp - delay) / (1 - delay)))
        pos[idx]   = scatterPos[idx]   + (targetPos[idx]   - scatterPos[idx])   * lp
        pos[idx+1] = scatterPos[idx+1] + (targetPos[idx+1] - scatterPos[idx+1]) * lp
        pos[idx+2] = scatterPos[idx+2] + (targetPos[idx+2] - scatterPos[idx+2]) * lp
        if (lp > 0.9) {
          pos[idx]   += Math.sin(time + i * 0.08) * 0.012 * SCALE
          pos[idx+1] += Math.cos(time * 0.7 + i * 0.05) * 0.015 * SCALE
        }
      }
      shivaGeo.attributes.position.needsUpdate = true
      shivaMat.opacity = state.shivaOpacity

      // Third eye
      thirdEye.visible = state.fullProg > 0.3
      thirdEye.material.emissiveIntensity = 6 + Math.sin(time * 3) * 2
      thirdEye.scale.setScalar(1 + Math.sin(time * 4) * 0.15)

      // Mandala
      mandalaGroup.visible = state.bodyProg > 0.3
      mandalaGroup.children.forEach(r => { r.rotation.z += r.userData.spd })
      mandalaGroup.rotation.y = mx * 0.08

      // Shiva sway
      shivaPoints.rotation.y = mx * 0.04 + Math.sin(time * 0.3) * 0.02

      // Lights orbit
      ptGold.position.x = Math.sin(time * 0.4) * 8 * SCALE
      ptBlue.position.y = 5 * SCALE + Math.sin(time * 0.3) * 3
      ptPurp.position.x = Math.cos(time * 0.5) * 10 * SCALE

      // Black hole
      const bhP = state.bhProg
      bhGroup.visible = bhP > 0.05
      if (bhP > 0.05) {
        bhGroup.scale.setScalar(0.1 + bhP * 0.9)
        accretionDisk.material.opacity = bhP * 0.9
        lensMat.opacity = bhP * 0.7
        accretionDisk.rotation.y += 0.008
        lensRing.rotation.z      += 0.005

        orbitCards.forEach((card, i) => {
          const reveal = Math.max(0, bhP - 0.3 - i * 0.08)
          card.userData.angle += card.userData.speed
          const r = card.userData.orbitR
          card.position.x = Math.cos(card.userData.angle) * r
          card.position.z = Math.sin(card.userData.angle) * r
          card.position.y = Math.sin(card.userData.angle * 0.5) * (isMobile ? 1.5 : 2.5)
          card.lookAt(bhGroup.position.x, bhGroup.position.y, bhGroup.position.z)
          card.userData.planeMat.opacity = Math.min(1, reveal * 2.5) * 0.7
          card.userData.edgeMat.opacity  = Math.min(1, reveal * 3)
        })

        // Gravitational pull — skip on mobile (perf)
        if (!isMobile && bhP > 0.7) {
          const pullFactor = (bhP - 0.7) * 0.3
          for (let i = 0; i < N; i++) {
            const idx = i * 3
            const dx  = bhGroup.position.x - (pos[idx]   + shivaPoints.position.x)
            const dy  = bhGroup.position.y - (pos[idx+1] + shivaPoints.position.y)
            const dz  = bhGroup.position.z - (pos[idx+2] + shivaPoints.position.z)
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz)
            if (dist < 15) {
              pos[idx]   += (dx / dist) * pullFactor * 0.04
              pos[idx+1] += (dy / dist) * pullFactor * 0.02
              pos[idx+2] += (dz / dist) * pullFactor * 0.04
            }
          }
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    // ── RESIZE ──
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('touchmove', onTouchMove)
      ScrollTrigger.getAll().forEach(t => t.kill())
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}