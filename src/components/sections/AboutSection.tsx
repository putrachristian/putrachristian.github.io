import type { PortfolioData } from '../../types'

const SKILL_LIMIT = 12

type AboutSectionProps = {
  data: PortfolioData
}

export function AboutSection({ data }: AboutSectionProps) {
  const flattenedSkills = data.skills.flatMap((group) => group.items ?? []).slice(0, SKILL_LIMIT)

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
                  {entry.summary ? <p className="experience-summary">{entry.summary}</p> : null}
                  {entry.highlights?.length ? (
                    <ul className="experience-highlights">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
