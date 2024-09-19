import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';  // Import TextureLoader from Three.js

// Planet Component that applies the texture and rotates/orbits the planet
const Planet = ({ position, texture, size, speed }) => {
  const meshRef = useRef();

  useFrame(() => {
    // Self-rotation around the Y-axis
    meshRef.current.rotation.y += speed;

    // Orbiting around the Sun (centered at [0, 0, 0])
    const time = performance.now() * 0.0001;
    meshRef.current.position.x = Math.sin(time * speed) * position[0];
    meshRef.current.position.z = Math.cos(time * speed) * position[0];
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={texture} /> {/* Apply the texture */}
    </mesh>
  );
};

const SolarSystem = () => {
  const [textures, setTextures] = useState({});

  useEffect(() => {
    const loader = new THREE.TextureLoader();

    // Load textures for each planet
    setTextures({
        mercury: loader.load('/assets/solarTexture/Mercury.png'),
        venus: loader.load('/assets/solarTexture/Venus.png'),
        earth: loader.load('/assets/solarTexture/Earth.png'),
        mars: loader.load('/assets/solarTexture/Mars.png'),
        jupiter: loader.load('/assets/solarTexture/Jupiter.png'),
        saturn: loader.load('/assets/solarTexture/Saturn.png'),
        uranus: loader.load('/assets/solarTexture/Uranus.png'),
        neptune: loader.load('/assets/solarTexture/Neptune.png'),
      });
  }, []);  // Empty dependency array ensures the textures load once when the component mounts

  return (
    <div style={{ height: '600px' }}>
      <Canvas camera={{ position: [0, 0, 40], fov: 60 }}>
        {/* Ambient light */}
        <ambientLight intensity={0.5} />

        {/* Point light from the Sun */}
        <pointLight position={[0, 0, 0]} intensity={2} distance={100} decay={2} color="yellow" />

        {/* Stars background */}
        <Stars radius={300} depth={50} count={5000} factor={4} fade />

        {/* Sun */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial emissive="yellow" />
        </mesh>

        {/* Planets with textures */}
        <Planet position={[6, 0, 0]} texture={textures.mercury} size={0.3} speed={1} />
        <Planet position={[9, 0, 0]} texture={textures.venus} size={0.6} speed={0.8} />
        <Planet position={[12, 0, 0]} texture={textures.earth} size={0.7} speed={0.5} />
        <Planet position={[15, 0, 0]} texture={textures.mars} size={0.5} speed={0.4} />
        <Planet position={[22, 0, 0]} texture={textures.jupiter} size={1.8} speed={0.2} />
        <Planet position={[28, 0, 0]} texture={textures.saturn} size={1.5} speed={0.15} />
        <Planet position={[35, 0, 0]} texture={textures.uranus} size={1.2} speed={0.1} />
        <Planet position={[40, 0, 0]} texture={textures.neptune} size={1.2} speed={0.08} />

        {/* Orbit controls for user interaction */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SolarSystem;
