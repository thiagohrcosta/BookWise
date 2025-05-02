// app/page.tsx
import Stripe from "stripe";
import { styled } from "../stitches.config";
import { stripe } from "./lib/stripe";
import Sidebar from "./components/sidebar";
import LastBooks from "./components/lastBooks";
import { BookReview } from "./components/bookReview";
import PopularBook from "./components/popularBook";

const StyledDiv = styled("div", {
  color: "$gray100",
  padding: "20px 20px 20px 5px",
});

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
      description: product.description,
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
    <StyledDiv>
      <div className="flex gap-8 justify-center">
        <div className="flex-2/12">
          <Sidebar />
        </div>
        <div className="flex-6/12">
          <div>
            <h1 className="mb-8">Last books</h1>
            <LastBooks books={books} />
          </div>
          <div className="mt-8 mb-8">
            <h2>Recent reviews</h2>
            <BookReview />
          </div>
        </div>
        <div className="w-12 flex-3/12">
          <h2 className="mb-8">POPULAR BOOKS</h2>
          <PopularBook />
          <PopularBook />
          <PopularBook />
        </div>
      </div>
    </StyledDiv>
  );
}
