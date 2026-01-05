import Image from "next/image";
import React from "react";
import ContactButtton from "../ContactButtton";
import PropertyList from "../properties/PropertyList";
import apiService from "@/app/services/apiService";
import {
  getNameFromEmail,
  LandlordType,
} from "../properties/PropertyDetailPageClient";

type Props = { landlordId: string; userId: string | null };
const Landlord = async ({ landlordId, userId }: Props) => {
  const landlord: LandlordType = await apiService.get(
    `/api/auth/${landlordId}`
  );
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <aside className="col-span-1 mb-4">
          <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
            <Image
              src={landlord.avatar_url || "/user_image.png"}
              width={200}
              height={200}
              alt="landlord_image"
              unoptimized
              className="rounded-full"
            />
            <h1 className="mt-6 text-2xl">
              {landlord.name || getNameFromEmail(landlord.email)}
            </h1>
            {userId !== landlordId && (
              <ContactButtton userId={userId} landlordId={landlordId} />
            )}
          </div>
        </aside>
        <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
          <PropertyList landlord_id={landlordId} />
        </div>
      </div>
    </main>
  );
};

export default Landlord;
