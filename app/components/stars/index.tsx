import { AiFillStar } from "react-icons/ai";
import { styled } from "../../../stitches.config";

const StarContainer = styled("div", {
  display: "flex",
  gap: "4px",
  alignItems: "center",
  color: "$purple100",
})

export default function Stars() {
  return (
    <StarContainer>
      <AiFillStar />
      <AiFillStar />
      <AiFillStar />
      <AiFillStar />
      <AiFillStar />
    </StarContainer>
  );
}