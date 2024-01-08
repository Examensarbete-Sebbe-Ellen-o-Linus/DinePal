import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',

  fields: [
    defineField({
      name: 'preFooter',
      title: 'Pre-Footer',
      type: 'image',
      description: 'Upload an image here. It will be displayed as pre-footer on all pages.',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          description: 'Provide an descriptive text which conveys the content of the image',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'logotype',
      title: 'Logo',
      type: 'image',
      description:
        'Upload your company logo here. It will be displayed in the footer on all pages.',
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          description: 'Provide an descriptive text which conveys the content of the image',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        defineField({
          name: 'homePageLink',
          title: 'Home Page Link',
          type: 'url',
          description: 'URL to link the logo to the home page.',
        }),
      ],
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dailyHours',
          title: 'Daily Hours',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
            },
            {
              name: 'hours',
              title: 'Hours',
              type: 'string',
            },
          ],
        },
      ],
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
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  title: 'Alternative Text',
                  type: 'string',
                },
              ],
            }),
          ],
        },
      ],
      description: 'Add links to social channels here.',
    }),
  ],
})
