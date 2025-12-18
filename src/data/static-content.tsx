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
      src: "/TAICHIIMAGE.jpg",
      alt: "Description of work - representing integrated wellness and holistic health practices",
      width: 1000,
      height: 1400
    },
    content: "I want you to be as healthy and happy as you can be.\n\nWhether your goals are physical, like fitness, athletics or weight loss, or you are focused on behavior change, like dietary change or quitting a damaging habit, or you want to improve internal experiences like mood, outlook or ability to focus, one common thread is your mind.\n\nEven while helping you with fitness and nutrition, I also focus on training the mind. I use both ancient wisdom techniques like meditation and qigong and also apply modern science and research-based practices shown to improve wellbeing and daily life. Done together, this may just help you find health and wellbeing results you didn't know possible.\n\nThis work is designed for the modern world that has people more connected but less rested than ever; mentally overstimulated, and possibly challenged by focusing deeply. It is designed to counter the effects of a society that never stops beeping and pinging and vibrating for your constant response. One of the goals is to help you break some of the addiction to devices, notifications, likes and views. To be healthy in this modern world, you have to be able to power down and disconnect- your mind- sometimes. You have to relax. And you can.\n\nThis is where it starts. Physical health and fitness, mental wellbeing, healthy eating, focus and joy, will emanate even more from a place of peace and quiet."
  },
  cardSectionsTitle: "Your Wellness Journey",
  cardSectionOne: {
    title: "Mind-Body Work",
    content: "So much can be called meditation. Many different types of static techniques including mindfulness techniques like focus on the breath or a repeating affirmation or mantra. There are energetic practices using the mind to circulate or cultivate life energy. There are guided meditations to experience certain mind states or outlooks. There are also traditional moving meditative techniques like tai chi, some qigong and sometimes yoga. And there are also ways to train the mind to focus to make any movement meditative- going for a run, playing tennis, walking from the store to the car, washing the dishes etc etc. And there is the broader concept, with training in this genre, of understanding and potentially unwinding mental patterns that cause suffering and of cultivating personality traits and psycho-behavioral patterns that bring more joy, clarity and accomplishment. Truly changing for the better. We can work on any or all of these aspects of mind-body training to help you enhance your life experience and health.",
    preview: "Many things can be called meditation and every way you use your mind affects your wellbeing. Let us teach you simple ways to train your mind for better health and wellbeing.",
    image: {
      src: "/zenstonesand.jpg",
      alt: "Zen garden with meditating figure - representing mindful meditation practice and inner peace",
      width: 400,
      height: 300
    },
    mediaType: "image"
  },
  cardSectionTwo: {
    title: "Fitness & Conditioning",
    content: "Humans are made to move. Whatever your age and fitness level, if you can move, you can move better. Whereas human life historically included the necessity of movement- transiting, hunting, gathering, farming, hauling, building, chopping wood and carrying water- many in the modern world aren't required to move much or functionally in order to survive. Many of us have to use our free time, make effort and sometimes spendmoney in order to exercise for the sake of exercise's effects. But there are so many proven benefits to making the effort, especially to exercising well and wisely. I help you find motivation and to know how to exercise in ways specifically suited to you and your goals so you can get some of the known benefits of wise movement. These include, increased strength, speed, balance and coordination; weight loss; disease prevention; increased sense of wellbeing and improved mood; improved cognition; better athletic performance; more confidence and optimism; improved immune function; injury prevention; better sleep and more. With a focus on quality of movement and getting the above benefits through functional movement, I will coach and teach you to find ways individualized to you and your enjoyment to experience some of the benefits listed above.",
    preview: "Humans are made to move. Life used to require much more movement and activity. Now, many people have to make time and effort to exercise. Learn how to move well and efficiently for strength, balance, athleticism, cardio-respiratory fitness, disease prevention, bone density and much more.",
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
    content: "Finding food behaviors that are ideal specifically for you is attained through a combination of knowledge- modern scientific and older traditional- and wisdom. The wisdom is largely your own. Through processes of attention, awareness and mindfulness, I help you get in touch with your own body's individual nutritional needs. Starting this way, you can discover eating behaviors that are the best for you personally, understand the difference between true bodily needs and behavioral patterns of eating from other causes. Through this practice you will be more aware of what foods your body actually wants (and when and in what quantities) and be more empowered to make the behavior changes and to habitualize them.\n\nSo much has changed in human diets in modern times- for better and worse. It is great that most people in the modern world have regular access to enough food and usually enough relatively healthy food if they choose it. But so much food is also designed to be hyperpalatable (read: addictive) even while largely devoid of actual nutrients. This happens through processing (denutrifying) foods and adding things like sugar, salt and extra fat. Hyperpalatable foods are more addictive not because they have more compounds the body needs, but because of how they trigger the reward centers in the brain. Part of cultivating the healthiest eating behaviors through deepening body awareness also means sensing the eating behaviors that are not mostly about body needs but about pleasure centers of the brain.\n\nDue in part to the availability of hyperpalatable, generally less nutritious foods, we eat in part for many reasons other than hunger and biological need. Psychological associations between foods and something positive from the past; pleasure-seeking to self-medicate for things like depression, sadness, boredom or anxiety; sub-conscious seeking to actually be heavier for various reasons; boredom, nutrient deficiency, lack of sleep and more all can drive eating behavior. To address this, one has to bring awareness to the drives to eat and mindfulness to the emotions that arise around either wanting and having certain foods or not having them when there is a craving.\n\nI can help with methods to do that. The results will include benefits beyond dietary changes, but also that reflect the many known benefits of cultivating awareness, mindfulness and body-centered attention. Through these methods, the eating behaviors change more naturally and rhythmically as the actual desires changes, This is much more profound and long-lasting than just using the strength of discipline to force eating behavior changes the psyche doesn't actually want.",
    preview: "Create a relationship with food by which you eat healthfully for your body and you do so with little effort and worry. Part nutrition science, part behavior change, let us guide you to new way of viewing, and using, food in your life. Worry less, feel better.",
    image: {
      src: "/FruitsandVeg.jpg",
      alt: "Assortment of fresh fruits, vegetables, grains, and nuts arranged on a wooden cutting board - representing healthy nutrition choices",
      width: 400,
      height: 300
    },
    mediaType: "image"
  },
  mainSectionOne: {
    title: "About Me & My Work",
    content: "I have pursued health and wellness in a holistic, truth-based way for most of my life. My interest in how humans can be as healthy, happy, fit and well-functioning as possible has led me to study and practice many types of meditation, including Buddhist meditation, qigong and yoga for decades. I also continue training in advanced fitness solutions for people's wellbeing, balance and athleticism and to continue developing ideal nutrition strategies for people's optimal health, energy and weight.. These have all become foundations of how I teach and guide people to be healthier and happier.",
    image: {
      src: "/Meditation under tree.png",
      alt: "Buddha meditating under a mystical glowing tree - representing integrated wellness and spiritual practice",
      width: 600,
      height: 600
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
    content: "SCIENTIFIC EVIDENCE SUMMARY\n\n🧠 NEUROPLASTICITY & BRAIN STRUCTURE CHANGES\n\nResearch demonstrates that the human brain exhibits neuroplasticity, allowing it to physically adapt to patterns of use. Meditation practices produce measurable structural and functional changes in the brain:\n\n• Cortical Thickness: Regular meditation practice increases cortical thickness in the prefrontal cortex and anterior cingulate cortex, regions crucial for executive functions, decision-making, attention, and self-regulation.\n\n• Gyrification Enhancement: Long-term meditators demonstrate increased gyrification (cortical folding) compared to non-meditators, with direct correlation between years of practice and degree of brain folding. This enhanced folding facilitates faster information processing and improved cognitive performance.\n\n• Deep Brain Region Modifications: Intracranial EEG studies reveal meditation-induced changes in the amygdala and hippocampus. The amygdala shows reduced size and reactivity following mindfulness practice, while the hippocampus demonstrates structural growth critical for memory formation.\n\n• Cognitive Protection: Regular meditation practice provides neuroprotective effects against age-related cortical thinning, potentially reducing dementia risk and maintaining cognitive function.\n\n🛡️ IMMUNE SYSTEM & INFLAMMATORY RESPONSE\n\n• Immune Activation: Meditation robustly activates the immune system, upregulating hundreds of genes associated with immune function without increasing inflammation.\n\n• Anti-Inflammatory Effects: Mindfulness meditation reduces proinflammatory processes, specifically decreasing activity of the cellular transcription factor NF-κB and circulating levels of C-reactive protein (CRP), while increasing telomerase activity that guards against cellular aging.\n\n• Biomarker Reduction: Regular practice decreases inflammatory markers including IL-6, NF-κB, and CRP while strengthening cell-mediated immunity.\n\n❤️ STRESS RESPONSE & CARDIOVASCULAR HEALTH\n\n• Cortisol Reduction: Multiple studies demonstrate significant reductions in cortisol levels, with both short-term (days/weeks) and long-term baseline reductions in meditators.\n\n• Autonomic Regulation: Meditation improves attention control and enhances regulation of heart rate, breathing, and autonomic nervous system functioning, supporting cardiovascular health.\n\n• Blood Pressure Management: Statistically significant reductions in blood pressure occur in both short- and long-term studies.\n\n• Cardiovascular Disease Prevention: Regular meditators show 48% reduced likelihood of heart attacks or strokes, with lower rates of high cholesterol, high blood pressure, diabetes, stroke, and coronary artery disease.\n\n🧘 QIGONG RESEARCH FINDINGS\n\n• Pain Management: Studies demonstrate significant reduction in chronic pain and pain-related disability.\n\n• Inflammatory Conditions: Qigong practice is associated with reduced inflammation, arthritis symptoms, and depression.\n\n• Clinical Observations: Traditional qigong practices and clinical observations demonstrate dramatic healing across diverse conditions with life-changing improvements in wellbeing.",
    image: undefined,
    mediaType: undefined
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
    bio: "My mind-body work with people is a powerful amalgam of ancient wisdom traditions, modern scientific evidence and my personal experience and realization. I have also always exercised and worked at eating as healthily as I can. I've been doing personal training for decades and have Master's Degrees from Columbia University in Exercise Physiology and Nutrition. In fitness, I've gotten certifications from the NSCA (CSCS) and NASM (CES.) In all of the above categories I have taken hundreds of classes, workshops and online study with the best experts I could find. While I still grow constantly in my depth of understanding, I have crafted a systematic way to help people based on decades of experience and learning, which itself has been based on millennia of human knowledge and wisdom.\n\nI consider myself a spiritual person and part of my mind-body work with people accepts that we have a spiritual nature that is part of us whether or not we engage in spiritual or religious practice.\n\nI guide people in a compassionate practice of self-healing, personal optimization and mental and psychological clarity, calm and focus. I also guide people in the highest level of functional fitness for every fitness goal and in mindful eating for a healthy relationship with food for health, weight and enjoyment. I work with people from young athletes to the elderly, from those suffering illness to those without a symptom, from those seeking to be more fit or at their ideal weight to those who want to be more calm, centered and self-aware. Your life is a journey however you focus your energies. I simply try to help people with practices and understanding that help make this journey of life as healthy and happy as possible.",
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
  title: "Wellness Services Offered",
  servicesList: [
    {
      serviceTitle: "One-on-One Coaching",
      description: "Personalized expert coaching tailored to your wellness, health and fitness goals This professional guidance can be in the general categories of fitness and movement; nutrition, food and eating behavior; mind-body, meditation, mood, stress reduction and focus. Coaching and training you receive can be to help you reach fitness or athletic goals, dietary or weight goals, mood and wellbeing goals and/or can help improve health and facilitate healing. You'll first have a wellness assessment and evaluation based on your goals and concerns. Together we'll make a flexible plan and start this phase of your wellness journey. Through both your one on one work and a personalized program you may receive, you will learn and practice behaviors and techniques beneficial both to your health directly as well as to your understanding of your own health and wellness levels and what else you can do going forward to continue improving them. Depending on the level of engagement you choose, you may also have access to ongoing text or call support and periodic check-ins and updates to your program or sessions.",
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
      serviceTitle: "Group Coaching or Training",
      description: "For a more affordable, somewhat less personalized option, you can partner with 1-3 other people to get the benefit of this rare and specialized wellness work as a small group. The more each group member has in common in terms of goals, and maybe of experience and capacity, the more impactful the work can be. In this setting, group members are encouraged to support each other. While many of those details will be up to the group and reflect your priorities, comfort levels and availability, we'll at least give you some tips and steps to help each other in some proven behavior change ways. If you have a partner or family member, or a couple of them, who want to improve their health and wellbeing like you do, contact us and in a 30 minute free consultation we can discuss and propose ways you can work together as a group exploring this amazing work and reaching farther than you may have thought possible in your health and wellness journey.",
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
      serviceTitle: "Workshops and Classes",
      description: "For larger groups, institutions and workplaces, wellness, health and fitness workshops are available on a variety of topics. We will cater the details to your goals and specifications, but sample topics are available upon request. Workshops and classes can be one-time events or series of varying lengths. They may include take-home materials, recordings and assignments, as per your preferences. These are usually online, but there is some in-person availability we can schedule depending on location and group size.",
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
    metaTitle: "Wellness Services Offered - Scott Aronin Holistic Coaching",
    metaDescription: "Explore Scott Aronin's wellness services including personal coaching, group programs, and educational workshops for holistic health."
  }
}

export const contactPageData: ContactPage = {
  title: "Contact Scott Aronin",
  contactInfo: {
    email: "info@scottaronin.com",
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
  businessHours: [],
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
