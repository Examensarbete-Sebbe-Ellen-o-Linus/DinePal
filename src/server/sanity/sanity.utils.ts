/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import imageUrlBuilder from '@sanity/image-url'
import {type SanityImageSource} from '@sanity/image-url/lib/types/types'
import {createClient} from 'next-sanity'
import type {
  IBookingPage,
  ICheckoutPage,
  IDish,
  IGalleryPage,
  IHomePage,
  IMenuPage,
  ISettings,
} from '../../app/interfaces'

export const client = createClient({
  projectId: 'xjj2ak5d',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-12-20',
})

// ------------- Reusable queries ----------------

// Reusable function to fetch documents by id with common selections
const fetchDocumentById = async (id: string, selections: string): Promise<any> => {
  try {
    const query = `*[_id == "${id}"]{ ${selections} }[0]`
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching ${id}: ' + error)
    throw error
  }
}

// Common selection for buttons
const buttonSelection = `
  "buttons": button[]{
    actionType,
    text
  }
`

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Common selection for images nested in other documents
const imageSelection = `
  "image": {
    "alt": coalesce(image.alt, "No alt text"),
    "url": image.asset->url,
    "assetId": image.asset._ref,
    "_key": image._key,
    "hotspot": image.hotspot,
    "crop": image.crop,
  }
`

// -------------- PAGES ----------------

// Fetch homePage with common selections
export const fetchHomePageData = async (): Promise<IHomePage> => {
  const additionalSelections = `
      title,
      hero { title, ${imageSelection}, ${buttonSelection} },
      selectedDishes[]-> { title, description, price, slug, ${imageSelection}, tags[] },
      imageSection { 
        title, 
        description, 
        imageCards[] {
        "url": image.asset->url,
        "alt": alt,
        "link": link, 
      }},
      news {
        title, 
        description, 
        "image": {
        "alt": coalesce(image.alt, "No alt text"),
        "url": image.asset->url,
        "_key": image._key
      }},
      about { title, descriptionFirstP, descriptionSecondP, ${imageSelection}, ${buttonSelection} },
      seo { metaTitle, metaDescription }
    `
  return fetchDocumentById('homePage', additionalSelections)
}

// Fetch galleryPage with common selections
export const fetchGalleryPageData = async (): Promise<IGalleryPage> => {
  const additionalSelections = `
  ...,
  title,
  galleryImgs[]{
    "alt": coalesce(alt, "No alt text"),
    "url": asset->url,
    "assetId": asset._ref,
    "key": _key,
    hotspot,
    crop,
  }
  `
  return fetchDocumentById('galleryPage', additionalSelections)
}

// Fetch checkoutPage with common selections
export const fetchCheckoutPageData = async (): Promise<ICheckoutPage> => {
  const additionalSelections = `
  ...,
  title,
  "checkoutImg": {
    "alt": coalesce(checkoutImg.alt, "No alt text"),
    "url": checkoutImg.asset->url,
    crop,
    hotspot
  }  
  `
  return fetchDocumentById('checkoutPage', additionalSelections)
}

export const fetchBookingPageData = async (): Promise<IBookingPage> => {
  const additionalSelections = `
  ...,
  title,
  text
  `
  return fetchDocumentById('bookingPage', additionalSelections)
}

export const fetchMenuPageData = async (): Promise<IMenuPage> => {
  const additionalSelections = `
  ...,
  title,
  promo {
    text, 
    button
  },
  seo {
    metaTitle, ...
  }
  `
  return fetchDocumentById('menuPage', additionalSelections)
}

export const fetchDishes = async (): Promise<IDish[]> => {
  try {
    const query = `*[_type == "dish"]{ 
      title,
      slug,
      description,
      "image": {
        "assetId": image.asset._ref,
        "alt": coalesce(image.alt, "No alt text"),
        "url": image.asset->url,
        "_key": image._key,
        "hotspot": image.hotspot,
        "crop": image.crop,
      },
      "category": 
      category->title,
    
      price,
      tags[]
    }`
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching dishes ' + error)
    throw error
  }
}

export const fetchSingleDish = async (slug: string): Promise<IDish> => {
  const query = `*[_type == "dish" && slug.current == $slug][0]{
    _id,
    title,
    description,
    "image": {
      "alt": coalesce(image.alt, "No alt text"),
      "url": image.asset->url,
      "hotspot": {...}, 
    },    
    category,
    price,
    tags[]
  }`
  return await client.fetch(query, {slug})
}

export const fetchSettingsData = async (): Promise<ISettings> => {
  const additionalSelections = `
    ...,
    header {
      ...,
      "logotype": logotype.asset->{
        "url": url,
        "alt": coalesce(alt, "Missing alt text")
      }
    },
    footer {
      ...,
      "preFooter": preFooter.asset->{
        "url": url,
        "alt": coalesce(alt, "Missing alt text")
      },
      "logotype": logotype.asset->{
        "url": url,
        "alt": coalesce(alt, "Missing alt text")
      },
      "socials": socials[] {
        ...,
        "icon": icon.asset->{
          "url": url,
          "alt": alt
        }
      }
    }
  
`
  return fetchDocumentById('settings', additionalSelections)
}

export const fetchAccentColor = async () => {
  const query = `*[_type == "colorTheme"][0]{accentColor}`
  try {
    const data = await client.fetch(query)
    return data.accentColor
  } catch (error) {
    console.error('Error fetching accent color:', error)
    return null
  }
}
