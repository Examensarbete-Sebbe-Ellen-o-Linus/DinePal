import {HomeIcon} from '@sanity/icons'
import {defineType} from 'sanity'

const TITLE = 'Home Page'

export default defineType({
  name: 'homePage',
  title: TITLE,
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
          validation: (Rule) =>
            Rule.max(60).warning('The meta title should be under 60 characters'),
          description:
            'Enter a title for SEO, ideally under 60 characters. E.g. "DinePal: Gourmet Cuisine & Casual Dining".',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          description:
            'Provide a brief description under 160 characters of your restaurant and its offerings. E.g. "Explore DinePal’s unique flavors, from classic comfort foods to adventurous new dishes."',
          type: 'text',
          validation: (Rule) =>
            Rule.max(160).warning('The meta desciption should be under 160 characters'),
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        subtitle: 'Index',
        title: TITLE,
      }
    },
  },
})
