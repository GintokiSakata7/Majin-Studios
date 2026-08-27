'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { useGlobalState } from '../../store/useGlobalState';

interface NetworkSceneProps {
  active: boolean;
}

const ACCENTS: Record<string, string> = {
  MONOCHROME: '#4A5562',
  LIME: '#B8FF3D',
  CYAN: '#00E5FF',
  AMBER: '#FFB347',
  VIOLET: '#B46CFF',
};

// Fixed positions for the final RESOLVE stage
const RESOLVE_POSITIONS = [
  new THREE.Vector3(-4.5, 0, 0),
  new THREE.Vector3(-1.5, 0, 0),
  new THREE.Vector3(1.5, 0, 0),
  new THREE.Vector3(4.5, 0, 0),
];

// Helper to generate a random position in a bounds
const randomPos = (spread = 6) => 
  new THREE.Vector3(
    (Math.random() - 0.5) * spread * 2,
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread
  );

export function NetworkScene({ active }: NetworkSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { activeAccent, whyStage, currentScene, capabilitiesStage } = useGlobalState();
  const accent = ACCENTS[activeAccent] ?? ACCENTS.MONOCHROME;

  const numNodes = 28;

  // Initial random positions for all nodes
  const initialNodes = useMemo(() => Array.from({ length: numNodes }, () => randomPos(7)), []);

  // Refs for direct animation in useFrame
  const nodeRefs = useRef<(THREE.Group | null)[]>([]);
  const matRefs = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  
  // Edges are defined by pairs of node indices
  const edges = useMemo(() => {
    const list: [number, number][] = [];
    for (let i = 0; i < numNodes; i++) {
      // Connect each node to 2 others randomly
      list.push([i, (i + 1) % numNodes]);
      list.push([i, (i + 3) % numNodes]);
    }
    return list;
  }, [numNodes]);

  const lineMatRefs = useRef<(THREE.LineBasicMaterial | null)[]>([]);
  const lineGeomRefs = useRef<(THREE.BufferGeometry | null)[]>([]);

  // State data that useFrame will smoothly interpolate toward
  const targets = useRef({
    nodePos: initialNodes.map(p => p.clone()),
    nodeOpacity: Array(numNodes).fill(1),
    edgeOpacity: Array(edges.length).fill(1),
  });

  useEffect(() => {
    // Update target positions and opacities based on whyStage
    if (currentScene === 'CAPABILITIES') {
      switch (capabilitiesStage) {
        case 'ai':
          // Dense intelligence graph
          targets.current.nodePos.forEach((p, i) => {
            p.copy(initialNodes[i]).multiplyScalar(1.2);
          });
          targets.current.nodeOpacity.fill(0.8);
          targets.current.edgeOpacity.fill(0.4);
          break;
        case 'agents':
          // Execution chain
          targets.current.nodePos.forEach((p, i) => {
            p.set(
              (i - numNodes / 2) * 0.5,
              Math.sin(i * 0.4) * 2,
              Math.cos(i * 0.4) * 2
            );
          });
          targets.current.nodeOpacity.fill(0.9);
          targets.current.edgeOpacity = edges.map(([a, b]) => Math.abs(a - b) === 1 ? 0.8 : 0.05);
          break;
        case 'products':
          // Spatial UI/Product frames (rectangles)
          targets.current.nodePos.forEach((p, i) => {
            const row = Math.floor(i / 7);
            const col = i % 7;
            p.set((col - 3) * 1.5, (row - 1.5) * 1.5, (i % 2 === 0 ? 1 : -1));
          });
          targets.current.nodeOpacity.fill(0.7);
          targets.current.edgeOpacity = edges.map(([a, b]) => {
            const aRow = Math.floor(a / 7);
            const bRow = Math.floor(b / 7);
            const aCol = a % 7;
            const bCol = b % 7;
            return (aRow === bRow || aCol === bCol) ? 0.5 : 0;
          });
          break;
        case 'custom':
          // Distributed integration architecture (hubs and spokes)
          targets.current.nodePos.forEach((p, i) => {
            if (i < 3) {
              p.set((i - 1) * 4, 0, 0); // Hubs
            } else {
              const hubIndex = i % 3;
              const angle = (i / numNodes) * Math.PI * 2;
              p.set(
                (hubIndex - 1) * 4 + Math.cos(angle) * 3,
                Math.sin(angle) * 3,
                (Math.random() - 0.5) * 2
              );
            }
          });
          targets.current.nodeOpacity.fill(0.85);
          targets.current.edgeOpacity = edges.map(([a, b]) => {
            return (a < 3 || b < 3) ? 0.6 : 0.05;
          });
          break;
        case 'data':
          // Layered data pipelines
          targets.current.nodePos.forEach((p, i) => {
            const layer = i % 3; // 3 distinct vertical layers
            const xPos = ((Math.floor(i / 3) % 4) - 1.5) * 2;
            p.set(xPos, (layer - 1) * 2, (Math.random() - 0.5) * 1.5);
          });
          targets.current.nodeOpacity.fill(0.9);
          targets.current.edgeOpacity = edges.map(([a, b]) => {
            const aLayer = a % 3;
            const bLayer = b % 3;
            return Math.abs(aLayer - bLayer) === 1 ? 0.7 : 0.1;
          });
          break;
        case 'cloud':
          // Distributed server pillars
          targets.current.nodePos.forEach((p, i) => {
            const pillar = i % 4; // 4 pillars
            p.set(
              (pillar - 1.5) * 3,
              (Math.floor(i / 4) - 3) * 1.2,
              (Math.random() - 0.5) * 0.5
            );
          });
          targets.current.nodeOpacity.fill(0.8);
          targets.current.edgeOpacity = edges.map(([a, b]) => {
            return (a % 4 === b % 4) ? 0.8 : 0.1; // Strong vertical links
          });
          break;
        default:
          targets.current.nodePos.forEach((p, i) => p.copy(initialNodes[i]));
          targets.current.nodeOpacity.fill(0.4);
          targets.current.edgeOpacity.fill(0.1);
          break;
      }
      return;
    }

    if (currentScene !== 'WHY_MAJIN') {
      // Return to default dense layout
      targets.current.nodePos.forEach((p, i) => p.copy(initialNodes[i]));
      targets.current.nodeOpacity.fill(0.65);
      targets.current.edgeOpacity.fill(0.28);
      return;
    }

    switch (whyStage) {
      case 'complexity':
      case 'systems':
        targets.current.nodePos.forEach((p, i) => p.copy(initialNodes[i]));
        targets.current.nodeOpacity.fill(0.8);
        targets.current.edgeOpacity.fill(0.4);
        break;
      
      case 'build':
        // Cluster into 4 groups
        targets.current.nodePos.forEach((p, i) => {
          const clusterId = i % 4;
          const clusterCenter = RESOLVE_POSITIONS[clusterId];
          p.set(
            clusterCenter.x + (Math.random() - 0.5) * 2,
            clusterCenter.y + (Math.random() - 0.5) * 2,
            clusterCenter.z + (Math.random() - 0.5) * 2
          );
        });
        targets.current.nodeOpacity.fill(0.7);
        targets.current.edgeOpacity = edges.map(([a, b]) => (a % 4 === b % 4 ? 0.5 : 0.1));
        break;

      case 'ai':
      case 'problem':
        targets.current.nodeOpacity = targets.current.nodeOpacity.map((_, i) => {
          if (i >= 16) return 0;
          return i % 4 === 1 ? 1 : 0.3; // Highlight second cluster (AI)
        });
        targets.current.edgeOpacity = edges.map(([a, b]) => {
          if (a >= 16 || b >= 16) return 0;
          return a % 4 === 1 || b % 4 === 1 ? 0.6 : 0.1;
        });
        break;

      case 'resolve':
        // Perfect line
        targets.current.nodePos.forEach((p, i) => {
          if (i < 4) p.copy(RESOLVE_POSITIONS[i]);
        });
        targets.current.nodeOpacity = targets.current.nodeOpacity.map((_, i) => i < 4 ? 1 : 0);
        targets.current.edgeOpacity = edges.map(([a, b]) => {
          if ((a === 0 && b === 1) || (a === 1 && b === 2) || (a === 2 && b === 3) ||
              (b === 0 && a === 1) || (b === 1 && a === 2) || (b === 2 && a === 3)) {
            return 1;
          }
          return 0;
        });
        break;
    }
  }, [whyStage, currentScene, initialNodes, edges, capabilitiesStage]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const currentVis = groupRef.current.userData.visibility ?? 0;
    const targetVis = active ? 1 : 0;
    const visibility = THREE.MathUtils.damp(currentVis, targetVis, 3.2, delta);
    groupRef.current.userData.visibility = visibility;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.55, 1, visibility));
    groupRef.current.visible = visibility > 0.002;

    if (!groupRef.current.visible) return;

    const time = state.clock.getElapsedTime();

    // Slow rotation
    if (whyStage === 'complexity' || whyStage === 'systems' || currentScene !== 'WHY_MAJIN') {
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, time * 0.018, 2, delta);
      groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, Math.sin(time * 0.2) * 0.008, 2, delta);
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, 0, 2, delta);
      groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, 0, 2, delta);
    }

    // Damp nodes
    nodeRefs.current.forEach((node, i) => {
      if (node) {
        node.position.x = THREE.MathUtils.damp(node.position.x, targets.current.nodePos[i].x, 3, delta);
        node.position.y = THREE.MathUtils.damp(node.position.y, targets.current.nodePos[i].y, 3, delta);
        node.position.z = THREE.MathUtils.damp(node.position.z, targets.current.nodePos[i].z, 3, delta);
      }
      
      const mat = matRefs.current[i];
      if (mat) {
        mat.opacity = THREE.MathUtils.damp(mat.opacity, targets.current.nodeOpacity[i], 4, delta);
        mat.transparent = true;
      }
    });

    // Damp edges
    lineMatRefs.current.forEach((lineMat, i) => {
      if (lineMat) {
        lineMat.opacity = THREE.MathUtils.damp(lineMat.opacity, targets.current.edgeOpacity[i], 4, delta);
        lineMat.transparent = true;
      }
    });
    
    // Update edge geometry positions based on the damped node positions
    lineGeomRefs.current.forEach((geom, i) => {
      if (geom) {
        const [a, b] = edges[i];
        const nodeA = nodeRefs.current[a];
        const nodeB = nodeRefs.current[b];
        if (nodeA && nodeB) {
          const positions = geom.attributes.position.array;
          positions[0] = nodeA.position.x;
          positions[1] = nodeA.position.y;
          positions[2] = nodeA.position.z;
          positions[3] = nodeB.position.x;
          positions[4] = nodeB.position.y;
          positions[5] = nodeB.position.z;
          geom.attributes.position.needsUpdate = true;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {edges.map((_, i) => (
        <line key={`edge-${i}`}>
          <bufferGeometry ref={(r) => { if(r) lineGeomRefs.current[i] = r; }}>
            <float32BufferAttribute attach="attributes-position" args={[new Float32Array(6), 3]} />
          </bufferGeometry>
          <lineBasicMaterial 
            ref={(r) => { if(r) lineMatRefs.current[i] = r; }} 
            color={i % 5 === 0 ? accent : '#252A31'} 
            transparent 
            opacity={0} 
          />
        </line>
      ))}

      {Array.from({ length: numNodes }).map((_, i) => (
        <group key={`node-${i}`} ref={(r) => { if (r) nodeRefs.current[i] = r; }}>
          <mesh>
            <boxGeometry args={[i % 4 === 0 ? 0.12 : 0.075, i % 4 === 0 ? 0.12 : 0.075, i % 4 === 0 ? 0.12 : 0.075]} />
            <meshBasicMaterial 
              ref={(r) => { if(r) matRefs.current[i] = r; }} 
              color={i % 4 === 0 ? accent : '#4A5562'} 
              transparent 
              opacity={0} 
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
