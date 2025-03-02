"use client"
import React, { Suspense, useRef } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Group } from 'three'
import * as THREE from 'three'

// Importing FBXLoader from the correct path
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

interface ModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  animationSpeed?: number;
}

function Model({ 
  url, 
  scale = 0.012, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  animationSpeed = 1 
}: ModelProps) {
  const fbx = useLoader(FBXLoader, url)
  const modelRef = useRef<Group>(null)
  
  useFrame(() => {
    if (modelRef.current) {
      // Simple rotation animation
      modelRef.current.rotation.y += 0.005 * animationSpeed
    }
  })
  
  return (
    <primitive 
      ref={modelRef}
      object={fbx} 
      scale={scale} 
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)} 
    />
  )
}

interface FBXViewerProps {
  modelPath: string;
  height?: string;
  backgroundColor?: string; // Should match website background
  cameraPosition?: [number, number, number];
  animationSpeed?: number;
}

function FBXViewer({ 
  modelPath, 
  height = '500px', 
  backgroundColor = 'transparent', // Changed to transparent
  cameraPosition = [5, 5, 5],
  animationSpeed = 1
}: FBXViewerProps) {
  return (
    <div style={{ 
      width: '50%', 
      height: height, 
      backgroundColor: backgroundColor 
    }}>
      <Canvas 
        camera={{ position: new THREE.Vector3(...cameraPosition), fov: 45 }}
        style={{ background: 'transparent' }} // Transparent canvas
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Model 
            url={modelPath} 
            animationSpeed={animationSpeed}
          />
          <OrbitControls 
            enableZoom={false} // Disabled zoom here
            enablePan={false}
            enableRotate={true}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default FBXViewer