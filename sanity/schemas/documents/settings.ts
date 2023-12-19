import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'navigation',
      title: 'Navigation',
    },
    {
      name: 'notFoundPage',
      title: '404 page',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Header
    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      group: 'navigation',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'text',
        }),
      ],
    }),

    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'string',
      // group: 'navigation',
    }),
  ],
})

// Not found page
//   defineField({
//     name: 'notFoundPage',
//     title: '404 page',
//     type: 'notFoundPage',
//     group: 'notFoundPage',
//   }),
//   // SEO
//   defineField({
//     name: 'seo',
//     title: 'SEO',
//     type: 'seo',
//     group: 'seo',
//   }),
// ],
// preview: {
//   prepare() {
//     return {
//       title: TITLE,
//     }
//   },
// },
