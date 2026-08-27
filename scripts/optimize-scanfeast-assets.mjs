import {
  execFileSync,
} from "node:child_process";
import {
  existsSync,
  mkdirSync,
} from "node:fs";
import {
  basename,
  extname,
  join,
  relative,
} from "node:path";
import { readdirSync } from "node:fs";

const SOURCE =
  "public/scanfeast/models/kaykit";

const OUTPUT =
  "public/scanfeast/models";

mkdirSync(OUTPUT, {
  recursive: true,
});

function walk(dir) {
  const result = [];

  for (const entry of readdirSync(dir, {
    withFileTypes: true,
  })) {
    const full =
      join(dir, entry.name);

    if (entry.isDirectory()) {
      result.push(...walk(full));
      continue;
    }

    if (/\.(gltf|glb)$/i.test(entry.name)) {
      result.push(full);
    }
  }

  return result;
}

if (!existsSync(SOURCE)) {
  throw new Error(
    `Missing Scanfeast source: ${SOURCE}`,
  );
}

const assets = walk(SOURCE);

console.log(
  `Found ${assets.length} source assets.`,
);

for (const input of assets) {
  const rel =
    relative(SOURCE, input);

  const name =
    basename(rel, extname(rel));

  const output =
    join(OUTPUT, `${name}.glb`);

  console.log(`Optimizing ${rel}`);

  execFileSync(
    "npx",
    [
      "gltf-transform",
      "copy",
      input,
      output,
    ],
    {
      stdio: "inherit",
      shell:
        process.platform === "win32",
    },
  );
}

console.log(
  "Scanfeast assets optimized.",
);
