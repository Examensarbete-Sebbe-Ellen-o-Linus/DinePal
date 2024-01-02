import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bookingPage',
  title: 'Booking page',
  type: 'document',
  groups: [
    {
      name: 'booking',
      title: 'Booking page',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'booking',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      group: 'booking',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
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
