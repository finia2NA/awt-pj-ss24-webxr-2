import { useEffect } from 'react';
import { useLoader } from "@react-three/fiber";
import { Material, Object3D, Vector3, MeshStandardMaterial, Color, Texture, TextureLoader, DoubleSide } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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

interface texturedProps {
  texture: Texture;
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

const Grass = (props: texturedProps) => {
  const grass = useLoader(GLTFLoader, "grass.glb");
  useEffect(() => {
    const grassMaterial = new MeshStandardMaterial({
      color: new Color(0x91E78B),
      roughness: 0.7,
      metalness: 0.2,
      envMap: props.texture,
    });

    applyMaterialToMeshes(grass.scene, grassMaterial);
  }, [grass, props.texture]);

  return (
    <primitive object={grass.scene} />
  );
}

const Trees = (props: texturedProps) => {
  const trees = useLoader(GLTFLoader, "trees.glb");
  useEffect(() => {
    const treeMaterial = new MeshStandardMaterial({
      color: new Color(0x2FD033),
      roughness: 0.7,
      metalness: 0.1,
      envMap: props.texture,
    });

    applyMaterialToMeshes(trees.scene, treeMaterial);
  }, [props.texture, trees]);

  return (
    <primitive object={trees.scene} />
  );
}

const Wood = (props: texturedProps) => {
  const wood = useLoader(GLTFLoader, "wood.glb");
  useEffect(() => {
    const woodMaterial = new MeshStandardMaterial({
      color: new Color(0x938A47),
      roughness: 0.7,
      metalness: 0.1,
      envMap: props.texture,
    });

    applyMaterialToMeshes(wood.scene, woodMaterial);
  }, [props.texture, wood]);

  return (
    <primitive object={wood.scene} />
  );
}

const Water = (props: texturedProps) => {
  const water = useLoader(GLTFLoader, "water.glb");
  useEffect(() => {
    const waterMaterial = new MeshStandardMaterial({
      color: new Color(0x5FD2E7),
      roughness: 0.0,
      metalness: 0.1,
      opacity: 0.95,
      transparent: true,
      envMap: props.texture,
    });

    applyMaterialToMeshes(water.scene, waterMaterial);
  }, [props.texture, water]);

  return (
    <primitive object={water.scene} />
  );
}

const Sail = (props: texturedProps) => {
  const sail = useLoader(GLTFLoader, "sail.glb");
  useEffect(() => {
    const sailMaterial = new MeshStandardMaterial({
      color: new Color(0xFFFFFF),
      roughness: 0.7,
      metalness: 0.1,
      side: DoubleSide,
      envMap: props.texture,
    });

    applyMaterialToMeshes(sail.scene, sailMaterial);
  }, [props.texture, sail]);

  return (
    <primitive object={sail.scene} />
  );
}



const SkySphere = (props: texturedProps) => {

  return (
    <mesh position={[0, 10, 0]} rotation={[0, 2.4, 0]}>
      <sphereGeometry args={[100, 32, 32]} />
      <meshBasicMaterial map={props.texture} side={DoubleSide} />
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

  // TODO: memoize
  const envPath = props.nightMode ? "nightenv.png" : "dayenv.png";
  const envTexture = useLoader(TextureLoader, envPath);

  return (
    <>
      <Grass texture={envTexture} />
      <Trees texture={envTexture} />
      <Wood texture={envTexture} />
      <Water texture={envTexture} />
      <Sail texture={envTexture} />
      <SkySphere texture={envTexture} />
      <Lighting nightMode={props.nightMode} />
    </>
  );
}

export default Environment;
