"use client";

import Image from "next/image";

interface CategoriesProps {
  dataCategory: string;
  setCategory: (category: string) => void;
}

const Categories = ({ dataCategory, setCategory }: CategoriesProps) => {
  return (
    <>
      <div className="cursor-pointer pt-2 pb-6 flex items-center space-x-12">
        <div
          onClick={() => setCategory("Beach")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            dataCategory == "Beach" ? "border-gray-800" : "border-white"
          } opacity-70 hover:border-gray-500 hover:opacity-100`}
        >
          <Image src={"/Beach.ico"} alt="Beach" width={35} height={35} />
          <span className="text-xs">Beach</span>
        </div>

        <div
          onClick={() => setCategory("Villas")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            dataCategory == "Villas" ? "border-gray-800" : "border-white"
          } opacity-70 hover:border-gray-500 hover:opacity-100`}
        >
          <Image src={"/Villas.ico"} alt="Villas" width={35} height={35} />
          <span className="text-xs">Villas</span>
        </div>

        <div
          onClick={() => setCategory("Cabins")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            dataCategory == "Cabins" ? "border-gray-800" : "border-white"
          } opacity-70 hover:border-gray-500 hover:opacity-100`}
        >
          <Image src={"/Cabins.ico"} alt="Cabins" width={35} height={35} />
          <span className="text-xs">Cabins</span>
        </div>

        <div
          onClick={() => setCategory("Tiny Homes")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            dataCategory == "Tiny Homes" ? "border-gray-800" : "border-white"
          } opacity-70 hover:border-gray-500 hover:opacity-100`}
        >
          <Image
            src={"/Tiny_homes.ico"}
            alt="Tiny Homes"
            width={35}
            height={35}
          />
          <span className="text-xs">Tiny Homes</span>
        </div>
      </div>
    </>
  );
};

export default Categories;
