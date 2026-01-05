"use client";
import React, { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";
import SearchModal from "../modals/SearchModal";

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
  is_favorite: boolean;
};

interface PropertyListProps {
  landlord_id?: string | null;
  favorites?: boolean | null;
}

const PropertyList = ({ landlord_id, favorites }: PropertyListProps) => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  const markFavorite = (id: string, is_favorite: boolean) => {
    const updatedProperties = properties
      .map((property) =>
        property.id === id ? { ...property, is_favorite } : property
      )
      .filter((p) => (favorites ? p.is_favorite : true));

    setProperties(updatedProperties);
  };

  useEffect(() => {
    const getProperties = async () => {
      let url = "/api/properties/";
      if (landlord_id) {
        url += `?landlord_id=${landlord_id}`;
      } else if (favorites) {
        url += "?is_favorites=true";
      }
      const tmpProperties = await apiService.get(url);
      setProperties(tmpProperties.data);
    };

    getProperties();
  }, [landlord_id, favorites]);

  return (
    <div className="mt-1 grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-4">
      {properties.map((property) => {
        return (
          <PropertyListItem
            key={property.id}
            property={property}
            markFavorite={(is_favorite) =>
              markFavorite(property.id, is_favorite)
            }
          />
        );
      })}
    </div>
  );
};

export default PropertyList;
