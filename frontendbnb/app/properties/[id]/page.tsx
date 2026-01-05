// app/properties/[id]/page.tsx

import PropertyDetailPageClient from "@/app/components/properties/PropertyDetailPageClient";
import { getUserId } from "@/app/lib/actions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const userId = await getUserId();
  return <PropertyDetailPageClient propertyId={id} userId={userId} />;
}
