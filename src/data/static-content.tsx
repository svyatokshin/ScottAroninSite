import { HomePage, AboutPage, ServicesPage, ContactPage } from '@/types'

/**
 * Static content data for the Scott Aronin wellness website
 * This replaces the previous Sanity CMS integration with static data
 */

export const homePageData: HomePage = {
  title: "Scott Aronin - Holistic Wellness Coach",
  titleSection: "Transform Your Life Through Mind-Body Wellness",
  heroSection: {
    heading: "Transform Your Life Through Mind-Body Wellness",
    subheading: "Experience personalized wellness coaching that harmonizes mind, body, and spirit for lasting transformation.",
    heroImage: {
      src: "/src/assets/Scott_Aronin-3_1.png",
      alt: "Scott Aronin - Wellness Coach",
      width: 1200,
      height: 800
    },
    ctaLink: "/contact",
    ctaText: "Book a Session"
  },
  aboutSection: {
    title: "Meet Your Wellness Guide",
    image: {
      src: "/src/assets/Scott1.jpg",
      alt: "Scott Aronin",
      width: 600,
      height: 600
    },
    content: "With over a decade of experience in holistic wellness coaching, I'm dedicated to helping individuals achieve their optimal health and well-being through a comprehensive, personalized approach. My journey into wellness began with my own transformation – overcoming burnout, chronic stress, and disconnection from my body led me to discover the profound healing power of integrating mind, body, and spirit. Today, I combine evidence-based practices with intuitive guidance to help clients break free from limiting patterns and create vibrant, fulfilling lives. My approach goes beyond quick fixes, focusing instead on sustainable lifestyle transformations that honor your unique needs, goals, and circumstances. Whether you're seeking to improve your physical health, find mental clarity, or discover deeper purpose and meaning, I'm here to guide and support you every step of the way."
  },
  cardSectionsTitle: "Your Wellness Journey",
  cardSectionOne: {
    title: "Mind-Body Connection",
    content: "Discover the transformative power of meditation, mindfulness, and mental wellness practices. Through guided sessions and personalized techniques, you'll learn to quiet the mind, reduce stress, and cultivate lasting inner peace. Our approach integrates ancient wisdom with modern neuroscience to help you develop emotional resilience, improve focus, and create a deeper connection between your thoughts and physical well-being. Whether you're new to meditation or looking to deepen your practice, we'll guide you on a journey toward mental clarity and spiritual growth.",
    image: {
      src: "/src/assets/meditation1.jpeg",
      alt: "Meditation and mindfulness",
      width: 400,
      height: 300
    },
    mediaType: "image"
  },
  cardSectionTwo: {
    title: "Physical Fitness",
    content: "Build sustainable strength, flexibility, and endurance through personalized fitness programs designed specifically for your unique goals, fitness level, and lifestyle. Our holistic approach to physical wellness goes beyond traditional exercise routines, incorporating functional movement patterns, injury prevention strategies, and body awareness techniques. From gentle yoga flows to high-intensity interval training, we'll create a balanced program that challenges you while honoring your body's needs. Learn to move with purpose, develop better posture, and discover the joy of being active in ways that energize rather than exhaust you.",
    image: {
      src: "/src/assets/workout1.jpg",
      alt: "Physical fitness training",
      width: 400,
      height: 300
    },
    mediaType: "image"
  },
  cardSectionThree: {
    title: "Nutrition & Wellness",
    content: "Transform your relationship with food through sustainable nutrition practices that nourish your body, mind, and soul. Our approach to nutrition goes beyond counting calories or restrictive diets – we focus on understanding your body's unique needs, developing intuitive eating habits, and creating meal plans that fit your lifestyle. Learn about nutrient-dense foods, proper hydration, mindful eating practices, and how to fuel your body for optimal energy and performance. We'll help you navigate food sensitivities, establish healthy cooking habits, and create a positive, sustainable relationship with nutrition that supports your overall wellness journey.",
    image: {
      src: "/src/assets/nutrition-1.jpeg",
      alt: "Healthy nutrition",
      width: 400,
      height: 300
    },
    mediaType: "image"
  },
  mainSectionOne: {
    title: "Personalized Wellness Coaching",
    content: "Every individual is unique, and so should be their wellness journey. I work closely with each client to develop personalized strategies that align with their specific goals, lifestyle, and preferences. Through comprehensive one-on-one sessions, we'll explore all aspects of wellness including physical fitness, mental clarity, nutritional balance, and emotional well-being. My coaching methodology combines evidence-based practices with intuitive guidance, ensuring that your wellness plan is not only effective but also sustainable and enjoyable. Whether you're looking to overcome specific health challenges, improve your energy levels, or simply optimize your overall well-being, I'll provide the support, accountability, and expertise you need to create lasting positive changes in your life.",
    image: {
      src: "/src/assets/Scott2.jpg",
      alt: "Personal coaching session",
      width: 600,
      height: 400
    },
    mediaType: "image"
  },
  mainSectionTwo: {
    title: "Holistic Approach to Health",
    content: "True wellness encompasses far more than just physical health – it's about creating harmony between mind, body, and spirit. My holistic approach recognizes the intricate connections between all aspects of your well-being, addressing not just symptoms but root causes of imbalance. We'll work together to identify and transform limiting beliefs, establish healthy boundaries, develop stress management techniques, and create sustainable daily practices that support your overall vitality. This comprehensive approach includes exploring how your environment, relationships, career, and personal values impact your health. By treating you as a whole person rather than isolated symptoms, we can create profound and lasting transformation that radiates into every area of your life, helping you achieve not just better health, but genuine fulfillment and joy.",
    image: {
      src: "/src/assets/Scott3.jpg",
      alt: "Holistic wellness approach",
      width: 600,
      height: 400
    },
    mediaType: "image"
  },
  seo: {
    metaTitle: "Scott Aronin - Holistic Wellness Coach | Transform Your Life",
    metaDescription: "Experience personalized wellness coaching with Scott Aronin. Integrating mind-body practices, fitness, and nutrition for lasting transformation."
  }
}

