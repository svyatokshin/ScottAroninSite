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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
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
      className="relative"
    >
      <div
        className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 overflow-hidden border border-bgDark-2/20"
        style={{
          background: 'linear-gradient(to bottom right, #BBE9FF, #BBE9FF, #AFDDFF)',
          boxShadow: '0 10px 40px -12px rgba(0,70,201,0.15), 0 0 0 1px rgba(0,70,201,0.1)'
        }}
      >
        {/* Light blue background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,70,201,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(16,85,201,0.06),transparent_50%)]" />
      
      <div className="relative z-10">
        <h2 className="text-xl sm:text-2xl font-light mb-4 sm:mb-6 text-gray-900 text-center">Send a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 sm:py-3.5 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 focus:border-bgDark-2/60 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500/60 text-base min-h-[44px]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 sm:py-3.5 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 focus:border-bgDark-2/60 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500/60 text-base min-h-[44px]"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 sm:py-3.5 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 focus:border-bgDark-2/60 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500/60 text-base min-h-[44px]"
              placeholder="What's this about?"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 sm:py-3.5 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 focus:border-bgDark-2/60 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500/60 resize-none text-base min-h-[120px]"
              placeholder="Tell us more about your wellness goals. Would you like to book a free consult video chat?"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full border border-bgDark-2/50 text-gray-900 px-6 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg min-h-[44px] text-base sm:text-lg"
            style={{background: 'linear-gradient(to bottom right, #BBE9FF, #BBE9FF, #AFDDFF)'}}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {submitStatus === 'success' && (
            <p className="text-gray-900 text-center animate-fade-in font-light">Message sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 text-center animate-fade-in font-light">Failed to send message. Please try again.</p>
          )}
        </form>
        </div>
      </div>
    </AnimatedSection>
  )
} 