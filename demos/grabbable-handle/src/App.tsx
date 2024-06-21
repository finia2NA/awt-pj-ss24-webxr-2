import {
  XRCanvas,
  Hands,
  Controllers
} from "@coconut-xr/natuerlich/defaults";
import { useRef } from "react";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin
} from "@coconut-xr/natuerlich/react";
import { isXIntersection } from "@coconut-xr/xinteraction";
import { Vector3 } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { Container, Root } from "@react-three/uikit";


const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"]
};




export default function Index() {
  const enterVR = useEnterXR("immersive-vr", sessionOptions);
  const view = useRef(null);
  const handle = useRef(null);
  const downState = useRef<{
    pointerId: number;
    pointToObjectOffset: Vector3;
    curPosition: Vector3;
  }>();

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (
      view.current != null &&
      downState.current == null &&
      isXIntersection(e)
    ) {
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);

      let x = view.current.getComputedProperty("transformTranslateX");
      let y = view.current.getComputedProperty("transformTranslateY");
      let z = view.current.getComputedProperty("transformTranslateZ");

      let pos = new Vector3(x, y, z);

      downState.current = {
        pointerId: e.pointerId,
        pointToObjectOffset: e.point,  //pos.clone().sub(e.point)
        curPosition: pos
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
      handle.current == null ||
      view.current == null ||
      downState.current == null ||
      e.pointerId != downState.current.pointerId ||
      !isXIntersection(e)
    ) {
      return;
    }

    const scale = 90; // Adjust this value as needed

    let delta = downState.current.pointToObjectOffset.clone().sub(e.point)
    let scaledDelta = new Vector3(-delta.x * scale, -delta.y * scale, -delta.z * scale);
    let newPosition = downState.current.curPosition.clone().add(scaledDelta);
    // ^-TODO: Not quite correct, elements "jump" sometimes

    view.current.setStyle({ transformTranslateX: newPosition.x, transformTranslateY: -newPosition.y, transformTranslateZ: newPosition.z });
    handle.current.setStyle({ transformTranslateX: newPosition.x, transformTranslateY: -newPosition.y, transformTranslateZ: newPosition.z });
  };

  return (
    <div
      style={{ backgroundColor: "lightblue", width: "100vw", height: "100vh" }}
    >
      <button onClick={enterVR}>Enter AR</button>
      <XRCanvas>
        <Root flexDirection={"column"}>
          <Container
            height={100} width={200}
            backgroundColor={"green"}
            ref={view}
            transformTranslateX={0}
            transformTranslateY={0}
            transformTranslateZ={0}
          >
          </Container>
          <Container
            height={10} width={40}
            alignSelf={"center"}
            backgroundColor={"red"}
            borderRadius={8}
            ref={handle}
            transformTranslateX={0}
            transformTranslateY={0}
            transformTranslateZ={0}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
          >
          </Container>
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