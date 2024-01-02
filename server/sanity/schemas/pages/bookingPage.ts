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
  ],
  preview: {
    prepare() {
      return {
        title: 'Booking page',
      }
    },
  },
})
