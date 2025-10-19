'use client'

import BatchCard from './reusable/BatchCard'
import InfoCard from './reusable/InfoCard'

interface Course {
  title: string
  description: string
  duration: string
  level: string
}

const courses: Course[] = [
  { title: 'Fullstack Web Development', description: 'Learn HTML, CSS, JS, React, Node & more', duration: '12 Weeks', level: 'Beginner → Advanced' },
  { title: 'Data Science & AI', description: 'Python, ML, AI models & real-world projects', duration: '10 Weeks', level: 'Intermediate' },
  { title: 'UI/UX Design', description: 'Design, Figma, Prototyping & Portfolio', duration: '8 Weeks', level: 'Beginner' },
]

export default function CoursesSection() {
  return (
    <section id="courses" className="relative">
    <div className="max-w-none relative -mb-6"> 
      <InfoCard
        bgColor="bg-gradient-to-r from-purple-50 to-blue-50"
        roundedType="top"     // 🔹 make the top curved
        padding="p-16"
        center={true}
        className="h-full"
      >
        {/* Section Title */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-black mb-4 ">Our Courses</h2>
          <p className="text-black/90 text-lg">
            Choose a path and start building industry-ready skills today.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <BatchCard
              key={idx}
              title={course.title}
              description={course.description}
              footerLeft={course.duration}
              footerRight={course.level}
              footerColor="text-gray-500"
            />
          ))}
        </div>
      </InfoCard>
      </div>
    </section>
  )
}
