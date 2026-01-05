import type { CollectionConfig } from 'payload'

export const Locations: CollectionConfig = {
  slug: 'locations',
  fields: [
    {
      name: 'festivalEdition',
      type: 'relationship',
      relationTo: 'festival-editions' as any,
      required: true,
      hasMany: false,
    },
    {
      name: 'locationName',
      type: 'text',
      required: true,
    },
    {
      name: 'locationAddress',
      type: 'text',
    },
    {
      name: 'geoCoordinates',
      type: 'point',
    },
    {
      name: 'locationDescription',
      type: 'richText',
    },
    {
      name: 'layoutMap',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'maxCapacity',
      type: 'number',
      min: 0,
    },
    {
      name: 'amenities',
      type: 'array',
      fields: [
        {
          name: 'amenityName',
          type: 'text',
        },
      ],
    },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'responsiblePerson',
      type: 'relationship',
      relationTo: 'volunteers' as any,
      hasMany: false,
    },
  ],
}
