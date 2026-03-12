import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const API_KEY = process.env.CONVERTKIT_API_KEY
    const FORM_ID = process.env.CONVERTKIT_FORM_ID
    const API_URL = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: API_KEY,
        email: email,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to subscribe')
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' })
  } catch (error: any) {
    console.error('ConvertKit Subscription Error:', error)
    return NextResponse.json(
      { error: error.message || 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}
