'use client'

import InfoCard from './reusable/InfoCard'

export default function MentorsSection() {
  const mentors = [
    { name: "Aravindan", role: "GitHub & DevOps Expert", city: "Chennai" },
    { name: "Anuj", role: "AI/ML Specialist", city: "Delhi" },
    { name: "Monika", role: "UI/UX Designer", city: "Mumbai" },
    { name: "Rohit", role: "Data Analytics Pro", city: "Bangalore" },
    { name: "Aromal", role: "Applied AI Expert", city: "Kerala" },
    { name: "Pawan", role: "Full Stack Developer", city: "Hyderabad" },
    { name: "Satwik", role: "Data ops", city: "Pune" },
    { name: "Chaitanya", role: "Data Analyst", city: "Hyderabad" },
  ]

  return (
    <section id="mentors" className="relative py-20">
      {/* 🔹 Slightly visible grey curved InfoCard background (replicates original) */}
      <div className="absolute inset-x-0 top-0 h-full z-10 pointer-events-none">
        <InfoCard
          bgColor="bg-gray-100/50"   // 🔹 faint/translucent gray
          roundedType="none"
          padding="p-0"               // 🔹 no extra padding
          center={false}              // 🔹 purely background
          slightlyVisible={false}     // 🔹 opacity handled by bg-gray-100/50 directly
          className="h-[150vh] w-full"          // 🔹 ensure it covers full section height
        />
      </div>

      <div className="max-w-6xl mx-auto px-3 relative z-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
          Meet Your Mentors
        </h2>
        <p className="text-center text-lg md:text-xl mb-12 text-white/90 px-6 py-2 border-b-2 border-white/50 rounded">
          From Chennai to Mumbai to Delhi – we are here to guide you!
        </p>

        {/* Desktop / Tablet grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {mentors.map((m, idx) => (
            <div
              key={idx}
              className="mentor-card bg-white rounded-2xl p-6 text-center shadow-lg transition-transform hover:scale-105"
            >
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-4xl text-white"></i>
              </div>
              <h3 className="font-bold text-xl mb-2">{m.name}</h3>
              <p className="text-gray-600">{m.role}</p>
              <p className="text-sm text-gray-500 mt-2">{m.city}</p>
            </div>
          ))}
        </div>

        {/* Mobile scroll */}
        <div className="md:hidden w-full overflow-hidden">
          <div className="flex overflow-x-auto space-x-4 snap-x snap-mandatory pb-4 px-2">
            {mentors.map((m, idx) => (
              <div
                key={idx}
                className="mentor-card flex-shrink-0 w-64 bg-white rounded-2xl p-6 text-center shadow-lg snap-start"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-3xl text-white"></i>
                </div>
                <h3 className="font-bold text-lg mb-2">{m.name}</h3>
                <p className="text-gray-600">{m.role}</p>
                <p className="text-sm text-gray-500 mt-2">{m.city}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
