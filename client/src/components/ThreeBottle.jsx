import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeBottle = ({ bottleType = 'wine', color = '#aa4c40', className = '' }) => {
  const containerRef = useRef(null);
  const requestIdRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const bottleRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize the scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf9f9f7);
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.set(0, 0, 5);
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    rendererRef.current = renderer;
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);
    
    // Add color spotlight based on bottle type
    const spotlight = new THREE.SpotLight(new THREE.Color(color), 1);
    spotlight.position.set(0, 10, 0);
    spotlight.angle = Math.PI / 4;
    spotlight.penumbra = 0.1;
    spotlight.decay = 2;
    spotlight.distance = 200;
    scene.add(spotlight);
    
    // Create a fallback bottle if 3D model loading fails
    const createFallbackBottle = () => {
      const bottleGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
      const neckGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.7, 32);
      
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.1,
        roughness: 0.2,
        transmission: 0.9,
        transparent: true,
        opacity: 0.8,
      });
      
      const bottle = new THREE.Mesh(bottleGeometry, glassMaterial);
      bottle.position.set(0, 0, 0);
      bottle.castShadow = true;
      
      const neck = new THREE.Mesh(neckGeometry, glassMaterial);
      neck.position.set(0, 1.85, 0);
      neck.castShadow = true;
      
      const bottleGroup = new THREE.Group();
      bottleGroup.add(bottle);
      bottleGroup.add(neck);
      
      bottleRef.current = bottleGroup;
      scene.add(bottleGroup);
      
      // Add animated particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 100;
      const posArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.8,
      });
      
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      
      // Add animation
      const animate = () => {
        if (bottleRef.current) {
          bottleRef.current.rotation.y += 0.005;
        }
        
        particlesMesh.rotation.y += 0.001;
        
        renderer.render(scene, camera);
        requestIdRef.current = requestAnimationFrame(animate);
      };
      
      animate();
    };
    
    // Try to load a 3D model or use fallback
    try {
      const loader = new GLTFLoader();
      
      // Choose model based on bottle type
      let modelPath = '/models/wine_bottle.glb';
      
      if (bottleType === 'whiskey') {
        modelPath = '/models/whiskey_bottle.glb';
      } else if (bottleType === 'champagne') {
        modelPath = '/models/champagne_bottle.glb';
      }
      
      loader.load(
        modelPath,
        (gltf) => {
          const bottle = gltf.scene;
          bottle.scale.set(1, 1, 1);
          bottle.position.set(0, -1, 0);
          
          // Apply color to the bottle
          bottle.traverse((child) => {
            if (child.isMesh) {
              child.material.color.set(color);
              child.material.transparent = true;
              child.material.opacity = 0.8;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          
          bottleRef.current = bottle;
          scene.add(bottle);
          
          // Add orbit controls
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableZoom = false;
          controls.enablePan = false;
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;
          controls.autoRotate = true;
          controls.autoRotateSpeed = 3;
          
          // Animation loop
          const animate = () => {
            controls.update();
            renderer.render(scene, camera);
            requestIdRef.current = requestAnimationFrame(animate);
          };
          
          animate();
        },
        undefined,
        (error) => {
          console.error('Error loading 3D model:', error);
          createFallbackBottle();
        }
      );
    } catch (error) {
      console.error('Error initializing 3D model:', error);
      createFallbackBottle();
    }
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      scene.clear();
    };
  }, [bottleType, color]);
  
  return (
    <div 
      ref={containerRef} 
      className={`three-bottle-container h-64 w-full rounded-lg ${className}`}
    />
  );
};

export default ThreeBottle; 