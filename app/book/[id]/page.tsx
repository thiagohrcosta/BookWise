import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import Sidebar from "../../components/sidebar";
import PopularBook from "../../components/popularBook";
import Image from "next/image";
import { styled } from "../../../stitches.config";
import BuyButton from "../../components/buyButton";

const StyledDiv = styled("div", {
  color: "$gray100",
  padding: "20px 20px 20px 5px",

  ".book-information": {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    color: "$gray100",
  },

  ".book-information > div": {
    flex: 1,
    maxWidth: "50%",
  },

  ".book-content > h1": {
    fontSize: 32,
  },

  ".button-checkout": {
    background: "$green100",
    width: "100%",
    padding: "5px",
    borderRadius: "8px",
    marginTop: "10px",
    textAlign: "center",
    cursor: "pointer"
  },

  ".book-description": {
    marginTop: 20,
  },

  ".book-information img": {
    maxWidth: "100%",
    height: "auto",
  },


});
export default async function BookPage({params}: {params: Promise<{ id: string }>;}) {
  const { id } = await params;

  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  if (!product) {
    return <div>Book Not found</div>;
  }

  const price = product.default_price as Stripe.Price;

  const book = {
    id: product.id,
    name: product.name,
    author: product.metadata["Author"],
    description: product.description,
    category: product.metadata["Genre"],
    imageUrl: product.images[0],
    price: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount! / 100),
  };

  return (
    <StyledDiv>
      <div className="book-information">
        <div>
          <Image
            src={book.imageUrl}
            alt={`Capa do livro ${book.name}`}
            width={250}
            height={350}
          />
        </div>
        <div className="book-content">
          <h1>{book.name}</h1>
          <p className="book-author">{book.author}</p>
          <p className="book-description">{book.description}</p>

          <div className="button-checkout">
            <BuyButton
              price={book.price}
              priceId={price.id}
            />
          </div>
        </div>
      </div>
    </StyledDiv>
  );
}