"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import * as THREE from "three"

const isMobile = () => {
  if (typeof window === "undefined") return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

const BoxWithEdges = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhysicalMaterial
          color="#0070f3"
          roughness={0.1}
          metalness={0.8}
          transparent={true}
          opacity={0.9}
          transmission={0.5}
          clearcoat={1}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.5, 0.5, 0.5)]} />
        <lineBasicMaterial color="#214dbd" linewidth={2} />
      </lineSegments>
    </group>
  )
}

const BoxLetter = ({ letter, position }: { letter: string; position: [number, number, number] }) => {
  const group = useRef<THREE.Group>(null)

  const getLetterShape = (letter: string) => {
    const shapes = {
      A: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      D: [
        [1, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 0],
      ],
      J: [
        [0, 0, 1, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0],
      ],
    }
    return shapes[letter as keyof typeof shapes] || shapes["A"] // Default to 'A' if letter is not found
  }

  const letterShape = getLetterShape(letter)

  return (
    <group ref={group} position={position}>
      {letterShape.map((row, i) =>
        row.map((cell, j) => {
          if (cell) {
            const xOffset = j * 0.5 - (letter === "D" ? 0.75 : letter === "J" ? 1 : 1)

            return <BoxWithEdges key={`${i}-${j}`} position={[xOffset, (4 - i) * 0.5 - 1, 0]} />
          }
          return null
        }),
      )}
    </group>
  )
}

interface SceneProps {
  text: string;
  color: string;
  edgeColor: string;
  autoRotate: boolean;
  autoRotateSpeed: number;
  mobileEnvUrl?: string;
  desktopEnvUrl?: string;
}

const Scene = ({autoRotate, autoRotateSpeed}: SceneProps) => {
  const orbitControlsRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsMobileDevice(isMobile())

    return () => {
      setMounted(false)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      <group position={[-0.5, 0, 0]} rotation={[0, Math.PI / 1.5, 0]}>
        <BoxLetter letter="A" position={[-3.75, 0, 0]} />
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        <BoxLetter letter="J" position={[1.25, 0, 0]} />
      </group>
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom
        enablePan
        enableRotate
        autoRotate
        autoRotateSpeed={2}
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />

      {mounted && (
        <Environment
          files={
            isMobileDevice
              ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download3-7FArHVIJTFszlXm2045mQDPzsZqAyo.jpg"
              : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dither_it_M3_Drone_Shot_equirectangular-jpg_San_Francisco_Big_City_1287677938_12251179%20(1)-NY2qcmpjkyG6rDp1cPGIdX0bHk3hMR.jpg"
          }
          background
        />
      )}
    </>
  )
}

interface Next3DLogoProps {
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  text?: string;
  color?: string;
  edgeColor?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  backgroundColor?: string;
  mobileEnvUrl?: string;
  desktopEnvUrl?: string;
}

const Next3DLogo = ({ 
  className = "w-full h-screen",
  cameraPosition = [10.047021, -0.127436, -11.137374],
  cameraFov = 50,
  text = "NEXT",
  color = "#0070f3",
  edgeColor = "#214dbd",
  autoRotate = true,
  autoRotateSpeed = 2,
  backgroundColor = "bg-gray-900",
  mobileEnvUrl,
  desktopEnvUrl
}: Next3DLogoProps) => {
  return (
    <div className={`${className} ${backgroundColor}`}>
      <Canvas camera={{ position: cameraPosition, fov: cameraFov }}>
        <Scene 
          text={text}
          color={color}
          edgeColor={edgeColor}
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
          mobileEnvUrl={mobileEnvUrl}
          desktopEnvUrl={desktopEnvUrl}
        />
      </Canvas>
    </div>
  )
}

export default Next3DLogo