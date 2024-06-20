import { DoubleSide } from "three";

interface MorphingSphereProps {
  position: [number, number, number];
  scale: [number, number, number];
  sliderValue: number;
}

const MorphingSphere = ({ position, scale, sliderValue }: MorphingSphereProps) => {

  if (!(sliderValue >= 0 && sliderValue <= 1)) {
    throw new Error('Slider value must be between 0 and 1');
  }

  const thetaLength = Math.PI * sliderValue;

  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, thetaLength]} />
      <meshStandardMaterial color="skyblue" side={DoubleSide} wireframe={true} />
    </mesh>
  );
}

export default MorphingSphere;