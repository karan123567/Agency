'use client'
import dynamic from 'next/dynamic'
import Loader from '@/components/Loader'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import WorkSection from '@/components/WorkSection'
import Stats from '@/components/Stats'
import Process from '@/components/Process'
// import Team from '@/components/Team'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import ContactModal from '@/components/ContactModel'

// Dynamically import Three.js canvas (no SSR)
const CosmicCanvas = dynamic(() => import('@/components/CosmicCanvas'), { ssr: false })

export default function Home() {
  return (
    <>
      <Cursor />
      <Loader />
      <CosmicCanvas />
      <ContactModal />
      <div className="site-content" style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <Hero />
        {/* Black hole + Services merged section */}
        <Services />
        <WorkSection />
        <Stats />
        <Process />
        {/* <Team /> */}
        <CTA />
        <Footer />
      </div>
    </>
  )
}
