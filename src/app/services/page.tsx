'use client';

import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      title: 'Personal Fitness Training',
      description: 'Customized fitness programs designed to help you achieve your personal health and fitness goals. Whether you\'re looking to build strength, improve endurance, or enhance overall wellness, Scott creates personalized training plans that fit your lifestyle and needs.',
      icon: '💪'
    },
    {
      title: 'Athletic Conditioning',
      description: 'Specialized training programs for athletes looking to enhance their performance. Focused on sport-specific movements, strength development, and injury prevention to help you reach your peak performance potential.',
      icon: '🏃'
    },
    {
      title: 'Food and Nutrition Consulting',
      description: 'Comprehensive nutrition guidance that goes beyond just what to eat. Scott helps you understand the connection between food and health, develop sustainable eating habits, and implement behavior change strategies for long-term success.',
      icon: '🥗'
    },
    {
      title: 'Stress Management & Mind-Body',
      description: 'Holistic approaches to managing stress and enhancing mind-body connection. Incorporating techniques from meditation, qigong, yoga, and Reiki to help you achieve greater balance, peace, and overall well-being.',
      icon: '🧘'
    },
    {
      title: 'Institutional Wellness Programs',
      description: 'Customized wellness programs for organizations looking to improve employee health and productivity. Includes workshops, training sessions, and ongoing support to create a culture of wellness in the workplace.',
      icon: '🏢'
    },
    {
      title: 'Wellness Workshops & Training',
      description: 'Educational sessions covering various aspects of health and wellness. From nutrition basics to stress management techniques, these workshops provide practical knowledge and tools for improving overall well-being.',
      icon: '📚'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6">Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive wellness programs tailored to your unique needs and goals
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-16 bg-gray-50 rounded-2xl p-12 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Contact Scott for a free consultation to discuss your needs and create a personalized wellness plan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:9176762350"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Call: (917) 676-2350
          </a>
          <a
            href="mailto:info@scottaronin.com"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Email: info@scottaronin.com
          </a>
        </div>
      </motion.div>
    </div>
  );
} 