import type { Metadata } from 'next';
import '../globals.css';
import '../rig.css';
import '../carousel.css';
export const metadata: Metadata = {
  title: { default: 'Ashley Zuo — A little world of ideas', template: '%s · Ashley Zuo' },
  description: 'Ashley Zuo — AI products, automation and data exploration. 左湘宁的产品与探索记录。',
};
export default async function LocaleLayout({children,params}: {children: React.ReactNode;params: Promise<{lang: string}>}) {
  const {lang}=await params;
  return <html lang={lang==='zh'?'zh-CN':'en'}><body>{children}</body></html>;
}
