import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Mask, useGLTF, Bounds, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export function App() {
  return (
    <Canvas>
      <Map />
      <color attach="background" args={['#000']} />
    </Canvas>
  )
}

function Map() {
  const [handleCameraMove, setHandleCameraMove] = useState(() => () => {});

  return (
    <group>
      {/* lights */}
      <directionalLight position={[1, 2, 1.5]} intensity={0.5} castShadow />
      <hemisphereLight intensity={1.5} groundColor="red" />
      <Suspense fallback={null}>
        <Mask id={1} position={[0, 0, 2.2]}>
          <circleGeometry args={[4.0, 128]} />
          <meshBasicMaterial
            colorWrite={true}
            depthWrite={false}
            stencilWrite={true}
            stencilRef={1}
            stencilFunc={THREE.AlwaysStencilFunc}
            stencilFail={THREE.ReplaceStencilOp}
            stencilZFail={THREE.ReplaceStencilOp}
            stencilZPass={THREE.ReplaceStencilOp}
            side={THREE.FrontSide}
            color={new THREE.Color('red')}
          />
        </Mask>
        <Bounds fit clip observe>
          <Atom scale={8} setHandleCameraMove={setHandleCameraMove} />
        </Bounds>
      </Suspense>
      <OrbitControls makeDefault onChange={handleCameraMove} />
    </group>
  )
}

const Atom = React.memo(({ setHandleCameraMove, ...props }) => {
  const { nodes } = useGLTF('/react-transformed.glb')
  const ref = useRef()

  const handleCameraMove = (event) => {
    ref.current.stencilWrite = true
    ref.current.stencilFunc = THREE.NotEqualStencilFunc
    ref.current.stencilFail = THREE.ReplaceStencilOp
    ref.current.stencilZFail = THREE.ReplaceStencilOp
    ref.current.stencilZPass = THREE.ReplaceStencilOp
  }

  useEffect(() => {
    setHandleCameraMove(() => handleCameraMove)
  }, [setHandleCameraMove])

  return (
    <group>
      <mesh geometry={nodes.atom.geometry} {...props} dispose={null}>
        <meshStandardMaterial ref={ref} color="#33BBFF" />
      </mesh>
    </group>
  )
})
