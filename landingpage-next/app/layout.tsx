import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BootcampIndia',
  description: 'Pan-India Online Bootcamps',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
