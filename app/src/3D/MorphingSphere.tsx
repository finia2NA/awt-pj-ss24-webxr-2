import { useEffect, useRef } from "react";
import { DoubleSide, Mesh } from "three";

/**
 * Props for the MorphingSphere component.
 * 
 * @interface MorphingSphereProps
 * @property { [number, number, number] } [position] - The position of the sphere in 3D space. Defaults to [0, 0, 0].
 * @property { [number, number, number] } [scale] - The scale of the sphere. Defaults to [2, 1, 2].
 * @property { [number, number, number] } [rotation] - The rotation of the sphere in radians. Defaults to [-0.5 * Math.PI, 0, 0].
 * @property { number } sliderValue - Value between 0 and 1 to control the theta length of the sphere. Determines how much of the sphere is rendered.
 */
interface MorphingSphereProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  sliderValue: number;
}

/**
 * A component that renders a morphing sphere using Three.js.
 * 
 * The sphere starts as a partial sphere and morphs to a full sphere based on the slider value.
 * The `sliderValue` prop controls the theta length of the sphere, with a value of 0 rendering nothing,
 * and a value of 1 rendering a complete sphere.
 * 
 * @param {MorphingSphereProps} props - The props object for the MorphingSphere component.
 * @returns {JSX.Element} The rendered MorphingSphere component.
 */
const MorphingSphere = ({ position, scale, rotation, sliderValue }: MorphingSphereProps) => {

  const myPosition = position || [0, 0, 0];
  const myScale = scale || [2, 1, 2];

  const meshRef = useRef(null);

  // Ensure the slider value is within the valid range
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
