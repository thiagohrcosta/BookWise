import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function GET() {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const books = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      author: product.metadata["Author"],
      category: product.metadata["Genre"],
      description: product.description ?? "",
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
      }).format((price.unit_amount ?? 0) / 100),
    };
  });

  return NextResponse.json({ books });
}
