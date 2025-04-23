import Image from "next/image";

import BookCover from "../../assets/img/book1.jpg";

export default function Book() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer">
      <Image
        src={BookCover}
        alt="Book Cover"
        layout="responsive"
        width={100}
        height={300}
        className="rounded-lg"
      />
      <div className="flex align-center justify-between mt-2">
        <div>
          <h2 className="text-lg font-bold text-gray-100">Book Title</h2>
          <p className="text-sm text-gray-100">Author Name</p>
        </div>
        <div>
          <p className="text-sm text-gray-200">
            $ 23.99
          </p>
        </div>
      </div>
    </div>
  )
}