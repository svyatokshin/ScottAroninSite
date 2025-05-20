import Image from 'next/image';
import Link from 'next/link';
import { getHomePage, urlFor } from '@/sanity/queries'
import { HomePage } from '@/types/sanity'
import { PortableText } from '@portabletext/react'
import { HomePageClient } from '@/components/pages/HomePageClient'

async function getData(): Promise<HomePage> {
  return getHomePage()
}

export default async function Home() {
  const data = await getData()
  return <HomePageClient data={data} />
} 