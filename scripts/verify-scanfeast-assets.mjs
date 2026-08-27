import { existsSync } from "node:fs";

const REQUIRED = [
  "table_round_A.glb",
  "chair_A.glb",
  "stove_multi.glb",
  "pan_A.glb",
  "food_ingredient_burger_uncooked.glb",
  "food_ingredient_burger_cooked.glb",
  "food_ingredient_tomato.glb",
  "food_ingredient_onion.glb",
  "food_ingredient_lettuce.glb",
  "bowl.glb",
  "plate.glb",
  "cuttingboard.glb",
  "knife.glb",
  "server.glb",
  "chef.glb",
];

const ROOT =
  "public/scanfeast/models";

let failed = false;

for (const asset of REQUIRED) {
  const path =
    `${ROOT}/${asset}`;

  const ok =
    existsSync(path);

  console.log(
    `${ok ? "✓" : "✕"} ${asset}`,
  );

  if (!ok) {
    failed = true;
  }
}

if (failed) {
  console.error(
    "\nScanfeast asset audit failed.",
  );

  process.exit(1);
}

console.log(
  "\nScanfeast asset audit passed.",
);
