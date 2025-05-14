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
  heading?: string
  subheading?: string
  heroImage?: SanityImage
}

export interface ContentSection {
  title?: string
  image?: SanityImage
  content?: any[] // Portable Text content
}

export interface WellnessPillar {
  title: string
  description: string
  image: SanityImage
  link?: string
  order: number
}

export interface HomePage {
  title: string
  heroSection: HeroSection
  sectionOne: ContentSection
  sectionTwo: ContentSection
  sectionThree: ContentSection
  wellnessPillars: WellnessPillar[]
  seo?: SEO
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