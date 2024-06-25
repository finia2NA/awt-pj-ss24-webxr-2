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
import { Container, Root, ComponentInternals } from "@react-three/uikit";


const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"]
};


export default function Index() {
  const enterVR = useEnterXR("immersive-vr", sessionOptions);
  const view = useRef<ComponentInternals>(null);
  const handle = useRef<ComponentInternals>(null);
  const resize = useRef<ComponentInternals>(null);
  const downState = useRef<{
    pointerId: number;
    point: Vector3;
    transformation: Vector3;
  }>();

  const handleDragPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (
      view.current != null &&
      downState.current == null &&
      isXIntersection(e)
    ) {
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);

      let x = view.current.getComputedProperty("transformTranslateX") || 0;
      let y = view.current.getComputedProperty("transformTranslateY") || 0;
      let z = view.current.getComputedProperty("transformTranslateZ") || 0;

      let pos = new Vector3(x, y, z);

      downState.current = {
        pointerId: e.pointerId,
        point: e.point,
        transformation: pos
      };
    }
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (downState.current?.pointerId != e.pointerId) {
      return;
    }
    downState.current = undefined;
  };

  const handleDragPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (
      handle.current == null ||
      resize.current == null ||
      view.current == null ||
      downState.current == null ||
      e.pointerId != downState.current.pointerId ||
      !isXIntersection(e)
    ) {
      return;
    }

    const scale = 90; // Adjust this value as needed

    let delta = e.point.sub(downState.current.point.clone())
    let scaledDelta = new Vector3(delta.x * scale, -delta.y * scale, delta.z * scale);
    let newPosition = downState.current.transformation.clone().add(scaledDelta);

    view.current.setStyle({
      ...view.current.getStyle(),  // Preserve other styles
      ...{ transformTranslateX: newPosition.x, transformTranslateY: newPosition.y, transformTranslateZ: newPosition.z }
    });
  };

  const handleResizePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (
      resize.current != null &&
      view.current != null &&
      downState.current == null &&
      isXIntersection(e)
    ) {
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);

        let x = view.current.getComputedProperty("transformScaleX") || 1;
        let y = view.current.getComputedProperty("transformScaleY") || 1;
        let z = view.current.getComputedProperty("transformScaleZ") || 1;

        let scale = new Vector3(x, y, z);

        downState.current = {
          pointerId: e.pointerId,
          point: e.point,
          transformation: scale
        };
      }
  };

  const handleResizePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (
      handle.current == null ||
      resize.current == null ||
      view.current == null ||
      downState.current == null ||
      e.pointerId != downState.current.pointerId ||
      !isXIntersection(e)
    ) {
      return;
    }

    const ratio = view.current.size.v[0] / view.current.size.v[1];

    let delta = downState.current.point.clone().sub(e.point)

    let scaledDelta = new Vector3(-delta.x, delta.y, delta.z);
    let newScale = downState.current.transformation.clone().add(scaledDelta);
    newScale.y = newScale.x / 2 * ratio;

    // enforce min/max size
    const newSizeX = newScale.x * view.current.size.v[0];
    if ((newSizeX < 100) || (newSizeX > 500)) {
      return;
    }

    view.current.setStyle({
      ...view.current.getStyle(),  // Preserve other styles
      ...{ transformScaleX: newScale.x, transformScaleY: newScale.y, transformScaleZ: newScale.z }
    });

    let deltaY = (handle.current.size.v[1] - (handle.current.size.v[1] * 1/newScale.y)) / 2;
    // ^-NOTE: (old width/height - new width/height) / 2 (because it grows/shrinks from both directions)

    // preserve size of handle and resize
    handle.current.setStyle({ transformTranslateY: -deltaY, transformScaleX: 1/newScale.x, transformScaleY: 1/newScale.y, transformScaleZ: 1/newScale.z });
    resize.current.setStyle({ transformScaleX: 1/newScale.x, transformScaleY: 1/newScale.y, transformScaleZ: 1/newScale.z });
  };

  return (
    <div
      style={{ backgroundColor: "lightblue", width: "100vw", height: "100vh" }}
    >
      <button onClick={enterVR}>Enter AR</button>
      <XRCanvas>
        <Root 
          height={100} width={200}
          flexDirection={"column"}
          ref={view}  
        >
          <Container
            height={"100%"} width={"100%"}
            backgroundColor={"green"}
          >
          </Container>
          <Container
            height={10} width={40}
            alignSelf={"center"}
            backgroundColor={"red"}
            borderRadius={8}
            ref={handle}
            onPointerDown={handleDragPointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handleDragPointerMove}
          >
          </Container>
          <Container
            height={10} width={10}
            backgroundColor={"blue"}
            alignSelf={"flex-end"}
            marginTop={-15}
            marginRight={-5}
            ref={resize}
            onPointerDown={handleResizePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handleResizePointerMove}
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