/*
  * This file contains the 3D Environment component, a 3D scene with lighting.
  * It includes the ground, trees, water, sky, and lighting.
  * The Environment component is used in top level of the App.
*/

import { forwardRef, useEffect, useRef } from 'react';
import { useLoader } from "@react-three/fiber";
import { Material, Object3D, Vector3, MeshStandardMaterial, Color, Texture, TextureLoader, DoubleSide, Object3DEventMap, Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface EnvironmentProps {
  immersionLevel: number;
  nightMode: boolean;
}

interface dayNightProps {
  nightMode?: boolean;
}

interface texturedProps {
  texture: Texture;
}

/**
 * Applies a material to all meshes in the scene.
 *
 * @param scene - The scene containing the meshes.
 * @param material - The material to apply to the meshes.
 */
function applyMaterialToMeshes(scene: Object3D, material: Material) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material = material;
      child.castShadow = true;  // Enable casting shadows
      child.receiveShadow = true;  // Enable receiving shadows
    }
  });
}

/**
 * Renders the grass of the scene. Uses the texture as an environment map for the physical material.
 * @param props.texture - The environment map texture to be used in the material.
 * @returns The rendered grass object.
 */
const Grass = (props: texturedProps) => {
  const grass = useLoader(GLTFLoader, "grass.glb");
  useEffect(() => {
    const grassMaterial = new MeshStandardMaterial({
      color: new Color(0x248f3e),
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

/**
 * Renders the trees. Uses the texture as an environment map for the physical material.
 * @param props - The props for the Trees component.
 * @param props.texture - The environment map texture to be used in the material.
 * @returns The rendered Trees component.
 */
const Trees = (props: texturedProps) => {
  const trees = useLoader(GLTFLoader, "trees.glb");
  useEffect(() => {
    const treeMaterial = new MeshStandardMaterial({
      color: new Color(0x1c7d1e),
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

/**
 * Renders the wood objects in the scene. Uses the texture as an environment map for the physical material.
 * @param props - The props for the Wood component.
 * @param props.texture - The environment map texture to be used in the material.
 * @returns The rendered Wood component.
 */
const Wood = (props: texturedProps) => {
  const wood = useLoader(GLTFLoader, "wood.glb");
  useEffect(() => {
    const woodMaterial = new MeshStandardMaterial({
      color: new Color(0x676132),
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

/**
 * Renders the water in the scene. Uses the texture as an environment map for the physical material.
 * @param props - The props for the Water component.
 * @param props.texture - The environment map texture to be used in the material.
 * @returns The rendered Water component.
 */
const Water = (props: texturedProps) => {
  const water = useLoader(GLTFLoader, "water.glb");
  useEffect(() => {
    const waterMaterial = new MeshStandardMaterial({
      color: new Color(0x1f98ad),
      roughness: 0.0,
      metalness: 0.1,
      opacity: 0.9,
      transparent: true,
      envMap: props.texture,
    });

    applyMaterialToMeshes(water.scene, waterMaterial);
  }, [props.texture, water]);

  return (
    <primitive object={water.scene} />
  );
}

/**
 * Renders the sail in the scene. Uses the texture as an environment map for the physical material.
 * @param props - The props for the Sail component.
 * @param props.texture - The environment map texture to be used in the material.
 * @returns The rendered Sail component.
 */
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

/**
 * Renders the sky sphere of the scene.
 * @param props - The props for the SkySphere component.
 * @param props.texture - The texture to be used for the sky.
 * @returns The rendered SkySphere component.
 */
const SkySphere = (props: texturedProps) => {
  return (
    <mesh position={[0, 10, 0]} rotation={[0, 2.4, 0]}>
      <sphereGeometry args={[100, 32, 32]} />
      <meshBasicMaterial map={props.texture} side={DoubleSide} />
    </mesh>
  );
}

/**
 * Renders the lighting for the scene.
 * @param props - The props for the Lighting component.
 * @param props.nightMode - Determines if the scene is in night mode.
 * @returns The rendered Lighting component.
 */
const Lighting = (props: dayNightProps) => {
  let lightDirection: Vector3;
  let ambientIntensity: number;
  let directionalIntensity: number;

  if (props.nightMode) {
    lightDirection = new Vector3(30, 20, -6);
    ambientIntensity = 0.1;
    directionalIntensity = 0.6;
  } else {
    lightDirection = new Vector3(0, 20, 20);
    ambientIntensity = 2.4;
    directionalIntensity = 1.8;
  }

  const targetObject = new Object3D();
  targetObject.position.set(14, 5, 3);
  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={lightDirection}
        intensity={directionalIntensity}
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

/**
 * Returns an environment, where the canonical camera position is at the origin, view is to the front (as you would expect).
 * The @param immersionLevel prop controls the level of immersion, currently just fully there if > 0.
 * The @param nightMode prop controls the day/night mode.
 */
const Environment = forwardRef(({ immersionLevel, nightMode }: EnvironmentProps, ref: React.Ref<Group<Object3DEventMap>>) => {
  // Get correct env texture based on bitheme
  const envPath = nightMode ? 'nightenv.png' : 'dayenv.png';
  const envTexture = useLoader(TextureLoader, envPath);

  // References to the groups
  const translationRef = useRef(null);
  const rotationRef = useRef(null);

  useEffect(() => {
    // Set the group's position to simulate the camera's previous position
    if (translationRef.current) {
      const theRef = translationRef.current as Object3D;
      theRef.position.set(-23, -5, -22);
    }
  }, []);

  useEffect(() => {
    // Set the group's rotation to simulate the camera's previous rotation
    if (rotationRef.current) {
      // Rotate the pivot point
      const theRef = rotationRef.current as Object3D;
      theRef.rotation.y = -0.2;
    }
  }, []);

  return (
    <>
      <group ref={ref}>
        <group ref={rotationRef} layers={10}>
          <group ref={translationRef}>
            <>
              {immersionLevel > 0 && <>
                <Grass texture={envTexture} />
                <Trees texture={envTexture} />
                <Wood texture={envTexture} />
                <Water texture={envTexture} />
                <Sail texture={envTexture} />
                <SkySphere texture={envTexture} />
              </>
              }
              <Lighting nightMode={nightMode} />
            </>
          </group>
        </group>
      </group>

      {/* I'm using this stuff for color tuning and stuff - R */}
      {/* <axesHelper />
        <mesh position={[-3, 3, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color="red" />
        </mesh> */}
      {/* <gridHelper /> */}
    </>
  );
});

export default Environment;
