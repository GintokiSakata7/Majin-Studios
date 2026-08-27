import {
  existsSync,
} from "node:fs";

const REQUIRED = [
  "table_round_A.glb",
  "chair_A.glb",
  "floor_kitchen.glb",
  "wall.glb",
  "wall_doorway.glb",
  "door_A.glb",
  "extractorhood.glb",
  "shelf_papertowel_decorated.glb",
  "shelf_papertowel.glb",
  "jar_A_large.glb",
  "jar_B_medium.glb",
  "stove_multi.glb",
  "pan_A.glb",
  "plate.glb",
  "cuttingboard.glb",
  "knife.glb",
  "food_ingredient_tomato.glb",
  "food_ingredient_onion.glb",
  "food_ingredient_lettuce.glb",
  "food_ingredient_burger_cooked.glb",
  "food_ingredient_burger_uncooked.glb",
  "bowl.glb",
  "server.glb",
];

const ROOT =
  "public/scanfeast/models";

let failed = false;

console.log(
  "\nSCANFEAST ASSET AUDIT\n"
);

for (
  const asset of REQUIRED
) {
  const path =
    `${ROOT}/${asset}`;

  const exists =
    existsSync(path);

  console.log(
    `${exists ? "✓" : "✕"} ${asset}`
  );

  if (!exists) {
    failed = true;
  }
}

if (failed) {
  console.error(
    "\nAsset audit failed."
  );

  process.exit(1);
}

console.log(
  "\nAll required Scanfeast assets are present."
);
