'use client'

import { useRef, useState, useEffect } from 'react'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import TracksSection from './components/TracksSection'
import MentorsSection from './components/MentorsSection'
import PricingSection from './components/PricingSection'
import RegistrationForm from './components/RegistrationForm'
import InternRegistrationForm from './components/InternRegistrationForm'
import ScheduleSection from './components/ScheduleSection'
import WhyJoinSection from './components/WhyJoinSection'
import TestimonialsSection from './components/TestimonialsSection'
import FAQSection from './components/FAQSection'
import CoursesSection from './components/CoursesSection'
import GradientButton from './components/reusable/GradientButton';

export default function Page() {
  const [showRegistration, setShowRegistration] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showInternForm, setShowInternForm] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hideHeader, setHideHeader] = useState(false)
  const lastScrollY = useRef(0)
  const isProgrammaticScroll = useRef(false)

  // swipe refs
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const touchEndY = useRef<number | null>(null) 

  // Refs for sections
  const coursesRef = useRef<HTMLDivElement>(null)
  const mentorsRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const scheduleRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const whyJoinRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  // Smooth scroll function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return
    const yOffset = 0
    const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset
    isProgrammaticScroll.current = true
    setHideHeader(true)
    window.scrollTo({ top: y, behavior: 'smooth' })
    setTimeout(() => {
      isProgrammaticScroll.current = false
    }, 500)
    setMobileMenuOpen(false)
  }

  // Hide/show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScroll.current) return
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setHideHeader(true)
      } else {
        setHideHeader(false)
      }
      lastScrollY.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when modal/menu open
  useEffect(() => {
    if (showRegistration || showInternForm || mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showRegistration, showInternForm, mobileMenuOpen])

  // Swipe gesture handlers
useEffect(() => {
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX
    touchStartY.current = e.changedTouches[0].clientY
  }

  const handleTouchEnd = (e: TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    touchEndY.current = e.changedTouches[0].clientY
    if (
      touchStartX.current === null ||
      touchEndX.current === null ||
      touchStartY.current === null ||
      touchEndY.current === null
    ) return

    const diffX = touchStartX.current - touchEndX.current
    const diffY = touchStartY.current - touchEndY.current
    const startX = touchStartX.current
    const screenWidth = window.innerWidth

    const edgeThreshold = 80   // px from right edge to start
    const swipeThreshold = 0  // px movement required

    // ✅ Only count if horizontal movement is stronger than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // swipe left to open (only if starting near right edge)
      if (diffX > swipeThreshold && startX > screenWidth - edgeThreshold) {
        setMobileMenuOpen(true)
      }

      // swipe right to close (allowed anywhere if menu is open)
      if (-diffX > swipeThreshold && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    touchStartX.current = null
    touchEndX.current = null
    touchStartY.current = null
    touchEndY.current = null
  }

  window.addEventListener('touchstart', handleTouchStart)
  window.addEventListener('touchend', handleTouchEnd)

  return () => {
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchend', handleTouchEnd)
  }
}, [mobileMenuOpen])

  return (
    <div className="min-h-screen font-sans relative">
      {/* Full-page gradient background */}
      <div className="full-page-gradient" />

      {/* Navigation */}
      <nav
        ref={navRef}
  className={`fixed top-0 w-full bg-white/30 backdrop-blur-lg border-b border-white/20 z-30 shadow-sm transition-transform duration-300 ${
    hideHeader ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="px-4 sm:px-6 md:px-8 w-full">
          <div className="flex justify-between items-center h-20 md:h-24">
            {/* Brand + Logo */}
            <span className="flex items-center space-x-3 classy-heading font-bold">
              <img
                src="/logomain.png"
                alt="BootcampIndia Logo"
                className="w-20 h-20 md:w-24 md:h-24 object-contain"
              />
              <span className="text-2xl md:text-2xl">BootcampIndia</span>
            </span>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => scrollToSection(coursesRef)}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Courses
              </button>
              <button
                onClick={() => scrollToSection(mentorsRef)}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Mentors
              </button>
              <button
                onClick={() => scrollToSection(pricingRef)}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection(scheduleRef)}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Schedule
              </button>
              <button
                onClick={() => scrollToSection(contactRef)}
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Contact
              </button>
              <GradientButton label="Register" onClick={() => setShowRegistration(true)} />
              <GradientButton label="Intern/Mentor" onClick={() => setShowInternForm(true)} />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
{/* Mobile Side Panel */}
<div
  className={`fixed inset-0 z-50 flex justify-end ${
    mobileMenuOpen ? '' : 'pointer-events-none'
  }`}
>
  {/* Overlay */}
  <div
    className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
      mobileMenuOpen ? 'opacity-100' : 'opacity-0'
    }`}
    onClick={() => setMobileMenuOpen(false)}
  />

  {/* Sliding panel */}
  <div
    className={`relative w-64 h-full bg-white/90 rounded-l-2xl shadow-lg p-6 flex flex-col space-y-4 transform transition-transform duration-300 ${
      mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
    }`}
    onClick={(e) => e.stopPropagation()}
  >

    <button
      onClick={() => {
        scrollToSection(coursesRef)
        setMobileMenuOpen(false)
      }}
      className="text-gray-700 hover:text-purple-600 transition-colors"
    >
      Courses
    </button>
    <button
      onClick={() => {
        scrollToSection(mentorsRef)
        setMobileMenuOpen(false)
      }}
      className="text-gray-700 hover:text-purple-600 transition-colors"
    >
      Mentors
    </button>
    <button
      onClick={() => {
        scrollToSection(pricingRef)
        setMobileMenuOpen(false)
      }}
      className="text-gray-700 hover:text-purple-600 transition-colors"
    >
      Pricing
    </button>
    <button
      onClick={() => {
        scrollToSection(scheduleRef)
        setMobileMenuOpen(false)
      }}
      className="text-gray-700 hover:text-purple-600 transition-colors"
    >
      Schedule
    </button>
    <button
      onClick={() => {
        scrollToSection(contactRef)
        setMobileMenuOpen(false)
      }}
      className="text-gray-700 hover:text-purple-600 transition-colors"
    >
      Contact
    </button>
    {/* Gradient Buttons */}
<GradientButton
  label="Register"
  onClick={() => {
    setShowRegistration(true);
    setMobileMenuOpen(false);
  }}
  className="w-full"
/>

<GradientButton
  label="Intern/Mentor"
  onClick={() => {
    setShowInternForm(true);
    setMobileMenuOpen(false);
  }}
  className="w-full"
/>
  </div>
</div>

      {/* Main content wrapper */}
<main
  className={`mt-16 relative z-10 space-y-4 md:space-y-6 transition-all duration-300 ${
    mobileMenuOpen ? 'blur-sm' : ''
  }`}
  style={{ pointerEvents: mobileMenuOpen ? 'none' : 'auto' }} // prevents interaction when blurred
>
  <div className="section-hero relative z-10">
    <HeroSection onRegisterClick={() => setShowRegistration(true)} />
  </div>
  <div className="section-about relative z-10" ref={aboutRef}>
    <AboutSection onRegisterClick={() => setShowInternForm(true)} />
  </div>
  <div className="section-whyjoin relative z-10" ref={whyJoinRef}>
    <WhyJoinSection />
  </div>
  <div className="section-courses relative z-10" ref={coursesRef}>
    <TracksSection />
  </div>
  <div className="section-mentors relative z-10" ref={mentorsRef}>
    <MentorsSection />
  </div>
  <div className="section-courseslist relative z-10">
    <CoursesSection />
  </div>
  <div className="section-schedule relative z-10" ref={scheduleRef}>
    <ScheduleSection />
  </div>
  <div className="section-pricing relative z-10" ref={pricingRef}>
    <PricingSection
      onSelectPlan={(plan) => {
        setSelectedPlan(plan)
        setShowRegistration(true)
      }}
    />
  </div>
  <div className="section-testimonials relative z-10" ref={testimonialsRef}>
    <TestimonialsSection />
  </div>
  <div className="section-faq relative z-10" ref={faqRef}>
    <FAQSection />
  </div>
</main>


      {/* Registration Modal */}
      {showRegistration && (
        <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    onClick={() => setShowRegistration(false)} // closes on backdrop click
  >
    <div
      className="relative w-full max-w-lg px-4 sm:px-6"
      onClick={(e) => e.stopPropagation()} // prevents modal content click from closing
    >
      <RegistrationForm
        selectedPlan={selectedPlan}
        onClose={() => setShowRegistration(false)} // pass close handler
            />
          </div>
        </div>
      )}

      {/* Intern / Mentor Modal */}
      {showInternForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowInternForm(false)}
        >
          <div className="relative w-full max-w-lg" 
          onClick={(e) => e.stopPropagation()}>
            <InternRegistrationForm onClose={() => setShowInternForm(false)} />
          </div>
        </div>
      )}

      {/* WhatsApp Float */}
      <a
        href="https://chat.whatsapp.com/L2roO5vwlxa6Vw8dNcHAsR?text=Hi%2C%20I%27m%20interested%20in%20BootcampIndia"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z" />
        </svg>
      </a>

      {/* Footer */}
      <footer ref={contactRef} className="bg-gray-900 text-white py-6 mt-12 md:mt-10">
  <div className="container mx-auto px-4 sm:px-6 md:px-8">
    <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
                BootcampIndia
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Empowering students across India with industry-relevant skills
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection(coursesRef)}
                    className="hover:text-white transition-colors"
                  >
                    Courses
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(pricingRef)}
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(scheduleRef)}
                    className="hover:text-white transition-colors"
                  >
                    Schedule
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(contactRef)}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-gray-400 text-sm">📧 hr@braintrainllp.in</p>
              <p className="text-gray-400 text-sm">📱 +91 98409 94399</p>
              <p className="text-gray-400 text-sm">🌍 Pan-India Online</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Powered By</h4>
              <p className="text-gray-400 text-sm">
                Brain Train Consultancy Services
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-400 text-sm">
            <p>&copy; 2025 BootcampIndia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
