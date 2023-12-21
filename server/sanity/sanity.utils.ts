import {createClient} from '@sanity/client'
import {IHomePage} from '../../client/src/interfaces'

export const client = createClient({
  projectId: 'xjj2ak5d',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-12-20',
})

// Function to fetch data with GROQ
export const fetchHeroData = async () => {
  const query = `*[_type == "homePage"][0]`
  return await client.fetch(query)
}

// Common selection for images
const imageSelection = `
  "image": {
    "alt": coalesce(image.alt, "No alt text"),
    "url": image.asset->url
  }
`

// Common selection for buttons
const buttonSelection = `
  "buttons": button[]{
    actionType,
    text
  }
`

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

// Fetch homePage with common selections
export const fetchHomePageData = async (): Promise<IHomePage> => {
  const additionalSelections = `
      title,
      hero { ${imageSelection}, ${buttonSelection}, description },
      selectedDishes[]-> { title, description, ${imageSelection}, tags[] },
      about { title, description, ${imageSelection}, ${buttonSelection} },
      seo { metaTitle, metaDescription }
    `
  return fetchDocumentByType('homePage', additionalSelections)
}

// Fetch homePage with common selections
export const fetchGalleryPageData = async (): Promise<IHomePage> => {
  const additionalSelections = `
      title,
      image[]
    `
  return fetchDocumentByType('galleryPage', additionalSelections)
}
