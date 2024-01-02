import {defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title on your home page',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Optional: A short text about the restaurant',
      type: 'text',
      rows: 2,
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          description: 'Provide an descriptive text which conveys the content of the image',
          validation: (Rule) => Rule.required(),
          type: 'string',
        },
      ],
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ctaLinks',
      title: 'Call to action buttons',
      description: 'Add one or more links',
      type: 'array',
      of: [{type: 'link'}],
      validation: (Rule) => Rule.required(),
    },
  ],
})
