'use client'

import { useEffect, useRef, useState } from 'react'
import BatchCard from './reusable/BatchCard'

interface Testimonial {
  name: string
  feedback: string
  img: string
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    { name: 'Ravi', feedback: 'BootcampIndia helped me land my first tech job!', img: '/students/ravi.jpg' },
    { name: 'Anita', feedback: 'The mentors are amazing and the projects are hands-on.', img: '/students/anita.jpg' },
    { name: 'Karthik', feedback: 'Loved the multi-language support and community.', img: '/students/karthik.jpg' },
    { name: 'Shankar', feedback: 'Excellent guidance and support throughout.', img: '/students/shankar.jpg' },
    { name: 'Krishna', feedback: 'The projects helped me build my portfolio.', img: '/students/krishna.jpg' },
  ]

  const desktopRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number>(0)
  const isMounted = useRef(false)

  const handleCardClick = () => {
    setIsPaused(true)
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    resumeTimeout.current = setTimeout(() => setIsPaused(false), 5000)
  }

  useEffect(() => {
    const desktop = desktopRef.current
    const mobile = mobileRef.current
    if (!desktop || !mobile) return

    if (!isMounted.current) {
      desktop.scrollLeft = desktop.scrollWidth / 2
      mobile.scrollLeft = mobile.scrollWidth / 2
      isMounted.current = true
    }

    const step = () => {
      if (!isPaused) {
        // Right-to-left scroll
        desktop.scrollLeft -= 0.5
        if (desktop.scrollLeft <= 0) desktop.scrollLeft += desktop.scrollWidth / 2

        mobile.scrollLeft -= 0.5
        if (mobile.scrollLeft <= 0) mobile.scrollLeft += mobile.scrollWidth / 2
      }

      animationRef.current = requestAnimationFrame(step)
    }

    animationRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationRef.current)
  }, [isPaused])

  const repeatedDesktop = [...testimonials, ...testimonials]
  const repeatedMobile = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="py-16 relative">
      {/* Invisible white lines above and below */}
      <div className="absolute -top-1 left-0 right-0 h-px bg-white/20"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>

      {/* Heading */}
      <div className="text-center mb-8 w-full">
        <h2 className="text-4xl font-bold text-white">
          What Our Students Say
        </h2>
      </div>

      {/* Desktop */}
      <div
        ref={desktopRef}
        className="hidden md:flex gap-6 overflow-x-hidden w-full"
        style={{ scrollBehavior: 'smooth' }}
      >
        {repeatedDesktop.map((t, idx) => (
          <BatchCard
            key={idx}
            title={t.name}
            description={t.feedback}
            icon={<img src={t.img} alt={t.name} className="w-24 h-24 rounded-full object-cover" />}
            onClick={handleCardClick}
            center
            className="min-w-[280px] max-w-[320px] h-52 rounded-3xl flex-shrink-0 p-4 flex flex-col justify-between"
          />
        ))}
      </div>

      {/* Mobile */}
      <div
        ref={mobileRef}
        className="md:hidden flex gap-4 overflow-x-hidden py-2 w-full"
        style={{ scrollBehavior: 'smooth' }}
      >
        {repeatedMobile.map((t, idx) => (
          <BatchCard
            key={idx}
            title={t.name}
            description={t.feedback}
            icon={<img src={t.img} alt={t.name} className="w-20 h-20 rounded-full object-cover" />}
            onClick={handleCardClick}
            center
            className="min-w-[240px] max-w-[280px] h-56 rounded-3xl flex-shrink-0 p-4 flex flex-col justify-between"
          />
        ))}
      </div>
    </section>
  )
}
