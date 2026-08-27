"use client";

import {
  Clone,
  useGLTF,
} from "@react-three/drei";
import {
  Component,
  useMemo,
  type ReactNode,
} from "react";
import * as THREE from "three";

type AssetModelProps = {
  src: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  visible?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
};

class AssetBoundary extends Component<
  { children: ReactNode; src: string },
  { failed: boolean }
> {
  state = {
    failed: false,
  };

  static getDerivedStateFromError() {
    return {
      failed: true,
    };
  }

  componentDidCatch(error: Error) {
    console.error(
      `[Scanfeast] Failed GLB: ${this.props.src}`,
      error,
    );
  }

  render() {
    if (this.state.failed) {
      return null;
    }

    return this.props.children;
  }
}

function prepareMaterial(
  material: THREE.Material,
) {
  if (material.userData.prepared) {
    return;
  }

  if (
    material instanceof THREE.MeshStandardMaterial ||
    material instanceof THREE.MeshPhysicalMaterial
  ) {
    material.roughness = THREE.MathUtils.clamp(
      material.roughness,
      0.28,
      0.9,
    );

    material.metalness = THREE.MathUtils.clamp(
      material.metalness,
      0,
      0.7,
    );
  }

  material.userData.prepared = true;
}

function AssetModelInner({
  src,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  visible = true,
  castShadow = false,
  receiveShadow = false,
}: AssetModelProps) {
  const { scene } = useGLTF(src);

  const prepared = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      object.castShadow = castShadow;
      object.receiveShadow = receiveShadow;

      object.frustumCulled = true;

      const material = object.material;

      if (Array.isArray(material)) {
        material.forEach(prepareMaterial);
      } else if (material) {
        prepareMaterial(material);
      }
    });

    return clone;
  }, [
    scene,
    castShadow,
    receiveShadow,
  ]);

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      visible={visible}
    >
      {/*
       * Do not let R3F dispose shared GLTF geometry
       * when this clone leaves the scene.
       */}
      <Clone
        object={prepared}
        dispose={null}
      />
    </group>
  );
}

export default function AssetModel(
  props: AssetModelProps,
) {
  return (
    <AssetBoundary src={props.src}>
      <AssetModelInner {...props} />
    </AssetBoundary>
  );
}

export function preloadAsset(src: string) {
  useGLTF.preload(src);
}