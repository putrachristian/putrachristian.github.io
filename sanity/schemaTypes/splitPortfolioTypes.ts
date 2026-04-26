import {defineArrayMember, defineField, defineType} from 'sanity'

const stringList = defineArrayMember({ type: 'string' })

const contactLink = defineArrayMember({
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string' }),
    defineField({ name: 'href', type: 'string' }),
  ],
})

const stat = defineArrayMember({
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string' }),
    defineField({ name: 'value', type: 'string' }),
  ],
})

const avatarImageFields = [
  defineField({ name: 'alt', type: 'string' }),
  defineField({
    name: 'uploadedImage',
    title: 'Uploaded image',
    type: 'image',
    options: { hotspot: true },
  }),
  defineField({
    name: 'src',
    title: 'Fallback URL',
    type: 'string',
    description: 'Use a public URL or /public path. Uploaded image is used first when both are filled.',
  }),
]

const screenshot = defineArrayMember({
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
})

export const siteProfileType = defineType({
  name: 'siteProfile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'headline', type: 'text' }),
    defineField({ name: 'shortBio', type: 'text' }),
    defineField({ name: 'longBio', type: 'text' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'availability', type: 'string' }),
    defineField({ name: 'resumeUrl', type: 'string' }),
    defineField({
      name: 'avatarFile',
      title: 'Home avatar upload',
      type: 'file',
      description: 'Upload the home avatar video here. This is used before Avatar image and Avatar URL.',
    }),
    defineField({
      name: 'avatarImage',
      title: 'Home avatar image upload',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional image fallback if you do not use a video.',
    }),
    defineField({
      name: 'avatarUrl',
      title: 'Home avatar fallback URL',
      type: 'string',
      description: 'Use a public URL or /public path. Upload fields are used first.',
    }),
    defineField({ name: 'avatarPosterUrl', title: 'Home video poster URL', type: 'string' }),
    defineField({ name: 'avatarAlt', type: 'string' }),
    defineField({
      name: 'chatAvatarImage',
      title: 'AI chat avatar upload',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'chatAvatarUrl', title: 'AI chat avatar fallback URL', type: 'string' }),
    defineField({ name: 'chatAvatarAlt', title: 'AI chat avatar alt text', type: 'string' }),
    defineField({
      name: 'sectionAvatars',
      title: 'Floating section avatars',
      type: 'object',
      fields: [
        defineField({ name: 'projects', title: 'Projects avatar', type: 'object', fields: avatarImageFields }),
        defineField({ name: 'talks', title: 'Talks avatar', type: 'object', fields: avatarImageFields }),
        defineField({ name: 'about', title: 'About avatar', type: 'object', fields: avatarImageFields }),
        defineField({ name: 'contact', title: 'Contact avatar', type: 'object', fields: avatarImageFields }),
      ],
    }),
    defineField({ name: 'contactLinks', type: 'array', of: [contactLink] }),
    defineField({ name: 'stats', type: 'array', of: [stat] }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'headline' },
  },
})

export const homeHeroType = defineType({
  name: 'homeHero',
  title: 'Home Hero',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', type: 'string' }),
    defineField({ name: 'headlinePrefix', type: 'string' }),
    defineField({ name: 'headlineEmphasis', type: 'string' }),
    defineField({ name: 'headlineSuffix', type: 'text' }),
    defineField({ name: 'subheadline', type: 'text' }),
    defineField({ name: 'badges', type: 'array', of: [stringList] }),
  ],
  preview: {
    select: { title: 'headlineEmphasis', subtitle: 'eyebrow' },
  },
})

export const experienceEntryType = defineType({
  name: 'experienceEntry',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'company', type: 'string' }),
    defineField({ name: 'period', type: 'string' }),
    defineField({ name: 'summary', type: 'text' }),
    defineField({ name: 'highlights', type: 'array', of: [stringList] }),
  ],
  orderings: [{ title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'company' },
  },
})

export const speakingEntryType = defineType({
  name: 'speakingEntry',
  title: 'Talk',
  type: 'document',
  fields: [
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'organization', type: 'string' }),
    defineField({ name: 'period', type: 'string' }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'summary', type: 'text' }),
    defineField({ name: 'posterUrl', type: 'string' }),
    defineField({ name: 'posterAlt', type: 'string' }),
  ],
  orderings: [{ title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'organization' },
  },
})

export const skillGroupType = defineType({
  name: 'skillGroup',
  title: 'Skill Group',
  type: 'document',
  fields: [
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'group', type: 'string' }),
    defineField({ name: 'items', type: 'array', of: [stringList] }),
  ],
  orderings: [{ title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'group' },
  },
})

export const processStepType = defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'document',
  fields: [
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
  ],
  orderings: [{ title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
})

export const chatSettingsType = defineType({
  name: 'chatSettings',
  title: 'AI Chat',
  type: 'document',
  fields: [defineField({ name: 'chatPrompts', title: 'Suggested prompts', type: 'array', of: [stringList] })],
  preview: {
    prepare: () => ({ title: 'AI Chat' }),
  },
})

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'question', type: 'string' }),
    defineField({ name: 'answer', type: 'text' }),
  ],
  orderings: [{ title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'question', subtitle: 'answer' },
  },
})

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'slug', type: 'string' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'summary', type: 'text' }),
    defineField({ name: 'screenshots', type: 'array', of: [screenshot] }),
  ],
  orderings: [{ title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'slug' },
  },
})
