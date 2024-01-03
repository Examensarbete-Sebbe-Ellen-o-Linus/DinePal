import {IceCreamIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'colorTheme',
  title: 'Color theme',
  type: 'document',
  icon: IceCreamIcon,

  fields: [
    // Fyll på med textfärger, bakgrundsfärger, accentfärger, typografi osv
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
})
