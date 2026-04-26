import { useEffect, useMemo, useState } from 'react'
import portfolioData from './data/portfolio.json'
import type { PortfolioData, ProfileData } from './types'
import { AVATARS } from './assets'
import { AmbientBackground } from './components/AmbientBackground'
import { ConsoleShell } from './components/ConsoleShell'
import { IntroOverlay } from './components/IntroOverlay'
import { TalkPosterLightbox, type TalkPoster } from './components/TalkPosterLightbox'
import {
  AboutSection,
  ChatSection,
  ContactSection,
  HomeSection,
  ProjectsSection,
  TalksSection,
} from './components/sections'
import { fetchSanityPortfolio } from './utils/sanity'

const fallbackData = portfolioData as PortfolioData

const FALLBACK_EMAIL_HREF = 'mailto:putra3christian@gmail.com'
const INTRO_SESSION_KEY = 'portfolio-intro-shown'
const TIME_TICK_MS = 30_000

type SectionId = 'home' | 'projects' | 'about' | 'talks' | 'contact' | 'chat'

type DockItem = {
  id: SectionId
  label: string
  mobileOnly?: boolean
}

type SectionAvatar = {
  section: SectionId
  src: string
  alt: string
  modifier: string
}

const DOCK_ITEMS: DockItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'talks', label: 'Talks' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'chat', label: 'AI', mobileOnly: true },
]

function shouldShowIntroOnMount() {
  if (typeof window === 'undefined') {
    return false
  }

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return false
  }

  return window.sessionStorage?.getItem(INTRO_SESSION_KEY) !== '1'
}

function getSectionAvatars(profile: ProfileData): SectionAvatar[] {
  return [
    {
      section: 'projects',
      src: profile.sectionAvatars?.projects?.src ?? AVATARS.sectionProjects,
      alt: profile.sectionAvatars?.projects?.alt ?? '',
      modifier: 'projects',
    },
    {
      section: 'talks',
      src: profile.sectionAvatars?.talks?.src ?? AVATARS.sectionTalks,
      alt: profile.sectionAvatars?.talks?.alt ?? '',
      modifier: 'talks',
    },
    {
      section: 'about',
      src: profile.sectionAvatars?.about?.src ?? AVATARS.sectionAbout,
      alt: profile.sectionAvatars?.about?.alt ?? '',
      modifier: 'about',
    },
    {
      section: 'contact',
      src: profile.sectionAvatars?.contact?.src ?? AVATARS.sectionContact,
      alt: profile.sectionAvatars?.contact?.alt ?? '',
      modifier: 'contact',
    },
  ]
}

function App() {
  const [data, setData] = useState<PortfolioData>(fallbackData)
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const [timeText, setTimeText] = useState('')
  const [activeTalkPoster, setActiveTalkPoster] = useState<TalkPoster | null>(null)
  const [showIntro, setShowIntro] = useState(shouldShowIntroOnMount)

  useEffect(() => {
    let cancelled = false

    fetchSanityPortfolio()
      .then((sanityData) => {
        if (cancelled) {
          return
        }
        if (sanityData) {
          setData(sanityData)
        }
        setIsPortfolioLoading(false)
      })
      .catch(() => {
        if (!cancelled) {
          setIsPortfolioLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta',
    })

    const update = () => setTimeText(formatter.format(new Date()))

    update()
    const interval = window.setInterval(update, TIME_TICK_MS)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!activeTalkPoster) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveTalkPoster(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeTalkPoster])

  const primaryEmailHref = useMemo(
    () => data.profile.contactLinks.find((link) => link.href.startsWith('mailto:'))?.href ?? FALLBACK_EMAIL_HREF,
    [data.profile.contactLinks],
  )
  const sectionAvatars = useMemo(() => getSectionAvatars(data.profile), [data.profile])
  const chatAvatar = useMemo(
    () => ({
      src: data.profile.chatAvatarUrl ?? AVATARS.chat,
      alt: data.profile.chatAvatarAlt ?? `${data.profile.name} avatar`,
    }),
    [data.profile.chatAvatarAlt, data.profile.chatAvatarUrl, data.profile.name],
  )

  const handleSectionChange = (nextSection: SectionId) => {
    if (nextSection !== activeSection) {
      setActiveSection(nextSection)
    }
  }

  const dismissIntro = () => {
    setShowIntro(false)
    try {
      window.sessionStorage?.setItem(INTRO_SESSION_KEY, '1')
    } catch {
      // sessionStorage may be unavailable (private mode); safe to ignore.
    }
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection data={data} />
      case 'projects':
        return <ProjectsSection projects={data.projects} isLoading={isPortfolioLoading} />
      case 'about':
        return <AboutSection data={data} />
      case 'talks':
        return <TalksSection speaking={data.speaking} onPosterClick={setActiveTalkPoster} />
      case 'chat':
        return <ChatSection contactLinks={data.profile.contactLinks} avatar={chatAvatar} />
      case 'contact':
        return <ContactSection data={data} primaryEmailHref={primaryEmailHref} chatAvatar={chatAvatar} />
    }
  }

  return (
    <div className={`app-shell ${showIntro ? 'app-shell--booting' : 'app-shell--ready'}`}>
      <AmbientBackground />

      {showIntro ? (
        <IntroOverlay name={data.profile.name} isLoading={isPortfolioLoading} onDismiss={dismissIntro} />
      ) : null}

      <main className="console-wrap" aria-hidden={showIntro ? true : undefined}>
        <section className="console-screen">
          {sectionAvatars.map(({ section, src, alt, modifier }) => (
            <div
              key={section}
              className={`screen-kv-avatar screen-kv-avatar--${modifier} ${
                activeSection === section ? 'is-active' : 'is-hidden'
              }`}
              aria-hidden="true"
            >
              <img src={src} alt={alt} className="screen-kv-avatar-image" />
            </div>
          ))}

          <div className="console-stage">
            <ConsoleShell timeText={timeText}>{renderSection()}</ConsoleShell>
          </div>

          <nav className="console-dock" aria-label="Primary">
            {DOCK_ITEMS.map(({ id, label, mobileOnly }) => {
              const classes = [
                mobileOnly ? 'mobile-chat-nav' : '',
                activeSection === id ? 'active' : '',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <button key={id} type="button" className={classes} onClick={() => handleSectionChange(id)}>
                  {label}
                </button>
              )
            })}
          </nav>
        </section>
      </main>

      {activeTalkPoster ? (
        <TalkPosterLightbox poster={activeTalkPoster} onClose={() => setActiveTalkPoster(null)} />
      ) : null}
    </div>
  )
}

export default App
