import type { AvatarAsset, PortfolioData } from '../../types'
import { AIChatWidget } from '../AIChatWidget'
import { ContactMailForm } from '../ContactMailForm'

type ContactSectionProps = {
  data: PortfolioData
  primaryEmailHref: string
  chatAvatar: AvatarAsset
}

export function ContactSection({ data, primaryEmailHref, chatAvatar }: ContactSectionProps) {
  const contactLinks = data.profile.contactLinks ?? []
  const visibleLinks = contactLinks.filter((link) => link.label.toLowerCase() !== 'website')

  return (
    <section className="page page-contact">
      <div className="contact-page-layout">
        <div className="contact-column">
          <div className="contact-info-panel">
            <h2>Contact</h2>
            <p className="page-contact-copy">{data.profile.availability}</p>
            <div className="contact-console-links">
              {visibleLinks.map((link) => (
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
        <AIChatWidget contactLinks={contactLinks} avatar={chatAvatar} />
      </div>
    </section>
  )
}
