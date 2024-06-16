import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
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
  return (
    <group>
      {/* lights */}
      <directionalLight position={[1, 2, 1.5]} intensity={0.5} castShadow />
      <hemisphereLight intensity={1.5} groundColor="red" />
      <Suspense fallback={null}>

        {/* // start of relevant part
        // give the mask a unique id and position it in front of the camera */}
        <Mask id={1} position={[0, 0, 2.2]}>
          {/* define the shape of the mask */}
          <circleGeometry args={[4.0, 128]} />

          {/* define the material of the mask */}
          <meshBasicMaterial
            // it has a color
            colorWrite={true}
            // it does not do depth testing -> rendered last
            depthWrite={false}
            // it's used as a stencil mask
            stencilWrite={true}
            stencilRef={1}
            stencilFunc={THREE.AlwaysStencilFunc}
            stencilFail={THREE.ReplaceStencilOp}
            stencilZFail={THREE.ReplaceStencilOp}
            stencilZPass={THREE.ReplaceStencilOp}
            // only render the front side, also: it's red
            side={THREE.FrontSide}
            color={new THREE.Color('red')}
          />
        </Mask>

        {/* Bounds is used to tell the camera to fit the content within the given bounds */}
        <Bounds fit clip observe>
          <Atom scale={8} />
        </Bounds>
      </Suspense>
    </group>
  )
}

const Atom = React.memo(({ ...props }) => {
  // geometry, camera, scene, ref to the mesh
  const { nodes } = useGLTF('/react-transformed.glb')
  const { camera, scene } = useThree()
  const ref = useRef()

  const handleCameraMove = (event) => {
    // on camera move, need to update the stencil ref of the mask

    ref.current.stencilWrite = true
    ref.current.stencilFunc = THREE.NotEqualStencilFunc
    ref.current.stencilFail = THREE.ReplaceStencilOp
    ref.current.stencilZFail = THREE.ReplaceStencilOp
    ref.current.stencilZPass = THREE.ReplaceStencilOp
  }

  return (
    <group>
      <mesh geometry={nodes.atom.geometry} {...props} dispose={null}>
        <meshStandardMaterial ref={ref} color="#33BBFF" />
      </mesh>
      <OrbitControls makeDefault onChange={handleCameraMove} />
    </group>
  )
})
