import {defineField, defineType} from 'sanity'

// schemas/article.ts
export default defineType({
  name: 'article',
  type: 'document',
  title: 'Article',

  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
