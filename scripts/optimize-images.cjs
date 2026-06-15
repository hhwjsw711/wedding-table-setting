const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = "public/gallery";
const files = fs.readdirSync(dir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));

Promise.all(
  files.map(async (f) => {
    const input = path.join(dir, f);
    const output = path.join(dir, f.replace(/\.(jpg|jpeg|png)$/i, ".webp"));
    const img = sharp(input);
    const meta = await img.metadata();
    await img
      .resize({ width: Math.min(meta.width, 1200), withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(output);
    const before = (fs.statSync(input).size / 1024).toFixed(0);
    const after = (fs.statSync(output).size / 1024).toFixed(0);
    console.log(`${f}  ${before}KB → ${after}KB`);
  }),
).then(() => console.log(`\nDone: ${files.length} images converted to WebP`));
