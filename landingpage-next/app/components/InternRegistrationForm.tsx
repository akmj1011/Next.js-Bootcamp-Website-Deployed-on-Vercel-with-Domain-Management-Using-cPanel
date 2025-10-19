'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

interface InternRegistrationFormProps {
  onClose: () => void
}

export default function InternRegistrationForm({ onClose }: InternRegistrationFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [skills, setSkills] = useState('')
  const [experience, setExperience] = useState('')
  const [role, setRole] = useState('Intern')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('interns')
      .insert([{ name, email, skills, experience, role }])

    setLoading(false)

    if (error) {
      console.error(error)
      toast.error('Error submitting registration. Please try again.')
      return
    }

    toast.success('Registration submitted successfully!')
    setName('')
    setEmail('')
    setSkills('')
    setExperience('')
    setRole('Intern')
    onClose()
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden p-6 sm:p-8 border border-white/30 mx-auto max-w-sm sm:max-w-md md:max-w-2xl custom-scrollbar scroll-smooth"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition"
        >
          ✕
        </button>
      </div>

      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-30 blur-3xl pointer-events-none"></div>

      {/* Heading */}
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Intern / Mentor / Faculty Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          required
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
        />

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
        />

        <input
          type="text"
          required
          placeholder="Skills / Expertise"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
        />

        <input
          type="text"
          placeholder="Experience / Projects"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
        />

        <select
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
        >
          <option value="Intern">Intern</option>
          <option value="Mentor">Mentor</option>
          <option value="Faculty">Faculty</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>
    </motion.div>
  )
}
