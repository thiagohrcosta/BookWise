// app/api/stripe-session/route.ts
import { NextResponse } from 'next/server'
import { stripe } from '../../lib/stripe'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID not provided' }, { status: 400 })
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items.data.price.product'],
  })

  const product = session.line_items?.data[0].price?.product as any

  return NextResponse.json({
    email: session.customer_details?.email,
    book: {
      name: product.name,
      price: session.amount_total! / 100,
      sinopsis: product.description,
      cover_url: product.images[0],
      author_name: product.metadata["Author"],
      genre: product.metadata["Genre"]
    },
  })
}
