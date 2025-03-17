"use client"

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Simple bottle component created from primitives
const Bottle = () => {
  const bottleRef = useRef();
  const liquidRef = useRef();
  const capRef = useRef();
  const liquidMaterialRef = useRef();
  const fillAnimationRef = useRef(null);
  
  // Setup animated materials
  useEffect(() => {
    if (liquidMaterialRef.current) {
      // Animate liquid fill level
      fillAnimationRef.current = gsap.to(liquidMaterialRef.current, {
        opacity: 0.9,
        duration: 2,
        delay: 1,
        ease: "power2.inOut"
      });
    }
    
    return () => {
      if (fillAnimationRef.current) {
        fillAnimationRef.current.kill();
      }
    };
  }, []);
  
  // Gentle rotation animation
  useFrame((state) => {
    if (bottleRef.current) {
      bottleRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });
  
  return (
    <group ref={bottleRef} position={[0, -1, 0]} scale={2}>
      {/* Bottle Body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshPhysicalMaterial 
          color="#c5e0dc"
          transmission={0.9} 
          thickness={0.5}
          roughness={0.1}
          metalness={0}
          clearcoat={1}
        />
      </mesh>
      
      {/* Bottle Neck */}
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.5, 32]} />
        <meshPhysicalMaterial 
          color="#c5e0dc"
          transmission={0.9} 
          thickness={0.5}
          roughness={0.1}
          metalness={0}
          clearcoat={1}
        />
      </mesh>
      
      {/* Bottle Cap */}
      <mesh ref={capRef} position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.2, 32]} />
        <meshStandardMaterial color="#34495e" roughness={0.5} metalness={0.5} />
      </mesh>
      
      {/* Liquid inside */}
      <mesh ref={liquidRef} position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 1.8, 32]} />
        <meshStandardMaterial 
          ref={liquidMaterialRef}
          color="#aa4c40" 
          transparent={true} 
          opacity={0} 
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

const BottleAnimation = () => {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 300 }}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
        <Bottle />
      </PresentationControls>
      <ContactShadows position={[0, -2, 0]} opacity={0.8} scale={5} blur={2.5} far={4} />
      <Environment preset="city" />
    </Canvas>
  );
};

export default BottleAnimation;

