import {CogIcon, HomeIcon, ImageIcon} from '@sanity/icons'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['settings'])

export default defineConfig({
  title: 'Dine Pal',

  projectId: process.env.SANITY_PROJECTID!,
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Our singleton type has a list item with a custom child
            // Instead of rendering a list of documents, we render a single
            // document, specifying the `documentId` manually to ensure
            // that we're editing the single instance of the document
            S.listItem()
              .title('Settings')
              .id('settings')
              .icon(CogIcon)

              .child(S.document().schemaType('settings').documentId('settings')),
            S.listItem()
              .title('Home Page')
              .icon(HomeIcon)
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('Gallery Page')
              .icon(ImageIcon)
              .id('galleryPage')
              .child(S.document().schemaType('galleryPage').documentId('galleryPage')),

            // Regular document types
            S.documentTypeListItem('dish').title('Dish'),
            S.documentTypeListItem('colorTheme').title('Color themes'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,

    // Filter out singleton types from the global “New document” menu options
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
