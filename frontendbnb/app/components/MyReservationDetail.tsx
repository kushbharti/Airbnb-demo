import Image from "next/image";
import apiService from "../services/apiService";
import Link from "next/link";

interface Props {
  userId: string | null;
}

export interface Reservation {
  id: string;
  start_date: string;
  end_date: string;
  guests: number;
  number_of_nights: number;
  total_price: number;
  property: {
    id: string;
    title: string;
    price_per_night: number;
    image_url: string;
  };
}

const MyReservationDetail = async ({ userId }: Props) => {
  const reservations = await apiService.getAuth<Reservation[]>(
    `/api/auth/myreservations-list/`
  );

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl">My Reservations</h1>
      <div className="space-y-4">
        {reservations.map((reservation) => {
          return (
            <div
              key={reservation.id}
              className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border broder-gray-300 rounded-xl"
            >
              <div className="col-span-1">
                <div className="relative border-2 border-black overflow-hidden aspect-square rounded-xl ">
                  <Image
                    fill
                    src={reservation.property.image_url}
                    alt={reservation.property.title}
                    unoptimized
                    className="hover:scale-110 object-cover transition h-full w-full"
                  />
                </div>
              </div>
              <div className="col-span-3 space-y-2">
                <h2 className="mb-4 text-xl">{reservation.property.title}</h2>
                <p>
                  <strong>Check in date:</strong> {reservation.start_date}
                </p>
                <p>
                  <strong>Check out date:</strong> {reservation.end_date}
                </p>
                <p>
                  <strong>Number of Nights:</strong>{" "}
                  {reservation.number_of_nights}
                </p>
                <p>
                  <strong>Total Price:</strong> $ {reservation.total_price}
                </p>
                <Link
                  href={`/properties/${reservation.property.id}`}
                  className="mt-5 inline-block cursor-pointer py-4 px-6 bg-rose-600  text-white rounded-xl"
                >
                  Go to Property
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default MyReservationDetail;
