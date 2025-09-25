import { HomePage, AboutPage, ServicesPage, ContactPage, ResearchPage } from '@/types'

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
      src: "/meditation1.jpeg",
      alt: "Meditation and mindfulness - Wellness Coach",
      width: 1200,
      height: 800
    },
    ctaLink: "/contact",
    ctaText: "Book a Session"
  },
  aboutSection: {
    title: "Description Of Work",
    image: {
      src: "/man-8707406_1280.png",
      alt: "Meditation and mindfulness - Wellness Coach",
      width: 600,
      height: 600
    },
    content: "I want you to be as healthy and happy as you can be.\n\nWhether your goals are physical, like fitness, athletics or weight loss, or you are focused on behavior change, like dietary change or quitting a damaging habit, or you want to improve internal experiences like mood, outlook or ability to focus, one common thread is your mind.\n\nEven while helping you with fitness and nutrition, I also focus on training the mind. I use both ancient wisdom techniques like meditation and qigong and also apply modern science and research-based practices shown to improve wellbeing and daily life. Done together, this may just help you find health and wellbeing results you didn't know possible.\n\nThis work is designed for the modern world that has people more connected but less rested than ever; mentally overstimulated, and possibly challenged by focusing deeply. It is designed to counter the effects of a society that never stops beeping and pinging and vibrating for your constant response. One of the goals is to help you break some of the addiction to devices, notifications, likes and views. To be healthy in this modern world, you have to be able to power down and disconnect- your mind- sometimes. You have to relax. And you can.\n\nThis is where it starts. Physical health and fitness, mental wellbeing, healthy eating, focus and joy, will emanate even more from a place of peace and quiet."
  },
  cardSectionsTitle: "Your Wellness Journey",
  cardSectionOne: {
    title: "Mind-Body Work",
    content: "So much can be called meditation. Many different types of static techniques including mindfulness techniques like focus on the breath or a repeating affirmation or mantra. There are energetic practices using the mind to circulate or cultivate life energy. There are guided meditations to experience certain mind states or outlooks. There are also traditional moving meditative techniques like tai chi, some qigong and sometimes yoga. And there are also ways to train the mind to focus to make any movement meditative- going for a run, playing tennis, walking from the store to the car, washing the dishes etc etc. And there is the broader concept, with training in this genre, of understanding and potentially unwinding mental patterns that cause suffering and of cultivating personality traits and psycho-behavioral patterns that bring more joy, clarity and accomplishment. Truly changing for the better. We can work on any or all of these aspects of mind-body training to help you enhance your life experience and health.",
    preview: "So much can be called meditation. Many different types of static techniques including mindfulness techniques like focus on the breath or a repeating affirmation or mantra.",
    image: {
      src: "/meditation5.jpg",
      alt: "Meditation and mindfulness",
      width: 400,
      height: 300
    },
    mediaType: "image"
  },
  cardSectionTwo: {
    title: "Fitness & Conditioning",
    content: "Humans are made to move. Whatever your age and fitness level, if you can move, you can move better. Whereas human life historically included the necessity of movement- transiting, hunting, gathering, farming, hauling, building, chopping wood and carrying water- many in the modern world aren't required to move much or functionally in order to survive. Many of us have to use our free time, make effort and sometimes spendmoney in order to exercise for the sake of exercise's effects. But there are so many proven benefits to making the effort, especially to exercising well and wisely. I help you find motivation and to know how to exercise in ways specifically suited to you and your goals so you can get some of the known benefits of wise movement. These include, increased strength, speed, balance and coordination; weight loss; disease prevention; increased sense of wellbeing and improved mood; improved cognition; better athletic performance; more confidence and optimism; improved immune function; injury prevention; better sleep and more. With a focus on quality of movement and getting the above benefits through functional movement, I will coach and teach you to find ways individualized to you and your enjoyment to experience some of the benefits listed above.",
    preview: "Humans are made to move. Whatever your age and fitness level, if you can move, you can move better. Whereas human life historically included the necessity of movement- transiting, hunting, gathering, farming, hauling, building, chopping wood and carrying water- many in the modern world aren't required to move much or functionally in order to survive.",
    image: {
      src: "/workout1.jpg",
      alt: "Physical fitness training",
      width: 400,
      height: 300
    },
    mediaType: "image"
  },
  cardSectionThree: {
    title: "Food & Nutrition",
    content: "Finding food behaviors that are ideal specifically for you is attained through a combination of knowledge- modern scientific and older traditional- and wisdom. But here, the wisdom is largely your own. Through processes of attention, awareness and mindfulness, I help you get in touch with your own body's individual nutritional needs. Starting this way, you can both discover eating behaviors that are the best for you personally and be more empowered to make the behavior changes and to habitualize them. So much has changed in human diets in modern times- for better and worse. It is great that most people in the modern world have regular access to enough food and usually enough relatively healthy food if they choose it. But so much food is also designed to be hyperpalatable even while largely devoid of actual nutrients. This happens through processing (denutrifying) and adding things like sugar, salt and extra fat. Hyperpalatable foods are more addictive not because they have more compounds the body needs, but because of how they trigger the reward centers in the brain. Part of cultivating the healthiest eating behaviors through deepening body awareness also means sensing the eating behaviors that are not mostly about body needs but about pleasure centers of the brain. I can help with methods to do that.",
    preview: "Finding food behaviors that are ideal specifically for you is attained through a combination of knowledge- modern scientific and older traditional- and wisdom. But here, the wisdom is largely your own. Through processes of attention, awareness and mindfulness, I help you get in touch with your own body's individual nutritional needs.",
    image: {
      src: "/nutrition2.jpg",
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
      src: "/MOONORBITGRAPH.png",
      alt: "Complete wellbeing model - Nutrition, Mind Body Healing, and Fitness & Movement orbiting around central wellness",
      width: 500,
      height: 350
    },
    mediaType: "image"
  },
  mainSectionTwo: {
    title: "5 Pillars of Wellness",
    content: "A framework for mind body work, personal transformation and spiritual pursuit. To discover and maximize your own potential to direct your mind, focus and mental power to change your experience of life as well as aspects of the material reality of your life, including your health and wellbeing. The training and coaching we do utilizes this framework in every category in which we help people.\n\n**The 5 Pillars:**\n\n1. Presence, awareness, witnessing\n2. Unwinding, peeling back layers, deciphering\n3. Energy, body-centering, healing\n4. Kindness, compassion and your true self\n5. Movement- fast, slow, meditative, attentive, with purpose",
    image: {
      src: "/moonlit2.jpg",
      alt: "5 Pillars of Wellness - Cosmic connection to mind-body wellness and awakening",
      width: 600,
      height: 400
    },
    mediaType: "image"
  },
  mainSectionThree: {
    title: "Research, Evidence, and Tradition",
    content: "True wellness encompasses far more than just physical health – it's about creating harmony between mind, body, and spirit. My holistic approach recognizes the intricate connections between all aspects of your well-being, addressing not just symptoms but root causes of imbalance. We'll work together to identify and transform limiting beliefs, establish healthy boundaries, develop stress management techniques, and create sustainable daily practices that support your overall vitality. This comprehensive approach includes exploring how your environment, relationships, career, and personal values impact your health. By treating you as a whole person rather than isolated symptoms, we can create profound and lasting transformation that radiates into every area of your life, helping you achieve not just better health, but genuine fulfillment and joy.",
    image: {
      src: "/sunset.jpg",
      alt: "Research, Evidence, and Tradition - Sunset contemplation representing the integration of modern research with ancient wisdom",
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
      src: "/Scott7.jpg",
      alt: "Scott Aronin - Personal training session demonstrating fitness coaching expertise",
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
         src: "/meditation5.jpg",
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
        src: "/workout2.jpg",
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
        src: "/nutrition2.jpg",
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
      street: "Located in the Northeast PA area",
      city: "",
      state: "",
      postalCode: "",
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

export const researchPageData: ResearchPage = {
  pageTitle: "Wellness Research & Insights",
  heroSection: {
    heading: "Evidence-Based Wellness Research",
    subheading: "Discover the latest research and insights into holistic wellness practices that transform lives.",
    heroImage: {
      src: "/space2.jpg",
      alt: "Milky Way galaxy - representing the vastness of wellness research and cosmic connection to mind-body wellness",
      width: 1200,
      height: 600
    }
  },
  researchSections: [
    {
      title: "Mindfulness and Mental Health",
      category: "mental wellness",
      summary: "Recent studies demonstrate the profound impact of mindfulness practices on mental health, stress reduction, and overall well-being.",
      keyFindings: [
        {
          finding: "Mindfulness reduces stress by 30%",
          description: "Regular practice shows significant reduction in cortisol levels and perceived stress.",
          source: "Journal of Clinical Psychology, 2023"
        },
        {
          finding: "Improved focus and attention",
          description: "Enhanced cognitive performance and reduced mind-wandering in daily activities.",
          source: "Neuroscience Research, 2023"
        }
      ],
      statistics: [
        {
          statistic: "85%",
          context: "of participants reported improved sleep quality",
          source: "Sleep Medicine Journal, 2023"
        },
        {
          statistic: "67%",
          context: "reduction in anxiety symptoms",
          source: "Clinical Psychology Review, 2023"
        }
      ],
      relatedStudies: [
        {
          title: "The Science of Mindfulness",
          authors: "Dr. Sarah Johnson et al.",
          year: 2023,
          journal: "Journal of Wellness Research",
          url: "#"
        }
      ]
    },
    {
      title: "Nutrition and Physical Performance",
      category: "nutrition",
      summary: "Evidence-based research on how nutrition impacts physical performance, recovery, and overall health outcomes.",
      keyFindings: [
        {
          finding: "Protein timing enhances recovery",
          description: "Strategic protein consumption within 30 minutes post-exercise improves muscle recovery.",
          source: "Sports Nutrition Journal, 2023"
        },
        {
          finding: "Plant-based diets support endurance",
          description: "Athletes on plant-based diets show comparable performance to omnivorous counterparts.",
          source: "Exercise Science Quarterly, 2023"
        }
      ],
      statistics: [
        {
          statistic: "92%",
          context: "improvement in recovery time",
          source: "Athletic Performance Research, 2023"
        },
        {
          statistic: "78%",
          context: "increase in energy levels",
          source: "Nutrition Science Today, 2023"
        }
      ],
      relatedStudies: [
        {
          title: "Nutrition for Peak Performance",
          authors: "Dr. Michael Chen et al.",
          year: 2023,
          journal: "Sports Medicine Journal",
          url: "#"
        }
      ]
    }
  ],
  seo: {
    metaTitle: "Wellness Research & Insights - Scott Aronin",
    metaDescription: "Explore evidence-based research on mindfulness, nutrition, and holistic wellness practices."
  }
}
