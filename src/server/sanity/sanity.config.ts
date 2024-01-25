import {CogIcon, HomeIcon, IceCreamIcon, ImageIcon} from '@sanity/icons'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {simplerColorInput} from 'sanity-plugin-simpler-color-input'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['settings'])

export default defineConfig({
  title: 'Dine Pal',
  projectId: 'xjj2ak5d',
  dataset: 'production',
  apiVersion: '2023-12-20',

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
            S.divider(),
            S.listItem()
              .title('Home Page')
              .icon(HomeIcon)
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.divider(),
            S.listItem()
              .title('Gallery Page')
              .icon(ImageIcon)
              .id('galleryPage')
              .child(S.document().schemaType('galleryPage').documentId('galleryPage')),
            S.divider(),
            S.listItem()
              .title('Checkout Page')
              .icon(ImageIcon)
              .id('checkoutPage')
              .child(S.document().schemaType('checkoutPage').documentId('checkoutPage')),
            S.divider(),
            S.listItem()
              .title('Booking Page')
              .icon(ImageIcon)
              .id('bookingPage')
              .child(S.document().schemaType('bookingPage').documentId('bookingPage')),
            S.divider(),
            S.listItem()
              .title('Menu Page')
              .icon(ImageIcon)
              .id('menuPage')
              .child(S.document().schemaType('menuPage').documentId('menuPage')),
            S.divider(),
            S.listItem()
              .title('Color Theme')
              .icon(IceCreamIcon)
              .id('colorTheme')
              .child(S.document().schemaType('colorTheme').documentId('colorTheme')),
            S.divider(),
            // Regular document types
            S.documentTypeListItem('dish').title('Dish'),
            S.divider(),
            S.documentTypeListItem('category').title('Category'),
            S.divider(),
          ]),
    }),
    visionTool(),
    simplerColorInput(),
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
