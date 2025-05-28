import { sanityClient } from './client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)

// Helper function to get image URL
export function urlFor(source: any) {
  return builder.image(source)
}

export async function getPage(slug: string) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug }
  )
}

export async function getAllPages() {
  return sanityClient.fetch(`*[_type == "page"]`)
}

export async function getHomePage() {
  const result = await sanityClient.fetch(
    `*[_type == "home"][0]{
      title,
      heroSection,
      titleSection,
      aboutSection {
        title,
        image,
        content
      },
      cardSectionsTitle,
      cardSectionOne {
        title,
        image,
        content,
        mediaType,
        video {
          url,
          poster
        }
      },
      cardSectionTwo {
        title,
        image,
        content,
        mediaType,
        video {
          url,
          poster
        }
      },
      cardSectionThree {
        title,
        image,
        content,
        mediaType,
        video {
          url,
          poster
        }
      },
      mainSectionOne {
        title,
        image,
        content,
        mediaType,
        video {
          url,
          poster
        }
      },
      mainSectionTwo {
        title,
        image,
        content,
        mediaType,
        video {
          url,
          poster
        }
      },
      seo
    }`
  );

  console.log('Raw Sanity data for main sections:', {
    mainSectionOne: result?.mainSectionOne,
    mainSectionTwo: result?.mainSectionTwo
  });

  const data = {
    title: result?.title || 'Welcome',
    titleSection: result?.titleSection || 'Our Holistic Approach to Wellness',
    heroSection: result?.heroSection || {
      heading: 'Welcome to Holistic Wellness',
      subheading: 'Discover your path to complete wellbeing',
      heroImage: null
    },
    aboutSection: result?.aboutSection || null,
    cardSectionsTitle: result?.cardSectionsTitle || 'Services Provided',
    cardSectionOne: result?.cardSectionOne || {
      title: 'Holistic Approach',
      content: [{
        _type: 'block',
        children: [{
          _type: 'span',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }]
      }],
      mediaType: 'image',
      image: null,
      video: null
    },
    cardSectionTwo: result?.cardSectionTwo || {
      title: 'Personalized Care',
      content: [{
        _type: 'block',
        children: [{
          _type: 'span',
          text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }]
      }],
      mediaType: 'image',
      image: null,
      video: null
    },
    cardSectionThree: result?.cardSectionThree || {
      title: 'Transform Your Life',
      content: [{
        _type: 'block',
        children: [{
          _type: 'span',
          text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        }]
      }],
      mediaType: 'image',
      image: null,
      video: null
    },
    mainSectionOne: result?.mainSectionOne || {
      title: 'Main Section One',
      content: [{
        _type: 'block',
        children: [{
          _type: 'span',
          text: 'Experience our comprehensive approach to wellness that integrates mind, body, and spirit for optimal health and vitality.'
        }]
      }],
      mediaType: 'image',
      image: null,
      video: null
    },
    mainSectionTwo: result?.mainSectionTwo || {
      title: 'Main Section Two',
      content: [{
        _type: 'block',
        children: [{
          _type: 'span',
          text: 'Discover personalized wellness solutions tailored to your unique needs and goals, helping you achieve lasting transformation.'
        }]
      }],
      mediaType: 'image',
      image: null,
      video: null
    },
    seo: result?.seo || null
  };

  console.log('Processed data for main sections:', {
    mainSectionOne: data.mainSectionOne,
    mainSectionTwo: data.mainSectionTwo
  });

  return data;
}

export async function getAboutPage() {
  return sanityClient.fetch(
    `*[_type == "about"][0]{
      title,
      mainContent,
      missionStatement,
      additionalContent,
      seo
    }`
  ).then(data => ({
    title: data?.title || 'About Us',
    mainContent: data?.mainContent || {
      heading: 'Our Story',
      bio: [{
        _type: 'block',
        children: [{
          _type: 'span',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }]
      }],
      profileImage: null
    },
    missionStatement: data?.missionStatement || {
      heading: 'Our Mission',
      content: [{
        _type: 'block',
        children: [{
          _type: 'span',
          text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }]
      }]
    },
    additionalContent: data?.additionalContent || [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
      }]
    }],
    seo: data?.seo || null
  }))
}

export async function getServicesPage() {
  return sanityClient.fetch(
    `*[_type == "services"][0]{
      title,
      servicesList,
      seo
    }`
  ).then(data => ({
    title: data?.title || 'Our Services',
    servicesList: data?.servicesList || [
      {
        serviceTitle: 'Mind-Body Practices',
        description: [{
          _type: 'block',
          children: [{
            _type: 'span',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          }]
        }],
        features: [
          'Meditation techniques',
          'Breathing exercises',
          'Mindfulness practices'
        ],
        icon: null
      },
      {
        serviceTitle: 'Physical Wellness',
        description: [{
          _type: 'block',
          children: [{
            _type: 'span',
            text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          }]
        }],
        features: [
          'Personalized training',
          'Movement therapy',
          'Fitness assessment'
        ],
        icon: null
      },
      {
        serviceTitle: 'Nutrition Guidance',
        description: [{
          _type: 'block',
          children: [{
            _type: 'span',
            text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          }]
        }],
        features: [
          'Meal planning',
          'Nutritional counseling',
          'Dietary assessment'
        ],
        icon: null
      }
    ],
    seo: data?.seo || null
  }))
}

export async function getContactPage() {
  return sanityClient.fetch(
    `*[_type == "contact"][0]{
      title,
      contactInfo,
      businessHours,
      seo
    }`
  ).then(data => ({
    title: data?.title || 'Contact Us',
    contactInfo: data?.contactInfo || {
      email: 'contact@example.com',
      phone: '+1 (555) 123-4567',
      address: {
        street: '123 Wellness Street',
        city: 'Health City',
        state: 'CA',
        postalCode: '90210',
        country: 'USA'
      },
      socialLinks: [
        {
          platform: 'Facebook',
          url: 'https://facebook.com'
        },
        {
          platform: 'Instagram',
          url: 'https://instagram.com'
        },
        {
          platform: 'LinkedIn',
          url: 'https://linkedin.com'
        }
      ]
    },
    businessHours: data?.businessHours || [
      {
        day: 'Monday',
        isOpen: true,
        openTime: '9:00 AM',
        closeTime: '5:00 PM'
      },
      {
        day: 'Tuesday',
        isOpen: true,
        openTime: '9:00 AM',
        closeTime: '5:00 PM'
      },
      {
        day: 'Wednesday',
        isOpen: true,
        openTime: '9:00 AM',
        closeTime: '5:00 PM'
      },
      {
        day: 'Thursday',
        isOpen: true,
        openTime: '9:00 AM',
        closeTime: '5:00 PM'
      },
      {
        day: 'Friday',
        isOpen: true,
        openTime: '9:00 AM',
        closeTime: '5:00 PM'
      },
      {
        day: 'Saturday',
        isOpen: false
      },
      {
        day: 'Sunday',
        isOpen: false
      }
    ],
    seo: data?.seo || null
  }))
} 