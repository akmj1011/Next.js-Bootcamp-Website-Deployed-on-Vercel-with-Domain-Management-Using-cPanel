'use client'

import React from 'react'

interface InfoCardSection {
  title?: string
  subtitle?: string
  description: string
}

interface InfoCardProps {
  sections?: InfoCardSection[]
  buttonText?: string
  onButtonClick?: () => void
  center?: boolean
  children?: React.ReactNode
  padding?: string
  bgColor?: string
  roundedType?: 'all' | 'top' | 'bottom' | 'none' | string  // ✅ allow any string
  slightlyVisible?: boolean
  className?: string
}

export default function InfoCard({
  sections,
  buttonText,
  onButtonClick,
  center = false,
  children,
  padding = 'p-16',
  bgColor = 'bg-gray-100',
  roundedType = 'all',
  slightlyVisible = false,
  className = '',
}: InfoCardProps) {

  // Use your original logic for known types, otherwise fallback to provided string
  const roundedClass =
    roundedType === 'all'
      ? 'rounded-3xl'
      : roundedType === 'top'
      ? 'rounded-t-[4rem]'
      : roundedType === 'bottom'
      ? 'rounded-b-[4rem]'
      : roundedType === 'none'
      ? 'rounded-none'
      : roundedType  // ✅ fallback to custom Tailwind class (like 'rounded-2xl')

  const visibilityClass = slightlyVisible
    ? 'opacity-70 backdrop-blur-sm'
    : 'opacity-100'

  return (
    <div
      className={`${bgColor} ${roundedClass} shadow-lg flex flex-col space-y-8 ${padding} ${visibilityClass} ${
        center ? 'items-center text-center' : ''
      } ${className}`}
    >
      {sections?.map((section, idx) => (
        <div key={idx}>
          {section.title && (
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{section.title}</h2>
          )}
          {section.subtitle && (
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{section.subtitle}</h3>
          )}
          <p className="text-lg text-gray-700 leading-relaxed">{section.description}</p>
        </div>
      ))}

      {children}

      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform mt-4 self-start"
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}
