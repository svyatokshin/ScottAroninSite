'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const pricingPlans = [
  {
    name: 'Basic',
    price: 99,
    description: 'Perfect for getting started',
    features: [
      'Access to basic courses',
      'Community forum access',
      'Email support',
      'Course completion certificates',
    ],
    priceId: 'price_basic', // TODO: Replace with actual Stripe Price ID
  },
  {
    name: 'Pro',
    price: 199,
    description: 'Most popular choice',
    features: [
      'All Basic features',
      'Access to advanced courses',
      'Priority email support',
      'Live Q&A sessions',
      'Project reviews',
    ],
    priceId: 'price_pro', // TODO: Replace with actual Stripe Price ID
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 299,
    description: 'For serious professionals',
    features: [
      'All Pro features',
      'One-on-one mentoring',
      'Custom learning path',
      'Career guidance',
      'Resume review',
      'Interview preparation',
    ],
    priceId: 'price_enterprise', // TODO: Replace with actual Stripe Price ID
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (priceId: string) => {
    setIsLoading(true);
    setSelectedPlan(priceId);

    try {
      // TODO: Implement Stripe checkout
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      // Redirect to Stripe Checkout
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the plan that best fits your learning goals
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
              plan.popular ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium">
                Popular
              </div>
            )}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <FiCheck className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.priceId)}
                disabled={isLoading && selectedPlan === plan.priceId}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {isLoading && selectedPlan === plan.priceId
                  ? 'Processing...'
                  : 'Subscribe Now'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Need a Custom Plan?</h2>
        <p className="text-gray-600 mb-8">
          Contact us for custom pricing options for teams or special requirements.
        </p>
        <a
          href="/contact"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Contact Sales
        </a>
      </motion.div>
    </div>
  );
} 