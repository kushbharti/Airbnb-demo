// import Image from "next/image";
import MyReservationDetail from "../components/MyReservationDetail";
import { getUserId } from "../lib/actions";

const MyReservationsPage = async () => {
  const userId = await getUserId();
  return <MyReservationDetail userId={userId} />;
};

export default MyReservationsPage;
