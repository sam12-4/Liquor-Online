"use client"

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * LuxuryBackground component
 * Creates a subtle animated background with particles
 */
const LuxuryBackground = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    try {
      // Initialize scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Initialize camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 50;
      cameraRef.current = camera;

      // Initialize renderer with better error handling
      try {
        const renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Only append if container exists and doesn't already have a canvas
        if (containerRef.current && !containerRef.current.querySelector('canvas')) {
          containerRef.current.appendChild(renderer.domElement);
        }
        rendererRef.current = renderer;
      } catch (error) {
        console.error("Failed to initialize WebGL renderer:", error);
        return; // Exit early if renderer fails
      }

      // Create particles
      const particleCount = 200; // Reduced for better performance
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        sizes[i] = Math.random() * 2.5;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Create material
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x936d67, // Luxurious reddish-brown color
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
        size: 0.5
      });

      // Create points
      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);
      particlesRef.current = particleSystem;

      // Handle resize
      const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current) return;
        
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Animation loop
      const animate = () => {
        if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
        
        animationFrameRef.current = requestAnimationFrame(animate);
        
        if (particlesRef.current) {
          particlesRef.current.rotation.x += 0.0005;
          particlesRef.current.rotation.y += 0.0003;
        }
        
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      };

      animate();

      // Clean up
      return () => {
        window.removeEventListener('resize', handleResize);
        
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        if (rendererRef.current && rendererRef.current.domElement && rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
        
        if (particlesRef.current) {
          if (particlesRef.current.geometry) {
            particlesRef.current.geometry.dispose();
          }
          if (particlesRef.current.material) {
            particlesRef.current.material.dispose();
          }
          scene.remove(particlesRef.current);
        }
        
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
      };
    } catch (error) {
      console.error("Error in LuxuryBackground:", error);
      // Return empty cleanup function if initialization fails
      return () => {};
    }
  }, []);

  return <div ref={containerRef} className="absolute inset-0" />;
};

export default LuxuryBackground;

