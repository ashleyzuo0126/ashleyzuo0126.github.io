'use client';
import { asset } from '@/lib/paths';
export function Character({className=''}:{index?:number;className?:string}){
 return <img aria-hidden="true" className={`character original-fox ${className}`} src={asset('/art/original/fox.webp')} alt="" draggable={false}/>;
}
export function AnimatedFox(){return <Character/>;}
export function Scene({index=0,className=''}:{index?:number;className?:string}){
 return <div aria-hidden="true" className={`scene layered-scene scene-${index} ${className}`}>
 {['sky','far','middle','foreground'].map(layer=><img key={layer} className={`land-layer land-${layer}`} src={asset(`/art/v2/${layer}.webp`)} alt="" draggable={false}/>)}
 </div>;
}
