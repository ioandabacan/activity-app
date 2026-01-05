import type { CollectionConfig } from 'payload'

export const Mentors: CollectionConfig = {
  slug: 'mentors',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'biography',
      type: 'richText',
    },
    {
      name: 'profilePhoto',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'linkedUser',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
    },
  ],
}
