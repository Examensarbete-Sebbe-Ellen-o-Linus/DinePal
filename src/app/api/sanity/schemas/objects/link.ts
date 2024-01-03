import {defineType} from 'sanity'

export default defineType({
  name: 'link',
  title: 'Navigation Link',
  type: 'object',
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
          {title: 'Book a Table', value: 'book-a-table'},
          {title: 'About us', value: 'about'},
          {title: 'Gallery', value: 'gallery'},
          {title: 'Contact', value: 'contact'},
          {title: 'Checkout', value: 'contact'},
        ],
      },
    },
  ],
})
