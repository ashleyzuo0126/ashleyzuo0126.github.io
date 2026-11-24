import { notFound } from "next/navigation";
import Home from "@/components/Home";
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return {
    title:
      lang === "zh"
        ? "左湘宁 · 把好奇心变成作品"
        : "Ashley Zuo · Curiosity into things that work",
    alternates: { languages: { "zh-CN": "/zh/", en: "/en/" } },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "zh" && lang !== "en") notFound();
  return <Home lang={lang} />;
}
