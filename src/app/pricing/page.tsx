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
    <div className="min-h-screen bg-gradient-to-br from-bgLight-4 via-bgLight-4 to-bgLight-3">
      <section className="relative py-16 sm:py-24 md:py-32 bg-gradient-to-br from-bgLight-4 via-bgLight-4 to-bgLight-3 overflow-hidden">
        {/* Premium space background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zen-purple/20 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.08),transparent_50%)]" />
        {/* Star effects */}
        <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20px_30px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_40px_70px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_50px_160px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_90px_40px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_130px_80px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_160px_120px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_25px_5px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_50px_23px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_125px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_50px_93px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_16px_80px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_33px_43px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_83px_4px,#fff,rgba(0,0,0,0)),radial-gradient(1px_1px_at_34px_66px,#fff,rgba(0,0,0,0))] bg-[length:200px_200px] opacity-30" />
        {/* Nebula effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-zen-purple/10 via-transparent to-zen-blue/10 opacity-40 mix-blend-screen" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(56,189,248,0.08),rgba(147,51,234,0.08),rgba(56,189,248,0.08))] opacity-25" />
        {/* Subtle border lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zen-purple/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zen-blue/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 text-white/90 text-sm font-medium tracking-widest uppercase mb-6 drop-shadow-sm">
              <div className="w-12 h-px bg-gradient-to-r from-white/50 to-transparent"></div>
              <span>Pricing Plans</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/50"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-light text-white leading-tight tracking-tight mb-6 sm:mb-8 drop-shadow-lg px-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto font-light px-4">
              Choose the plan that best fits your learning goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative bg-gradient-to-br from-bgDark-3 via-bgDark-2 to-bgDark-1 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.15)] hover:scale-[1.02] ${
                  plan.popular ? 'ring-2 ring-white/30 scale-105' : ''
                }`}
                style={{boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'}}
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
                
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                    Popular
                  </div>
                )}
                <div className="relative z-10 p-6 sm:p-8 md:p-10">
                  <h3 className="text-xl sm:text-2xl font-light text-white mb-2 sm:mb-3">{plan.name}</h3>
                  <p className="text-sm sm:text-base text-white/80 mb-6 sm:mb-8 font-light">{plan.description}</p>
                  <div className="mb-8 sm:mb-10">
                    <span className="text-4xl sm:text-5xl font-light text-white">${plan.price}</span>
                    <span className="text-sm sm:text-base text-white/60">/month</span>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-white/90">
                        <FiCheck className="text-white mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSubscribe(plan.priceId)}
                    disabled={isLoading && selectedPlan === plan.priceId}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white hover:from-[#1565C0] hover:to-[#1976D2] hover:scale-105'
                        : 'bg-white/20 text-white border border-white/50 hover:bg-white/30 hover:border-white/60 hover:scale-105'
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
            className="mt-24 text-center"
          >
            <div className="relative bg-gradient-to-br from-bgDark-3 via-bgDark-2 to-bgDark-1 rounded-3xl p-12 md:p-16 overflow-hidden shadow-2xl border border-white/20" style={{boxShadow: '0 20px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)'}}>
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
                <h2 className="text-3xl font-light text-white mb-6">Need a Custom Plan?</h2>
                <p className="text-white/80 text-xl mb-8 font-light">
                  Contact us for custom pricing options for teams or special requirements.
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-white px-8 py-3 rounded-lg font-semibold hover:from-[#1565C0] hover:to-[#1976D2] transition-all duration-300 hover:scale-105"
                >
                  Book a Session - Free Consultation Available
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 