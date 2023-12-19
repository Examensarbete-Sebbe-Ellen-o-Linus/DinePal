import {HomeIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  initialValue: {
    title: 'Home page',
  },
  groups: [
    {
      default: true,
      name: 'hero',
      title: 'Hero',
    },
    {
      name: 'selectedDishes',
      title: 'Selected dishes',
    },
    {
      name: 'image',
      title: 'Selected image',
    },
    {
      name: 'aboutUs',
      title: 'About us',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'about',
      title: 'About Section',
      type: 'about',
      group: 'aboutUs',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'selectedDishes',
      title: 'Selected Dishes',
      type: 'array',
      description: 'Choose your favourite dishes to be displayed on the home page',
      group: 'selectedDishes',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
      validation: (Rule) => Rule.required().min(1).max(10),
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description:
            'Enter a title for SEO, ideally under 60 characters. E.g. "DinePal: Gourmet Cuisine & Casual Dining".',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          description:
            'Provide a brief description of your restaurant and its offerings. Keep it under 160 characters to optimize for search engines. E.g. "Explore DinePal’s unique flavors, from classic comfort foods to adventurous new dishes."',
          type: 'text',
        },
      ],
    },
  ],
})
