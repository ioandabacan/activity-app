import type { CollectionConfig } from 'payload'

export const Initiatives: CollectionConfig = {
  slug: 'initiatives',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'coverImage',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'externalLink',
      type: 'text',
      validate: (value?: string | string[] | null) => {
        const v = Array.isArray(value) ? (value[0] ?? '') : (value ?? '')
        if (v && !v.match(/^https?:\/\/.+/)) {
          return 'Invalid URL format'
        }
        return true
      },
    },
  ],
}
