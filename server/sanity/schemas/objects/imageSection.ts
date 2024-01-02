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
      description: 'This is a section to display images with links to other parts of the page',
      type: 'array',
      validation: (Rule) => Rule.length(3).error('Add three image cards to this section'),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              description: 'Select part of page you want to link to',
              type: 'link',
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
