export type TalkPoster = {
  src: string
  alt: string
}

type TalkPosterLightboxProps = {
  poster: TalkPoster
  onClose: () => void
}

export function TalkPosterLightbox({ poster, onClose }: TalkPosterLightboxProps) {
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
