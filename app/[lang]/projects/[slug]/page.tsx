import { notFound } from "next/navigation";
import { projects, type Lang } from "@/content/projects";
import CaseStudy from "@/components/CaseStudy";
export const dynamicParams = false;
export function generateStaticParams() {
  return ["zh", "en"].flatMap((lang) =>
    projects.map((p) => ({ lang, slug: p.slug })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return { title: p?.title, description: p?.intro[lang as Lang] };
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p || (lang !== "zh" && lang !== "en")) notFound();
  return <CaseStudy lang={lang} project={p} />;
}
