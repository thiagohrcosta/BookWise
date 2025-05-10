import Image from "next/image";
import { styled } from "../../../stitches.config";

type BookProps = {
  id: string;
  name: string;
  author: string;
  pages: number;
  genre: string;
  description: string;
  imageUrl: string;
  price: string;
};

const BookContainerStyle = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  background: "$gray600",
  padding: 10,
  borderRadius: 8,
  height: "440px",
  cursor: "pointer",


  img: {
    width: "100%",
    height: "280px"
  }
})

const PriceStyle = styled("div", {
  color: "$gray100",
  fontSize: 22,
  marginTop: 20,
  textAlign: "right"
})

export default function Book({ name, author, imageUrl, price }: BookProps) {
  return (
    <BookContainerStyle>
      <Image
        src={imageUrl}
        alt={`Box cover ${name}`}
        layout=""
        width={100}
        height={250}
        className="rounded-lg"
      />
      <div className="flex align-center justify-between mt-2">
        <div>
          <h2 className="text-lg font-bold text-gray-100">{name}</h2>
          <p className="text-sm text-gray-100">{author}</p>
        </div>
      </div>
      <div>
        <PriceStyle>
          <p>{price}</p>
        </PriceStyle>
      </div>
    </BookContainerStyle>
  );
}
