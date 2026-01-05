import type { CollectionConfig } from 'payload'

export const Ninjas: CollectionConfig = {
  slug: 'ninjas',
  fields: [
    {
      name: 'childName',
      type: 'text',
      required: true,
    },
    {
      name: 'age',
      type: 'number',
      required: true,
      min: 5,
      max: 18,
    },
    {
      name: 'additionalInfo',
      type: 'textarea',
    },
    {
      name: 'parentName',
      type: 'text',
      required: true,
    },
    {
      name: 'parentEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'parentPhone',
      type: 'text',
      required: true,
    },
    {
      name: 'safetyConsent',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'mediaConsent',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
  ],
}
