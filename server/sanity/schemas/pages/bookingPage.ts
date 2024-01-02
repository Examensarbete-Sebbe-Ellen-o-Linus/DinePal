import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bookingPage',
  title: 'Booking page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Booking page',
      }
    },
  },
})
