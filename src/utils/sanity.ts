import type { PortfolioData } from '../types'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2025-08-15'

const hasSanityConfig = Boolean(projectId && dataset)

const portfolioQuery = `{
  "profile": select(
    defined(*[_type == "siteProfile"][0]._id) => *[_type == "siteProfile"][0]{
      name,
      headline,
      shortBio,
      longBio,
      location,
      availability,
      resumeUrl,
      "avatarUrl": coalesce(avatarFile.asset->url, avatarImage.asset->url, avatarUrl),
      avatarPosterUrl,
      avatarAlt,
      "chatAvatarUrl": coalesce(chatAvatarImage.asset->url, chatAvatarUrl),
      chatAvatarAlt,
      "sectionAvatars": {
        "projects": {
          "src": coalesce(sectionAvatars.projects.uploadedImage.asset->url, sectionAvatars.projects.src),
          "alt": sectionAvatars.projects.alt
        },
        "talks": {
          "src": coalesce(sectionAvatars.talks.uploadedImage.asset->url, sectionAvatars.talks.src),
          "alt": sectionAvatars.talks.alt
        },
        "about": {
          "src": coalesce(sectionAvatars.about.uploadedImage.asset->url, sectionAvatars.about.src),
          "alt": sectionAvatars.about.alt
        },
        "contact": {
          "src": coalesce(sectionAvatars.contact.uploadedImage.asset->url, sectionAvatars.contact.src),
          "alt": sectionAvatars.contact.alt
        }
      },
      "contactLinks": coalesce(contactLinks[]{label, href}, []),
      "stats": coalesce(stats[]{label, value}, [])
    },
    *[_type == "portfolio"][0].profile
  ),
  "hero": select(
    defined(*[_type == "homeHero"][0]._id) => *[_type == "homeHero"][0]{
      eyebrow,
      headlinePrefix,
      headlineEmphasis,
      headlineSuffix,
      subheadline,
      "badges": coalesce(badges, [])
    },
    *[_type == "portfolio"][0].hero
  ),
  "experience": select(
    count(*[_type == "experienceEntry"]) > 0 => *[_type == "experienceEntry"] | order(order asc, _createdAt asc){
      title,
      company,
      period,
      "summary": coalesce(summary, ""),
      "highlights": coalesce(highlights, [])
    },
    *[_type == "portfolio"][0].experience
  ),
  "speaking": select(
    count(*[_type == "speakingEntry"]) > 0 => *[_type == "speakingEntry"] | order(order asc, _createdAt asc){
      title,
      organization,
      period,
      role,
      "summary": coalesce(summary, ""),
      "posterUrl": coalesce(posterImage.asset->url, posterUrl),
      posterAlt
    },
    *[_type == "portfolio"][0].speaking[]{
      title,
      organization,
      period,
      role,
      "summary": coalesce(summary, ""),
      "posterUrl": coalesce(posterImage.asset->url, posterUrl),
      posterAlt
    }
  ),
  "skills": select(
    count(*[_type == "skillGroup"]) > 0 => *[_type == "skillGroup"] | order(order asc, _createdAt asc){
      group,
      "items": coalesce(items, [])
    },
    *[_type == "portfolio"][0].skills
  ),
  "process": select(
    count(*[_type == "processStep"]) > 0 => *[_type == "processStep"] | order(order asc, _createdAt asc){
      title,
      "description": coalesce(description, "")
    },
    *[_type == "portfolio"][0].process
  ),
  "chatPrompts": select(
    defined(*[_type == "chatSettings"][0]._id) => coalesce(*[_type == "chatSettings"][0].chatPrompts, []),
    coalesce(*[_type == "portfolio"][0].chatPrompts, [])
  ),
  "faqs": select(
    count(*[_type == "faq"]) > 0 => *[_type == "faq"] | order(order asc, _createdAt asc){
      question,
      "answer": coalesce(answer, "")
    },
    *[_type == "portfolio"][0].faqs
  ),
  "projects": select(
    count(*[_type == "project"]) > 0 => *[_type == "project"] | order(order asc, _createdAt asc){
      slug,
      title,
      "summary": coalesce(summary, ""),
      "screenshots": coalesce(screenshots[]{
        alt,
        "src": coalesce(uploadedImage.asset->url, src)
      }, [])
    },
    *[_type == "portfolio"][0].projects[]{
      slug,
      title,
      "summary": coalesce(summary, ""),
      "screenshots": coalesce(screenshots[]{
        alt,
        "src": coalesce(uploadedImage.asset->url, src)
      }, [])
    }
  )
}`

export async function fetchSanityPortfolio(): Promise<PortfolioData | null> {
  if (!hasSanityConfig) {
    return null
  }

  try {
    const { createClient } = await import('@sanity/client')
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
      stega: false,
    })

    return await client.fetch<PortfolioData | null>(portfolioQuery)
  } catch (error) {
    console.warn('Failed to fetch Sanity portfolio data. Falling back to local JSON.', error)
    return null
  }
}
