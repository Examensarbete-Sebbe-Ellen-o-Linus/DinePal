import {createClient} from 'next-sanity'
import {IGalleryPage, IHomePage} from '../../client/src/app/interfaces'

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
  console.log(additionalSelections)
  return fetchDocumentByType('galleryPage', additionalSelections)
}
