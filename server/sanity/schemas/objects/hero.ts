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
          type: 'string',
        },
      ],
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'button',
      title: 'Buttons/links',
      description: 'Add one or more links',
      type: 'array',
      of: [{type: 'button'}],
      validation: (Rule) => Rule.required(),
    },
  ],
})
