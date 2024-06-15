import { useEffect } from 'react';
import { useLoader } from "@react-three/fiber";
import { DoubleSide, Material, Object3D, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshStandardMaterial, Color } from 'three';
import * as THREE from 'three';

interface EnvironmentProps {
  position: Vector3;
  scale: Vector3;
  viewDirection: Vector3;
  immersionLevel: number;
  nightMode: boolean;
}

interface dayNightProps {
  nightMode?: boolean;
}

function applyMaterialToMeshes(scene: Object3D, material: Material) {
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material = material;
      child.castShadow = true;  // Enable casting shadows
      child.receiveShadow = true;  // Enable receiving shadows
    }
  });
}

const Grass = () => {
  const grass = useLoader(GLTFLoader, "grass.glb");
  useEffect(() => {
    const grassMaterial = new MeshStandardMaterial({
      color: new Color(0x91E78B),
      roughness: 0.7,
      metalness: 0.2,
    });

    applyMaterialToMeshes(grass.scene, grassMaterial);
  }, [grass]);

  return (
    <primitive object={grass.scene} />
  );
}

const Trees = () => {
  const trees = useLoader(GLTFLoader, "trees.glb");
  useEffect(() => {
    const treeMaterial = new MeshStandardMaterial({
      color: new Color(0x2FD033),
      roughness: 0.7,
      metalness: 0.1,
    });

    applyMaterialToMeshes(trees.scene, treeMaterial);
  }, [trees]);

  return (
    <primitive object={trees.scene} />
  );
}

const Wood = () => {
  const wood = useLoader(GLTFLoader, "wood.glb");
  useEffect(() => {
    const woodMaterial = new MeshStandardMaterial({
      color: new Color(0x938A47),
      roughness: 0.7,
      metalness: 0.1,
    });

    applyMaterialToMeshes(wood.scene, woodMaterial);
  }, [wood]);

  return (
    <primitive object={wood.scene} />
  );
}

const Water = () => {
  const water = useLoader(GLTFLoader, "water.glb");
  useEffect(() => {
    const waterMaterial = new MeshStandardMaterial({
      color: new Color(0x5FD2E7),
      roughness: 0.0,
      metalness: 0.1,
    });

    applyMaterialToMeshes(water.scene, waterMaterial);
  }, [water]);

  return (
    <primitive object={water.scene} />
  );
}

const Sail = () => {
  const sail = useLoader(GLTFLoader, "sail.glb");
  useEffect(() => {
    const sailMaterial = new MeshStandardMaterial({
      color: new Color(0xFFFFFF),
      roughness: 0.7,
      metalness: 0.1,
      side: DoubleSide,
    });

    applyMaterialToMeshes(sail.scene, sailMaterial);
  }, [sail]);

  return (
    <primitive object={sail.scene} />
  );
}



const SkySphere = (props: dayNightProps) => {
  const texturePath = props.nightMode ? "nightenv.png" : "dayenv.png";
  const texture = useLoader(THREE.TextureLoader, texturePath);


  return (
    <mesh position={[0, 10, 0]} rotation={[0, 2.4, 0]}>
      <sphereGeometry args={[100, 32, 32]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

const Lighting = (props: dayNightProps) => {

  let lightDirection: Vector3;
  let ambientIntensity: number;

  if (!props.nightMode) {
    lightDirection = new Vector3(0, 20, 20);
    ambientIntensity = 0.5;
  } else {
    lightDirection = new Vector3(30, 20, -6);
    ambientIntensity = 0.1;
  }

  const targetObject = new Object3D();
  targetObject.position.set(14, 5, 3);
  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={lightDirection}
        intensity={0.6}
        color={0xFFFFFF}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-radius={20}
        target={targetObject}
      />
    </>
  )
}


const Environment = (props: EnvironmentProps) => {
  return (
    <>
      <Grass />
      <Trees />
      <Wood />
      <Water />
      <Sail />
      <SkySphere nightMode={props.nightMode} />
      <Lighting nightMode={props.nightMode} />
    </>
  );
}

export default Environment;
