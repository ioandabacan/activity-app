import type { CollectionConfig } from 'payload'

export const FestivalSections: CollectionConfig = {
  slug: 'festival-sections',
  fields: [
    {
      name: 'festivalEdition',
      type: 'relationship',
      relationTo: 'festival-editions' as any,
      required: true,
      hasMany: false,
    },
    {
      name: 'sectionName',
      type: 'text',
      required: true,
    },
  ],
}
