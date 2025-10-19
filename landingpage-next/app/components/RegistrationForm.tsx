'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import PaymentModal from './PaymentModal'

interface RegistrationFormProps {
  selectedPlan: string | null
  onClose: () => void
}

export default function RegistrationForm({ selectedPlan, onClose }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    state: '',
    language: 'english-hindi',
    tracks: [] as string[],
    batch: ''
  })

  const [showPayment, setShowPayment] = useState(false)
  const [loading, setLoading] = useState(false)
  const [registrationId, setRegistrationId] = useState<string | null>(null)

  const tracks = [
    { id: 'github', name: 'GitHub & DevOps', price: 499 },
    { id: 'aiml', name: 'AI/ML & Cloud', price: 499 },
    { id: 'frontend', name: 'Frontend & UI/UX', price: 499 },
    { id: 'data', name: 'Data Analytics', price: 499 },
    { id: 'applied-ai', name: 'Applied AI Projects', price: 499 }
  ]

  const calculateAmount = () => {
    if (selectedPlan === 'combo') return 1499
    if (selectedPlan === 'rural') return 299
    return formData.tracks.length * 499
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.college || !formData.state || !formData.batch) {
      toast.error('Please fill all required fields!')
      return
    }

    if (formData.tracks.length === 0 && selectedPlan !== 'combo' && selectedPlan !== 'rural') {
      toast.error('Please select at least one track!')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, plan: selectedPlan })
      })

      const data = await res.json()
      if (!res.ok || !data.registration?.id) throw new Error(data.error || 'Registration failed')

      setRegistrationId(data.registration.id)
      toast.success('Registration successful! Proceeding to payment...')
      setShowPayment(true)
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error(error?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (showPayment && registrationId) {
    return (
      <PaymentModal
        registrationId={registrationId}
        amount={calculateAmount()}
        onSuccess={() => {
          toast.success('Payment successful! Welcome to BootcampIndia!')
          onClose()
        }}
        onClose={() => setShowPayment(false)}
      />
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl 
                 w-full max-h-[90vh] overflow-y-auto overflow-x-hidden 
                 p-6 sm:p-8 border border-white/30 
                 mx-auto max-w-sm sm:max-w-md md:max-w-2xl scroll-smooth"
      onClick={(e) => e.stopPropagation()}
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(156,163,175,.5) transparent' }} // thin scrollbar for Firefox
    >
      {/* Close button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition"
        >
          ✕
        </button>
      </div>

      {/* Glow effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 blur-3xl pointer-events-none"></div>

      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Register for Bootcamp
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 mt-6">
        {/* Name */}
        <input
          type="text"
          placeholder="Full Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email *"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
          required
        />

        {/* Phone */}
        <input
          type="tel"
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
          required
        />

        {/* College */}
        <input
          type="text"
          placeholder="College/Institution *"
          value={formData.college}
          onChange={(e) => setFormData({ ...formData, college: e.target.value })}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
          required
        />

        {/* State */}
        <select
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
          required
        >
          <option value="">Select State *</option>
          <option>Tamil Nadu</option>
          <option>Delhi</option>
          <option>Maharashtra</option>
          <option>Karnataka</option>
          <option>Kerala</option>
          <option>Andhra Pradesh</option>
          <option>Other</option>
        </select>

        {/* Language */}
        <select
          value={formData.language}
          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
          required
        >
          <option value="english-hindi">English + Hindi</option>
          <option value="english-tamil">English + Tamil</option>
          <option value="english-telugu">English + Telugu</option>
        </select>

        {/* Tracks */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Select Tracks *</label>
          <div className="grid md:grid-cols-2 gap-3">
            {tracks.map((track) => (
              <label
                key={track.id}
                className="flex items-center space-x-2 bg-gradient-to-br from-purple-50 to-blue-50 p-3 rounded-xl cursor-pointer border hover:shadow-md transition-all"
              >
                <input
                  type="checkbox"
                  value={track.id}
                  checked={formData.tracks.includes(track.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({ ...formData, tracks: [...formData.tracks, track.id] })
                    } else {
                      setFormData({ ...formData, tracks: formData.tracks.filter((t) => t !== track.id) })
                    }
                  }}
                  className="w-5 h-5 text-purple-600"
                />
                <span className="font-medium">
                  {track.name} <span className="text-gray-500">– ₹{track.price}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Batch */}
        <select
          value={formData.batch}
          onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
          required
        >
          <option value="">Select Batch *</option>
          <option>Batch A1 - Jan 15, 7PM-9PM (English + Tamil)</option>
          <option>Batch B1 - Jan 20, 8PM-10PM (English + Hindi)</option>
          <option>Batch C1 - Jan 25, 6PM-8PM (English + Telugu)</option>
        </select>

        {/* Amount */}
        <div className="text-xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Total Amount: ₹{calculateAmount()}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </form>
    </motion.div>
  )
}