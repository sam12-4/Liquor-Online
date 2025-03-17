import React, { useRef, useEffect, Suspense } from 'react';
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Float, Text, ContactShadows } from "@react-three/drei";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
import ErrorBoundary from './ErrorBoundary';

// Since we don't have the actual 3D models, let's create simplified versions
// Basic wine glass model
const WineGlass = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = "#aa4c40" }) => {
  const glassRef = useRef();
  const wineRef = useRef();

  useEffect(() => {
    if (glassRef.current && wineRef.current) {
      // Animate wine glass on load
      gsap.from(glassRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power2.out",
      });

      // Animate wine level
      gsap.from(wineRef.current.scale, {
        y: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale} ref={glassRef}>
      {/* Glass */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          thickness={0.5}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.3, 1, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          thickness={0.5}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Stem */}
      <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          thickness={0.5}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Base */}
      <mesh position={[0, -0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          thickness={0.5}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Wine */}
      <mesh position={[0, 0.85, 0]} castShadow ref={wineRef}>
        <cylinderGeometry args={[0.3, 0.3, 0.7, 16]} />
        <meshPhysicalMaterial color={color} roughness={0.3} metalness={0.1} transmission={0.2} />
      </mesh>
    </group>
  );
};

// Basic whiskey glass model
const WhiskeyGlass = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = "#d4af37" }) => {
  const glassRef = useRef();
  const whiskeyRef = useRef();

  useEffect(() => {
    if (glassRef.current && whiskeyRef.current) {
      // Animate whiskey glass on load
      gsap.from(glassRef.current.rotation, {
        y: -Math.PI * 2,
        duration: 2,
        ease: "power2.out",
      });

      // Animate whiskey level
      gsap.from(whiskeyRef.current.scale, {
        y: 0,
        duration: 1.5,
        delay: 0.7,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale} ref={glassRef}>
      {/* Glass */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.35, 0.8, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          thickness={0.5}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Whiskey */}
      <mesh position={[0, -0.1, 0]} castShadow ref={whiskeyRef}>
        <cylinderGeometry args={[0.35, 0.3, 0.4, 16]} />
        <meshPhysicalMaterial color={color} roughness={0.2} metalness={0.1} transmission={0.3} />
      </mesh>
    </group>
  );
};

// Basic champagne glass model
const ChampagneGlass = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = "#f8e9a1" }) => {
  const glassRef = useRef();
  const champagneRef = useRef();

  useEffect(() => {
    if (glassRef.current && champagneRef.current) {
      // Animate champagne glass on load
      gsap.from(glassRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power2.out",
      });

      // Animate champagne level
      gsap.from(champagneRef.current.scale, {
        y: 0,
        duration: 1.5,
        delay: 0.9,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale} ref={glassRef}>
      {/* Glass */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.1, 1.2, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          thickness={0.5}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Stem */}
      <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          thickness={0.5}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Base */}
      <mesh position={[0, -0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          thickness={0.5}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Champagne */}
      <mesh position={[0, 0.7, 0]} castShadow ref={champagneRef}>
        <cylinderGeometry args={[0.28, 0.09, 0.7, 16]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.2}
          transmission={0.4}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Bubbles */}
      <group>
        {[...Array(10)].map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 0.2,
              0.7 - i * 0.05,
              (Math.random() - 0.5) * 0.2,
            ]}
            castShadow
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={0.9}
              thickness={0.1}
              roughness={0.1}
              emissive="#ffffff"
              emissiveIntensity={0.1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Fallback component for 3D models
const ModelFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#aa4c40" wireframe />
  </mesh>
);

// Simple canvas fallback
const CanvasFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-white text-center p-6">
      <div className="mb-4 w-16 h-16 border-4 border-t-[#aa4c40] border-opacity-50 rounded-full animate-spin mx-auto"></div>
      <p>Experience our premium collection in person</p>
    </div>
  </div>
);

const GlassShowcase = () => {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
      <div className="absolute inset-0 opacity-10 mix-blend-overlay"></div>

      <div className="relative z-10 flex flex-col md:flex-row h-full">
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Our Premium Collection</h2>
            <p className="mb-6 text-gray-300 max-w-lg">
              Discover our exquisite selection of fine wines, aged whiskeys, and champagnes. Each glass tells a story of
              heritage, craftsmanship, and unparalleled quality.
            </p>
            <Link
              to="/products?premium=true"
              className="inline-flex items-center px-8 py-3 bg-[#aa4c40] text-white font-medium transition-all duration-300 hover:bg-[#8a3d33] hover:shadow-lg group"
            >
              <span>Discover Premium</span>
              <FaArrowRight className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="md:w-1/2 h-[300px] md:h-full">
          <ErrorBoundary fallback={<CanvasFallback />}>
            <Canvas shadows camera={{ position: [0, 0, 10], fov: 25 }}>
              <color attach="background" args={["transparent"]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />

              <PresentationControls
                global
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
              >
                <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
                  <Suspense fallback={<ModelFallback />}>
                    <WineGlass position={[-2.5, 0, 0]} rotation={[0, 0.5, 0]} scale={1.2} color="#aa4c40" />
                    <WhiskeyGlass position={[0, -0.5, 0]} rotation={[0, -0.3, 0]} scale={1.2} color="#d4af37" />
                    <ChampagneGlass position={[2.5, 0, 0]} rotation={[0, 0.2, 0]} scale={1.2} color="#f8e9a1" />

                    <Text position={[-2.5, -2, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
                      Fine Wine
                    </Text>

                    <Text position={[0, -2.5, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
                      Aged Whiskey
                    </Text>

                    <Text position={[2.5, -2, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
                      Champagne
                    </Text>
                  </Suspense>
                </Float>
              </PresentationControls>

              <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2} far={3} />
            </Canvas>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default GlassShowcase; 