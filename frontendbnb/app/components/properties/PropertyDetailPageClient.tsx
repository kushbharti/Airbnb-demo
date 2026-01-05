"use client";

import { useState, useEffect } from "react";
import apiService from "@/app/services/apiService";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import Image from "next/image";
import Link from "next/link";

export type LandlordType = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
};

type PropertyDetailType = {
  id: string;
  title: string;
  description: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  country: string;
  country_code: string;
  category: string;
  image_url: string;
  landlord: LandlordType;
  created_at: string;
};

type Props = { propertyId: string; userId: string | null };

export const getNameFromEmail = (email: string) =>
  email
    .split("@")[0]
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const PropertyDetailPageClient = ({ propertyId, userId }: Props) => {
  const [property, setProperty] = useState<PropertyDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!propertyId) return;
    const fetchProperty = async () => {
      try {
        const data = await apiService.get<PropertyDetailType>(
          `/api/properties/${propertyId}/`
        );
        setProperty(data);
      } catch (err) {
        console.error("Failed to fetch property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (loading) return <p>Loading property...</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl shadow-lg relative">
        <Image
          src={property.image_url || "/beach_1.jpg"}
          fill
          unoptimized
          alt={property.title}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 md:col-span-3">
          <h1 className="mb-4 text-4xl font-bold">{property.title}</h1>
          <span className="m-6 block text-lg text-gray-600">
            {property.guests} guests - {property.bedrooms} bedrooms -{" "}
            {property.bathrooms} bathrooms
          </span>
          <hr />
          <Link
            href={`/landlords/${property.landlord.id}`}
            className="py-6 flex items-center space-x-4"
          >
            <Image
              src={property.landlord.avatar_url || "/user_image.png"}
              alt={`${property.landlord.name}'s profile picture`}
              width={50}
              height={50}
              unoptimized
              className="rounded-full"
            />
            <p>
              <strong>
                {property.landlord.name ||
                  getNameFromEmail(property.landlord.email)}
              </strong>{" "}
              is your host
            </p>
          </Link>
          <hr />
          <p className="mt-6 text-lg">{property.description}</p>
        </div>

        <ReservationSidebar property={property} userId={userId} />
      </div>
    </main>
  );
};

export default PropertyDetailPageClient;
