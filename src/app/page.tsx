import { HomePageClient } from '@/components/pages/HomePageClient'
import { homePageData } from '@/data/static-content'

/**
 * Home page component - now using static data instead of Sanity CMS
 * @returns JSX element for the home page
 */
export default function Home() {
  return <HomePageClient data={homePageData} />
} 