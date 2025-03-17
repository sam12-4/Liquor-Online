import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ParticleBackground = ({ color = '#aa4c40', particleCount = 1500, className = '' }) => {
  const containerRef = useRef(null);
  const requestIdRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;
    
    // Initialize scene
    const scene = new THREE.Scene();
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 20;
    
    // Setup renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = particleCount;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    const colorArray = new Float32Array(particlesCount * 3);
    
    const primaryColor = new THREE.Color(color);
    const secondaryColor = new THREE.Color('#ffffff');
    
    for (let i = 0; i < particlesCount; i++) {
      // Position particles in a 3D space
      posArray[i * 3] = (Math.random() - 0.5) * 50; // x
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 50; // z
      
      // Random particle size
      scaleArray[i] = Math.random() * 2;
      
      // Mix between primary and secondary colors
      const mixFactor = Math.random();
      const mixedColor = new THREE.Color().lerpColors(primaryColor, secondaryColor, mixFactor);
      
      colorArray[i * 3] = mixedColor.r;
      colorArray[i * 3 + 1] = mixedColor.g;
      colorArray[i * 3 + 2] = mixedColor.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Custom shader material for particles
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float scale;
        attribute vec3 color;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create a circular particle with soft edges
          float r = 0.5;
          float distance = length(gl_PointCoord - vec2(0.5, 0.5));
          if(distance > r) {
            discard;
          }
          
          // Smooth the particle edges
          float alpha = 1.0 - smoothstep(r - 0.1, r, distance);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    // Create particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Handle mouse movement for interactive particles
    const onMouseMove = (event) => {
      // Calculate mouse position normalized between -1 and 1
      const rect = containerRef.current.getBoundingClientRect();
      mousePosition.current.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mousePosition.current.y = -((event.clientY - rect.top) / height) * 2 + 1;
    };
    
    window.addEventListener('mousemove', onMouseMove);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particles
      particleSystem.rotation.x = elapsedTime * 0.05;
      particleSystem.rotation.y = elapsedTime * 0.03;
      
      // Respond to mouse movement
      particleSystem.rotation.x += mousePosition.current.y * 0.01;
      particleSystem.rotation.y += mousePosition.current.x * 0.01;
      
      // Pulsing effect
      const positions = particleSystem.geometry.attributes.position.array;
      const scales = particleSystem.geometry.attributes.scale.array;
      
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        // Add gentle waves to particle positions
        positions[i3 + 1] += Math.sin(elapsedTime + i * 0.1) * 0.01;
        
        // Pulse the particle sizes
        scales[i] = Math.abs(Math.sin(elapsedTime * 0.5 + i * 0.1)) * 2 + 0.5;
      }
      
      particleSystem.geometry.attributes.position.needsUpdate = true;
      particleSystem.geometry.attributes.scale.needsUpdate = true;
      
      // Render
      renderer.render(scene, camera);
      requestIdRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      scene.clear();
    };
  }, [color, particleCount]);
  
  return <div ref={containerRef} className={`absolute inset-0 -z-10 ${className}`} />;
};

export default ParticleBackground; 