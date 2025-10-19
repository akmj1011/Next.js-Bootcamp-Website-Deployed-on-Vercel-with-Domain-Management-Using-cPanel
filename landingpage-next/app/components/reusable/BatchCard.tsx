'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BatchCardProps {
  title?: string
  subtitle?: string
  description?: string
  footerLeft?: string
  footerRight?: string
  footerColor?: string
  icon?: ReactNode
  center?: boolean
  onClick?: () => void
  className?: string
  children?: ReactNode   // ✅ allow children
}

export default function BatchCard({
  title,
  subtitle,
  description,
  footerLeft,
  footerRight,
  footerColor = 'text-gray-500',
  icon,
  center = false,
  onClick,
  className = '',
  children,             // ✅ destructure children
}: BatchCardProps) {
  return (
    <motion.div
      onClick={onClick}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white rounded-3xl shadow-lg p-4 flex flex-col justify-between hover:shadow-2xl transition
        ${center ? 'items-center text-center' : 'items-start text-left'}
        ${className}`}
    >
      {icon && <div className="text-4xl text-purple-600 mb-3">{icon}</div>}

      {/* If FAQ uses children, render them directly */}
      {children ? (
        <div className="w-full">{children}</div>
      ) : (
        <>
          <div className="flex-1 flex flex-col justify-start mb-3">
            {title && <h3 className="text-lg sm:text-xl font-bold text-purple-600 truncate">{title}</h3>}
            {subtitle && <p className="text-gray-500 text-sm sm:text-base truncate">{subtitle}</p>}
            {description && (
              <p className="text-gray-600 text-sm sm:text-base mt-1 line-clamp-3">
                {description}
              </p>
            )}
          </div>
          {(footerLeft || footerRight) && (
            <div className={`flex justify-between w-full text-sm font-medium ${footerColor}`}>
              {footerLeft && <span className="truncate">{footerLeft}</span>}
              {footerRight && <span className="truncate">{footerRight}</span>}
            </div>
          )}
        </>
      )}
    </motion.div>
  )
}
