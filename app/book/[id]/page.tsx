import { styled } from "@stitches/react";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import Sidebar from "../../components/sidebar";
import PopularBook from "../../components/popularBook";

interface BookPageProps {
  params: {
    id: string;
  };
}

const StyledDiv = styled("div", {
  color: "$gray100",
  padding: "20px 20px 20px 5px",
});


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
    author: product.metadata["Author"],
    category: product.metadata["Genre"],
    imageUrl: product.images[0],
    price: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount! / 100),
  };

  return (
    <StyledDiv>
      <div className="flex gap-8 justify-center">
        <div className="flex-2/12">
          <Sidebar />
        </div>
        <div className="flex-6/12">
          <div>
            <h1>{book.name}</h1>
            <img src={book.imageUrl} alt={`Capa do livro ${book.name}`} />
            <p>{book.price}</p>
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
