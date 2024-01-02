import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'colorTheme',
  title: 'Color theme',
  type: 'document',
  fields: [
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'simplerColor',
      description:
        'Select the accent color that will be displayed across the page on buttons and other details. Use the color picker to choose a custom color.',
      options: {
        defaultColorFormat: 'rgba',
        colorList: [{label: 'Click to select custom color...', value: 'custom'}],
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Color theme',
      }
    },
  },
})
