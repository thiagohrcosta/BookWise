import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { styled } from "../../../stitches.config";

interface StarProps {
  rating: number;
}

const StarContainer = styled("div", {
  display: "flex",
  gap: "4px",
  alignItems: "center",
  color: "$purple100",
})

export default function Stars( { rating }: StarProps) {
  return (
    <StarContainer>
      {[...Array(5)].map((_, index) =>
        index < rating ? <AiFillStar key={index} /> : <AiOutlineStar key={index} />
      )}
    </StarContainer>
  );
}