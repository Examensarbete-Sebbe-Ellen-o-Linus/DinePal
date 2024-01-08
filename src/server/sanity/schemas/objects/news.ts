import {ClipboardImageIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'news',
  type: 'object',
  title: 'News',
  icon: ClipboardImageIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
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
          validation: (Rule) => Rule.required(),
          type: 'string',
        },
      ],
      options: {
        hotspot: true,
      },
    },
  ],
})
