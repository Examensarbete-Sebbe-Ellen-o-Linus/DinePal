import {ClipboardImageIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'article',
  type: 'document',
  title: 'Article',
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
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
})
