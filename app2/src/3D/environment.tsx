import { useEffect } from 'react';
import { useLoader } from "@react-three/fiber";
import { DoubleSide, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshStandardMaterial, Color } from 'three';


interface environmentProps {
  position: Vector3;
  scale: Vector3;
  viewDirection: Vector3;
  immersionLevel: number;
}

function applyMaterialToMeshes(scene: any, material: any) {
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material = material;
    }
  });
}


const Grass = () => {
  const grass = useLoader(GLTFLoader, "grass.glb");
  useEffect(() => {
    const grassMaterial = new MeshStandardMaterial({
      color: new Color(0x2FD033),
      roughness: 0.7,
      metalness: 0.1,
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
      color: new Color(0xAA7C4F),
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
      color: new Color(0x00AAFF),
      roughness: 0.7,
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


const Environment = (props: environmentProps) => {

  return (
    <>
      <Grass />
      <Trees />
      <Wood />
      <Water />
      <Sail />
    </>
  );
}

export default Environment;
