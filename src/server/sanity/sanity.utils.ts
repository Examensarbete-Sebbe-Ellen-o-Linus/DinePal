/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {createClient} from 'next-sanity'
import type {
  IBookingPage,
  ICheckoutPage,
  IDish,
  IGalleryPage,
  IHomePage,
  ISettings,
} from '../../app/interfaces'

export const client = createClient({
  projectId: 'xjj2ak5d',
  dataset: 'production',
  useCdn: true,
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

// Common selection for images nested in other documents
const imageSelection = `
  "image": {
    "alt": coalesce(image.alt, "No alt text"),
    "url": image.asset->url,
    "_key": string,
  }
`

// -------------- PAGES ----------------

// Fetch homePage with common selections
export const fetchHomePageData = async (): Promise<IHomePage> => {
  const additionalSelections = `
      title,
      hero { title, ${imageSelection}, ${buttonSelection}, description },
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
  title,
  "galleryImgs": galleryImgs[]{
    "alt": coalesce(alt, "No alt text"),
    "url": asset->url
  }  
  `
  return fetchDocumentById('galleryPage', additionalSelections)
}

// Fetch checkoutPage with common selections
export const fetchCheckoutPageData = async (): Promise<ICheckoutPage> => {
  const additionalSelections = `
  title,
  "checkoutImg": {
    "alt": coalesce(checkoutImg.alt, "No alt text"),
    "url": checkoutImg.asset->url
  }

  
  `
  return fetchDocumentById('checkoutPage', additionalSelections)
}

export const fetchBookingPageData = async (): Promise<IBookingPage> => {
  const additionalSelections = `
  title,
  text
  `
  return fetchDocumentById('bookingPage', additionalSelections)
}

export const fetchDishes = async (): Promise<IDish[]> => {
  try {
    const query = `*[_type == "dish"]{ 
      title,
      description,
      "image": {
        "alt": coalesce(image.alt, "No alt text"),
        "url": image.asset->url,
        "_key": image._key
      },
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
    },    
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
