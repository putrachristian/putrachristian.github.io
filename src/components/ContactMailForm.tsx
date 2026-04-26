import { FormEvent, useState } from 'react'
import { buildMailtoHref, sendContactMessage } from '../utils/contact'

type ContactMailFormProps = {
  emailHref: string
}

type SubmitState = 'idle' | 'sending' | 'sent'

export function ContactMailForm({ emailHref }: ContactMailFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    }

    if (!payload.name || !payload.email || !payload.message) {
      setFeedback('Please fill in your name, email, and message first.')
      return
    }

    setSubmitState('sending')
    setFeedback(null)

    try {
      const response = await sendContactMessage(payload)
      setSubmitState('sent')
      setFeedback(response.message)
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      const response = error instanceof Error ? ((error as Error & { response?: { fallbackToMailto?: boolean; message?: string } }).response ?? null) : null

      if (response?.fallbackToMailto) {
        window.location.href = buildMailtoHref(emailHref, payload)
        setSubmitState('idle')
        setFeedback('Opening your email app as a fallback because the mail service is not configured yet.')
        return
      }

      setSubmitState('idle')
      setFeedback(response?.message ?? 'Message could not be sent right now. Please try again or use the direct email link.')
    }
  }

  return (
    <form className="contact-mail-panel" onSubmit={handleSubmit}>
      <div className="contact-mail-heading">
        <span className="section-kicker">Direct message</span>
        <h3>Send an email</h3>
      </div>

      <div className="contact-mail-grid">
        <label>
          <span>Name</span>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" />
        </label>
      </div>

      <label className="contact-mail-message">
        <span>Message</span>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell me a bit about the project or collaboration."
          rows={6}
        />
      </label>

      <div className="contact-mail-actions">
        <button type="submit" disabled={submitState === 'sending'}>
          {submitState === 'sending' ? 'Sending...' : 'Send message'}
        </button>
        <a href={emailHref}>Use email app</a>
      </div>

      {feedback ? <p className={`contact-mail-feedback ${submitState === 'sent' ? 'success' : ''}`}>{feedback}</p> : null}
    </form>
  )
}
