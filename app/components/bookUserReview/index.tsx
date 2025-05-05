import { styled } from "@stitches/react";
import { AiFillStar } from "react-icons/ai";

const BookUserReviewContainer = styled("div", {
  backgroundColor: "$gray600",
  color: "$gray100",
  margin: "20px auto",
  padding: "20px",

  ".review-container": {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "8px",
  },

  ".stars-container": {
    display: "flex",
    gap: "4px",
  },

  ".review-text": {
    marginTop: "20px",
    color: "$gray300",
  }
});

export default function BookUserReview() {
  return (
    <BookUserReviewContainer>
      <div className="review-container">
        <div>
          <p>John Doe</p>
          <p>Today</p>
        </div>
        <div className="stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
      </div>
      <div className="review-text">
        <p>Tortor sed elementum dolor sed nunc elementum enim viverra. Massa tempus ac a adipiscing at
          cursus senectus dui libero. Elementum lacus enim viverra arcu at ut amet convallis. Maecenas ac
          fringilla blandit risus nibh praesent sagittis dapibus netus. Dignissim sed congue sed vel
          faucibus purus dapibus pellentesque.
        </p>
      </div>

    </BookUserReviewContainer>
  )
}