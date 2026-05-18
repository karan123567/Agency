'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Helper: random in Gaussian neighbourhood ───
const gauss = (center, sigma) => center + (Math.random() - 0.5) * sigma * 2

// ─── Generate Shiva particle target positions ───
function buildShivaTargets() {
  const positions = []
  const colors = []

  const push = (x, y, z, r, g, b) => {
    positions.push(x, y, z)
    colors.push(r, g, b)
  }

  // ── JATA (matted hair flowing upward) ──
  for (let s = 0; s < 28; s++) {
    const angle = (s / 28) * Math.PI * 2
    const spread = 0.8 + Math.random() * 2.5
    const height = 6 + Math.random() * 9
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 9.5, 0),
      new THREE.Vector3(Math.cos(angle) * 0.6, 12, Math.sin(angle) * 0.25),
      new THREE.Vector3(Math.cos(angle) * spread * 1.1, 13.5, Math.sin(angle) * spread * 0.22),
      new THREE.Vector3(Math.cos(angle) * spread * 1.6, 9.5 + height, Math.sin(angle) * spread * 0.12),
    ])
    const pts = curve.getPoints(55)
    pts.forEach((p, i) => {
      const t = i / pts.length
      const jitter = 0.08
      push(
        p.x + gauss(0, jitter), p.y + gauss(0, jitter * 0.5), p.z + gauss(0, jitter),
        0.1 + t * 0.2, 0.35 + t * 0.2, 1
      )
    })
  }

  // ── HEAD (sphere at y=8) ──
  for (let i = 0; i < 900; i++) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    const r = 1.55 * (0.88 + Math.random() * 0.12)
    push(
      r * Math.sin(phi) * Math.cos(theta),
      8 + r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta) * 0.75,
      0, 0.75 + Math.random() * 0.25, 0.9 + Math.random() * 0.1
    )
  }

  // ── FACE CONTOUR (front ring) ──
  for (let i = 0; i < 200; i++) {
    const a = (i / 200) * Math.PI * 2
    const r = 1.3 + Math.random() * 0.15
    push(
      Math.cos(a) * r, 8 + Math.sin(a) * 1.2, 1.1 + Math.random() * 0.15,
      0.1, 0.85, 1
    )
  }

  // ── THIRD EYE glow (very dense small cluster) ──
  for (let i = 0; i < 60; i++) {
    push(
      gauss(0, 0.06), gauss(8.35, 0.05), gauss(1.42, 0.04),
      1, 0.55 + Math.random() * 0.2, 0
    )
  }

  // ── NECK ──
  for (let i = 0; i < 200; i++) {
    const a = Math.random() * Math.PI * 2
    const r = 0.6 + Math.random() * 0.1
    push(
      Math.cos(a) * r, 6.3 + Math.random() * 1.2, Math.sin(a) * r * 0.6,
      0, 0.8, 1
    )
  }

  // ── SERPENT coil around neck ──
  for (let i = 0; i < 500; i++) {
    const t = i / 500
    const coilAngle = t * Math.PI * 5
    const coilR = 2.2 - t * 0.5
    const coilY = 3 + t * 5
    push(
      Math.cos(coilAngle) * coilR,
      coilY,
      Math.sin(coilAngle) * coilR * 0.5 - 0.5,
      0, 1, 0.6 + Math.random() * 0.3
    )
  }

  // ── SHOULDERS (horizontal spread y=6) ──
  for (let i = 0; i < 400; i++) {
    const side = i < 200 ? -1 : 1
    const x = side * (1.5 + Math.random() * 2.5)
    push(
      x + gauss(0, 0.3), 5.8 + gauss(0, 0.3), gauss(0, 0.4),
      0, 0.7, 0.9
    )
  }

  // ── TORSO (tapered ellipsoid) ──
  for (let i = 0; i < 1400; i++) {
    const y = 1.2 + Math.random() * 4.8
    const t = (y - 1.2) / 4.8
    const maxR = 0.8 + t * 2.2
    const r = Math.random() * maxR
    const angle = Math.random() * Math.PI * 2
    push(
      Math.cos(angle) * r + gauss(0, 0.1),
      y, Math.sin(angle) * r * 0.55,
      0.05, 0.65 + t * 0.2, 0.9
    )
  }

  // ── LEFT ARM (shoulder → elbow → hand in lap) ──
  const leftArm = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3.2, 6, 0),
    new THREE.Vector3(-4, 4.5, 0.3),
    new THREE.Vector3(-3.8, 2.5, 0.5),
    new THREE.Vector3(-2.2, 1.2, 0.8),
  ])
  leftArm.getPoints(80).forEach((p, i) => {
    const t = i / 80
    push(p.x + gauss(0, 0.18), p.y + gauss(0, 0.1), p.z + gauss(0, 0.12),
      0.1 + t * 0.1, 0.6, 0.95)
  })

  // ── RIGHT ARM ──
  const rightArm = new THREE.CatmullRomCurve3([
    new THREE.Vector3(3.2, 6, 0),
    new THREE.Vector3(4, 4.5, 0.3),
    new THREE.Vector3(3.8, 2.5, 0.5),
    new THREE.Vector3(2.2, 1.2, 0.8),
  ])
  rightArm.getPoints(80).forEach((p, i) => {
    const t = i / 80
    push(p.x + gauss(0, 0.18), p.y + gauss(0, 0.1), p.z + gauss(0, 0.12),
      0.1 + t * 0.1, 0.6, 0.95)
  })

  // ── HANDS (dhyana mudra) ──
  for (let i = 0; i < 200; i++) {
    const side = i < 100 ? -1 : 1
    push(
      side * 1.8 + gauss(0, 0.25), 1.0 + gauss(0, 0.15), 0.9 + gauss(0, 0.12),
      0.2, 0.8, 1
    )
  }

  // ── LEFT LEG (lotus outer arc) ──
  const leftLeg = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.5, 1.2, 0.5),
    new THREE.Vector3(-3.5, 0.2, 0.6),
    new THREE.Vector3(-4.5, -1.0, 0.5),
    new THREE.Vector3(-3, -2, 0.4),
    new THREE.Vector3(0, -2.2, 0.5),
  ])
  leftLeg.getPoints(90).forEach((p, i) => {
    push(p.x + gauss(0, 0.2), p.y + gauss(0, 0.15), p.z + gauss(0, 0.12),
      0, 0.65, 0.9)
  })

  // ── RIGHT LEG ──
  const rightLeg = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.5, 1.2, 0.5),
    new THREE.Vector3(3.5, 0.2, 0.6),
    new THREE.Vector3(4.5, -1.0, 0.5),
    new THREE.Vector3(3, -2, 0.4),
    new THREE.Vector3(0, -2.2, 0.5),
  ])
  rightLeg.getPoints(90).forEach((p, i) => {
    push(p.x + gauss(0, 0.2), p.y + gauss(0, 0.15), p.z + gauss(0, 0.12),
      0, 0.65, 0.9)
  })

  // ── BASE / GROUND (lotus seat) ──
  for (let i = 0; i < 300; i++) {
    const a = Math.random() * Math.PI * 2
    const r = Math.random() * 5
    push(Math.cos(a) * r, -2.2 + Math.random() * 0.3, Math.sin(a) * r * 0.3,
      0.05, 0.35, 0.7)
  }

  // ── CRESCENT MOON (top right of jata) ──
  for (let i = 0; i < 180; i++) {
    const a = (i / 180) * Math.PI // half circle
    const r = 0.9
    push(
      1.8 + Math.cos(a) * r + gauss(0, 0.06),
      11.5 + Math.sin(a) * r + gauss(0, 0.06),
      0.3 + gauss(0, 0.05),
      0.85, 0.9, 1
    )
  }
  // Inner crescent negative (dark area)
  for (let i = 0; i < 100; i++) {
    const a = (i / 100) * Math.PI
    push(
      2.1 + Math.cos(a) * 0.75, 11.5 + Math.sin(a) * 0.75, 0.35,
      0.5, 0.6, 0.9
    )
  }

  // ── AURA (outer glow cloud) ──
  for (let i = 0; i < 1200; i++) {
    const angle = Math.random() * Math.PI * 2
    const r = 5 + Math.random() * 4
    const y = -3 + Math.random() * 20
    push(
      Math.cos(angle) * r, y, Math.sin(angle) * r * 0.4,
      0.1 + Math.random() * 0.2,
      0.3 + Math.random() * 0.3,
      0.8 + Math.random() * 0.2
    )
  }

  return { positions, colors }
}

