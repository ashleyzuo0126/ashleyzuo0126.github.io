import sharp from 'sharp';
import {fileURLToPath} from 'node:url';
import {mkdir} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const {data,info}=await sharp(fileURLToPath(new URL('assets/角色资产.png',root))).extract({left:10,top:10,width:400,height:365}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
// Only remove pale background connected to the crop boundary. Enclosed white fur stays intact.
const w=info.width,h=info.height,seen=new Uint8Array(w*h),queue=new Int32Array(w*h);let start=0,end=0;
function add(x,y){if(x<0||y<0||x>=w||y>=h)return;const p=y*w+x;if(seen[p])return;seen[p]=1;const i=p*4;if(data[i]>225&&data[i+1]>215&&data[i+2]>195){queue[end++]=p;data[i+3]=0;}}
for(let x=0;x<w;x++){add(x,0);add(x,h-1);}for(let y=0;y<h;y++){add(0,y);add(w-1,y);}
while(start<end){const p=queue[start++],x=p%w,y=Math.floor(p/w);add(x-1,y);add(x+1,y);add(x,y-1);add(x,y+1);}
await mkdir(new URL('public/art/original/',root),{recursive:true});
for(const ext of ['png','webp'])await sharp(data,{raw:{width:w,height:h,channels:4}}).resize(512,512,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).toFormat(ext).toFile(fileURLToPath(new URL(`public/art/original/fox.${ext}`,root)));
