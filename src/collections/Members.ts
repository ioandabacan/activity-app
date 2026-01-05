import type { CollectionConfig } from 'payload'

export const Members: CollectionConfig = {
  slug: 'members',
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Aspirant', value: 'aspirant' },
        { label: 'Voting', value: 'voting' },
      ],
    },
    {
      name: 'role',
      type: 'select',
      admin: {
        condition: (data) => data.status === 'voting',
      },
      options: [
        { label: 'Regular', value: 'regular' },
        { label: 'Founder', value: 'founder' },
        { label: 'Honorary', value: 'honorary' },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'organization',
      type: 'text',
    },
    {
      name: 'profileImage',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'linkedinProfile',
      type: 'text',
      admin: {
        description: 'LinkedIn profile URL',
        placeholder: 'https://linkedin.com/in/username',
      },
    },
  ],
}
