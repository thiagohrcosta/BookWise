import { styled } from "../stitches.config";
import Book from "./components/book";
import { BookReview } from "./components/bookReview";
import PopularBook from "./components/popularBook";

// Criando um componente estilizado "div" usando Stitches
const StyledDiv = styled("div", {
  color: '$gray100',
  padding: '20px',
});

export default function Home() {
  return (
    <StyledDiv>
      <div className="flex gap-4 justify-center">
        <div className="flex-2/12">SIDEBAR</div>
        <div className="w-auto flex-8/12">
          <div>
            <h1 className="mb-8">Last books</h1>
            <div className="grid grid-cols-3 gap-4">
              <Book />
              <Book />
              <Book />
            </div>
          </div>
          <div className="mt-8 mb-8">
            <h2>Recent reviews</h2>
            <div>
              <BookReview />
            </div>
          </div>
        </div>
        <div className="w-12 flex-4/12">
          <h2 className="mb-8">POPULAR BOOKS</h2>
          <div>
            <PopularBook />
            <PopularBook />
            <PopularBook />
          </div>
        </div>
      </div>
    </StyledDiv>
  );
}
