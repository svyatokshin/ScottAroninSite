export default {
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'mainContent',
      title: 'Main Content',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
        },
        {
          name: 'bio',
          title: 'Bio',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'profileImage',
          title: 'Profile Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Mission Statement Heading',
          type: 'string',
        },
        {
          name: 'content',
          title: 'Mission Statement Content',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ]
    },
    {
      name: 'additionalContent',
      title: 'Additional Content',
      type: 'array',
      of: [{ type: 'block' }],
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