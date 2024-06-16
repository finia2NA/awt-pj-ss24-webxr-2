import { Container } from '@react-three/uikit';
import { ReactNode } from 'react';

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Root, Text } from '@react-three/uikit'
import { MeshPhongMaterial } from 'three'

import * as THREE from 'three'


const BG = () => {
  return (
    <>
      <Container backgroundColor={"green"} height={100} width={190} gap={10} paddingX={10} positionTop={0} positionLeft={10} positionType={'absolute'}>
        <Container width={50} height={100} backgroundColor={"red"} />
        <Container width={50} height={100} backgroundColor={"red"} />
        <Container width={50} height={100} backgroundColor={"red"} />
      </Container>

    </>
  )
}

class FancyMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;

        void main() {
          // Set the color to white with 50% opacity
          gl_FragColor = vec4(1.0, 1.0, 1.0, 0.5);
        }
      `,
      transparent: true
    });
  }
}



const Edgeblur = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <BG />
      <Container positionTop={0} positionLeft={0} positionType={'absolute'} width={210} height={100} zIndexOffset={1000}
        backgroundColor={"blue"} backgroundOpacity={0.5}
        panelMaterialClass={FancyMaterial}
      />
    </>
  )
}

export default Edgeblur;