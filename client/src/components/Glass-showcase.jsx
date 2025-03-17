"use client"

import React, { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { PresentationControls, Float, useGLTF, Text, ContactShadows } from "@react-three/drei"
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"
import gsap from "gsap"

// Wine glass model component
const WineGlass = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = "#aa4c40", fillLevel = 0.3 }) => {
  const { nodes, materials } = useGLTF("/wine-glass.glb")
  const glassRef = useRef()
  const wineRef = useRef()

  useEffect(() => {
    if (glassRef.current && wineRef.current) {
      // Animate wine glass on load
      gsap.from(glassRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power2.out",
      })

      // Animate wine level
      gsap.from(wineRef.current.scale, {
        y: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power2.out",
      })
    }
  }, [])

  return (
    <group position={position} rotation={rotation} scale={scale} ref={glassRef}>
      {/* Glass */}
      <mesh geometry={nodes.Glass.geometry} castShadow receiveShadow>
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
      <mesh geometry={nodes.Wine.geometry} castShadow ref={wineRef}>
        <meshPhysicalMaterial color={color} roughness={0.3} metalness={0.1} transmission={0.2} />
      </mesh>
    </group>
  )
}

// Whiskey glass model component
const WhiskeyGlass = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = "#d4af37" }) => {
  const { nodes, materials } = useGLTF("/whiskey-glass.glb")
  const glassRef = useRef()
  const whiskeyRef = useRef()

  useEffect(() => {
    if (glassRef.current && whiskeyRef.current) {
      // Animate whiskey glass on load
      gsap.from(glassRef.current.rotation, {
        y: -Math.PI * 2,
        duration: 2,
        ease: "power2.out",
      })

      // Animate whiskey level
      gsap.from(whiskeyRef.current.scale, {
        y: 0,
        duration: 1.5,
        delay: 0.7,
        ease: "power2.out",
      })
    }
  }, [])

  return (
    <group position={position} rotation={rotation} scale={scale} ref={glassRef}>
      {/* Glass */}
      <mesh geometry={nodes.Glass.geometry} castShadow receiveShadow>
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
      <mesh geometry={nodes.Whiskey.geometry} castShadow ref={whiskeyRef}>
        <meshPhysicalMaterial color={color} roughness={0.2} metalness={0.1} transmission={0.3} />
      </mesh>
    </group>
  )
}

// Champagne glass model component
const ChampagneGlass = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = "#f8e9a1" }) => {
  const { nodes, materials } = useGLTF("/champagne-glass.glb")
  const glassRef = useRef()
  const champagneRef = useRef()

  useEffect(() => {
    if (glassRef.current && champagneRef.current) {
      // Animate champagne glass on load
      gsap.from(glassRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "power2.out",
      })

      // Animate champagne level
      gsap.from(champagneRef.current.scale, {
        y: 0,
        duration: 1.5,
        delay: 0.9,
        ease: "power2.out",
      })
    }
  }, [])

  return (
    <group position={position} rotation={rotation} scale={scale} ref={glassRef}>
      {/* Glass */}
      <mesh geometry={nodes.Glass.geometry} castShadow receiveShadow>
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
      <mesh geometry={nodes.Champagne.geometry} castShadow ref={champagneRef}>
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
      <mesh geometry={nodes.Bubbles.geometry} castShadow>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          thickness={0.1}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  )
}

// Fallback component for 3D models
const ModelFallback = () => (
  <group>
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#aa4c40" wireframe />
    </mesh>
  </group>
)

const GlassShowcase = () => {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10 mix-blend-overlay"></div>

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
                <React.Suspense fallback={<ModelFallback />}>
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
                </React.Suspense>
              </Float>
            </PresentationControls>

            <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2} far={3} />

            <EffectComposer>
              <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
              <ChromaticAberration offset={[0.0005, 0.0005]} />
            </EffectComposer>
          </Canvas>
        </div>
      </div>
    </div>
  )
}

export default GlassShowcase

