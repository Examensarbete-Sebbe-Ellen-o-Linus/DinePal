import {ImageIcon} from '@sanity/icons'
import {defineType} from 'sanity'

const TITLE = 'Gallery Page'

export default defineType({
  name: 'galleryPage',
  title: TITLE,
  type: 'document',
  icon: ImageIcon,
  groups: [
    {
      default: true,
      name: 'gallery',
      title: 'Gallery',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],

  fields: [
    {
      name: 'title',
      title: 'Gallery title',
      type: 'string',
      group: 'gallery',
    },

    {
      name: 'galleryImgs',
      title: 'Gallery Images',
      description: 'hi there',
      group: 'gallery',
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
