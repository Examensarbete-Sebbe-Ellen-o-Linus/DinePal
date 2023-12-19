import {LemonIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dishes',
  type: 'document',
  icon: LemonIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Enter the name of the dish, such as "Salmon pasta".',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description:
        'Describe the dish, its taste, presentation, and any special ingredients. Keep it enticing and brief.',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Upload an image that represents the dish attractively.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      description:
        'Set the price of the dish in SEK. Do not include currency symbols; enter numbers only.',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags for item',
      description:
        'Add tags that describe the dish such as "Gluten-free", "Vegan", or "Spicy". These help customers filter dishes based on their dietary preferences.',
      of: [
        {
          type: 'object',
          name: 'tag',
          fields: [
            {type: 'string', name: 'label'},
            {type: 'string', name: 'value'},
          ],
        },
      ],
    },
  ],
})
