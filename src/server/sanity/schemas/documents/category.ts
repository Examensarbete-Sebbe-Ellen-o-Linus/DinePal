import {LemonIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const orderNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: LemonIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Category',
      type: 'string',
      description: 'Add a category for your menu',
    }),
  ],
})
