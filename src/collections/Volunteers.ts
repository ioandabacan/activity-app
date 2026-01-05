import type { CollectionConfig } from 'payload'

export const Volunteers: CollectionConfig = {
  slug: 'volunteers',
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
      name: 'avatar',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'contact',
      type: 'text',
    },
    {
      name: 'policyDocument',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'superviser',
      type: 'relationship',
      relationTo: 'members' as any,
      hasMany: false,
    },
    {
      name: 'relatedUser',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
    },
  ],
}
