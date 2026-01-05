import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  fields: [
    {
      name: 'festivalEdition',
      type: 'relationship',
      relationTo: 'festival-editions' as any,
      required: true,
      hasMany: false,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'details',
      type: 'richText',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Exhibition', value: 'expo' },
        { label: 'Presentation', value: 'talk' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Social Event', value: 'social' },
        { label: 'Entertainment', value: 'entertainment' },
      ],
    },
    {
      name: 'targetGroups',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Children', value: 'kids' },
        { label: 'Young Adults', value: 'teens' },
        { label: 'Adults', value: 'adults' },
        { label: 'Business', value: 'professionals' },
        { label: 'Everyone', value: 'general_public' },
      ],
    },
    {
      name: 'participants',
      type: 'relationship',
      relationTo: 'guests' as any,
      hasMany: true,
    },
    {
      name: 'partOfSection',
      type: 'relationship',
      relationTo: 'festival-sections' as any,
      hasMany: false,
    },
  ],
}
