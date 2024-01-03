import {defineType} from 'sanity'

export default defineType({
  name: 'footerSection',
  title: 'Footer Section',
  description: 'Add a secton ',
  type: 'object',

  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'link'}],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
    },
  ],
})
