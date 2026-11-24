import type { Metadata } from "next";
import "../globals.css";
export const metadata: Metadata = {
  title: {
    default: "Ashley Zuo — A little world of ideas",
    template: "%s · Ashley Zuo",
  },
  description:
    "左湘宁 Ashley 的个人作品集。AI 产品、Agent 工作流、运营自动化与数据探索。An illustrated portfolio of AI products, automation and data exploration.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
