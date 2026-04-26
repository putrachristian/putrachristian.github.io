import type { PortfolioData } from '../../types'
import type { TalkPoster } from '../TalkPosterLightbox'

type TalksSectionProps = {
  speaking: PortfolioData['speaking']
  onPosterClick: (poster: TalkPoster) => void
}

export function TalksSection({ speaking, onPosterClick }: TalksSectionProps) {
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
