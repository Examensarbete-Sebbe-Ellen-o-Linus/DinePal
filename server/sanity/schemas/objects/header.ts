import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    defineField({
      name: 'logotype',
      title: 'Logo',
      type: 'image',
      description:
        'Upload your company logo here. It will be displayed in the header on all pages.',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [{type: 'link'}],
      description:
        'Define the links for the site navigation. Each link should direct users to a different section or page.',
    }),
  ],
})
