import Image from "next/image";

type BookProps = {
  name: string;
  description: string;
  imageUrl: string;
  price: string;
};

export default function Book({ name, description, imageUrl, price }: BookProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer">
      <Image
        src={imageUrl}
        alt={`Capa do livro ${name}`}
        layout="responsive"
        width={100}
        height={300}
        className="rounded-lg"
      />
      <div className="flex align-center justify-between mt-2">
        <div>
          <h2 className="text-lg font-bold text-gray-100">{name}</h2>
          <p className="text-sm text-gray-100">Author John Doe</p>
        </div>
        <div>
          <p className="text-sm text-gray-200">{price}</p>
        </div>
      </div>
    </div>
  );
}
