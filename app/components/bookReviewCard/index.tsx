import Image from "next/image"
import { styled } from "../../../stitches.config"
import Stars from "../stars"
import { formatDistanceToNow } from "date-fns"

interface BookReview {
  user_email: string;
  created_at: string;
  book_cover: string;
  book_name: string;
  author_name: string;
  message: string;
}

const BookReviewCardStyle = styled("div", {
  ".review-header": {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "32px",
    color: "$gray100"
  },

  ".review-content": {
    display: "flex",
    justifyContent: "space-between",

    img: {
      width: "108px",
      height: "152px"
    }
  },

  ".book-title": {
    fontWeight: "bold",
    fontSize: "24px",
    color: "$gray100"
  },

  ".book-author": {
    color: "$gray300",
    marginBottom: "32px"
  },

   ".book-review": {
    width: "75%",
    color: "$gray300",
  },
})

export function BookReviewCard({ bookReview }: { bookReview: BookReview }) {
  return (
    <BookReviewCardStyle>
      <div className="review-header">
        <div className="flex">
          <div className="">
            <h3>{bookReview.user_email}</h3>
            <p>Posted {formatDistanceToNow(new Date(bookReview.created_at), { addSuffix: true })}</p>
          </div>
        </div>
        <Stars />
      </div>
      <div className="review-content">
        <div className="flex">
          <Image
            src={bookReview.book_cover}
            alt="Book Cover"
            width={508}
            height={152}
            className="rounded-lg"
          />
        </div>
        <div className="book-review">
          <p className="book-title">{bookReview.book_name}</p>
          <p className="book-author">{bookReview.author_name}</p>
          <div>
            <p>
              {bookReview.message}
            </p>
          </div>
        </div>
      </div>
    </BookReviewCardStyle>
  )
}