import {ImageIcon} from '@sanity/icons'
import {defineType} from 'sanity'

const TITLE = 'Checkout Page'

export default defineType({
  name: 'checkoutPage',
  title: TITLE,
  type: 'document',
  icon: ImageIcon,
  groups: [
    {
      default: true,
      name: 'checkout',
      title: 'Checkout',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],

  fields: [
    {
      name: 'title',
      title: 'Checkout title',
      type: 'string',
      group: 'checkout',
    },

    {
      name: 'checkoutImg',
      title: 'Checkout Image',
      description: 'hi there',
      group: 'checkout',
      type: 'array',
      of: [
        {
          type: 'image',
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              description: 'Provide a descriptive text which conveys the content of the image',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    },
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})
