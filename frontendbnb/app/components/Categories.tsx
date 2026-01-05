import Image from "next/image";
import React from "react";

const Categories = () => {
  return (
    <div className="cursor-pointer pt-2 pb-6 flex items-center space-x-12">
      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-70 hover:border-gray-500 hover:opacity-100">
        <Image src={"/Beach.ico"} alt="beach-icon" width={35} height={35} />
        <span className="text-xs">Beach</span>
      </div>

      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-70 hover:border-gray-500 hover:opacity-100">
        <Image src={"/Villas.ico"} alt="beach-icon" width={35} height={35} />
        <span className="text-xs">Villas</span>
      </div>

      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-70 hover:border-gray-500 hover:opacity-100">
        <Image src={"/Cabins.ico"} alt="beach-icon" width={35} height={35} />
        <span className="text-xs">Cabins</span>
      </div>

      <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-70 hover:border-gray-500 hover:opacity-100">
        <Image
          src={"/Tiny_homes.ico"}
          alt="beach-icon"
          width={35}
          height={35}
        />
        <span className="text-xs">Tiny Homes</span>
      </div>
    </div>
  );
};

export default Categories;
