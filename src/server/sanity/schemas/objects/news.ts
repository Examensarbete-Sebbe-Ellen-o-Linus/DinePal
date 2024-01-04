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
  ],
})
