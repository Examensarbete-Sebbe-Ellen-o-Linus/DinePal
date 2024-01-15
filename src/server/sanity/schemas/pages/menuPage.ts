import {LemonIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const TITLE = 'Menu page'

export default defineType({
  name: 'menuPage',
  title: TITLE,
  type: 'document',
  icon: LemonIcon,

  groups: [
    {
      name: 'menu',
      title: 'Menu page',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'promo',
      type: 'object',
      title: 'Promo section',
      group: 'menu',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
          description: 'Write a short promo text witch will be displayed under the menu.',
        }),
        defineField({
          name: 'button',
          title: 'Button',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})
