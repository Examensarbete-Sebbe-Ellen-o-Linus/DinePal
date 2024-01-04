import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      description: 'Select the social media platform.',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'Twitter', value: 'twitter'},
          {title: 'LinkedIn', value: 'linkedin'},
        ],
      },
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'string',

      validation: (Rule) =>
        Rule.required().error('Please enter the URL to your social media profile.'),
      description: 'Enter the URL to the social profile or page.',
    }),
  ],
})
