import type { PortfolioData } from '../../types'

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i

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

type HomeSectionProps = {
  data: PortfolioData
}

export function HomeSection({ data }: HomeSectionProps) {
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
            {(profile.stats ?? []).map((stat) => (
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
