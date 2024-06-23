import {
  XRCanvas,
  Hands,
  Controllers
} from "@coconut-xr/natuerlich/defaults";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin
} from "@coconut-xr/natuerlich/react";
import { isXIntersection } from "@coconut-xr/xinteraction";

import { useState, useRef } from 'react';
import { ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Root, Container, ComponentInternals } from "@react-three/uikit";

import { Vector3 } from "three";

import Tabs, { Tab } from "./components/Tabs";
import BottomBar from "./windows/BottomBar";
import Tv from './views/Tv';
import Home from './views/Home';


const sessionOptions = {
  requiredFeatures: ["local-floor", "hand-tracking"]
};

export default function App() {

  const [selectedTab, setSelectedTab] = useState(Tab.TV);

  const enterAR = useEnterXR("immersive-ar", sessionOptions);
  const enterVR = useEnterXR("immersive-vr", sessionOptions);

  const view = useRef<ComponentInternals>(null);
  const handle = useRef<ComponentInternals>(null);
  const tabs = useRef<ComponentInternals>(null);
  const downState = useRef<{
    pointerId: number;
    point: Vector3;
    position: Vector3;
  }>();

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
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
        position: pos
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

    let delta = e.point.sub(downState.current.point.clone())
    let scaledDelta = new Vector3(delta.x * scale, -delta.y * scale, delta.z * scale);
    let newPosition = downState.current.position.clone().add(scaledDelta);

    view.current.setStyle({
      ...view.current.getStyle(),  // Preserve other styles
      ...{ transformTranslateX: newPosition.x, transformTranslateY: newPosition.y, transformTranslateZ: newPosition.z }
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <button onClick={enterAR}>Enter AR</button>
      <button onClick={enterVR}>Enter VR</button>
      <XRCanvas>
        {/* <OrbitControls /> */}
        <group position={[0, 2, -3]}>
          <Root sizeX={20} sizeY={3} flexDirection="column" borderRadius={6} pixelSize={0.008}>
            <Container
              flexDirection="row"
              height={"auto"}
              alignSelf={"center"}
              
              ref={view} 
              transformTranslateX={0}
              transformTranslateY={0}
              transformTranslateZ={0}
            >
              <Container paddingRight={50} alignSelf={"center"}>
                <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
              </Container>
              <Container flexDirection={"column"} height={"auto"}>
                <Container height={"auto"}>
                  {selectedTab === Tab.HOME && <Home />}
                  {selectedTab === Tab.TV && <Tv />}
                </Container>
              </Container>
            </Container>
            <Container 
              alignSelf={"center"}
              alignItems={"center"}
              height={25}
              marginLeft={selectedTab == Tab.TV ? -100 : 0}
              
              ref={handle}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerMove={handlePointerMove}
            >
              <BottomBar />
            </Container>
          </Root>
        </group>
        <NonImmersiveCamera position={[0, 1.5, 4]} />
        <ImmersiveSessionOrigin position={[0, 0, 4]}>
          <Hands type="pointer" />
          <Controllers type="pointer" />
        </ImmersiveSessionOrigin>
      </XRCanvas>
    </div>
  );
}