import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'Seo',
  type: 'object',

  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description:
        'This is the title of your site as it will appear in search engines. Keep it concise but descriptive.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description:
        'This description will appear in search engine results. Summarize the content of the site and include relevant keywords to improve search rankings.',
    }),
  ],
})