export const aboutPageData: AboutPage = {
  title: "About Scott Aronin",
  mainContent: {
    heading: "Your Wellness Journey Starts Here",
    bio: "With over 10 years of experience in holistic wellness coaching, I've dedicated my life to helping others achieve their optimal health and well-being. My journey began with my own transformation – struggling with chronic stress, poor eating habits, and a disconnection from my body led me to discover the powerful connection between mind, body, and spirit. Through years of study, practice, and personal growth, I developed a comprehensive approach to wellness that addresses the whole person, not just individual symptoms. This transformative experience ignited my passion for helping others break free from limiting patterns and create vibrant, fulfilling lives.",
    profileImage: {
      src: "/src/assets/Scott4.jpg",
      alt: "Scott Aronin - Professional Photo",
      width: 500,
      height: 600
    }
  },
  missionStatement: {
    heading: "My Mission",
    content: "To empower individuals to take control of their health and wellness through personalized coaching, education, and unwavering support. I believe that everyone has the innate potential to live their best life, and my role is to guide you in unlocking that potential. My mission extends beyond just improving physical health – I'm committed to helping you develop a deeper understanding of yourself, cultivate resilience in the face of challenges, and create sustainable practices that support long-term well-being. Together, we'll work to align your daily actions with your deepest values, creating a life that feels authentic, energized, and purposeful."
  },
  additionalContent: "I hold multiple certifications including Certified Personal Trainer (NASM), Holistic Nutrition Coach (IIN), Mindfulness-Based Stress Reduction Instructor (MBSR), and Yoga Teacher Training (RYT-200). My educational background includes a Master's degree in Exercise Science and ongoing studies in functional medicine and positive psychology. When I'm not coaching clients, you can find me hiking mountain trails, practicing meditation at sunrise, experimenting with plant-based recipes, or diving deep into the latest wellness research and techniques. I believe in practicing what I preach – living as an example of the balanced, vibrant lifestyle I help my clients achieve.",
  seo: {
    metaTitle: "About Scott Aronin - Certified Wellness Coach",
    metaDescription: "Learn about Scott Aronin's journey as a holistic wellness coach and his mission to help others achieve optimal health and well-being."
  }
}

