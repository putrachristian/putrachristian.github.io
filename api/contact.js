const RESEND_API_URL = 'https://api.resend.com/emails'

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed.' })
    return
  }

  try {
    const { name = '', email = '', message = '' } = req.body ?? {}
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      res.status(400).json({ ok: false, message: 'Name, email, and message are required.' })
      return
    }

    if (!isValidEmail(trimmedEmail)) {
      res.status(400).json({ ok: false, message: 'Please provide a valid email address.' })
      return
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL
    const from = process.env.CONTACT_FROM_EMAIL

    if (!apiKey || !to || !from) {
      res.status(503).json({
        ok: false,
        message: 'The email service is not configured yet. Falling back to your email app is available instead.',
        fallbackToMailto: true,
      })
      return
    }

    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: trimmedEmail,
        subject: `Portfolio inquiry from ${trimmedName}`,
        text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMessage}`,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Contact mail request failed: ${response.status} ${errorText}`)
    }

    res.status(200).json({
      ok: true,
      message: 'Thanks, your message was sent successfully.',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      message: 'The mail service is temporarily unavailable. Please try again or use the direct email link.',
    })
  }
}
