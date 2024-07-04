import { useEffect, useRef } from "react";
import { DoubleSide, Mesh } from "three";

interface MorphingSphereProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  sliderValue: number;
}

const MorphingSphere = ({ position, scale, rotation, sliderValue }: MorphingSphereProps) => {

  const myPosition = position || [0, 0, 0];
  const myScale = scale || [2, 1, 2];

  const meshRef = useRef(null);

  if (!(sliderValue >= 0 && sliderValue <= 1)) {
    throw new Error('Slider value must be between 0 and 1');
  }

  const thetaLength = Math.PI * sliderValue;

  useEffect(() => {
    if (meshRef.current) {
      const myRotation = rotation || [-0.5 * Math.PI, 0, 0];
      const theRef = meshRef.current as Mesh;
      theRef.rotation.x = myRotation[0];
      theRef.rotation.y = myRotation[1];
      theRef.rotation.z = myRotation[2];
    }
  }, [rotation]);


  return (
    <mesh position={myPosition} scale={myScale} ref={meshRef}>
      <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, thetaLength]} />
      <meshStandardMaterial color="skyblue" side={DoubleSide} wireframe={true} />
    </mesh>
  );
}

export default MorphingSphere;