import { stripe } from "../../lib/stripe";
import Stripe from "stripe";

interface BookPageProps {
  params: {
    id: string;
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = params;

  const product = await stripe.products.retrieve(id as string, {
    expand: ["default_price"],
  });

  if (!product) {
    return <div>Livro não encontrado</div>;
  }

  const price = product.default_price as Stripe.Price;

  const book = {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount! / 100),
  };

  return (
    <div>
      <h1>{book.name}</h1>
      <img src={book.imageUrl} alt={`Capa do livro ${book.name}`} />
      <p>{book.price}</p>
    </div>
  );
}
