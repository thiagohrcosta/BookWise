import Book2 from "../../assets/img/book2.jpg";
import Image from "next/image";
import { styled } from "../../../stitches.config";
import Stars from "../stars";

const PopularBookContainer = styled("div", {
  display: "flex",
  backgroundColor: "$gray700",
  borderRadius: "8px",
  padding: "16px",
  cursor: "pointer",
  marginBottom: "16px",
  "&:hover": {
    backgroundColor: "$gray600",
  },
})

export default function PopularBook() {
  return (
    <PopularBookContainer>
      <div>
        <Image
          src={Book2}
          alt="Book Cover"
          width={64}
          height={94}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between ml-4">
        <div>
          <p className="text-gray-100 font-bold">Book title</p>
          <p className="text-gray-400">Book Author</p>
        </div>
        <Stars />
      </div>
    </PopularBookContainer>
  )
}