export const servicesPageData: ServicesPage = {
  title: "Wellness Services",
  servicesList: [
    {
      serviceTitle: "One-on-One Coaching",
      description: "Experience the power of personalized wellness coaching through comprehensive one-on-one sessions tailored specifically to your unique goals, challenges, and lifestyle. Our collaborative approach begins with an in-depth wellness assessment to understand your current state, health history, and aspirations. Together, we'll create a holistic transformation plan that integrates physical fitness, nutritional guidance, stress management, and mindfulness practices. Each session builds upon the last, providing you with practical tools, accountability, and expert support as you navigate your wellness journey. This intensive, personalized approach ensures rapid progress and sustainable results that fit seamlessly into your daily life.",
      icon: {
        src: "/src/assets/meditation2.jpg",
        alt: "Personal coaching",
        width: 100,
        height: 100
      },
      features: [
        "Comprehensive initial wellness assessment and goal setting",
        "Custom fitness programs adapted to your fitness level and preferences",
        "Personalized nutrition plans and meal preparation guidance",
        "Mindfulness and stress management techniques for daily life",
        "Weekly check-ins and progress tracking",
        "24/7 text support for motivation and questions",
        "Access to exclusive resources and wellness tools",
        "Ongoing support and accountability partnership"
      ]
    },
    {
      serviceTitle: "Group Wellness Programs",
      description: "Join a supportive community of like-minded individuals on similar wellness journeys through our carefully curated group programs. These dynamic sessions combine the benefits of professional guidance with the motivation and camaraderie that comes from shared experiences. Our small group format ensures personalized attention while fostering meaningful connections and mutual support. Each program focuses on specific wellness themes, allowing participants to dive deep into topics like stress management, healthy cooking, fitness fundamentals, or mindfulness practices. The group setting creates natural accountability, celebration of wins, and collective problem-solving that accelerates everyone's progress.",
      icon: {
        src: "/src/assets/workout2.jpg",
        alt: "Group programs",
        width: 100,
        height: 100
      },
      features: [
        "Small, intimate group sessions (maximum 6 participants)",
        "Themed programs focusing on specific wellness areas",
        "Community support system and accountability partners",
        "Cost-effective alternative to individual coaching",
        "Interactive group activities and challenges",
        "Shared meal preparation and cooking sessions",
        "Group fitness activities and outdoor adventures",
        "Private online community for ongoing support and connection"
      ]
    },
    {
      serviceTitle: "Wellness Workshops",
      description: "Expand your wellness knowledge and skills through our comprehensive educational workshops designed to empower you with practical tools and evidence-based strategies. These interactive learning experiences cover a wide range of topics, from foundational nutrition principles and meal planning to advanced mindfulness techniques and stress management strategies. Each workshop combines expert instruction with hands-on practice, ensuring you leave with actionable skills you can implement immediately. Whether you're just beginning your wellness journey or looking to deepen your existing knowledge, these workshops provide valuable insights and practical tools for sustainable lifestyle transformation.",
      icon: {
        src: "/src/assets/nutrition2.jpg",
        alt: "Wellness workshops",
        width: 100,
        height: 100
      },
      features: [
        "Interactive, hands-on learning experiences with practical application",
        "Comprehensive take-home resource packets and implementation guides",
        "Expert-led instruction based on latest wellness research",
        "Small class sizes ensuring personalized attention and Q&A time",
        "Networking opportunities with local wellness community",
        "Follow-up email series with additional tips and resources",
        "Access to recorded sessions for future reference",
        "Certificate of completion for continuing education credits"
      ]
    }
  ],
  seo: {
    metaTitle: "Wellness Services - Scott Aronin Holistic Coaching",
    metaDescription: "Explore Scott Aronin's wellness services including personal coaching, group programs, and educational workshops for holistic health."
  }
}

export const contactPageData: ContactPage = {
  title: "Contact Scott Aronin",
  contactInfo: {
    email: "scott@scottaronin.com",
    phone: "(555) 123-4567",
    address: {
      street: "123 Wellness Way",
      city: "Health City",
      state: "CA",
      postalCode: "90210",
      country: "United States"
    },
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com/scottaronin"
      },
      {
        platform: "Facebook",
        url: "https://facebook.com/scottaroninwellness"
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/scottaronin"
      }
    ]
  },
  businessHours: [
    {
      day: "Monday",
      isOpen: true,
      openTime: "8:00 AM",
      closeTime: "6:00 PM"
    },
    {
      day: "Tuesday",
      isOpen: true,
      openTime: "8:00 AM",
      closeTime: "6:00 PM"
    },
    {
      day: "Wednesday",
      isOpen: true,
      openTime: "8:00 AM",
      closeTime: "6:00 PM"
    },
    {
      day: "Thursday",
      isOpen: true,
      openTime: "8:00 AM",
      closeTime: "6:00 PM"
    },
    {
      day: "Friday",
      isOpen: true,
      openTime: "8:00 AM",
      closeTime: "5:00 PM"
    },
    {
      day: "Saturday",
      isOpen: true,
      openTime: "9:00 AM",
      closeTime: "3:00 PM"
    },
    {
      day: "Sunday",
      isOpen: false
    }
  ],
  seo: {
    metaTitle: "Contact Scott Aronin - Book Your Wellness Consultation",
    metaDescription: "Get in touch with Scott Aronin to book your wellness consultation and start your transformation journey today."
  }
}
