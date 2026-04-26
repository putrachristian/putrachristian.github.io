import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import type { AvatarAsset, ChatHistoryEntry, ChatResponse, ContactLink } from '../types'
import { sendChatMessage } from '../utils/chat'
import { AVATARS } from '../assets'

const MAX_HISTORY_TURNS = 8

type Message = {
  id: string
  role: 'assistant' | 'user'
  content: string
  timestamp: string
  meta?: Pick<ChatResponse, 'sources' | 'fallbackToContact'>
}

type AIChatWidgetProps = {
  contactLinks: ContactLink[]
  avatar: AvatarAsset
}

function createTimeLabel() {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date())
}

const welcomeMessage: Message = {
  id: 'welcome',
  role: 'assistant',
  timestamp: createTimeLabel(),
  content: "Hey! I'm Putra. Ask me anything about my work, stack, projects, or how I collaborate — happy to chat.",
}

const suggestedPrompts = [
  'What stack do you usually work with?',
  'Show me a project you are proud of.',
  'Are you open to freelance work?',
  'How do you collaborate with designers?',
]

export function AIChatWidget({ contactLinks, avatar }: AIChatWidgetProps) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([welcomeMessage])
  const [error, setError] = useState<string | null>(null)
  const threadRef = useRef<HTMLDivElement>(null)
  const avatarSrc = avatar.src ?? AVATARS.chat
  const avatarAlt = avatar.alt ?? 'Putra Christian avatar'

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const submit = async (message: string) => {
    const trimmed = message.trim()

    if (!trimmed || loading) {
      return
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: createTimeLabel(),
    }

    const history: ChatHistoryEntry[] = messages
      .filter((entry) => entry.id !== 'welcome')
      .slice(-MAX_HISTORY_TURNS)
      .map((entry) => ({ role: entry.role, content: entry.content }))

    setMessages((current) => [...current, userMessage])
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const response = await sendChatMessage({
        message: trimmed,
        pageContext: 'portfolio-contact',
        history,
      })

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.answer,
          timestamp: createTimeLabel(),
          meta: {
            sources: response.sources,
            fallbackToContact: response.fallbackToContact,
          },
        },
      ])
    } catch (submitError) {
      setError('The assistant is unavailable right now. Visitors can still continue through the direct contact links below.')
      console.error(submitError)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await submit(input)
  }

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      await submit(input)
    }
  }

  return (
    <aside id="portfolio-chat-panel" className="chat-panel chat-embedded" aria-label="Portfolio assistant">
      <div className="chat-panel-header">
        <div className="chat-panel-contact">
          <img src={avatarSrc} alt={avatarAlt} className="chat-contact-avatar" />
          <div>
            <h3>Putra Christian</h3>
            <p className="chat-contact-status">Replies from AI</p>
          </div>
        </div>
      </div>

      <div className="chat-thread" ref={threadRef}>
        {messages.map((message) => (
          <div key={message.id} className={`chat-message-row ${message.role}`}>
            {message.role === 'assistant' ? <img src={avatarSrc} alt="" className="chat-message-avatar" /> : null}
            <article className={`chat-bubble ${message.role}`}>
              <p>{message.content}</p>
              {message.meta?.fallbackToContact ? (
                <div className="chat-contact-links">
                  {contactLinks.slice(0, 2).map((link) => (
                    <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
              <span className="chat-bubble-time">{message.timestamp}</span>
            </article>
          </div>
        ))}

        {loading ? (
          <div className="chat-message-row assistant">
            <img src={avatarSrc} alt="" className="chat-message-avatar" />
            <article className="chat-bubble assistant loading">
              <div className="chat-typing-dots" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            </article>
          </div>
        ) : null}

        {messages.length === 1 && !loading ? (
          <div className="chat-suggested-prompts" role="list" aria-label="Suggested questions">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                role="listitem"
                className="chat-suggested-prompt"
                onClick={() => submit(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {error ? <p className="chat-error">{error}</p> : null}

      <form className="chat-input-bar" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="chat-input">
          Ask about Putra Christian
        </label>
        <textarea
          id="chat-input"
          rows={1}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Putra's portfolio..."
        />
        <button type="submit" disabled={loading}>
          <span className="sr-only">Send</span>
          <svg className="chat-send-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M21.5 3.5 2.7 10.9c-.8.3-.8 1.4 0 1.7l6.2 2.2 2.2 6.2c.3.8 1.4.8 1.7 0l7.4-18.8c.3-.8-.5-1.6-1.3-1.3Z"
              fill="currentColor"
            />
            <path d="M9.5 14.5 20.2 3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </form>
    </aside>
  )
}
