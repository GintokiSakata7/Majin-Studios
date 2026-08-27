import re

with open("components/productpages/scanfeast-scene.ts", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update createScanfeastWorld signature
code = code.replace(
    "export function createScanfeastWorld(\n    canvas: HTMLCanvasElement\n): ScanfeastWorld {",
    "export function createScanfeastWorld(\n    canvas: HTMLCanvasElement,\n    assets: {\n        table: string;\n        menu: string;\n        cart: string;\n        order: string;\n        incoming: string;\n        cooking: string;\n        server: string;\n        manager: string;\n    }\n): ScanfeastWorld {"
)

# 2. Add texture loader, order states, live KDS
top_additions = """
type KitchenState =
  | "WAITING"
  | "ACCEPTED"
  | "COOKING"
  | "READY";

function orderStateAtProgress(
  progress: number
): KitchenState {
  if (progress < 0.31) {
    return "WAITING";
  }

  if (progress < 0.39) {
    return "ACCEPTED";
  }

  if (progress < 0.57) {
    return "COOKING";
  }

  return "READY";
}

function createTextureLoader(
  renderer: THREE.WebGLRenderer
) {
  const loader =
    new THREE.TextureLoader();

  const cache =
    new Map<
      string,
      THREE.Texture
    >();

  return {
    load(path: string) {
      const existing =
        cache.get(path);

      if (existing) {
        return existing;
      }

      const texture =
        loader.load(path);

      texture.colorSpace =
        THREE.SRGBColorSpace;

      texture.anisotropy =
        Math.min(
          4,
          renderer.capabilities
            .getMaxAnisotropy()
        );

      cache.set(
        path,
        texture
      );

      return texture;
    },

    dispose() {
      cache.forEach(
        (texture) => {
          texture.dispose();
        }
      );

      cache.clear();
    },
  };
}

function createKDSLiveTexture() {
  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width = 900;
  canvas.height = 560;

  const ctx =
    canvas.getContext(
      "2d"
    );

  if (!ctx) {
    throw new Error(
      "Unable to create KDS canvas"
    );
  }

  const texture =
    new THREE.CanvasTexture(
      canvas
    );

  texture.colorSpace =
    THREE.SRGBColorSpace;

  return {
    texture,

    update(
      state: KitchenState,
      elapsed: number
    ) {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.fillStyle =
        "#ffffff";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      /**
       * Header
       */

      ctx.fillStyle =
        "#f97316";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        74
      );

      ctx.fillStyle =
        "#ffffff";

      ctx.font =
        "700 27px Arial";

      ctx.fillText(
        "SCANFEAST · KITCHEN",
        30,
        47
      );

      /**
       * Order number
       */

      ctx.fillStyle =
        "#172033";

      ctx.font =
        "700 30px Arial";

      ctx.fillText(
        "ORDER #4029",
        35,
        125
      );

      ctx.font =
        "500 19px Arial";

      ctx.fillStyle =
        "#707988";

      ctx.fillText(
        "Table 12",
        35,
        156
      );

      /**
       * Status
       */

      const statusColor =
        state === "READY"
          ? "#22c55e"
          : state === "COOKING"
            ? "#f97316"
            : "#eab308";

      ctx.fillStyle =
        statusColor;

      ctx.beginPath();

      ctx.roundRect(
        610,
        105,
        235,
        52,
        26
      );

      ctx.fill();

      ctx.fillStyle =
        "#ffffff";

      ctx.font =
        "700 19px Arial";

      ctx.fillText(
        state,
        665,
        138
      );

      /**
       * Food items
       */

      ctx.fillStyle =
        "#172033";

      ctx.font =
        "600 22px Arial";

      ctx.fillText(
        "Paneer Tikka Masala",
        38,
        228
      );

      ctx.fillText(
        "Butter Naan × 2",
        38,
        274
      );

      ctx.fillText(
        "Cold Coffee",
        38,
        320
      );

      /**
       * Progress
       */

      const progress =
        state === "WAITING"
          ? 0.1
          : state === "ACCEPTED"
            ? 0.24
            : state === "COOKING"
              ? 0.67 +
                Math.sin(
                  elapsed * 2
                ) *
                  0.03
              : 1;

      ctx.fillStyle =
        "#edf0f2";

      ctx.roundRect(
        35,
        390,
        810,
        22,
        11
      );

      ctx.fill();

      ctx.fillStyle =
        statusColor;

      ctx.roundRect(
        35,
        390,
        810 * progress,
        22,
        11
      );

      ctx.fill();

      /**
       * Footer state
       */

      ctx.fillStyle =
        "#707988";

      ctx.font =
        "500 17px Arial";

      const footer =
        state === "READY"
          ? "Ready for server pickup"
          : state === "COOKING"
            ? "Chef is preparing the order"
            : "Order received";

      ctx.fillText(
        footer,
        35,
        470
      );

      texture.needsUpdate =
        true;
    },
  };
}

function createPickupStation() {
  const group =
    new THREE.Group();

  const counter =
    cube(
      [2.7, 0.85, 1.3],
      C.wood,
      0.8
    );

  counter.position.y =
    0.45;

  group.add(counter);

  const plate =
    cyl(
      0.62,
      0.055,
      C.white,
      32
    );

  plate.position.set(
    0,
    0.92,
    0
  );

  group.add(plate);

  const sign =
    cube(
      [1.4, 0.36, 0.06],
      C.orange
    );

  sign.position.set(
    0,
    1.65,
    -0.45
  );

  group.add(sign);

  group.userData.role =
    "pickup";

  return group;
}
"""
code = code.replace("function createFloor() {", top_additions + "\nfunction createFloor() {")

# 3. Replace createPhone
phone_old = re.search(r"function createPhone\(\) \{.*?\n\}", code, re.DOTALL)
if phone_old:
    phone_new = """function createProductPhone(
  texture?: THREE.Texture
) {
  const group =
    new THREE.Group();

  const outer =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        1.28,
        2.18,
        0.11
      ),
      new THREE.MeshStandardMaterial({
        color: C.navy,
        roughness: 0.28,
        metalness: 0.15,
      })
    );

  group.add(outer);

  const screen =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        1.08,
        1.90
      ),
      new THREE.MeshBasicMaterial({
        color: C.white,
        map: texture,
      })
    );

  screen.position.z =
    0.065;

  group.add(screen);

  const speaker =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        0.2,
        0.025,
        0.015
      ),
      new THREE.MeshBasicMaterial({
        color: 0x555f70,
      })
    );

  speaker.position.set(
    0,
    0.91,
    0.07
  );

  group.add(speaker);

  group.userData.role =
    "diner-screen";

  return group;
}"""
    code = code.replace(phone_old.group(0), phone_new)

# 4. Replace createKDS
kds_old = re.search(r"function createKDS\(\) \{.*?\n\}", code, re.DOTALL)
if kds_old:
    kds_new = """function createRealKDS(
  texture?: THREE.Texture
) {
  const group =
    new THREE.Group();

  const outer =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        2.9,
        1.92,
        0.13
      ),
      new THREE.MeshStandardMaterial({
        color: C.navy,
        roughness: 0.28,
        metalness: 0.16,
      })
    );

  outer.castShadow = true;

  group.add(outer);

  const screen =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        2.54,
        1.58
      ),
      new THREE.MeshBasicMaterial({
        color: C.white,
        map: texture,
      })
    );

  screen.position.z =
    0.078;

  group.add(screen);

  const stand =
    cube(
      [0.18, 0.72, 0.18],
      C.navySoft
    );

  stand.position.y =
    -1.15;

  group.add(stand);

  const base =
    cube(
      [1.05, 0.12, 0.58],
      C.navySoft
    );

  base.position.y =
    -1.48;

  group.add(base);

  group.userData.role =
    "kds";

  group.userData.screen =
    screen;

  return group;
}"""
    code = code.replace(kds_old.group(0), kds_new)

# 5. Fix createDinerArea & createKitchen signatures & usage
code = code.replace("function createDinerArea() {", "function createDinerArea(texture?: THREE.Texture) {")
code = code.replace("const phone = createPhone();", "const phone = createProductPhone(texture);")
code = code.replace("function createKitchen() {", "function createKitchen(texture?: THREE.Texture) {")
code = code.replace("const kds = createKDS();", "const kds = createRealKDS(texture);")

# 6. Inside createScanfeastWorld: initialize texture loader and pass textures
code = code.replace(
    "const mobile =\n        window.innerWidth < 768;",
    "const mobile =\n        window.innerWidth < 768;\n\n    const textureLoader =\n        createTextureLoader(\n            renderer\n        );"
)

code = code.replace(
    "const diner =\n        createDinerArea();",
    "const diner =\n        createDinerArea(textureLoader.load(assets.table));"
)

# Replace the static KDS in createKitchen with the live one by doing it in createScanfeastWorld
code = code.replace(
    "const kitchen =\n        createKitchen();",
    """const kitchen =
        createKitchen();

    const liveKDS =
        createKDSLiveTexture();

    const kds =
        createRealKDS(
            liveKDS.texture
        );

    kds.position.set(
        7.5,
        2.45,
        -3.72
    );

    kitchen.add(
        kds
    );

    const pickup =
      createPickupStation();

    pickup.position.set(
      7.4,
      0,
      -1.0
    );

    kitchen.add(
      pickup
    );

    const readyFood =
      new THREE.Mesh(
        new THREE.SphereGeometry(
          0.16,
          14,
          14
        ),
        material(
          C.food,
          0.8
        )
      );

    readyFood.visible =
      false;

    kitchen.add(
      readyFood
    );
"""
)
# We also need to remove the internal KDS from createKitchen, so it doesn't render twice.
code = code.replace("""    const kds = createRealKDS(texture);

    kds.position.set(
        7.6,
        2.35,
        -3.75
    );

    kitchen.add(kds);""", "")

# 7. Add fog
code = code.replace(
    "scene.add(orange);",
    "scene.add(orange);\n\n    scene.fog =\n        new THREE.Fog(\n            C.paper,\n            8,\n            25\n        );"
)

# 8. Order logic
order_replace_start = "const order =\n        createOrderPacket();"
order_replace_end = "world.add(order);"
new_order_packets = """    const orderPackets =
      [0, 1, 2].map(() =>
        createOrderPacket()
      );

    orderPackets.forEach(
      (packet, index) => {
        packet.scale.setScalar(
          0.8 -
            index * 0.12
        );

        world.add(packet);
      }
    );"""
code = code.replace(f"{order_replace_start}\n\n    {order_replace_end}", new_order_packets)

# The old order trajectory
old_order_curve = re.search(r"const orderCurve =\n        new THREE\.CatmullRomCurve3\(\[.*?\]\);", code, re.DOTALL)
if old_order_curve:
    new_order_curve = """const orderCurve =
  new THREE.CatmullRomCurve3([
    new THREE.Vector3(
      -5.0,
      1.7,
      2.6
    ),

    new THREE.Vector3(
      -5.2,
      1.7,
      1.0
    ),

    new THREE.Vector3(
      -3.9,
      1.9,
      0
    ),

    new THREE.Vector3(
      -1.9,
      1.8,
      -0.3
    ),

    new THREE.Vector3(
      0.5,
      1.7,
      -0.7
    ),

    new THREE.Vector3(
      2.4,
      1.65,
      -1.25
    ),

    new THREE.Vector3(
      4.2,
      1.6,
      -1.8
    ),
  ]);"""
    code = code.replace(old_order_curve.group(0), new_order_curve)

# 9. In the animation loop, replace the camera and order animation
anim_loop_start = "const progress =\n            state.progress;"
anim_loop_replace = """const progress =
            state.progress;

        const kitchenState =
            orderStateAtProgress(
                progress
            );
        
        liveKDS.update(
            kitchenState,
            elapsed
        );
        
        const kitchenFocus =
          THREE.MathUtils.smoothstep(
            progress,
            0.32,
            0.5
          );

        const operationsFocus =
          THREE.MathUtils.smoothstep(
            progress,
            0.62,
            0.78
          );

        if (scene.fog) {
          scene.fog.near =
            THREE.MathUtils.lerp(
              7,
              10,
              kitchenFocus
            );

          scene.fog.far =
            THREE.MathUtils.lerp(
              18,
              30,
              operationsFocus
            );
        }
"""
code = code.replace(anim_loop_start, anim_loop_replace)

old_cam_anim = re.search(r"const cameraT =\n            THREE\.MathUtils\.smootherstep\([\s\S]*?camera\.lookAt\([\s\S]*?lookTarget\n        \);", code)
if old_cam_anim:
    new_cam_anim = """const smoothProgress =
  THREE.MathUtils.smootherstep(
    progress,
    0,
    1
  );

const pathPoint =
  cameraPath.getPointAt(
    smoothProgress
  );

const lookPoint =
  lookPath.getPointAt(
    smoothProgress
  );

camera.position.lerp(
  pathPoint,
  0.065
);

lookTarget.lerp(
  lookPoint,
  0.075
);

camera.lookAt(
  lookTarget
);

camera.rotation.z =
  THREE.MathUtils.lerp(
    camera.rotation.z,
    Math.sin(
      smoothProgress * 12
    ) * 0.004,
    0.04
  );"""
    code = code.replace(old_cam_anim.group(0), new_cam_anim)

old_order_anim = re.search(r"const orderProgress =[\s\S]*?order\.scale\.setScalar\([\s\S]*?orderScale\n        \);", code)
if old_order_anim:
    new_order_anim = """orderPackets.forEach(
  (packet, index) => {
    const offset =
      index * 0.035;

    const t =
      THREE.MathUtils.clamp(
        (progress - 0.18) /
          0.45 -
          offset,
        0,
        1
      );

    packet.position.copy(
      orderCurve.getPointAt(t)
    );

    packet.rotation.y +=
      0.025;
  }
);"""
    code = code.replace(old_order_anim.group(0), new_order_anim)

# 10. Replace traverse
old_traverse = re.search(r"kitchen\.traverse\([\s\S]*?\/\*\*[\s\S]*?Core\.", code)
if old_traverse:
    new_traverse = """kitchen.traverse(
  (object) => {
    if (
      object.userData
        ?.type ===
      "chef"
    ) {
      const chefIndex =
        object.userData
          .index ?? 0;

      const active =
        kitchenState ===
          "COOKING" ||
        kitchenState ===
          "READY";

      const movement =
        active
          ? Math.sin(
              elapsed * 4 +
                chefIndex
            ) *
            0.06
          : Math.sin(
              elapsed * 0.8 +
                chefIndex
            ) *
            0.015;

      object.rotation.y =
        movement;

      object.position.y =
        Math.abs(
          Math.sin(
            elapsed * 2 +
              chefIndex
          )
        ) *
        (active ? 0.025 : 0.008);
    }

    if (
      object.userData
        ?.type ===
      "flame"
    ) {
      const active =
        kitchenState ===
          "COOKING" ||
        kitchenState ===
          "READY";

      const pulse =
        active
          ? 1 +
            Math.sin(
              elapsed * 9
            ) *
              0.16
          : 0.7 +
            Math.sin(
              elapsed * 2
            ) *
              0.05;

      object.scale.set(
        0.65 * pulse,
        1.55 * pulse,
        0.65 * pulse
      );

      if (
        object instanceof
        THREE.Mesh
      ) {
        const mat =
          object.material;

        if (
          mat instanceof
          THREE.MeshStandardMaterial
        ) {
          mat.emissiveIntensity =
            active
              ? 0.9
              : 0.25;
        }
      }
    }

    if (
      object.userData
        ?.type ===
      "food"
    ) {
      const ready =
        kitchenState ===
        "READY";

      const phase =
        object.userData
          .phase ?? 0;

      object.position.y =
        1.02 +
        Math.sin(
          elapsed * 2 +
            phase
        ) *
          (ready
            ? 0.035
            : 0.012);

      object.rotation.y =
        elapsed *
        (ready
          ? 0.3
          : 0.05);
    }
    
    if (
      object.userData
        ?.type === "steam"
    ) {
        const phase =
            object.userData
                .phase ?? 0;

        object.position.y =
            Math.sin(
                elapsed * 0.6 +
                phase
            ) *
            0.12;

        object.position.x =
            Math.sin(
                elapsed * 0.8 +
                phase
            ) *
            0.06;
    }
  }
);

if (
  kitchenState === "READY"
) {
  const readyT =
    THREE.MathUtils.smoothstep(
      progress,
      0.57,
      0.68
    );

  readyFood.visible =
    readyT > 0;

  readyFood.position.set(
    THREE.MathUtils.lerp(
      4.3,
      7.4,
      readyT
    ),
    1.05 +
      Math.sin(
        elapsed * 3
      ) *
        0.03,
    -1.2
  );
} else {
  readyFood.visible =
    false;
}

/**
 * Core."""
    code = code.replace(old_traverse.group(0), new_traverse)


with open("components/productpages/scanfeast-scene.ts", "w", encoding="utf-8") as f:
    f.write(code)
