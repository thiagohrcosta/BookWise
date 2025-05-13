import Stripe from "stripe";
import { stripe } from "./lib/stripe";
import LastBooks from "./components/lastBooks";
import { BookReview } from "./components/bookReview";
import { GetBookReviews } from "./api/get-book-ratings/route";
import { styled } from "../stitches.config";

const HomeStyle = styled("div", {
  margin: "",

  ".recent-reviews-title": {
    marginBottom: 24,
    borderBottom: "2px solid $purple100",
    width: "105px"
  }
})

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
    <HomeStyle>
      <div>
        <LastBooks books={books} />
      </div>
      <div className="mt-8 mb-8">
        <h2 className="recent-reviews-title">Recent reviews</h2>
        <BookReview />
      </div>
    </HomeStyle>
  );
}
