import type { ContactRequest, ContactResponse } from '../types'

function useStaticContactMode() {
  const forcedMode = import.meta.env.VITE_CONTACT_MODE

  if (forcedMode === 'mailto') {
    return true
  }

  if (forcedMode === 'server') {
    return false
  }

  return typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')
}

export async function sendContactMessage(payload: ContactRequest): Promise<ContactResponse> {
  if (useStaticContactMode()) {
    throw Object.assign(new Error('Static hosting mode enabled.'), {
      response: {
        ok: false,
        message: 'Static hosting mode is enabled, so the contact form will open your email app.',
        fallbackToMailto: true,
      },
    })
  }

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as ContactResponse

  if (!response.ok) {
    throw Object.assign(new Error(data.message || 'Contact request failed.'), {
      response: data,
    })
  }

  return data
}

export function buildMailtoHref(email: string, payload: ContactRequest) {
  const cleanEmail = email.replace(/^mailto:/i, '')
  const subject = encodeURIComponent(`Portfolio inquiry from ${payload.name}`)
  const body = encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`)
  return `mailto:${cleanEmail}?subject=${subject}&body=${body}`
}
