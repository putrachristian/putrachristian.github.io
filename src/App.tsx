import { type ReactNode, useEffect, useMemo, useState } from 'react'
import portfolioData from './data/portfolio.json'
import type { PortfolioData } from './types'
import { AIChatWidget } from './components/AIChatWidget'
import { AmbientBackground } from './components/AmbientBackground'
import { ContactMailForm } from './components/ContactMailForm'
import { IntroOverlay } from './components/IntroOverlay'
import { ProjectCarousel } from './components/ProjectCarousel'
import { fetchSanityPortfolio } from './utils/sanity'

const fallbackData = portfolioData as PortfolioData

const FALLBACK_EMAIL_HREF = 'mailto:putra3christian@gmail.com'
const INTRO_SESSION_KEY = 'portfolio-intro-shown'
const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i

type SectionId = 'home' | 'projects' | 'about' | 'talks' | 'contact' | 'chat'

type DockItem = {
  id: SectionId
  label: string
  mobileOnly?: boolean
}

type SectionAvatar = {
  section: SectionId
  src: string
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

const SECTION_AVATARS: SectionAvatar[] = [
  { section: 'projects', src: '/avatar1.png', modifier: 'projects' },
  { section: 'talks', src: '/avatar2.png', modifier: 'talks' },
  { section: 'about', src: '/avatar3.png', modifier: 'about' },
  { section: 'contact', src: '/avatar4.png', modifier: 'contact' },
]

function isVideoAsset(source: string) {
  return VIDEO_EXTENSIONS.test(source)
}

function setAvatarPlaybackSpeed(video: HTMLVideoElement | null) {
  if (!video) {
    return
  }

  video.defaultPlaybackRate = 1
  video.playbackRate = 1
}

function shouldShowIntroOnMount() {
  if (typeof window === 'undefined') {
    return false
  }

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return false
  }

  return window.sessionStorage?.getItem(INTRO_SESSION_KEY) !== '1'
}

