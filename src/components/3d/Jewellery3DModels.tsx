import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Product3DConfig } from '../../data/products';

interface ModelProps {
  config?: Partial<Product3DConfig>;
  autoRotate?: boolean;
}

// Material getters for physical luxury gold and gemstones
export function getGoldColor(type: 'yellow' | 'rose' | 'white' = 'yellow') {
  switch (type) {
    case 'rose':
      return '#e8af9e';
    case 'white':
      return '#e0e4eb';
    case 'yellow':
    default:
      return '#d4af37';
  }
}

export function getGemColor(gem: 'emerald' | 'ruby' | 'sapphire' | 'diamond' = 'emerald') {
  switch (gem) {
    case 'ruby':
      return '#a80c2e';
    case 'sapphire':
      return '#0f3885';
    case 'diamond':
      return '#f0f8ff';
    case 'emerald':
    default:
      return '#06633b';
  }
}

// 1. Royal Maharani Necklace 3D Model
export const Necklace3DModel: React.FC<ModelProps> = ({ config, autoRotate = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const goldColor = getGoldColor(config?.goldColor);
  const gemColor = getGemColor(config?.gemColor);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.15}>
      {/* Choker Main Gold Curve */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.12, 32, 64, Math.PI * 0.85]} />
        <meshStandardMaterial
          color={goldColor}
          metalness={0.92}
          roughness={0.18}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Outer Decorative Gold Rim */}
      <mesh position={[0, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.65, 0.04, 24, 64, Math.PI * 0.8]} />
        <meshStandardMaterial
          color={goldColor}
          metalness={0.95}
          roughness={0.12}
        />
      </mesh>

      {/* Centerpiece Royal Emerald Gemstone */}
      <group position={[0, -1.3, 0.15]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.6, 0.6, 0.25]} />
          <meshPhysicalMaterial
            color={gemColor}
            metalness={0.1}
            roughness={0.05}
            transmission={0.7}
            thickness={0.8}
            ior={1.6}
            clearcoat={1}
          />
        </mesh>

        {/* Gold Bezel Frame */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.66, 0.66, 0.2]} />
          <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Hanging Pearl Drop */}
        <mesh position={[0, -0.6, 0]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshPhysicalMaterial color="#faf6ee" roughness={0.2} metalness={0.1} clearcoat={1} />
        </mesh>
      </group>

      {/* Side Gemstone Flanks */}
      {[-0.6, -1.1, 0.6, 1.1].map((xPos, idx) => (
        <group key={idx} position={[xPos, -1.1 + Math.abs(xPos) * 0.3, 0.1]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <octahedronGeometry args={[0.22]} />
            <meshPhysicalMaterial
              color={gemColor}
              metalness={0.1}
              roughness={0.05}
              transmission={0.65}
              thickness={0.5}
            />
          </mesh>
          <mesh position={[0, -0.35, 0]}>
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshPhysicalMaterial color="#faf6ee" roughness={0.25} metalness={0.05} />
          </mesh>
        </group>
      ))}

      {/* Gold Granules / Dust accents */}
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 13) * Math.PI * 0.85 - Math.PI * 0.425;
        const radius = 1.5;
        const x = Math.sin(angle) * radius;
        const y = -Math.cos(angle) * radius * 0.5;
        return (
          <mesh key={i} position={[x, y - 0.2, 0.12]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.1} />
          </mesh>
        );
      })}
    </group>
  );
};

