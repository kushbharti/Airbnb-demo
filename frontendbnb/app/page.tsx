import Categories from "@/app/components/Categories";
import PropertyList from "@/app/components/properties/PropertyList";

export default function Home() {
  return (
    <main className="max-w-[1500px] mx-auto px-6 ">
      <Categories />

      <div className="">
        <PropertyList />
      </div>
    </main>
  );
}
