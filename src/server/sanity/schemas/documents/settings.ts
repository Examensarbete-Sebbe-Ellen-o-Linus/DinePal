import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings and navigation',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'header',
      title: 'Header',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
  ],
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
      group: 'header',
    }),
    {
      name: 'footer',
      title: 'Footer',
      type: 'footer',
      group: 'footer',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
