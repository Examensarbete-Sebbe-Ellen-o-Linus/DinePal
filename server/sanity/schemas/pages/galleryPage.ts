import {ImageIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
  type: 'document',
  icon: ImageIcon,
  initialValue: {
    title: 'Gallery',
  },
  groups: [
    {
      default: true,
      name: 'gallery',
      title: 'Gallery',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],

  fields: [
    {
      name: 'gallery',
      title: 'Gallery title',
      type: 'string',
      group: 'gallery',
    },
    {
      name: 'galleryImgs',
      title: 'Gallery Images',
      description:
        'Upload images of your restaurant’s ambiance and dishes. These photos will be showcased in the gallery on your page.',
      type: 'array',
      group: 'gallery',

      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'gallery',
        maxLength: 200,
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      description:
        'These settings will help improve the visibility of your gallery page in search engine results.',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',

          description:
            'Provide a title under 60 characters of the gallery page. Keep it descriptive yet concise, such as "Explore Our Gallery | DinePal".',
          validation: (Rule) =>
            Rule.max(60).warning('The meta title should be under 160 characters'),
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          description:
            'Write a summary of maximum 160 characters of what visitors can expect to see in the gallery.  like "View DinePal´s culinary delights and cozy dining atmosphere."',
          validation: (Rule) =>
            Rule.max(160).warning('The meta desciption should be under 160 characters'),
          type: 'text',
        },
      ],
    },
  ],
})
