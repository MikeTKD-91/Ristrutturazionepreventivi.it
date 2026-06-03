import { permanentRedirect } from "next/navigation";
import { comuni } from "@/data/comuni";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comuni.map((c) => ({ slug: c.slug }));
}

export default async function RistrutturazioneAppartamentoCompletoRedirect({ params }: PageProps) {
  const { slug } = await params;
  permanentRedirect(`/comune/${slug}/`);
}