// 2. Celestial Solitaire Ring 3D Model
export const Ring3DModel: React.FC<ModelProps> = ({ config, autoRotate = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const goldColor = getGoldColor(config?.goldColor);
  const gemColor = getGemColor(config?.gemColor);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15 + 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.3}>
      {/* Ring Band */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.18, 32, 64]} />
        <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Crown Prongs & Solitaire Diamond */}
      <group position={[0, 1.35, 0]}>
        {/* Faceted Brilliant Solitaire Gemstone */}
        <mesh>
          <octahedronGeometry args={[0.55]} />
          <meshPhysicalMaterial
            color={gemColor}
            metalness={0.05}
            roughness={0.02}
            transmission={0.92}
            thickness={1.2}
            ior={2.4}
            clearcoat={1}
            reflectivity={0.9}
          />
        </mesh>

        {/* 4 Gold Prongs */}
        {[-0.3, 0.3].map((x) =>
          [-0.3, 0.3].map((z) => (
            <mesh key={`${x}-${z}`} position={[x * 0.8, -0.15, z * 0.8]}>
              <cylinderGeometry args={[0.04, 0.04, 0.5, 12]} />
              <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.1} />
            </mesh>
          ))
        )}
      </group>
    </group>
  );
};

// 3. Kasula Heritage Bangle 3D Model
export const Bangle3DModel: React.FC<ModelProps> = ({ config, autoRotate = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const goldColor = getGoldColor(config?.goldColor);
  const gemColor = getGemColor(config?.gemColor);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.0008) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      {/* Main Solid Gold Sculpted Bangle */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.3, 0.28, 32, 64]} />
        <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Coin Motifs & Gemstone Studs around the Bangle */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.3;
        const y = Math.sin(angle) * 1.3;
        return (
          <group key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <mesh position={[0, 0, 0.25]}>
              <cylinderGeometry args={[0.18, 0.18, 0.06, 24]} />
              <meshStandardMaterial color={goldColor} metalness={0.9} roughness={0.25} />
            </mesh>
            <mesh position={[0, 0, 0.3]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshPhysicalMaterial color={gemColor} metalness={0.1} roughness={0.1} transmission={0.7} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// 4. Lotus Stud Earrings 3D Model
export const Earring3DModel: React.FC<ModelProps> = ({ config, autoRotate = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const goldColor = getGoldColor(config?.goldColor);
  const gemColor = getGemColor(config?.gemColor);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      {/* Pair of Earrings */}
      {[-0.85, 0.85].map((xOffset, pairIdx) => (
        <group key={pairIdx} position={[xOffset, 0, 0]}>
          {/* Lotus Top Bloom */}
          <group>
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i / 6) * Math.PI * 2;
              return (
                <mesh key={i} position={[Math.cos(angle) * 0.3, Math.sin(angle) * 0.3, 0]} rotation={[0, 0, angle]}>
                  <coneGeometry args={[0.15, 0.4, 16]} />
                  <meshStandardMaterial color={goldColor} metalness={0.92} roughness={0.15} />
                </mesh>
              );
            })}
            <mesh position={[0, 0, 0.15]}>
              <sphereGeometry args={[0.2, 24, 24]} />
              <meshPhysicalMaterial color={gemColor} transmission={0.8} thickness={0.6} roughness={0.05} />
            </mesh>
          </group>

          {/* Hanging Teardrop Pendant */}
          <group position={[0, -0.9, 0]}>
            <mesh rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.22, 0.6, 24]} />
              <meshPhysicalMaterial color={gemColor} transmission={0.75} thickness={0.7} roughness={0.05} />
            </mesh>
            <mesh position={[0, 0.35, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.1} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
};

// Master Switcher Component for 3D Models
export const MasterJewellery3D: React.FC<{ type: Product3DConfig['type']; config?: Partial<Product3DConfig>; autoRotate?: boolean }> = ({
  type,
  config,
  autoRotate = true
}) => {
  switch (type) {
    case 'ring':
      return <Ring3DModel config={config} autoRotate={autoRotate} />;
    case 'bangle':
      return <Bangle3DModel config={config} autoRotate={autoRotate} />;
    case 'earring':
      return <Earring3DModel config={config} autoRotate={autoRotate} />;
    case 'pendant':
      return <Necklace3DModel config={config} autoRotate={autoRotate} />;
    case 'necklace':
    default:
      return <Necklace3DModel config={config} autoRotate={autoRotate} />;
  }
};