// ─── Generate scattered positions (start state) ───
function buildScatteredPositions(count) {
  const out = []
  for (let i = 0; i < count; i++) {
    const r = 15 + Math.random() * 30
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    out.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta) * 0.5,
      r * Math.cos(phi)
    )
  }
  return out
}

// ─── Black Hole + project orbit data ───
const PROJECTS = [
  { name: 'NEXUS\nPLATFORM', tag: 'Brand / Web', color: '#7b2dff' },
  { name: 'ORBIT\nFINANCE',  tag: 'App / UI',    color: '#ff7b2e' },
  { name: 'EMBER\nSTUDIOS',  tag: 'Identity',    color: '#f5c842' },
  { name: 'LUMEN\nCREATIVE', tag: '3D Motion',   color: '#00ffee' },
  { name: 'NOVA\nHEALTH',    tag: 'SaaS',        color: '#ff44cc' },
  { name: 'AXIOM\nSPACE',    tag: 'WebGL',       color: '#4488ff' },
]

export default function CosmicCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── RENDERER ──
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    // ── SCENE + CAMERA ──
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x04010e, 0.008)
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 500)
    camera.position.set(0, 5, 35)
    camera.lookAt(0, 5, 0)

    // ── LIGHTS ──
    scene.add(new THREE.AmbientLight(0x110022, 1))
    const ptGold  = new THREE.PointLight(0xf5c842, 6, 30)
    const ptBlue  = new THREE.PointLight(0x0088ff, 4, 40)
    const ptPurp  = new THREE.PointLight(0x7b2dff, 3, 50)
    ptGold.position.set(0, 8, 5)
    ptBlue.position.set(-10, 5, 5)
    ptPurp.position.set(10, 0, 5)
    scene.add(ptGold, ptBlue, ptPurp)

    // ── STAR FIELD ──
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(6000 * 3)
    for (let i = 0; i < 6000; i++) {
      const r = 60 + Math.random() * 140
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      starPos[i*3]   = r * Math.sin(ph) * Math.cos(th)
      starPos[i*3+1] = r * Math.sin(ph) * Math.sin(th)
      starPos[i*3+2] = r * Math.cos(ph)
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      size: 0.12, color: 0xaaccff, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, depthWrite: false
    })))

    // ── BUILD SHIVA ──
    const { positions: tgtRaw, colors: colRaw } = buildShivaTargets()
    const N = tgtRaw.length / 3
    const targetPos   = new Float32Array(tgtRaw)
    const scatterPos  = new Float32Array(buildScatteredPositions(N))
    const currentPos  = new Float32Array(scatterPos)
    const colorsArr   = new Float32Array(colRaw)

    const shivaGeo = new THREE.BufferGeometry()
    shivaGeo.setAttribute('position', new THREE.BufferAttribute(currentPos, 3))
    shivaGeo.setAttribute('color',    new THREE.BufferAttribute(colorsArr, 3))

    const shivaMat = new THREE.PointsMaterial({
      size: 0.1, vertexColors: true,
      transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false
    })
    const shivaPoints = new THREE.Points(shivaGeo, shivaMat)
    shivaPoints.position.set(0, -2, 0)
    scene.add(shivaPoints)

    // ── THIRD EYE GLOW OBJECT ──
    const eyeGeo   = new THREE.SphereGeometry(0.12, 8, 8)
    const eyeMat   = new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff9900, emissiveIntensity: 8 })
    const thirdEye = new THREE.Mesh(eyeGeo, eyeMat)
    thirdEye.position.set(0, 6.4, 1.45)
    thirdEye.visible = false
    scene.add(thirdEye)
    // Glow halos
    for (const s of [0.25, 0.45, 0.8]) {
      const h = new THREE.Mesh(
        new THREE.SphereGeometry(s, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0xff6600, transparent: true, opacity: 0.06, blending: THREE.AdditiveBlending, depthWrite: false })
      )
      h.position.copy(thirdEye.position)
      scene.add(h)
    }

    // ── MANDALA RING ──
    const mandalaGroup = new THREE.Group()
    mandalaGroup.position.set(0, 5, -3)
    for (const [r, col, spd] of [[8,.2,0.003],[10,.15,-0.002],[13,.08,0.0015]]) {
      const geo = new THREE.TorusGeometry(r, 0.025, 6, 90)
      const mat = new THREE.MeshStandardMaterial({ color: col < 0.15 ? 0x7b2dff : 0x00aaff, transparent: true, opacity: col, emissive: 0x4466ff, emissiveIntensity: 0.5 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = Math.PI / 2
      mesh.userData.spd = spd
      mandalaGroup.add(mesh)
    }
    mandalaGroup.visible = false
    scene.add(mandalaGroup)

    // ── BLACK HOLE ──
    const bhGroup = new THREE.Group()
    bhGroup.position.set(0, 2, -5)
    bhGroup.visible = false
    scene.add(bhGroup)

    // Event horizon (dark sphere)
    const bhCore = new THREE.Mesh(
      new THREE.SphereGeometry(3.5, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 1 })
    )
    bhGroup.add(bhCore)

    // Accretion disk — particles
    const adCount = 2500
    const adGeo = new THREE.BufferGeometry()
    const adPos = new Float32Array(adCount * 3)
    const adCol = new Float32Array(adCount * 3)
    for (let i = 0; i < adCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 4 + Math.random() * 7
      const yOff = (Math.random() - 0.5) * 0.4 * (1 - (r - 4) / 7)
      adPos[i*3]   = Math.cos(angle) * r
      adPos[i*3+1] = yOff
      adPos[i*3+2] = Math.sin(angle) * r
      const t = (r - 4) / 7
      adCol[i*3]   = 1
      adCol[i*3+1] = 0.3 + t * 0.5
      adCol[i*3+2] = t * 0.3
    }
    adGeo.setAttribute('position', new THREE.BufferAttribute(adPos, 3))
    adGeo.setAttribute('color', new THREE.BufferAttribute(adCol, 3))
    const accretionDisk = new THREE.Points(adGeo, new THREE.PointsMaterial({
      size: 0.1, vertexColors: true, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false
    }))
    accretionDisk.rotation.x = Math.PI / 9
    bhGroup.add(accretionDisk)

    // Gravitational lensing ring
    const lensGeo = new THREE.TorusGeometry(3.7, 0.18, 8, 80)
    const lensMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0, emissive: 0xffa500, emissiveIntensity: 3 })
    const lensRing = new THREE.Mesh(lensGeo, lensMat)
    lensRing.rotation.x = Math.PI / 2
    bhGroup.add(lensRing)

    // ── PROJECT ORBIT CARDS (3D planes orbiting the black hole) ──
    const orbitCards = []
    PROJECTS.forEach((proj, i) => {
      const angle = (i / PROJECTS.length) * Math.PI * 2
      const orbitR = 12
      const card = new THREE.Group()
      // card plane
      const planeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(proj.color),
        transparent: true, opacity: 0,
        emissive: new THREE.Color(proj.color),
        emissiveIntensity: 0.4
      })
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(4, 2.5), planeMat)
      card.add(plane)
      // card border glow
      const edgeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0, emissive: 0xffffff, emissiveIntensity: 1 })
      const edge = new THREE.Mesh(new THREE.EdgesGeometry(new THREE.PlaneGeometry(4, 2.5)), edgeMat)
      card.add(edge)
      card.userData = { angle, orbitR, speed: 0.002 + i * 0.0003, planeMat, edgeMat }
      card.position.set(Math.cos(angle) * orbitR, Math.sin(angle * 0.3) * 2, Math.sin(angle) * orbitR)
      orbitCards.push(card)
      bhGroup.add(card)
    })

    // ── SCROLL PROGRESS STATE ──
    const state = {
      moonProg: 0,
      headProg: 0,
      bodyProg: 0,
      fullProg: 0,
      bhProg: 0,
      camZ: 35,
      camY: 5,
      shivaOpacity: 0,
      particleProgress: 0,
    }

    // ── GSAP SCROLL TIMELINE ──
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.site-content',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    })

    // Phase 1: Moon & stars (0% – 10%)
    masterTl.to(state, { moonProg: 1, duration: 1 }, 0)
    // Phase 2: Head materializes (10% – 30%)
    masterTl.to(state, { headProg: 1, duration: 2 }, 1)
    masterTl.to(state, { shivaOpacity: 0.7, duration: 1 }, 1)
    // Phase 3: Body + arms (30% – 55%)
    masterTl.to(state, { bodyProg: 1, particleProgress: 0.6, duration: 2.5 }, 3)
    masterTl.to(state, { shivaOpacity: 0.95, duration: 1 }, 3)
    // Phase 4: Full Shiva revealed (55% – 70%)
    masterTl.to(state, { fullProg: 1, particleProgress: 1, duration: 1.5 }, 5.5)
    masterTl.to(state, { camZ: 28, camY: 3, duration: 2 }, 5.5)
    // Phase 5: Black hole appears (70% – 100%)
    masterTl.to(state, { bhProg: 1, camZ: 22, camY: 2, duration: 3 }, 7)

    // Mouse parallax
    let mx = 0, my = 0
    document.addEventListener('mousemove', e => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    })

    // ── ANIMATE LOOP ──
    let time = 0
    let animId
    function animate() {
      animId = requestAnimationFrame(animate)
      time += 0.012

      // Smooth camera
      camera.position.x += (mx * 2.5 - camera.position.x) * 0.03
      camera.position.y += (state.camY + my * -1.5 - camera.position.y) * 0.03
      camera.position.z += (state.camZ - camera.position.z) * 0.03
      camera.lookAt(0, 5, 0)

      // ── UPDATE SHIVA PARTICLES ──
      const pp = state.particleProgress
      const pos = shivaGeo.attributes.position.array
      for (let i = 0; i < N; i++) {
        const idx = i * 3
        // Each particle reveals in staggered order
        const delay = (i / N) * 0.4
        const localProg = Math.max(0, Math.min(1, (pp - delay) / (1 - delay)))
        pos[idx]   = scatterPos[idx]   + (targetPos[idx]   - scatterPos[idx])   * localProg
        pos[idx+1] = scatterPos[idx+1] + (targetPos[idx+1] - scatterPos[idx+1]) * localProg
        pos[idx+2] = scatterPos[idx+2] + (targetPos[idx+2] - scatterPos[idx+2]) * localProg

        // Subtle breathing animation on revealed particles
        if (localProg > 0.9) {
          pos[idx]   += Math.sin(time + i * 0.08) * 0.012
          pos[idx+1] += Math.cos(time * 0.7 + i * 0.05) * 0.015
        }
      }
      shivaGeo.attributes.position.needsUpdate = true
      shivaMat.opacity = state.shivaOpacity

      // Third eye
      thirdEye.visible = state.fullProg > 0.3
      thirdEye.material.emissiveIntensity = 6 + Math.sin(time * 3) * 2
      const eyeScale = 1 + Math.sin(time * 4) * 0.15
      thirdEye.scale.setScalar(eyeScale)

      // Mandala
      mandalaGroup.visible = state.bodyProg > 0.3
      mandalaGroup.children.forEach(r => { r.rotation.z += r.userData.spd })
      mandalaGroup.rotation.y = mx * 0.1

      // Shiva gentle sway
      shivaPoints.rotation.y = mx * 0.05 + Math.sin(time * 0.3) * 0.02

      // Lights animate
      ptGold.position.x = Math.sin(time * 0.4) * 8
      ptBlue.position.y = 5 + Math.sin(time * 0.3) * 3
      ptPurp.position.x = Math.cos(time * 0.5) * 10

      // ── BLACK HOLE ──
      const bhP = state.bhProg
      bhGroup.visible = bhP > 0.05
      if (bhP > 0.05) {
        // Scale up black hole
        const bhScale = 0.1 + bhP * 0.9
        bhGroup.scale.setScalar(bhScale)
        accretionDisk.material.opacity = bhP * 0.9
        lensRing.material.opacity = bhP * 0.7

        // Spin accretion disk
        accretionDisk.rotation.y += 0.008
        lensRing.rotation.z += 0.005

        // Orbit cards
        orbitCards.forEach((card, i) => {
          const orbitReveal = Math.max(0, (bhP - 0.3 - i * 0.08))
          card.userData.angle += card.userData.speed
          const r = card.userData.orbitR
          card.position.x = Math.cos(card.userData.angle) * r
          card.position.z = Math.sin(card.userData.angle) * r
          card.position.y = Math.sin(card.userData.angle * 0.5) * 2.5
          card.lookAt(bhGroup.position.x, bhGroup.position.y, bhGroup.position.z)
          card.userData.planeMat.opacity = Math.min(1, orbitReveal * 2.5) * 0.7
          card.userData.edgeMat.opacity  = Math.min(1, orbitReveal * 3)
        })

        // Gravitational pull on nearby shiva particles (dramatic effect)
        if (bhP > 0.7) {
          const pullFactor = (bhP - 0.7) * 0.3
          for (let i = 0; i < N; i++) {
            const idx = i * 3
            const dx = bhGroup.position.x - (pos[idx] + shivaPoints.position.x)
            const dy = bhGroup.position.y - (pos[idx+1] + shivaPoints.position.y)
            const dz = bhGroup.position.z - (pos[idx+2] + shivaPoints.position.z)
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

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
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
