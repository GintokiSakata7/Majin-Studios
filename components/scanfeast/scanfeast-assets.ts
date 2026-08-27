export const SCANFEAST_MODEL_ROOT =
  "/scanfeast/models";

export const SCANFEAST_ASSETS = {
  // -------------------------------------------------------
  // DINER
  // -------------------------------------------------------

  table:
    `${SCANFEAST_MODEL_ROOT}/table_round_A_decorated.glb`,

  tableBase:
    `${SCANFEAST_MODEL_ROOT}/table_round_A.glb`,

  chair:
    `${SCANFEAST_MODEL_ROOT}/chair_A.glb`,

  chairAlt:
    `${SCANFEAST_MODEL_ROOT}/chair_B.glb`,

  chairStool:
    `${SCANFEAST_MODEL_ROOT}/chair_stool.glb`,

  wall:
    `${SCANFEAST_MODEL_ROOT}/wall_decorated.glb`,

  wallHalf:
    `${SCANFEAST_MODEL_ROOT}/wall_half.glb`,

  doorway:
    `${SCANFEAST_MODEL_ROOT}/wall_doorway.glb`,

  orderWindow:
    `${SCANFEAST_MODEL_ROOT}/wall_orderwindow_decorated.glb`,

  window:
    `${SCANFEAST_MODEL_ROOT}/wall_window_open.glb`,

  door:
    `${SCANFEAST_MODEL_ROOT}/door_A.glb`,

  menu:
    `${SCANFEAST_MODEL_ROOT}/menu.glb`,

  plate:
    `${SCANFEAST_MODEL_ROOT}/plate.glb`,

  bowl:
    `${SCANFEAST_MODEL_ROOT}/bowl.glb`,

  // -------------------------------------------------------
  // KITCHEN
  // -------------------------------------------------------

  stove:
    `${SCANFEAST_MODEL_ROOT}/stove_multi_decorated.glb`,

  stoveBase:
    `${SCANFEAST_MODEL_ROOT}/stove_multi.glb`,

  pan:
    `${SCANFEAST_MODEL_ROOT}/pan_A.glb`,

  cuttingBoard:
    `${SCANFEAST_MODEL_ROOT}/cuttingboard.glb`,

  knife:
    `${SCANFEAST_MODEL_ROOT}/knife.glb`,

  kitchenCounter:
    `${SCANFEAST_MODEL_ROOT}/kitchencounter_straight_A_decorated.glb`,

  kitchenCounterBase:
    `${SCANFEAST_MODEL_ROOT}/kitchencounter_straight_A.glb`,

  kitchenCounterB:
    `${SCANFEAST_MODEL_ROOT}/kitchencounter_straight_B.glb`,

  kitchenCounterCorner:
    `${SCANFEAST_MODEL_ROOT}/kitchencounter_innercorner_backsplash.glb`,

  kitchenSink:
    `${SCANFEAST_MODEL_ROOT}/kitchencounter_sink_backsplash.glb`,

  kitchenTable:
    `${SCANFEAST_MODEL_ROOT}/kitchentable_A_large_decorated.glb`,

  kitchenSinkTable:
    `${SCANFEAST_MODEL_ROOT}/kitchentable_sink_large_decorated.glb`,

  fridge:
    `${SCANFEAST_MODEL_ROOT}/fridge_A_decorated.glb`,

  extractor:
    `${SCANFEAST_MODEL_ROOT}/extractorhood.glb`,

  shelf:
    `${SCANFEAST_MODEL_ROOT}/shelf_papertowel_decorated.glb`,

  dishRack:
    `${SCANFEAST_MODEL_ROOT}/dishrack.glb`,

  // -------------------------------------------------------
  // FOOD
  // -------------------------------------------------------

  tomato:
    `${SCANFEAST_MODEL_ROOT}/food_ingredient_tomato.glb`,

  tomatoSlices:
    `${SCANFEAST_MODEL_ROOT}/food_ingredient_tomato_slices.glb`,

  onion:
    `${SCANFEAST_MODEL_ROOT}/food_ingredient_onion.glb`,

  onionChopped:
    `${SCANFEAST_MODEL_ROOT}/food_ingredient_onion_chopped.glb`,

  lettuce:
    `${SCANFEAST_MODEL_ROOT}/food_ingredient_lettuce.glb`,

  lettuceChopped:
    `${SCANFEAST_MODEL_ROOT}/food_ingredient_lettuce_chopped.glb`,

  bun:
    `${SCANFEAST_MODEL_ROOT}/food_ingredient_bun.glb`,

  bunTop:
    `${SCANFEAST_MODEL_ROOT}/food_ingredient_bun_top.glb`,

  bunBottom:
    `${SCANFEAST_MODEL_ROOT}/food_ingredient_bun_bottom.glb`,

  burgerRaw:
    `${SCANFEAST_MODEL_ROOT}/food_ingredient_burger_uncooked.glb`,

  burgerCooked:
    `${SCANFEAST_MODEL_ROOT}/food_ingredient_burger_cooked.glb`,

  burger:
    `${SCANFEAST_MODEL_ROOT}/food_burger.glb`,

  // -------------------------------------------------------
  // STORAGE / DETAIL
  // -------------------------------------------------------

  crate:
    `${SCANFEAST_MODEL_ROOT}/crate.glb`,

  crateBuns:
    `${SCANFEAST_MODEL_ROOT}/crate_buns.glb`,

  crateTomatoes:
    `${SCANFEAST_MODEL_ROOT}/crate_tomatoes.glb`,

  crateLettuce:
    `${SCANFEAST_MODEL_ROOT}/crate_lettuce.glb`,

  crateOnions:
    `${SCANFEAST_MODEL_ROOT}/crate_onions.glb`,

  crateCheese:
    `${SCANFEAST_MODEL_ROOT}/crate_cheese.glb`,

  ketchup:
    `${SCANFEAST_MODEL_ROOT}/ketchup.glb`,

  mustard:
    `${SCANFEAST_MODEL_ROOT}/mustard.glb`,

  // -------------------------------------------------------
  // ACTORS
  // -------------------------------------------------------

  chef:
    `${SCANFEAST_MODEL_ROOT}/chef.glb`,

  server:
    `${SCANFEAST_MODEL_ROOT}/server.glb`,
} as const;

