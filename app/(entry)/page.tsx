import Link from "next/link";
export default function Entry() {
  return (
    <main className="entry">
      <span className="eyebrow">ASHLEY’S LITTLE WORLD</span>
      <h1>
        你好，探索者。
        <br />
        <em>Hello, explorer.</em>
      </h1>
      <p>
        选择一种语言，开启这段旅程。
        <br />
        Choose a language and make yourself at home.
      </p>
      <div className="actions">
        <Link className="button primary" href="/zh/">
          中文 · 开始探索 ↗
        </Link>
        <Link className="button" href="/en/">
          English · Let’s explore ↗
        </Link>
      </div>
    </main>
  );
}
