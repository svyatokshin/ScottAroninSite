export default {
  name: 'contact',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'object',
          fields: [
            {
              name: 'street',
              title: 'Street Address',
              type: 'string',
            },
            {
              name: 'city',
              title: 'City',
              type: 'string',
            },
            {
              name: 'state',
              title: 'State/Province',
              type: 'string',
            },
            {
              name: 'postalCode',
              title: 'Postal/Zip Code',
              type: 'string',
            },
            {
              name: 'country',
              title: 'Country',
              type: 'string',
              initialValue: 'United States',
            }
          ]
        },
        {
          name: 'socialLinks',
          title: 'Social Media Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  { title: 'Monday', value: 'monday' },
                  { title: 'Tuesday', value: 'tuesday' },
                  { title: 'Wednesday', value: 'wednesday' },
                  { title: 'Thursday', value: 'thursday' },
                  { title: 'Friday', value: 'friday' },
                  { title: 'Saturday', value: 'saturday' },
                  { title: 'Sunday', value: 'sunday' },
                ],
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'isOpen',
              title: 'Is Open',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'openTime',
              title: 'Opening Time',
              type: 'string',
              hidden: ({ parent }: any) => !parent?.isOpen,
            },
            {
              name: 'closeTime',
              title: 'Closing Time',
              type: 'string',
              hidden: ({ parent }: any) => !parent?.isOpen,
            },
            {
              name: 'notes',
              title: 'Additional Notes',
              type: 'string',
              description: 'Optional notes (e.g., "By appointment only")',
            }
          ],
        }
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
        },
      ],
    },
  ],
} 