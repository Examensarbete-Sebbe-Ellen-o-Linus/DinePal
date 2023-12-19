import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'menuItem',
  title: 'Menu item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags for item',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tag',
          fields: [
            {type: 'string', name: 'label'},
            {type: 'string', name: 'value'},
          ],
        }),
      ],
    }),
  ],
})
