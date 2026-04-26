export type ContactLink = {
  label: string
  href: string
}

export type Stat = {
  label: string
  value: string
}

export type Screenshot = {
  alt?: string
  src: string | null
  label?: string
  note?: string
}

export type ExperienceEntry = {
  title: string
  company: string
  period: string
  summary: string
  highlights: string[]
}

export type SpeakingEntry = {
  title: string
  organization: string
  period: string
  role: string
  summary: string
  posterUrl?: string
  posterAlt?: string
}

export type SkillGroup = {
  group: string
  items: string[]
}

export type ProcessStep = {
  title: string
  description: string
}

export type FAQ = {
  question: string
  answer: string
}

export type ProjectEntry = {
  slug: string
  title: string
  summary: string
  screenshots: Screenshot[]
  subtitle?: string
  year?: string
  category?: string
  tags?: string[]
  role?: string
  stack?: string[]
  contributions?: string[]
  outcomes?: string[]
  confidentiality?: string
  featured?: boolean
  accent?: string
}

export type ProfileData = {
  name: string
  headline: string
  shortBio: string
  longBio: string
  location: string
  availability: string
  resumeUrl: string
  avatarUrl?: string | null
  avatarAlt?: string
  contactLinks: ContactLink[]
  stats: Stat[]
}

export type HeroData = {
  eyebrow: string
  headlinePrefix: string
  headlineEmphasis: string
  headlineSuffix: string
  subheadline: string
  badges: string[]
}

export type PortfolioData = {
  profile: ProfileData
  hero: HeroData
  experience: ExperienceEntry[]
  speaking: SpeakingEntry[]
  skills: SkillGroup[]
  process: ProcessStep[]
  chatPrompts: string[]
  faqs: FAQ[]
  projects: ProjectEntry[]
}

export type KnowledgeEntry = {
  id: string
  topic: string
  sourceType: 'resume' | 'project' | 'faq' | 'bio'
  tags: string[]
  answer: string
}

export type ChatHistoryEntry = {
  role: 'user' | 'assistant'
  content: string
}

export type ChatRequest = {
  message: string
  pageContext?: string
  history?: ChatHistoryEntry[]
}

export type ChatResponse = {
  answer: string
  grounded: boolean
  sources: string[]
  suggestedPrompts: string[]
  fallbackToContact?: boolean
}

export type ContactRequest = {
  name: string
  email: string
  message: string
}

export type ContactResponse = {
  ok: boolean
  message: string
  fallbackToMailto?: boolean
}
