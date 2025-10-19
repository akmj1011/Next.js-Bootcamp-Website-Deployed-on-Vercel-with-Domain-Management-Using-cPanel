'use client'

import { ReactNode } from 'react'

interface TrackCardProps {
  title: string
  desc: string
  instructor: string
  color?: string   // Tailwind gradient classes
  icon?: ReactNode
  className?: string
  onClick?: () => void
}

export default function TrackCard({
  title,
  desc,
  instructor,
  color = 'from-gray-500 to-gray-700',
  icon,
  className = '',
  onClick,
}: TrackCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-gradient-to-br ${color} text-white p-8 rounded-2xl shadow-lg transition-transform hover:scale-105 ${className}`}
    >
      {/* 🌟 White glowing border only */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/80 shadow-[0_0_10px_2px_rgba(255,255,255,0.6)] pointer-events-none"></div>

      <div className="relative z-10">
        {icon && <div className="text-4xl mb-4">{icon}</div>}
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="mb-4">{desc}</p>
        <p className="font-semibold">Instructor: {instructor}</p>
      </div>
    </div>
  )
}
