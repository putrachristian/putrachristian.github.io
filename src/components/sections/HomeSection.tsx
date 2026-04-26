import type { PortfolioData } from '../../types'

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i

function isVideoAsset(source: string) {
  return VIDEO_EXTENSIONS.test(source)
}

function getVideoType(source: string) {
  if (/\.webm$/i.test(source)) {
    return 'video/webm'
  }

  if (/\.mov$/i.test(source)) {
    return 'video/quicktime'
  }

  return 'video/mp4'
}

function setAvatarPlaybackSpeed(video: HTMLVideoElement | null) {
  if (!video) {
    return
  }

  video.defaultPlaybackRate = 1
  video.playbackRate = 1
  video.load()
  void video.play().catch(() => {})
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
                  key={profile.avatarUrl}
                  ref={setAvatarPlaybackSpeed}
                  className="home-avatar-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster={profile.avatarPosterUrl ?? undefined}
                  aria-label={profile.avatarAlt ?? `${profile.name} avatar video`}
                >
                  <source src={profile.avatarUrl} type={getVideoType(profile.avatarUrl)} />
                </video>
              ) : (
                <img
                  key={profile.avatarUrl}
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
