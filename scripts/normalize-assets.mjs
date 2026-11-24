import sharp from 'sharp';
import {fileURLToPath} from 'node:url';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('assets/v2/sources.json',root),'utf8'));
await mkdir(new URL('public/art/v2/',root),{recursive:true});
const report={version:2,lighting:'upper-left',shadow:'single CSS ground shadow',assets:{}};
for(const [name,file] of Object.entries(manifest)){
 const landscape=['sky','far','middle','foreground'].includes(name);
 const width=landscape?1600:512,height=landscape?1000:512;
 const source=fileURLToPath(new URL(`assets/v2/${file}`,root));
 const metadata=await sharp(source).metadata();
 const stats=await sharp(source).stats();
 if(!metadata.hasAlpha || stats.channels[3]?.min!==0 || stats.channels[3]?.max!==255)throw new Error(`${name}: invalid transparent alpha`);
 for(const format of ['webp','png'])await sharp(source).resize(width,height,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).toFormat(format).toFile(fileURLToPath(new URL(`public/art/v2/${name}.${format}`,root)));
 report.assets[name]={width,height,anchor:landscape?[.5,1]:name==='head'?[.5,.85]:name==='tail'?[.8,.8]:['arm','leg'].includes(name)?[.5,.2]:[.5,.85],source:file};
}
await writeFile(new URL('public/art/v2/manifest.json',root),JSON.stringify(report,null,2));
console.log('Normalized transparent PNG / WebP assets.');
