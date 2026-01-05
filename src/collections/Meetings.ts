import type { CollectionConfig } from 'payload'

export const Meetings: CollectionConfig = {
  slug: 'meetings',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'meetingDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'meetingVenue',
      type: 'text',
      required: true,
    },
    {
      name: 'meetingType',
      type: 'select',
      required: true,
      options: [
        { label: 'Workshop', value: 'workshop' },
        { label: 'Anti-Workshop', value: 'anti_workshop' },
      ],
    },
    {
      name: 'topicName',
      type: 'select',
      admin: {
        condition: (data) => data.meetingType === 'workshop',
      },
      options: [
        { label: 'Demo Your Stack', value: 'demo_stack' },
        { label: 'Learn from Failures', value: 'learn_failures' },
        { label: 'Business Meet', value: 'business_meet' },
      ],
    },
    {
      name: 'facilitator',
      type: 'relationship',
      relationTo: 'members' as any,
      hasMany: false,
      admin: {
        condition: (data) => data.meetingType === 'workshop',
      },
    },
    {
      name: 'discussionTopics',
      type: 'richText',
      admin: {
        condition: (data) => data.meetingType === 'anti_workshop',
      },
    },
  ],
}
