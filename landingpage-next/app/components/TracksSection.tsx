'use client'

import TrackCard from './reusable/TrackCard'

export default function TracksSection() {
  const tracks = [
    { title: "GitHub & DevOps Basics", desc: "Master version control, CI/CD, and collaborative development", instructor: "Aravindan", color: "from-purple-500 to-purple-700", icon: "fab fa-github" },
    { title: "AI/ML & Cloud Fundamentals", desc: "Learn machine learning basics and cloud deployment", instructor: "Anuj", color: "from-blue-500 to-blue-700", icon: "fas fa-brain" },
    { title: "Frontend & UI/UX with React", desc: "Build beautiful, responsive user interfaces", instructor: "Monika", color: "from-pink-500 to-pink-700", icon: "fas fa-paint-brush" },
    { title: "Data Analytics with Python", desc: "Python, Power BI, and data visualization mastery", instructor: "Rohit", color: "from-green-500 to-green-700", icon: "fas fa-chart-bar" },
    { title: "Applied AI Projects", desc: "TensorFlow, RAG, IoT real-world applications", instructor: "Aromal", color: "from-orange-500 to-orange-700", icon: "fas fa-robot" },
    { title: "Hackathon Participation", desc: "Bonus certificate for completing challenges", instructor: "All Instructors", color: "from-red-500 to-yellow-600", icon: "fas fa-trophy" },
  ]

  return (
    <section id="tracks" className="pt-20 pb-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-3">
        <h2 className="text-4xl font-bold text-center text-white mb-12 mt-8">
          Tracks Offered
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, idx) => (
            <TrackCard
              key={idx}
              title={track.title}
              desc={track.desc}
              instructor={track.instructor}
              color={track.color}
              icon={<i className={track.icon}></i>}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
