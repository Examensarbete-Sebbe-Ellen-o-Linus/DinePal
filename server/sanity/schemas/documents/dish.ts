import {LemonIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dishes',
  type: 'document',
  icon: LemonIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Enter the name of the dish, such as "Salmon pasta".',
      validation: (Rule) => Rule.required().error('Name is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().error('Description is required'),
      description:
        'Describe the dish, its taste, presentation, and any special ingredients. Keep it enticing and brief.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Upload an image that represents the dish.',
      validation: (Rule) => Rule.required().error('Image is required.'),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }),
      ],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      description:
        'Set the price of the dish in SEK. Do not include currency symbols; enter numbers only.',
      type: 'number',
      validation: (Rule) => Rule.required().error('Price is required'),
    }),
    defineField({
      name: 'tags',
      title: 'Tags for item',
      type: 'array',
      description: 'Select tags to describe the dish',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Vegan', value: 'vegan'},
          {title: 'Gluten Free', value: 'glutenFree'},
          {title: 'Spicy', value: 'spicy'},
        ],
      },
      validation: (Rule) =>
        Rule.custom((tags) => {
          const uniqueTags = new Set(tags)
          if (tags)
            if (uniqueTags.size !== tags.length) {
              return 'Duplicate tags are not allowed'
            }
          return true
        }),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Generate URL from product title by pressing the generate button',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
  ],
})
