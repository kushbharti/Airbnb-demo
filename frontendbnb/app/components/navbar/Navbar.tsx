import Image from "next/image";
import Link from "next/link";
import SearchFilter from "./SearchFilter";
import UserNav from "./UserNav";
import AddPropertyButton from "./AddPropertyButton";
import { getUserId } from "@/app/lib/actions";

const Navbar = async () => {
  const userId = await getUserId();
  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10 ">
      <div className="max-w-1500px mx-auto px-6 ">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt="Airbnb logo"
              width={100}
              height={100}
            />
          </Link>

          <div className="flex space-x-6">
            <SearchFilter />
          </div>

          <div className="flex items-center space-x-2">
            <AddPropertyButton userId={userId} /> <UserNav userId={userId} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
