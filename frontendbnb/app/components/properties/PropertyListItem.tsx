import Image from "next/image";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";

interface PropertyProbs {
  property: PropertyType;
  markFavorite?: (is_favorite: boolean) => void;
}

const PropertyListItem = ({ property, markFavorite }: PropertyProbs) => {
  //
  //
  const router = useRouter();
  //
  //
  const imageUrl =
    property.image_url.replace("htpp:", "http://") || "/fallback.jpg";
  console.log(imageUrl);
  //
  //

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        if (property.id) {
          router.push(`/properties/${property.id}`);
        } else {
          console.warn("Skipping navigation: missing property ID", property);
        }
      }}
    >
      <div className="relative w-full border-2 aspect-square overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt="Beach house"
          fill
          unoptimized={true}
          sizes="(max-width: 768px) 100vw,
           (max-width: 1024px) 33vw,
           20vw"
          className="object-cover transition-transform duration-300 ease-out hover:scale-110"
        />
        {markFavorite && (
          <FavoriteButton
            id={property.id}
            is_favorite={property.is_favorite}
            markFavorite={(is_favorite) => markFavorite(is_favorite)}
          />
        )}
      </div>

      <div className="mt-2">
        <p className="text-lg font-bold">{property.title}</p>
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-500">
          <strong>$ {property.price_per_night}</strong> per night
        </p>
      </div>
    </div>
  );
};

export default PropertyListItem;
