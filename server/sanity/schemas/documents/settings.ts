import {CogIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings and navigation',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'header',
      title: 'Header',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    {
      name: 'header',
      title: 'Header',
      type: 'object',
      group: 'header',
      validation: (Rule) => Rule.required(),

      fields: [
        {
          name: 'logo',
          title: 'Logo',
          type: 'image',
          description:
            'Upload your company logo here. It will be displayed in the header across the site.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'navLinks',
          title: 'Navigation Links',
          type: 'array',
          of: [{type: 'link'}],
          description:
            'Define the links for the site navigation. Each link should direct users to a different section or page.',
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'chartIcon',
          title: 'Cart icon',
          type: 'image',
          options: {
            hotspot: true,
          },
          description:
            'Upload an icon for the shopping cart. This will be used in the header to represent the cart.',
        },
      ],
    },

    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      validation: (Rule) => Rule.required(),
      description:
        'Add different sections to the footer, such as contact information, address, navigation links, socials or any additional info about your business.',

      fields: [
        {
          name: 'sections',
          title: 'Sections',
          type: 'array',
          of: [{type: 'footerSection'}],
          validation: (Rule) => Rule.required().min(1).max(4),
        },
      ],
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
            'This is the title of your site as it will appear in search engines. Keep it concise but descriptive.',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description:
            'This description will appear in search engine results. Summarize the content of the site and include relevant keywords to improve search rankings.',
        },
      ],
    },
  ],
})
