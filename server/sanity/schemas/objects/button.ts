import {LinkIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: LinkIcon,
  fields: [
    {
      name: 'actionType',
      title: 'Action Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Go to Menu', value: 'go-to-menu'},
          {title: 'Book a Table', value: 'book-a-table'},
          {title: 'View shopping cart', value: 'shopping-cart'},
          {title: 'About Us', value: 'about'},
          {title: 'Gallery', value: 'gallery'},
          {title: 'Find us', value: 'find-us'},
        ],
      },
    },
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
})

// const buttonActions = {
//     'go-to-menu': '/menu',
//     'book-a-table': '/book-a-table',
//     'about-us': '/#about',
//     // ... fler mappningar ...
//   };

//   const CtaButton = ({ text, actionType }) => {
//     const url = buttonActions[actionType] || '#';
//     return <a href={url}>{text}</a>;
//   };
