import Myproperties from "../components/landlords/Myproperties";
import { getUserId } from "@/app/lib/actions";

const MyPropertiesPage = async () => {
  const userId = await getUserId();
  return <Myproperties userId={userId} />;
};

export default MyPropertiesPage;
