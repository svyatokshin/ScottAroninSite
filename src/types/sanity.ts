import { ReactNode } from 'react'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
}

export interface HeroSection {
  heading: string
  subheading: string
  heroImage: any
  ctaLink?: string
  ctaText?: string
}

export interface ContentSection {
  title: string
  content: any
  image?: any
  video?: {
    url: string
    poster?: any
  }
  mediaType?: 'image' | 'video'
  link?: string
}

export interface WellnessPillar {
  _id: string
  title: string
  description: string
  icon?: any
  link?: string
}

export interface Newsletter {
  title: string
  description: string
  placeholder?: string
  buttonText?: string
}

export interface HomePage {
  titleSection: ReactNode | Iterable<ReactNode>
  title: string
  heroSection: HeroSection
  aboutSection?: {
    title?: string
    image?: any
    content?: any[]
  }
  cardSectionsTitle?: string
  cardSectionOne?: ContentSection
  cardSectionTwo?: ContentSection
  cardSectionThree?: ContentSection
  mainSectionOne?: ContentSection
  mainSectionTwo?: ContentSection
  wellnessPillars?: WellnessPillar[]
  newsletter?: Newsletter
  seo?: SEO
  wellnessPillarsImage?: SanityImage
}

export interface MainContent {
  heading?: string
  bio?: any[] // Portable Text content
  profileImage?: SanityImage
}

export interface MissionStatement {
  heading?: string
  content?: any[] // Portable Text content
}

export interface AboutPage {
  title: string
  mainContent: MainContent
  missionStatement: MissionStatement
  additionalContent?: any[] // Portable Text content
  seo?: SEO
}

export interface Service {
  serviceTitle: string
  description: any[] // Portable Text content
  icon?: SanityImage
  features?: string[]
}

export interface ServicesPage {
  title: string
  servicesList: Service[]
  seo?: SEO
}

export interface Address {
  street?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
}

export interface SocialLink {
  platform: string
  url: string
}

export interface ContactInfo {
  email?: string
  phone?: string
  address?: Address
  socialLinks?: SocialLink[]
}

export interface BusinessHours {
  day: string
  isOpen: boolean
  openTime?: string
  closeTime?: string
  notes?: string
}

export interface ContactPage {
  title: string
  contactInfo: ContactInfo
  businessHours: BusinessHours[]
  seo?: SEO
} 