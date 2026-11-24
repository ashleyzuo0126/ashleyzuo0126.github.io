'use client';
import Link from 'next/link';
import {useRef,useState} from 'react';
import {projects,type Lang} from '@/content/projects';
import media from '@/content/media.json';
import {asset} from '@/lib/paths';
import {Character} from './Artwork';
export default function ProjectCarousel({lang}:{lang:Lang}){
 const [active,setActive]=useState(0),[failed,setFailed]=useState<Record<string,boolean>>({});
 const start=useRef<{x:number;y:number}|null>(null),dragged=useRef(false);
 const move=(d:number)=>setActive(i=>(i+d+projects.length)%projects.length);
 return <div className="portfolio-carousel" role="region" aria-roledescription="carousel" aria-label={lang==='zh'?'精选作品':'Selected projects'} onKeyDown={e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}if(e.key==='ArrowRight'){e.preventDefault();move(1);}}}>
 <div className="card-stack" onPointerDown={e=>{start.current={x:e.clientX,y:e.clientY};dragged.current=false;}} onPointerUp={e=>{if(!start.current)return;const dx=e.clientX-start.current.x,dy=e.clientY-start.current.y;start.current=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){dragged.current=true;move(dx<0?1:-1);}}} onPointerCancel={()=>{start.current=null;}}>
 {projects.map((p,i)=>{const offset=(i-active+projects.length)%projects.length;const position=offset===3?-1:offset;const shots=media.projects[p.slug as keyof typeof media.projects].screenshots as unknown[];const first=shots[0];const src=typeof first==='string'?first:first&&typeof first==='object'?(first as {src?:string}).src:undefined;return <article key={p.slug} className={`stack-card ${p.color} ${position===0?'is-active':''}`} data-position={position} aria-hidden={position!==0} inert={position!==0}>
 <Link href={`/${lang}/projects/${p.slug}/`} onClick={e=>{if(dragged.current){e.preventDefault();dragged.current=false;}}} draggable={false} tabIndex={position===0?0:-1}>
 <div className="stack-cover">{src&&!failed[p.slug]?<img src={asset(src)} alt={`${p.title} ${lang==='zh'?'项目预览':'project preview'}`} draggable={false} onError={()=>setFailed(x=>({...x,[p.slug]:true}))}/>:<><Character index={p.character}/><span className="card-orbit orbit-one"/><span className="card-orbit orbit-two"/><span className="card-spark">✦</span></>}<span className="stack-index">EXPLORATION / 0{i+1}</span></div>
 <div className="project-info"><small>{p.kind[lang]}</small><div className="card-title"><h3>{p.title}</h3><span>↗</span></div><p>{p.subtitle[lang]}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></div></Link></article>})}
 </div><div className="carousel-controls"><button onClick={()=>move(-1)} aria-label={lang==='zh'?'上一个项目':'Previous project'}>←</button><div className="carousel-dots">{projects.map((p,i)=><button key={p.slug} onClick={()=>setActive(i)} aria-label={p.title} aria-pressed={active===i}><span/></button>)}</div><button onClick={()=>move(1)} aria-label={lang==='zh'?'下一个项目':'Next project'}>→</button></div><p className="carousel-caption" aria-live="polite">0{active+1} / 04 · {projects[active].title}</p><p className="carousel-hint">{lang==='zh'?'左右滑动切换，点击卡片展开项目':'Swipe to explore. Select a card to read the story.'}</p></div>;
}
