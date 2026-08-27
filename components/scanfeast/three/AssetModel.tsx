"use client";

import {
  Clone,
  useGLTF,
} from "@react-three/drei";

import React, {
  Component,
  type ReactNode,
} from "react";

import * as THREE from "three";

type Props = {
  src: string;

  position?: [
    number,
    number,
    number
  ];

  rotation?: [
    number,
    number,
    number
  ];

  scale?: number;

  visible?: boolean;

  shadows?: boolean;
};

type BoundaryProps = {
  src: string;
  children: ReactNode;
};

class AssetBoundary extends Component<
  BoundaryProps,
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

  componentDidCatch(
    error: Error
  ) {
    console.error(
      `[Scanfeast] GLB failed: ${this.props.src}`,
      error
    );
  }

  render() {
    if (this.state.failed) {
      return null;
    }

    return this.props.children;
  }
}

function AssetModelInner({
  src,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  visible = true,
  shadows = true,
}: Props) {
  const { scene } =
    useGLTF(src);

  React.useMemo(() => {
    scene.traverse(
      (object) => {
        if (
          object instanceof THREE.Mesh
        ) {
          object.castShadow =
            shadows;

          object.receiveShadow =
            shadows;

          object.frustumCulled =
            true;
        }
      }
    );
  }, [scene, shadows]);

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      visible={visible}
    >
      <Clone
        object={scene}
        deep="materialsOnly"
      />
    </group>
  );
}

export default function AssetModel(
  props: Props
) {
  return (
    <AssetBoundary src={props.src}>
      <AssetModelInner
        {...props}
      />
    </AssetBoundary>
  );
}