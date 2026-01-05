import type { CollectionConfig } from 'payload'

export const Schedule: CollectionConfig = {
  slug: 'schedule',
  fields: [
    {
      name: 'festivalEdition',
      type: 'relationship',
      relationTo: 'festival-editions' as any,
      required: true,
      hasMany: false,
    },
    {
      name: 'beginTime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'finishTime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'scheduledActivity',
      type: 'relationship',
      relationTo: 'activities',
      required: true,
      hasMany: false,
    },
    {
      name: 'venue',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
      hasMany: false,
    },
  ],
}
