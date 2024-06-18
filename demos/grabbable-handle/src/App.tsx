import {
  XRCanvas,
  Hands,
  Controllers
} from "@coconut-xr/natuerlich/defaults";
import { getInputSourceId } from "@coconut-xr/natuerlich";
import { useRef } from "react";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin,
  useInputSources
} from "@coconut-xr/natuerlich/react";
import { isXIntersection } from "@coconut-xr/xinteraction";
import { Mesh, Vector3 } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { Content, Root } from "@react-three/uikit";


const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"]
};




export default function Index() {
  const enterVR = useEnterXR("immersive-vr", sessionOptions);
  const inputSources = useInputSources();
  const boxRef = useRef<Mesh>(null);
  const handleRef = useRef<Mesh>(null);
  const downState = useRef<{
    pointerId: number;
    pointToObjectOffset: Vector3;
  }>();

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (
      handleRef.current != null &&
      downState.current == null &&
      isXIntersection(e)
    ) {
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      downState.current = {
        pointerId: e.pointerId,
        pointToObjectOffset: boxRef.current.position.clone().sub(e.point)
      };
    }
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (downState.current?.pointerId != e.pointerId) {
      return;
    }
    downState.current = undefined;
  };

const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
  if (
    boxRef.current == null ||
    handleRef.current == null ||
    downState.current == null ||
    e.pointerId != downState.current.pointerId ||
    !isXIntersection(e)
  ) {
    return;
  }
  const newPosition = downState.current.pointToObjectOffset.clone().add(e.point);
  boxRef.current.position.copy(newPosition);
  handleRef.current.position.copy(newPosition).y -= 0.2; // adjust the y position of the handle
};

  return (
    <div
      style={{backgroundColor: "lightblue", width: "100vw", height: "100vh"}}
    >
      <button onClick={enterVR}>Enter AR</button>
      <XRCanvas>
        <Root>
        <Content width={50}>
          <mesh ref={boxRef} position={[0, 1.5, 1]} scale={0.4}>
            <boxGeometry />
            <meshBasicMaterial color="red" />
          </mesh>
          <mesh
            ref={handleRef}
            scale={0.2}
            position={[0, 1.3, 1]}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
          >
            <boxGeometry />
            <meshBasicMaterial color="blue" />
          </mesh>
        </Content>
        </Root>
        <NonImmersiveCamera position={[0, 0, 4]} />
        <ImmersiveSessionOrigin position={[0, 0, 4]}>
          <Hands type="pointer" />
          <Controllers type="pointer" />
        </ImmersiveSessionOrigin>
      </XRCanvas>
    </div>
  );
}