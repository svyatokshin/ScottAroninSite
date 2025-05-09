export default {
  name: 'services',
  title: 'Services Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'servicesList',
      title: 'Services List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'serviceTitle',
              title: 'Service Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'icon',
              title: 'Service Icon',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
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