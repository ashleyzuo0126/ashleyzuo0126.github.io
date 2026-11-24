import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import './normalize-assets.mjs';
import './extract-original-fox.mjs';
const root = new URL("../", import.meta.url);
await mkdir(new URL("public/art/", root), { recursive: true });
for (const [original, name] of Object.entries({
  "角色资产.png": "characters.png",
  "场景.png": "scenes.png",
  "道具.png": "props.png",
  "图像与元素.png": "elements.png",
})) {
  await copyFile(
    new URL(`assets/${original}`, root),
    new URL(`public/art/${name}`, root),
  );
}
await writeFile(new URL("public/.nojekyll", root), "");
console.log(
  `Prepared original artwork in ${fileURLToPath(new URL("public/art/", root))}`,
);
