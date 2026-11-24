"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Lang } from "@/content/projects";
import media from "@/content/media.json";
import { asset } from "@/lib/paths";
import { Character } from "./Artwork";
export default function Shell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const zh = lang === "zh",
    path = usePathname();
  const [quiet, setQuiet] = useState(false),
    [playing, setPlaying] = useState(false),
    [notice, setNotice] = useState(""),
    [hash, setHash] = useState("");
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, [path]);
  const audio = useRef<HTMLAudioElement>(null);
  const userPaused = useRef(false);
  useEffect(() => {
    if (!media.music) return;
    let disposed = false;
    const play = () => {
      if (userPaused.current || !audio.current || disposed) return;
      audio.current.volume = .35;
      void audio.current.play().then(() => {
        if (!disposed) setPlaying(true);
      }).catch(() => {});
    };
    const onGesture = (event: Event) => {
      if (event.target instanceof Element && event.target.closest('.icon-button')) return;
      play();
    };
    play();
    document.addEventListener('pointerdown', onGesture);
    document.addEventListener('keydown', onGesture);
    return () => { disposed = true; document.removeEventListener('pointerdown', onGesture); document.removeEventListener('keydown', onGesture); };
  }, []);
  useEffect(() => {
    document.documentElement.lang = zh ? "zh-CN" : "en";
    const system = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setQuiet(
        localStorage.getItem("ashley-motion") === "off" || system.matches,
      );
    update();
    system.addEventListener("change", update);
    return () => system.removeEventListener("change", update);
  }, [zh]);
  useEffect(() => {
    document.documentElement.dataset.motion = quiet ? "off" : "on";
    window.dispatchEvent(new Event("ashley-motion"));
  }, [quiet]);
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(t);
  }, [notice]);
  async function toggleMusic() {
    if (!media.music) {
      setNotice(
        zh ? "森林配乐正在准备中。" : "The forest soundtrack is on its way.",
      );
      return;
    }
    if (!audio.current) return;
    if (playing) {
      userPaused.current = true;
      audio.current.pause();
      setPlaying(false);
    } else {
      userPaused.current = false;
      try {
        audio.current.volume = 0.35;
        await audio.current.play();
        setPlaying(true);
      } catch {
        setNotice(
          zh
            ? "暂时无法播放音乐，请稍后重试。"
            : "Unable to play the soundtrack. Please try again.",
        );
      }
    }
  }
  return (
    <>
      <a className="skip" href="#main">
        {zh ? "跳到正文" : "Skip to content"}
      </a>
      <header className="header">
        <Link href={`/${lang}/`} className="brand" aria-label="Ashley home">
          <Character />
          <span>
            ashley<span className="brand-dot">.</span>
            <small>A LITTLE WORLD OF IDEAS</small>
          </span>
        </Link>
        <nav aria-label={zh ? "主导航" : "Main navigation"}>
          <Link href={`/${lang}/#about`}>{zh ? "关于我" : "About"}</Link>
          <Link href={`/${lang}/#projects`}>{zh ? "作品集" : "Projects"}</Link>
          <Link href={`/${lang}/#journey`}>{zh ? "成长足迹" : "Journey"}</Link>
        </nav>
        <div className="header-tools">
          <button
            className="icon-button"
            onClick={toggleMusic}
            aria-label={zh ? "背景音乐" : "Background music"}
            aria-pressed={playing}
          >
            {playing ? "♫" : "♪"}
            <span className="music-dot" data-playing={playing} />
          </button>
          <Link
            className="language"
            href={`${path.replace(/^\/(zh|en)(?=\/|$)/, zh ? "/en" : "/zh")}${hash}`}
            hrefLang={zh ? "en" : "zh-CN"}
          >
            {zh ? "EN" : "中文"} ↗
          </Link>
          <Link className="contact-button" href={`/${lang}/#contact`}>
            {zh ? "打个招呼" : "Say hello"} <span>↗</span>
          </Link>
        </div>
      </header>
      {media.music && (
        <audio
          ref={audio}
          src={asset(media.music)}
          loop
          autoPlay
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setPlaying(false);
            setNotice(zh ? "音乐文件暂不可用。" : "Soundtrack unavailable.");
          }}
        />
      )}
      <div role="status" className={`toast ${notice ? "visible" : ""}`}>
        {notice}
      </div>
      {children}
      <footer>
        <Link className="footer-brand" href={`/${lang}/`}>
          ashley.
        </Link>
        <p>{zh ? "保持好奇，继续生长。" : "Stay curious. Keep growing."}</p>
        <div>
          <button
            onClick={() => {
              const next = !quiet;
              localStorage.setItem("ashley-motion", next ? "off" : "on");
              setQuiet(next);
            }}
            aria-pressed={quiet}
          >
            {quiet
              ? zh
                ? "动效已减少"
                : "Reduced motion"
              : zh
                ? "减少动效"
                : "Reduce motion"}
          </button>
          <a
            href="https://github.com/ashley20040126"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <span>© 2026 Ashley Zuo</span>
        </div>
      </footer>
    </>
  );
}
