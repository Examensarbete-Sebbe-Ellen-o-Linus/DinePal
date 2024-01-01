import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageSection',
  title: 'Image section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'imageCards',
      title: 'Image cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              description: 'Select part of page you want to link to',
              type: 'button',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
  ],
})
