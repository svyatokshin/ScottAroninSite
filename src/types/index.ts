import { ReactNode } from 'react'

export interface StaticImage {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
}

export interface HeroSection {
  heading: string
  subheading: string
  heroImage: StaticImage
  ctaLink?: string
  ctaText?: string
}

export interface ContentSection {
  title: string
  content: string | ReactNode
  image?: StaticImage
  video?: {
    url: string
    poster?: StaticImage
  }
  mediaType?: 'image' | 'video'
  link?: string
}

export interface WellnessPillar {
  id: string
  title: string
  description: string
  icon?: StaticImage
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
    image?: StaticImage
    content?: string | ReactNode
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
  wellnessPillarsImage?: StaticImage
}

export interface MainContent {
  heading?: string
  bio?: string | ReactNode
  profileImage?: StaticImage
}

export interface MissionStatement {
  heading?: string
  content?: string | ReactNode
}

export interface AboutPage {
  title: string
  mainContent: MainContent
  missionStatement: MissionStatement
  additionalContent?: string | ReactNode
  seo?: SEO
}

export interface Service {
  serviceTitle: string
  description: string | ReactNode
  icon?: StaticImage
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