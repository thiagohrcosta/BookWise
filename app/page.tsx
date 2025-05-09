import Stripe from "stripe";
import { stripe } from "./lib/stripe";
import LastBooks from "./components/lastBooks";
import { BookReview } from "./components/bookReview";


export default async function Home() {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const books = response.data
  .map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      author: product.metadata["Author"],
      category: product.metadata["Genre"],
      pages: product.metadata["Pages"],
      description: product.description ?? "",
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price.unit_amount! / 100),
    };
  })
  .sort(() => Math.random() - 0.5)
  .slice(0, 3);

  return (
    <>
      <div>
        <h1 className="mb-8">Last books</h1>
        <LastBooks books={books} />
      </div>
      <div className="mt-8 mb-8">
        <h2>Recent reviews</h2>
        <BookReview />
      </div>
    </>
  );
}
