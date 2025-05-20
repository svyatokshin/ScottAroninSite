export default {
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Hero Heading',
          type: 'string',
        },
        {
          name: 'subheading',
          title: 'Hero Subheading',
          type: 'text',
        },
        {
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'sectionOne',
      title: 'Section One',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Optional title for this section',
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },
    {
      name: 'sectionTwo',
      title: 'Section Two',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Optional title for this section',
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },
    {
      name: 'sectionThree',
      title: 'Section Three',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Optional title for this section',
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'content',
          title: 'Section Content',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },
    {
      name: 'wellnessPillarsImage',
      title: 'Wellness Pillars Image',
      type: 'image',
      description: 'Background image for the wellness pillars section',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'wellnessPillars',
      title: 'Five Pillars of Wellness',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pillar',
          title: 'Wellness Pillar',
          fields: [
            {
              name: 'title',
              title: 'Pillar Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Pillar Description',
              type: 'text',
            },
            {
              name: 'image',
              title: 'Pillar Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'link',
              title: 'Pillar Link',
              type: 'url',
              description: 'Optional link to learn more about this pillar',
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
            }
          ],
        }
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