import {
  execFileSync,
} from "node:child_process";

import {
  existsSync,
  mkdirSync,
  readdirSync,
} from "node:fs";

import {
  join,
  relative,
  dirname,
  extname,
  basename,
} from "node:path";

const SOURCE =
  "public/scanfeast/models/kaykit";

const OUTPUT =
  "public/scanfeast/models";

function walk(dir) {
  const result = [];

  for (
    const entry of
    readdirSync(dir, {
      withFileTypes: true,
    })
  ) {
    const full =
      join(
        dir,
        entry.name
      );

    if (
      entry.isDirectory()
    ) {
      result.push(
        ...walk(full)
      );

      continue;
    }

    if (
      /\.(gltf|glb)$/i.test(
        entry.name
      )
    ) {
      result.push(full);
    }
  }

  return result;
}

if (
  !existsSync(SOURCE)
) {
  throw new Error(
    `Missing asset source directory: ${SOURCE}`
  );
}

mkdirSync(
  OUTPUT,
  {
    recursive: true,
  }
);

const assets =
  walk(SOURCE);

console.log(
  `Found ${assets.length} source assets.`
);

for (
  const input of assets
) {
  const relativePath =
    relative(
      SOURCE,
      input
    );

  const name =
    basename(
      relativePath,
      extname(
        relativePath
      )
    );

  const output =
    join(
      OUTPUT,
      `${name}.glb`
    );

  console.log(
    `→ ${relativePath}`
  );

  execFileSync(
    "npx",
    [
      "gltf-transform",
      "copy",
      input,
      output,
    ],
    {
      stdio:
        "inherit",

      shell:
        process.platform ===
        "win32",
    }
  );
}

console.log(
  "\nScanfeast assets optimized."
);
