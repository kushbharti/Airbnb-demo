import React from "react";
import PropertyList from "../properties/PropertyList";

export interface UserID {
  userId: string | null;
}

const Myproperties = async ({ userId }: UserID) => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My Properties</h1>

      <PropertyList landlord_id={userId} />
    </main>
  );
};

export default Myproperties;
