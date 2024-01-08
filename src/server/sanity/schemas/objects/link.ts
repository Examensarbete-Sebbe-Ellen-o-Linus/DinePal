import {LinkIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'link',
  title: 'Navigation Link',
  type: 'object',
  icon: LinkIcon,

  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Menu', value: 'menu'},
          {title: 'Book a Table', value: 'booking'},
          {title: 'About us', value: 'about'},
          {title: 'Gallery', value: 'gallery'},
          {title: 'View shopping cart', value: 'shopping-cart'},
          {title: 'Contact', value: 'contact'},
          {title: 'Checkout', value: 'checkout'},
        ],
      },
    },
  ],
})
