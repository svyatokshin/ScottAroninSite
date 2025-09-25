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
  preview?: string
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
  mainSectionThree?: ContentSection
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

export interface ResearchFinding {
  finding: string;
  description: string;
  source: string;
}

export interface ResearchStatistic {
  statistic: string;
  context: string;
  source: string;
}

export interface VisualData {
  title: string;
  image: StaticImage;
  description: string;
}

export interface RelatedStudy {
  title: string;
  authors: string;
  year: number;
  journal: string;
  url: string;
}

export interface ResearchSection {
  title: string;
  category: string;
  summary: string;
  keyFindings: ResearchFinding[];
  statistics: ResearchStatistic[];
  visualData?: VisualData[];
  relatedStudies: RelatedStudy[];
}

export interface ResearchPage {
  pageTitle: string;
  heroSection: {
    heading: string;
    subheading: string;
    heroImage: StaticImage;
  };
  researchSections: ResearchSection[];
  seo?: SEO;
} 