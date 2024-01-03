/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {createClient} from 'next-sanity'
import {IBookingPage, IDish, IGalleryPage, IHomePage, ISettings} from '../../app/interfaces'

export const client = createClient({
  projectId: 'xjj2ak5d',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-12-20',
})

// ------------- Reusable queries ----------------

// Reusable function to fetch documents by type with common selections
const fetchDocumentByType = async (type: string, selections: string): Promise<any> => {
  try {
    const query = `*[_type == "${type}"]{ ${selections} }[0]`
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching ${type}: ' + error)
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
      selectedDishes[]-> { title, description, ${imageSelection}, tags[] },
      imageSection { title, description, imageCards[] {
        'url': image.asset->url,
        'alt': alt,
        "link": link, 
      }},
      about { title, description, ${imageSelection}, ${buttonSelection} },
      seo { metaTitle, metaDescription }
    `
  return fetchDocumentByType('homePage', additionalSelections)
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
  return fetchDocumentByType('galleryPage', additionalSelections)
}

export const fetchBookingPageData = async (): Promise<IBookingPage> => {
  const additionalSelections = `
  title,
  text`

  return fetchDocumentByType('bookingPage', additionalSelections)
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
      tags
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
    image,
    price,
    tags[]
  }`
  return await client.fetch(query, {slug})
}

export const fetchSettings = async (): Promise<ISettings> => {
  const query = `
  *[_type == "settings"][1]{
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
      "logotype": logotype.asset->{
        "url": url,
        "alt": coalesce(alt, "Missing alt text")
      },
      "socials": socials[] {
        ...,
        "icon": icon.asset->url
      }
    }
  }
`
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await client.fetch(query)
    console.log('Settings data fetched:', data)
    return data
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.error(`Error fetching settings: ${error}`)
    throw error
  }
}
