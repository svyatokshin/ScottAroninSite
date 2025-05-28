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
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'About Title',
          type: 'string',
        },
        {
          name: 'image',
          title: 'About Image',
          type: 'image',
          options: {
            hotspot: true
          },
          description: 'Upload a square image (1:1 aspect ratio recommended)'
        },
        {
          name: 'content',
          title: 'About Content',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Brief about text, supports rich formatting.'
        }
      ]
    },
    {
      name: 'cardSectionsTitle',
      title: 'Card Sections Title',
      type: 'string',
    },
    {
      name: 'cardSectionOne',
      title: 'Card Section One',
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
      name: 'cardSectionTwo',
      title: 'Card Section Two',
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
      name: 'cardSectionThree',
      title: 'Card Section Three',
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
      name: 'mainSectionOne',
      title: 'Main Section One',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Optional title for this section',
        },
        {
          name: 'mediaType',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              { title: 'Image', value: 'image' },
              { title: 'Video', value: 'video' }
            ],
            layout: 'radio'
          },
          initialValue: 'image'
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }: any) => parent?.mediaType === 'video'
        },
        {
          name: 'video',
          title: 'Section Video',
          type: 'object',
          hidden: ({ parent }: any) => parent?.mediaType === 'image',
          fields: [
            {
              name: 'url',
              title: 'Video URL',
              type: 'url',
              description: 'URL to the video (YouTube, Vimeo, etc.)',
              validation: (Rule: any) => Rule.uri({
                scheme: ['http', 'https']
              })
            },
            {
              name: 'poster',
              title: 'Video Poster',
              type: 'image',
              description: 'Optional poster image for the video',
              options: {
                hotspot: true
              }
            }
          ]
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
      name: 'mainSectionTwo',
      title: 'Main Section Two',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: 'Optional title for this section',
        },
        {
          name: 'mediaType',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              { title: 'Image', value: 'image' },
              { title: 'Video', value: 'video' }
            ],
            layout: 'radio'
          },
          initialValue: 'image'
        },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }: any) => parent?.mediaType === 'video'
        },
        {
          name: 'video',
          title: 'Section Video',
          type: 'object',
          hidden: ({ parent }: any) => parent?.mediaType === 'image',
          fields: [
            {
              name: 'url',
              title: 'Video URL',
              type: 'url',
              description: 'URL to the video (YouTube, Vimeo, etc.)',
              validation: (Rule: any) => Rule.uri({
                scheme: ['http', 'https']
              })
            },
            {
              name: 'poster',
              title: 'Video Poster',
              type: 'image',
              description: 'Optional poster image for the video',
              options: {
                hotspot: true
              }
            }
          ]
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