function App() {
  const [data, setData] = useState<PortfolioData>(fallbackData)
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const [timeText, setTimeText] = useState('')
  const [activeTalkPoster, setActiveTalkPoster] = useState<{ src: string; alt: string } | null>(null)
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
    const interval = window.setInterval(update, 30000)

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
        return <ChatSection contactLinks={data.profile.contactLinks} />
      case 'contact':
        return (
          <ContactSection
            data={data}
            primaryEmailHref={primaryEmailHref}
          />
        )
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
          {SECTION_AVATARS.map(({ section, src, modifier }) => (
            <div
              key={section}
              className={`screen-kv-avatar screen-kv-avatar--${modifier} ${
                activeSection === section ? 'is-active' : 'is-hidden'
              }`}
              aria-hidden="true"
            >
              <img src={src} alt="" className="screen-kv-avatar-image" />
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

type ConsoleShellProps = {
  timeText: string
  children: ReactNode
}

function ConsoleShell({ timeText, children }: ConsoleShellProps) {
  return (
    <div className="console-shell static">
      <aside className="console-orbs" aria-hidden="true">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
        <span className="orb orb-d" />
      </aside>

      <div className="console-meta console-meta-top-left">
        <span>longitude - 106.8456</span>
        <span>latitude - -6.2088</span>
      </div>

      <div className="console-meta console-meta-top-right">
        <span>Creative Front-End Console</span>
        <span>Portfolio v2026</span>
      </div>

      <div className="console-content">{children}</div>

      <div className="console-meta console-meta-bottom-left">
        <span>Local Time - {timeText || '--:--'}</span>
        <span>Time Spend - 2026</span>
      </div>

      <div className="console-meta console-meta-bottom-right">
        <span>103.216.153.998 - IP</span>
        <span>Jakarta, Indonesia - Location</span>
      </div>
    </div>
  )
}

function HomeSection({ data }: { data: PortfolioData }) {
  const { profile } = data

  return (
    <section className="page page-home">
      <div className="home-panel">
        <div className="home-avatar-card">
          <div className="home-avatar-shell">
            {profile.avatarUrl ? (
              isVideoAsset(profile.avatarUrl) ? (
                <video
                  ref={setAvatarPlaybackSpeed}
                  className="home-avatar-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={profile.avatarAlt ?? `${profile.name} avatar video`}
                >
                  <source src={profile.avatarUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={profile.avatarUrl}
                  alt={profile.avatarAlt ?? `${profile.name} avatar`}
                  className="home-avatar-image"
                />
              )
            ) : (
              <div className="home-avatar-fallback" aria-hidden="true">
                PC
              </div>
            )}
          </div>
        </div>

        <div className="home-copy-panel">
          <p className="page-intro">Hi, I am</p>
          <h1>{profile.name}</h1>
          <div className="page-role-line">
            <span>Front-End Web Developer</span>
          </div>
          <p className="page-home-copy">{profile.shortBio}</p>

          <div className="home-stat-row" aria-label="Portfolio summary">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="home-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

type ProjectsSectionProps = {
  projects: PortfolioData['projects']
  isLoading: boolean
}

function ProjectsSection({ projects, isLoading }: ProjectsSectionProps) {
  return (
    <section className="page page-projects">
      <div className="projects-heading-block">
        <span className="projects-kicker">Selected work</span>
        <h2>Projects Showcase</h2>
      </div>
      <ProjectCarousel projects={projects} isLoading={isLoading} />
    </section>
  )
}

function AboutSection({ data }: { data: PortfolioData }) {
  const flattenedSkills = data.skills.flatMap((group) => group.items).slice(0, 12)

  return (
    <section className="page page-about">
      <div className="about-split">
        <div className="about-bio-column">
          <h2>About</h2>
          <p className="page-about-copy">{data.profile.longBio}</p>
          <div className="about-chip-grid">
            {flattenedSkills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="about-experience" aria-label="Work experience">
          <div className="about-experience-heading">
            <span className="section-kicker">Career timeline</span>
            <h3>Experience</h3>
          </div>
          <ol className="experience-list">
            {data.experience.map((entry) => (
              <li key={`${entry.title}-${entry.period}`} className="experience-item">
                <span className="experience-period">{entry.period}</span>
                <div className="experience-body">
                  <h4>{entry.title}</h4>
                  <p className="experience-company">{entry.company}</p>
                  <p className="experience-summary">{entry.summary}</p>
                  <ul className="experience-highlights">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

type TalksSectionProps = {
  speaking: PortfolioData['speaking']
  onPosterClick: (poster: { src: string; alt: string }) => void
}

function TalksSection({ speaking, onPosterClick }: TalksSectionProps) {
  return (
    <section className="page page-talks">
      <div className="talks-heading-block">
        <span className="projects-kicker">Community and speaking</span>
        <h2>Talks & Workshops</h2>
      </div>

      <div className="talks-grid" aria-label="Talks and workshop details">
        {speaking.map((entry) => (
          <article key={`${entry.title}-${entry.period}`} className="talk-card">
            {entry.posterUrl ? (
              <button
                type="button"
                className="talk-card-poster"
                onClick={() =>
                  onPosterClick({
                    src: entry.posterUrl!,
                    alt: entry.posterAlt ?? `${entry.title} poster`,
                  })
                }
                aria-label={`Open full poster for ${entry.title}`}
              >
                <img
                  src={entry.posterUrl}
                  alt={entry.posterAlt ?? `${entry.title} poster`}
                  className="talk-card-poster-image"
                />
              </button>
            ) : null}
            <div className="talk-card-meta">
              <span>{entry.period}</span>
              <span>{entry.role}</span>
            </div>
            <h3>{entry.title}</h3>
            <p className="talk-card-org">{entry.organization}</p>
            <p className="talk-card-summary">{entry.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ChatSection({ contactLinks }: { contactLinks: PortfolioData['profile']['contactLinks'] }) {
  return (
    <section className="page page-chat">
      <div className="chat-heading-block">
        <span className="projects-kicker">Portfolio assistant</span>
        <h2>AI Chat</h2>
      </div>
      <AIChatWidget contactLinks={contactLinks} />
    </section>
  )
}

type ContactSectionProps = {
  data: PortfolioData
  primaryEmailHref: string
}

function ContactSection({ data, primaryEmailHref }: ContactSectionProps) {
  const contactLinks = data.profile.contactLinks.filter((link) => link.label.toLowerCase() !== 'website')

  return (
    <section className="page page-contact">
      <div className="contact-page-layout">
        <div className="contact-column">
          <div className="contact-info-panel">
            <h2>Contact</h2>
            <p className="page-contact-copy">{data.profile.availability}</p>
            <div className="contact-console-links">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <ContactMailForm emailHref={primaryEmailHref} />
        </div>
        <AIChatWidget contactLinks={data.profile.contactLinks} />
      </div>
    </section>
  )
}

type TalkPosterLightboxProps = {
  poster: { src: string; alt: string }
  onClose: () => void
}

function TalkPosterLightbox({ poster, onClose }: TalkPosterLightboxProps) {
  return (
    <div
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Talk poster preview"
      onClick={onClose}
    >
      <div className="image-lightbox-backdrop" />
      <div className="image-lightbox-panel" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="image-lightbox-close"
          onClick={onClose}
          aria-label="Close image preview"
        >
          Close
        </button>
        <img src={poster.src} alt={poster.alt} className="image-lightbox-image" />
      </div>
    </div>
  )
}

export default App
