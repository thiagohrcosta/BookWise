import Image from "next/image";
import Avatar from "../../assets/img/avatar.jpg";
import Book2 from "../../assets/img/book2.jpg";
import Stars from "../stars";

export function BookReview() {
  return (
    <div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <div className="flex">
            <Image
              src={Avatar}
              alt="User Avatar"
              width={50}
              height={50}
              className="rounded-full border-2 border-gray-300"
            />
            <div className="ml-8">
              <h3>John Doe</h3>
              <p>Today</p>
            </div>
          </div>
          <Stars />
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex">
            <Image
              src={Book2}
              alt="Book Cover"
              width={508}
              height={152}
              className="rounded-lg"
            />
          </div>
          <div className="ml-8">
            <p>Book Name</p>
            <p>Author Name</p>

            <div>
              <p>Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices.
                Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum.
                Sed vulputate massa velit nibh... SEE MORE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}