export const SCANFEAST_INITIAL_ASSETS = [
  SCANFEAST_ASSETS.table,
  SCANFEAST_ASSETS.chair,
  SCANFEAST_ASSETS.chairAlt,
  SCANFEAST_ASSETS.chairStool,

  SCANFEAST_ASSETS.wall,
  SCANFEAST_ASSETS.wallHalf,
  SCANFEAST_ASSETS.doorway,
  SCANFEAST_ASSETS.orderWindow,
  SCANFEAST_ASSETS.window,
  SCANFEAST_ASSETS.door,

  SCANFEAST_ASSETS.plate,
  SCANFEAST_ASSETS.bowl,
] as const;

export const SCANFEAST_KITCHEN_ASSETS = [
  SCANFEAST_ASSETS.stove,
  SCANFEAST_ASSETS.pan,
  SCANFEAST_ASSETS.cuttingBoard,
  SCANFEAST_ASSETS.knife,
  SCANFEAST_ASSETS.kitchenCounter,
  SCANFEAST_ASSETS.kitchenSinkTable,
  SCANFEAST_ASSETS.fridge,
  SCANFEAST_ASSETS.extractor,
  SCANFEAST_ASSETS.shelf,
  SCANFEAST_ASSETS.dishRack,
  SCANFEAST_ASSETS.tomato,
  SCANFEAST_ASSETS.onion,
  SCANFEAST_ASSETS.lettuce,
  SCANFEAST_ASSETS.bun,
  SCANFEAST_ASSETS.burgerRaw,
  SCANFEAST_ASSETS.burgerCooked,
] as const;

export const SCANFEAST_SERVICE_ASSETS = [
  SCANFEAST_ASSETS.plate,
  SCANFEAST_ASSETS.bowl,
] as const;

export const SCANFEAST_ACTOR_ASSETS = [
  SCANFEAST_ASSETS.chef,
  SCANFEAST_ASSETS.server,
] as const;

export const SCANFEAST_ALL_ASSETS = [
  ...SCANFEAST_INITIAL_ASSETS,
  ...SCANFEAST_KITCHEN_ASSETS,
  ...SCANFEAST_SERVICE_ASSETS,
  ...SCANFEAST_ACTOR_ASSETS,
] as const;

export function getUniqueScanfeastAssets() {
  return [
    ...new Set(
      SCANFEAST_ALL_ASSETS,
    ),
  ];
}

export function getScanfeastAssetName(
  src: string,
) {
  const entry =
    Object.entries(
      SCANFEAST_ASSETS,
    ).find(
      ([, value]) =>
        value === src,
    );

  return (
    entry?.[0] ??
    src
  );
}