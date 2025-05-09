import { sanityClient } from './client'

export async function getPage(slug: string) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug }
  )
}

export async function getAllPages() {
  return sanityClient.fetch(`*[_type == "page"]`)
} 