"use client";
import Link from "next/link";
import { useState } from "react";
import {
  projects,
  categories,
  repoUrl,
  type Project,
  type Lang,
} from "@/content/projects";
import media from "@/content/media.json";
import { asset } from "@/lib/paths";
import Shell from "./Shell";
import { Character } from "./Artwork";
type Screenshot = { src: string; alt: { zh: string; en: string } };
function Shot({ shot, lang }: { shot: Screenshot; lang: Lang }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure>
      {failed ? (
        <div className="empty-media">
          {lang === "zh" ? "图片暂不可用" : "Image unavailable"}
        </div>
      ) : (
        <img
          src={asset(shot.src)}
          alt={shot.alt[lang]}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      <figcaption>{shot.alt[lang]}</figcaption>
    </figure>
  );
}
export default function CaseStudy({
  lang,
  project: p,
}: {
  lang: Lang;
  project: Project;
}) {
  const zh = lang === "zh",
    next =
      projects[
        (projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length
      ];
  const files = media.projects[p.slug as keyof typeof media.projects];
  const screenshots: Screenshot[] = files.screenshots.flatMap((entry: unknown) => {
    const fallback = {zh: `${p.title} 项目截图`, en: `${p.title} screenshot`};
    if (typeof entry === 'string' && entry.trim()) return [{src: entry, alt: fallback}];
    if (!entry || typeof entry !== 'object') return [];
    const item = entry as {src?: unknown; alt?: Partial<Record<Lang, string>> | string};
    if (typeof item.src !== 'string' || !item.src.trim()) return [];
    return [{src: item.src, alt: typeof item.alt === 'string' ? {zh: item.alt, en: item.alt} : {zh: item.alt?.zh || fallback.zh, en: item.alt?.en || fallback.en}}];
  });
  const [videoError, setVideoError] = useState(false);
  return (
    <Shell lang={lang}>
      <main id="main" className="case-main">
        <div className="section-wrap">
          <Link className="back-link" href={`/${lang}/#projects`}>
            ← {zh ? "返回作品地图" : "Back to the project trail"}
          </Link>
          <section className={`case-hero ${p.color}`}>
            <div>
              <span className="eyebrow">
                {categories[p.category][lang]} / {p.kind[lang]}
              </span>
              <h1>{p.title}</h1>
              <h2>{p.subtitle[lang]}</h2>
              <p>{p.intro[lang]}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <a
                className="button primary"
                href={repoUrl(p)}
                target="_blank"
                rel="noreferrer"
              >
                {zh ? "查看源代码" : "View source"} ↗
              </a>
            </div>
            <Character index={p.character} />
          </section>
          <div className="case-body">
            <aside>
              <span className="eyebrow">{zh ? "探索笔记" : "FIELD NOTES"}</span>
              <a href="#question">01 / {zh ? "从问题出发" : "The question"}</a>
              <a href="#approach">02 / {zh ? "方案与流程" : "The approach"}</a>
              <a href="#contribution">
                03 / {zh ? "个人贡献" : "My contribution"}
              </a>
              <a href="#outcome">04 / {zh ? "项目产物" : "The outcome"}</a>
              <a href="#media">05 / {zh ? "截图与演示" : "See it in action"}</a>
            </aside>
            <div className="case-content">
              <section id="question">
                <span className="eyebrow">01 / THE QUESTION</span>
                <h2>
                  {zh ? "从一个问题开始。" : "It starts with a question."}
                </h2>
                <p>{p.problem[lang]}</p>
              </section>
              <section id="approach">
                <span className="eyebrow">02 / THE APPROACH</span>
                <h2>
                  {zh ? "把想法变成路径。" : "A path from idea to interaction."}
                </h2>
                {p.approach.map((a, i) => (
                  <div className="approach-row" key={i}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <p>{a[lang]}</p>
                  </div>
                ))}
                <div className="flow">
                  {p.steps.map((s, i) => (
                    <div key={i}>
                      <span>{i + 1}</span>
                      {s[lang]}
                      {i < p.steps.length - 1 && <b aria-hidden="true">→</b>}
                    </div>
                  ))}
                </div>
              </section>
              <section id="contribution">
                <span className="eyebrow">03 / MY CONTRIBUTION</span>
                <h2>{zh ? "我在其中做了什么。" : "My part in the story."}</h2>
                <p>
                  {p.contribution?.[lang] ||
                    (zh
                      ? "个人贡献说明正在整理，后续补充。"
                      : "A detailed account of my contribution will be added here.")}
                </p>
              </section>
              <section id="outcome">
                <span className="eyebrow">04 / THE OUTCOME</span>
                <h2>
                  {zh ? "留下的作品与收获。" : "What the exploration produced."}
                </h2>
                <p>{p.outcome[lang]}</p>
                <a
                  className="text-link"
                  href={repoUrl(p)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {zh ? "在 GitHub 阅读项目" : "Explore the repository"} ↗
                </a>
              </section>
              <section id="media">
                <span className="eyebrow">05 / SHOW & TELL</span>
                <h2>{zh ? "来看看它的样子。" : "See it in action."}</h2>
                <h3>{zh ? "项目截图" : "Screenshots"}</h3>
                {screenshots.length ? (
                  <div className="screenshot-gallery">
                    {screenshots.map((s, i) => (
                      <Shot key={i} shot={s} lang={lang} />
                    ))}
                  </div>
                ) : (
                  <div className="empty-media">
                    <span>▧</span>
                    <strong>
                      {zh ? "截图即将补充" : "Screenshots coming soon"}
                    </strong>
                    <p>
                      {zh
                        ? "这里将展示真实的产品界面与关键流程。"
                        : "Real product screens and key flows will appear here."}
                    </p>
                  </div>
                )}
                <h3>{zh ? "Demo 演示" : "Demo"}</h3>
                {files.video && !videoError ? (
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    src={asset(files.video)}
                    aria-label={`${p.title} demo`}
                    onError={() => setVideoError(true)}
                  />
                ) : (
                  <div className="empty-media">
                    <span>▷</span>
                    <strong>
                      {videoError
                        ? zh
                          ? "视频暂不可用"
                          : "Video unavailable"
                        : zh
                          ? "Demo 即将补充"
                          : "Demo coming soon"}
                    </strong>
                    <p>
                      {zh
                        ? "录屏准备好后，你可以在这里观看完整演示。"
                        : "A walkthrough will be available here once the recording is ready."}
                    </p>
                  </div>
                )}
                {files.demoUrl && (
                  <a
                    href={files.demoUrl}
                    className="button primary demo-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {zh ? "打开在线 Demo" : "Open live demo"} ↗
                  </a>
                )}
              </section>
            </div>
          </div>
          <Link
            className={`next-project ${next.color}`}
            href={`/${lang}/projects/${next.slug}/`}
          >
            <div>
              <span className="eyebrow">
                {zh ? "下一站" : "NEXT EXPLORATION"}
              </span>
              <h2>{next.title} ↗</h2>
              <p>{next.subtitle[lang]}</p>
            </div>
            <Character index={next.character} />
          </Link>
        </div>
      </main>
    </Shell>
  );
}
