import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    defineField({
      name: 'logotype',
      title: 'Logo',
      type: 'image',
      description:
        'Upload your company logo here. It will be displayed in the footer on all pages.',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening hours',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          title: 'Street',
          type: 'string',
        }),
        defineField({
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Phone number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'socialLink'}],
      description: 'Add links to social channels here.',
    }),
    defineField({
      name: 'displaySocialsOptions',
      title: 'Display as text instead of icon',
      type: 'boolean',
      description:
        'Optionaly you can display your socials with text. E.g. instagram. Default will be to display them as icons',
      options: {
        layout: 'checkbox',
      },
    }),
  ],
})
