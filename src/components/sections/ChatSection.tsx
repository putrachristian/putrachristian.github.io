import type { ContactLink } from '../../types'
import { AIChatWidget } from '../AIChatWidget'

type ChatSectionProps = {
  contactLinks: ContactLink[]
}

export function ChatSection({ contactLinks }: ChatSectionProps) {
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
