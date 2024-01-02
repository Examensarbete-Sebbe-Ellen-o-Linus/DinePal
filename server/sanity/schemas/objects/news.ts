import {ClipboardImageIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'news',
  type: 'object',
  title: 'News',
  icon: ClipboardImageIcon,
  fields: [
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
    },
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
  ],
})
