"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type Lang } from "@/content/projects";
import Shell from "./Shell";
import ProjectCarousel from "./ProjectCarousel";
import { Character, Scene, AnimatedFox } from "./Artwork";
export default function Home({ lang }: { lang: Lang }) {
  const zh = lang === "zh",
    root = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx: gsap.Context | undefined;
    const setup = () => {
      ctx?.revert();
      if (
        document.documentElement.dataset.motion === "off" ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      ctx = gsap.context(() => {
        gsap.from(".hero-copy > *", {
          y: 22,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
        });
        gsap.from(".hero-world", {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.15,
          ease: "power2.out",
        });
        gsap.to(".hero-fox > .original-fox", {
          y: -9,
          rotation: 3,
          duration: 1.9,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.utils
          .toArray<HTMLElement>(".reveal")
          .forEach((el) =>
            gsap.from(el, {
              y: 30,
              opacity: 0,
              duration: 0.7,
              scrollTrigger: { trigger: el, start: "top 93%", once: true },
            }),
          );
      }, root);
    };
    setup();
    window.addEventListener("ashley-motion", setup);
    return () => {
      ctx?.revert();
      window.removeEventListener("ashley-motion", setup);
    };
  }, []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("17700086117@163.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }
  return (
    <Shell lang={lang}>
      <main id="main" ref={root}>
        <section className="hero section-wrap">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="little-star">✳</span> WELCOME TO MY LITTLE WORLD
            </span>
            <h1>
              {zh ? "你好，我是" : "Hi, I’m"}
              <br />
              <span className="name">
                Ashley<span className="sunburst">✳</span>
              </span>
            </h1>
            <p className="hero-tagline">
              {zh
                ? "把好奇心，变成有用的作品。"
                : "Turning curiosity into things that work."}
            </p>
            <p className="hero-description">
              {zh
                ? "在产品、数据与 AI 的交汇处探索。\n我喜欢发现问题，也喜欢亲手把想法做出来。"
                : "Exploring where products, data and AI meet.\nI like finding the right questions—and building my way to answers."}
            </p>
            <div className="actions">
              <a href="#projects" className="button primary">
                {zh ? "探索我的作品" : "Explore my work"} <span>↗</span>
              </a>
              <a href="#about" className="text-link">
                {zh ? "先认识一下我" : "A little about me"} <span>↓</span>
              </a>
            </div>
            <div className="hero-footnote">
              <span className="scribble">↳</span>{" "}
              {zh
                ? "带上好奇心，一起出发。"
                : "Bring your curiosity. Let’s take a look around."}
            </div>
          </div>
          <div className="hero-world">
            <div className="world-label">FIELD NOTES / NO. 001</div>
            <span className="world-sun">☼</span>
            <span className="cloud cloud-one" />
            <span className="cloud cloud-two" />
            <Scene index={0} className="hero-landscape" />
            <div className="fox-label">
              {zh ? "今天，也在探索中！" : "Always exploring!"}
            </div>
            <div className="hero-fox">
              <AnimatedFox />
            </div>
            <span className="floating-star star-one">✦</span>
            <span className="floating-star star-two">✦</span>
            <div className="world-stamp">
              CURIOUS MIND
              <br />
              <b>OPEN HEART</b>
              <span>✿</span>
            </div>
            <div className="world-caption">
              <span>01 / {zh ? "好奇心的起点" : "WHERE CURIOSITY BEGINS"}</span>
              <span>↓ {zh ? "向下探索" : "SCROLL TO EXPLORE"}</span>
            </div>
          </div>
        </section>
        <div
          className="ribbon"
          aria-label={zh ? "探索方向" : "Areas of interest"}
        >
          <span>AI PRODUCTS</span>
          <i>✳</i>
          <span>HUMAN-CENTERED</span>
          <i>✳</i>
          <span>DATA & INSIGHTS</span>
          <i>✳</i>
          <span>ALWAYS CURIOUS</span>
          <i>✳</i>
        </div>
        <section id="about" className="section-wrap about reveal">
          <div className="about-art">
            <Scene index={2} />
            <span className="art-note">
              {zh
                ? "在知识森林里，慢慢扎根。"
                : "Growing roots in a forest of ideas."}
            </span>
          </div>
          <div className="about-copy">
            <span className="eyebrow">
              01 / {zh ? "认识探索者" : "MEET THE EXPLORER"}
            </span>
            <h2>
              {zh ? (
                <>
                  人文的视角，
                  <br />
                  动手的习惯。
                </>
              ) : (
                <>
                  A human perspective.
                  <br />A builder’s instinct.
                </>
              )}
            </h2>
            <p>
              {zh
                ? "我是左湘宁 Ashley。从英语与人工智能经济学出发，我把对人的观察带进产品，把数据分析带进运营，也用 AI 和自动化让想法落地。"
                : "I’m Xiangning “Ashley” Zuo. With a background in English and AI economics, I bring human observation into products, data into operations, and AI into everyday workflows."}
            </p>
            <p>
              {zh
                ? "这里记录了我做过的产品、搭建的工具，以及还在继续的学习。欢迎招聘伙伴、产品同行，也欢迎每一个好奇的你。"
                : "This is a collection of products, tools and ongoing learning. Welcome, hiring teams, fellow product people, and anyone who’s a little curious."}
            </p>
            <div className="education">
              <div>
                <span>2022 — 2026</span>
                <strong>{zh ? "厦门大学" : "Xiamen University"}</strong>
                <p>
                  {zh
                    ? "英语本科 · 人工智能经济学辅修"
                    : "BA in English · Minor in AI Economics"}
                </p>
              </div>
              <div>
                <span>2027 — 2028 {zh ? "（预计）" : "(EXPECTED)"}</span>
                <strong>
                  {zh ? "香港中文大学" : "The Chinese University of Hong Kong"}
                </strong>
                <p>
                  {zh
                    ? "市场营销学硕士 · 已录取，待入学"
                    : "MSc in Marketing · Admitted, not yet enrolled"}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="projects-section">
          <div className="section-wrap">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">
                  02 / {zh ? "作品探索地图" : "THE PROJECT TRAIL"}
                </span>
                <h2>{zh ? "想法在这里生根。" : "Ideas take root here."}</h2>
              </div>
              <p>
                {zh
                  ? "4 个项目，4 段探索。\n从一次提问，到一个可以打开的作品。"
                  : "Four projects. Four explorations.\nFrom a question to something you can open."}
              </p>
            </div>
            <ProjectCarousel lang={lang} />
            <div className="project-end">
              <span>✳</span>
              <p>
                {zh
                  ? "每个项目，都是一份探索记录。"
                  : "Every project is a field note from the journey."}
              </p>
              <a
                href="https://github.com/ashley20040126"
                target="_blank"
                rel="noreferrer"
              >
                {zh ? "到 GitHub 看看" : "Visit my GitHub"} ↗
              </a>
            </div>
          </div>
        </section>
        <section id="journey" className="section-wrap journey">
          <div className="journey-intro reveal">
            <span className="eyebrow">
              03 / {zh ? "成长的足迹" : "ALONG THE WAY"}
            </span>
            <h2>
              {zh ? (
                <>
                  走过的路，
                  <br />
                  成为新的养分。
                </>
              ) : (
                <>
                  Every experience.
                  <br />A little more growth.
                </>
              )}
            </h2>
            <p>
              {zh
                ? "从商业分析到 AI 产品实践，\n我在真实的问题里学习。"
                : "From business analysis to AI product practice,\nI learn by working on real problems."}
            </p>
            <Scene index={1} />
          </div>
          <div className="timeline">
            {[
              {
                date: "2026.07 — 2026.11",
                company: zh ? "碧谷科技" : "Bigu Technology",
                role: zh
                  ? "国际化短视频商业化产品 · AI 短剧"
                  : "International short-video products · AI drama",
                text: zh
                  ? "跟进剧本评估、制作审核与发行排期；搭建 Agent PM 工作台，探索 AIGC 评测与自动化协作。"
                  : "Coordinated script evaluation, production reviews and releases; built an Agent PM workspace and explored AIGC evaluation workflows.",
                stats: [
                  ["54", zh ? "部短剧上线" : "dramas released"],
                  ["108", zh ? "个评测 Case" : "evaluation cases"],
                ],
              },
              {
                date: "2026.01 — 2026.06",
                company: zh ? "佩莱集团" : "Pelai Group",
                role: zh ? "商业分析实习生" : "Business Analysis Intern",
                text: zh
                  ? "整合商品、社媒与行业信息支持新品规划；协同产品经理，用 Python 与 LLM 进行字段映射和 SKU 标准化。"
                  : "Combined product, social and industry research for product planning; collaborated with a PM on Python and LLM-based field mapping and SKU standardization.",
                stats: [
                  ["104k", zh ? "条 SKU 标准化" : "SKUs standardized"],
                  ["15 → 6", zh ? "人天工作量" : "person-days"],
                ],
              },
              {
                date: "2025.09 — 2025.12",
                company: zh ? "值得买科技" : "Zhi De Mai Technology",
                role: zh
                  ? "抖音电商运营实习生"
                  : "Douyin E-commerce Operations Intern",
                text: zh
                  ? "以 AI Coding 与影刀 RPA 串联取数、清洗、分析与报告，沉淀工具包，向投放团队分享方法。"
                  : "Connected data collection, cleaning, analysis and reporting with AI coding and RPA; documented tools and shared workflows with the advertising team.",
                stats: [
                  ["30+", zh ? "位同事参与分享" : "colleagues reached"],
                  ["AI + RPA", zh ? "工作流实践" : "workflow practice"],
                ],
              },
            ].map((e, i) => (
              <article className="timeline-item reveal" key={e.date}>
                <span className="timeline-dot">{i + 1}</span>
                <time>{e.date}</time>
                <h3>{e.company}</h3>
                <h4>{e.role}</h4>
                <p>{e.text}</p>
                <div className="experience-stats">
                  {e.stats.map(([value, label]) => (
                    <div key={label}>
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="backpack section-wrap reveal">
          <div>
            <span className="eyebrow">
              04 / {zh ? "探索者的背包" : "IN MY BACKPACK"}
            </span>
            <h2>{zh ? "随身携带的能力。" : "Tools for the trail."}</h2>
          </div>
          <div className="skills-grid">
            {[
              [
                zh ? "产品与人" : "Product & people",
                "Product thinking · User flows · UI design",
                zh
                  ? "需求拆解 / 用户流程 / 体验设计"
                  : "Framing needs / Mapping journeys / Designing experiences",
              ],
              [
                zh ? "AI 与工作流" : "AI & workflows",
                "Agents · Prompt design · AIGC evaluation",
                zh
                  ? "工具调用 / 人工确认 / 评测迭代"
                  : "Tool use / Human review / Evaluation",
              ],
              [
                zh ? "数据与表达" : "Data & communication",
                "Python · SQL · English",
                zh
                  ? "数据分析 / 跨文化协作 / IELTS 7.5"
                  : "Data analysis / Cross-cultural collaboration / IELTS 7.5",
              ],
            ].map(([title, tags, desc], i) => (
              <div key={title}>
                <span className="skill-icon">{["✳", "⌘", "↗"][i]}</span>
                <h3>{title}</h3>
                <p>{tags}</p>
                <small>{desc}</small>
              </div>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="contact-cloud" />
          <div className="section-wrap contact-inner reveal">
            <Character index={0} />
            <span className="eyebrow">THE NEXT CHAPTER</span>
            <h2>
              {zh ? (
                <>
                  下一个好想法，
                  <br />
                  也许从一句你好开始。
                </>
              ) : (
                <>
                  The next good idea
                  <br />
                  could start with hello.
                </>
              )}
            </h2>
            <p>
              {zh
                ? "聊产品、聊合作，或分享一件最近让你着迷的事。"
                : "Let’s talk products, collaborate, or share something that sparked your curiosity."}
            </p>
            <div className="actions">
              <a className="button primary" href="mailto:17700086117@163.com">
                {zh ? "给我写封信" : "Write me a note"} ↗
              </a>
              <button className="text-link" onClick={copyEmail}>
                {copied
                  ? zh
                    ? "已复制邮箱 ✓"
                    : "Email copied ✓"
                  : zh
                    ? "复制邮箱"
                    : "Copy email"}
              </button>
            </div>
            <a className="email" href="mailto:17700086117@163.com">
              17700086117@163.com
            </a>
            <span className="contact-flower">✿</span>
          </div>
        </section>
      </main>
    </Shell>
  );
}
