import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Mask, useGLTF, Bounds, Environment, OrbitControls, RoundedBox, Float } from '@react-three/drei'
import * as THREE from 'three'
import { Physics } from '@react-three/cannon'

export function App() {
  return (
    <Canvas shadows camera={{ near: 0.01 }}>
      <Physics>
        <Map />
      </Physics>
    </Canvas>
  )
}

function Map() {
  return (
    <group>
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
          <Float floatIntensity={4} rotationIntensity={0} speed={4}>
            <Atom scale={1.5} />
          </Float>
        </Bounds>
        {/* <Environment preset="city" /> */}
      </Suspense>
    </group>
  )
}

const Atom = React.memo(({ ...props }) => {
  const { nodes } = useGLTF('/react-transformed.glb')
  const { camera, scene } = useThree()
  const ref = useRef()

  const hasCameraPassedThroughCircle = () => {
    const cameraPosition = camera.position.clone()
    const circleCenter = new THREE.Vector3(0, 0, 2.2)
    const cameraToCenter = circleCenter.clone().sub(cameraPosition)
    const distanceToCenter = cameraToCenter.length()
    const circleRadius = 4.0
    if (distanceToCenter < circleRadius) {
      // Camera passes through the circle geometry
      console.log('Camera passed through the portal.')
      return false
    } else {
      // Camera does not pass through the circle geometry
      console.log('Camera does not pass through the portal.')
      return true
    }
  }

  const handleCameraMove = (event) => {
    // Create a vector representing the circle's normal
    const circleNormal = new THREE.Vector3(0, 0, 1)

    // Create a vector representing the target point
    const targetPoint = camera.position

    // Create a vector representing the circle's position
    const circlePosition = new THREE.Vector3(0, 0, 2.2)

    // Create a vector representing the direction from the circle's position to the target point
    const directionToTarget = targetPoint.clone().sub(circlePosition)

    // Calculate the dot product of the direction vector and the circle normal
    const dotProduct = directionToTarget.dot(circleNormal)

    if (!hasCameraPassedThroughCircle()) {
      if (dotProduct >= 0.0) {
        console.log('Target point is in front of the circle.')
        ref.current.stencilWrite = true
        // ref.current.stencilRef = THREE.ReferenceStencilValue
        ref.current.stencilFunc = THREE.NotEqualStencilFunc
        ref.current.stencilFail = THREE.ReplaceStencilOp
        ref.current.stencilZFail = THREE.ReplaceStencilOp
        ref.current.stencilZPass = THREE.ReplaceStencilOp
        scene.background = new THREE.Color('black')
      } else {
        console.log('Target point is behind the circle.')
        ref.current.stencilWrite = true
        ref.current.stencilRef = 2
        ref.current.stencilFunc = THREE.NotEqualStencilFunc
        ref.current.stencilFail = THREE.ReplaceStencilOp
        ref.current.stencilZFail = THREE.ReplaceStencilOp
        ref.current.stencilZPass = THREE.ReplaceStencilOp
        scene.background = new THREE.Color('red')
      }
    }
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
