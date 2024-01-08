import {defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'object',
  initialValue: {
    title: 'About us',
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'About us text',
      description: 'Here you can write a desciption about your restaurant',
      type: 'text',
      rows: 4,
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
          type: 'string',
        },
      ],
      options: {
        hotspot: true,
      },
    },
  ],
})
