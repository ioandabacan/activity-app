import type { CollectionConfig } from 'payload'

export const Guests: CollectionConfig = {
  slug: 'guests',
  fields: [
    {
      name: 'festivalEdition',
      type: 'relationship',
      relationTo: 'festival-editions' as any,
      required: true,
      hasMany: false,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'affiliation',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Speaker', value: 'speaker' },
        { label: 'Workshop Organizer', value: 'workshop_organizer' },
        { label: 'Exhibitor', value: 'exhibitor' },
      ],
    },
    {
      name: 'background',
      type: 'richText',
    },
    {
      name: 'guestPhoto',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'onlinePresence',
      type: 'text',
      validate: (value: string | null | undefined) => {
        if (value && !value.match(/^https?:\/\/.+/)) {
          return 'Please enter a valid URL'
        }
        return true
      },
    },
  ],
}
