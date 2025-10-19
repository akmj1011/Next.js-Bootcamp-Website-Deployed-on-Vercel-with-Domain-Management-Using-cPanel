'use client'

import InfoCard from './reusable/InfoCard'

interface AboutSectionProps {
  onRegisterClick: () => void
}

export default function AboutSection({ onRegisterClick }: AboutSectionProps) {
  const sections = [
    {
      title: 'Our Vision',
      description:
        'Our vision is to build an ecosystem where AI augments society by creating more opportunities and jobs, rather than replacing them.',
    },
    {
      title: 'Our Mission',
      description:
        'Our mission is to create a SaaS-based ecosystem that guides young talent through learning and developing MVPs in AI/ML, core engineering, biotechnology, and beyond. We aim to enhance the skills of engineers, nurture world-class professionals, and contribute to India’s self-reliance under the Atmanirbhar Bharat initiative.',
    },
  ]

  return (
    <section className="py-0">
      <div className="max-w-none relative -mb-8">
        <InfoCard
          bgColor="bg-white"
          roundedType="top"
          padding="p-16 md:p-20"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Vision + desktop button */}
            <div className="flex-1 md:pr-4 flex flex-col">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{sections[0].title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{sections[0].description}</p>

              {/* Desktop button under Vision */}
              <div className="mt-6 hidden md:flex">
                <button
                  onClick={onRegisterClick}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform self-start"
                >
                  Join as Intern/Mentor
                </button>
              </div>
            </div>

            {/* Right Column - Mission + mobile button */}
            <div className="flex-1 md:pl-4 flex flex-col">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{sections[1].title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{sections[1].description}</p>

              {/* Mobile button under Mission, aligned left */}
              <div className="mt-6 md:hidden">
                <button
                  onClick={onRegisterClick}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform"
                >
                  Join as Intern/Mentor
                </button>
              </div>
            </div>
          </div>
        </InfoCard>
      </div>
    </section>
  )
}
