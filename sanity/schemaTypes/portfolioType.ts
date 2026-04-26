import { defineArrayMember, defineField, defineType } from 'sanity'

const stringList = defineArrayMember({ type: 'string' })

export const portfolioType = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'profile',
      title: 'Profile',
      type: 'object',
      fields: [
        defineField({ name: 'name', type: 'string' }),
        defineField({ name: 'headline', type: 'text' }),
        defineField({ name: 'shortBio', type: 'text' }),
        defineField({ name: 'longBio', type: 'text' }),
        defineField({ name: 'location', type: 'string' }),
        defineField({ name: 'availability', type: 'string' }),
        defineField({ name: 'resumeUrl', type: 'string' }),
        defineField({ name: 'avatarUrl', type: 'string' }),
        defineField({ name: 'avatarAlt', type: 'string' }),
        defineField({
          name: 'contactLinks',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'label', type: 'string' }),
                defineField({ name: 'href', type: 'string' }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'stats',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'label', type: 'string' }),
                defineField({ name: 'value', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'headlinePrefix', type: 'string' }),
        defineField({ name: 'headlineEmphasis', type: 'string' }),
        defineField({ name: 'headlineSuffix', type: 'text' }),
        defineField({ name: 'subheadline', type: 'text' }),
        defineField({ name: 'badges', type: 'array', of: [stringList] }),
      ],
    }),
    defineField({
      name: 'experience',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'company', type: 'string' }),
            defineField({ name: 'period', type: 'string' }),
            defineField({ name: 'summary', type: 'text' }),
            defineField({ name: 'highlights', type: 'array', of: [stringList] }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'speaking',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'organization', type: 'string' }),
            defineField({ name: 'period', type: 'string' }),
            defineField({ name: 'role', type: 'string' }),
            defineField({ name: 'summary', type: 'text' }),
            defineField({ name: 'posterUrl', type: 'string' }),
            defineField({ name: 'posterAlt', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'skills',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'group', type: 'string' }),
            defineField({ name: 'items', type: 'array', of: [stringList] }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'process',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'description', type: 'text' }),
          ],
        }),
      ],
    }),
    defineField({ name: 'chatPrompts', type: 'array', of: [stringList] }),
    defineField({
      name: 'faqs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'question', type: 'string' }),
            defineField({ name: 'answer', type: 'text' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'projects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'slug', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'summary', type: 'text' }),
            defineField({
              name: 'screenshots',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'alt', type: 'string' }),
                    defineField({
                      name: 'uploadedImage',
                      title: 'Uploaded image',
                      type: 'image',
                      options: { hotspot: true },
                    }),
                    defineField({
                      name: 'src',
                      title: 'External image URL',
                      type: 'string',
                      description: 'Fallback URL. Uploaded image is used first when both are filled.',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
