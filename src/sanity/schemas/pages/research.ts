export default {
  name: 'research',
  title: 'Research Data Page',
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
      name: 'researchSections',
      title: 'Research Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'researchSection',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              description: 'Title of the research section (e.g., "Meditation Studies", "Placebo Effect")',
            },
            {
              name: 'category',
              title: 'Research Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Meditation', value: 'meditation' },
                  { title: 'Placebo Effect', value: 'placebo' },
                  { title: 'Mind-Body Connection', value: 'mindBody' },
                  { title: 'Stress Reduction', value: 'stress' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
            {
              name: 'summary',
              title: 'Research Summary',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'A brief summary of the research findings',
            },
            {
              name: 'keyFindings',
              title: 'Key Findings',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'finding',
                      title: 'Finding',
                      type: 'string',
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                    },
                    {
                      name: 'source',
                      title: 'Source',
                      type: 'string',
                      description: 'Citation or reference to the research paper',
                    },
                  ],
                },
              ],
            },
            {
              name: 'statistics',
              title: 'Statistics',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'statistic',
                      title: 'Statistic',
                      type: 'string',
                      description: 'The numerical finding (e.g., "47% reduction in stress")',
                    },
                    {
                      name: 'context',
                      title: 'Context',
                      type: 'text',
                      description: 'Explanation of what the statistic means',
                    },
                    {
                      name: 'source',
                      title: 'Source',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
            {
              name: 'visualData',
              title: 'Visual Data',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Chart/Graph Title',
                      type: 'string',
                    },
                    {
                      name: 'image',
                      title: 'Chart/Graph Image',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              name: 'relatedStudies',
              title: 'Related Studies',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Study Title',
                      type: 'string',
                    },
                    {
                      name: 'authors',
                      title: 'Authors',
                      type: 'string',
                    },
                    {
                      name: 'year',
                      title: 'Publication Year',
                      type: 'number',
                    },
                    {
                      name: 'journal',
                      title: 'Journal/Publication',
                      type: 'string',
                    },
                    {
                      name: 'url',
                      title: 'Study URL',
                      type: 'url',
                    },
                  ],
                },
              ],
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