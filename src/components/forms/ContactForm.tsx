'use client'

import { useState } from 'react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // TODO: Implement form submission
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <AnimatedSection
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative bg-gradient-to-br from-[#2E86AB] via-[#1B4F72] to-[#1A5490] p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl border border-zen-purple/20 overflow-hidden"
    >
      {/* Space background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/30 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_50%)]" />
      {/* Star effects */}
      <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20px_30px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_40px_70px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_50px_160px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_90px_40px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_130px_80px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_160px_120px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_25px_5px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_50px_23px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_125px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_50px_93px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_16px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_33px_43px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_83px_4px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_34px_66px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-40" />
      {/* Nebula effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-zen-purple/10 via-transparent to-zen-blue/10 opacity-50 mix-blend-screen" />
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(56,189,248,0.1),rgba(147,51,234,0.1),rgba(56,189,248,0.1))] opacity-30" />
      
      <div className="relative z-10">
        <h2 className="text-xl sm:text-2xl font-light mb-4 sm:mb-6 text-white">Send a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 sm:py-3.5 border border-zen-purple/40 rounded-lg focus:ring-2 focus:ring-zen-blue-light/60 focus:border-zen-blue-light/60 transition-all duration-300 bg-[#2E86AB]/50 backdrop-blur-sm text-white placeholder-white/60 text-base min-h-[44px]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 sm:py-3.5 border border-zen-purple/40 rounded-lg focus:ring-2 focus:ring-zen-blue-light/60 focus:border-zen-blue-light/60 transition-all duration-300 bg-[#2E86AB]/50 backdrop-blur-sm text-white placeholder-white/60 text-base min-h-[44px]"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-white/90 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 sm:py-3.5 border border-zen-purple/40 rounded-lg focus:ring-2 focus:ring-zen-blue-light/60 focus:border-zen-blue-light/60 transition-all duration-300 bg-[#2E86AB]/50 backdrop-blur-sm text-white placeholder-white/60 text-base min-h-[44px]"
              placeholder="What's this about?"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 sm:py-3.5 border border-zen-purple/40 rounded-lg focus:ring-2 focus:ring-zen-blue-light/60 focus:border-zen-blue-light/60 transition-all duration-300 bg-[#0A1428]/50 backdrop-blur-sm text-white placeholder-white/60 resize-none text-base min-h-[120px]"
              placeholder="Tell us more about your wellness journey..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white px-6 py-3 sm:py-3.5 rounded-lg font-semibold hover:from-[#1565C0] hover:to-[#1976D2] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg min-h-[44px] text-base sm:text-lg"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {submitStatus === 'success' && (
            <p className="text-white text-center animate-fade-in font-light">Message sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-400 text-center animate-fade-in font-light">Failed to send message. Please try again.</p>
          )}
        </form>
      </div>
    </AnimatedSection>
  )
} 