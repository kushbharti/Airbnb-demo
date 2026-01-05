import Landlord from "@/app/components/landlords/Landlord";
import { getUserId } from "@/app/lib/actions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const userId = await getUserId();
  return <Landlord landlordId={id} userId={userId} />;
}
