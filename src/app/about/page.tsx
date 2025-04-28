'use client';
import scottsmile from '@/assets/ScottSmile.jpg';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">About Scott Aronin, MS, CSCS</h1>
        <p className="text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto">
          Helping people become fitter, healthier and happier for more than 2 decades
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full rounded-xl overflow-hidden"
        >
          <Image
            src={scottsmile}
            alt="Scott Aronin"
            width={800}
            height={600}
            className="w-full h-auto"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold">Professional Background</h2>
          <p className="text-xl md:text-2xl text-gray-600">
            Scott's journey in health and wellness began as a personal trainer during college. He went on to earn Master's Degrees from Columbia University in Exercise Physiology and Nutrition, becoming a Certified Strength and Conditioning Specialist. His expertise has been continuously evolving through decades of dedicated practice and study.
          </p>
          <p className="text-xl md:text-2xl text-gray-600">
            Beyond traditional fitness training, Scott has immersed himself in mind/body healing and human development. He is a certified Reiki Master, has studied various forms of meditation and qigong, and completed a full-time immersion course in yoga at Kripalu Center for Yoga and Health. He now shares these practices with his students and clients.
          </p>
        </motion.div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Mission Statement</h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Scott believes that a tremendous untapped resource for health and increased function exists within each of us. His mission is to help people discover their unique path to health and happiness, and then guide them in implementing proven methods to achieve their goals. He combines traditional fitness approaches with holistic wellness practices to create comprehensive, personalized programs that address both physical and mental well-being.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Education',
                description: 'Master\'s Degrees in Exercise Physiology and Nutrition from Columbia University'
              },
              {
                title: 'Holistic Approach',
                description: 'Combining traditional fitness with mind-body healing practices'
              },
              {
                title: 'Personalized Guidance',
                description: 'Tailored programs to help you achieve your health and wellness goals'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-lg text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 