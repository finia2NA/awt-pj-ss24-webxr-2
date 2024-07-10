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

import Tabs from "./components/Tabs";
import BottomBar from "./windows/BottomBar";
import Tv from './views/Tv';
import Home from './views/Home';
import GuideView from "./views/GuideView";
import SettingsView from "./views/SettingsView";

import Environment from "./3D/Environment";
import useRoutingStore, { Route } from './hooks/useRoutingStore';

import KeyboardUI from "./components/KeyboardUI";
import useKeyboardStore from './hooks/useKeyboardStore.ts';
import useSettingsStore, { BiTheme, SettingsState } from "./hooks/useSettingsStore.ts";



const sessionOptions = {
  requiredFeatures: ["local-floor", "hand-tracking"]
};

export default function App() {
  const cameraDistance = -3;

  const enterAR = useEnterXR("immersive-ar", sessionOptions);
  const enterVR = useEnterXR("immersive-vr", sessionOptions);

  const [immersionLevel, setImmersionLevel] = useState(0);

  const { route, setRoute } = useRoutingStore();
  const { biTheme } = useSettingsStore((state) => state) as SettingsState;

  const handleTabSelection = (route: Route) => {
    setRoute(route);
  }

  const { visible: keyboardVisible } = useKeyboardStore((state) => state);

  const view = useRef<ComponentInternals>(null);
  const bar = useRef<ComponentInternals>(null);
  const handle = useRef<ComponentInternals>(null);
  const tabs = useRef<ComponentInternals>(null);
  const downState = useRef<{
    pointerId: number;
    point: Vector3;
    position: Vector3;
    rotation: Vector3;
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

      let rotX = view.current.getComputedProperty("transformRotateX") || 0;
      let rotY = view.current.getComputedProperty("transformRotateY") || 0;
      let rotZ = view.current.getComputedProperty("transformRotateZ") || 0;

      let rot = new Vector3(rotX, rotY, rotZ);

      downState.current = {
        pointerId: e.pointerId,
        point: e.point,
        position: pos,
        rotation: rot
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

    let delta = e.point.sub(downState.current.point.clone());
    let scaledDelta = new Vector3(delta.x * scale, -delta.y * scale, delta.z * scale);
    let newPosition = downState.current.position.clone().add(scaledDelta);

    const disCamera = Math.abs(cameraDistance);
    const scaleRot = 20;
    let rotY = downState.current.rotation.y - (delta.x * scaleRot / disCamera);
    let rotX = downState.current.rotation.x + (delta.y * scaleRot / disCamera);

    view.current.setStyle({
      ...view.current.getStyle(),  // Preserve other styles
      ...{
        transformTranslateX: newPosition.x, transformTranslateY: newPosition.y,
        transformRotateX: rotX, transformRotateY: rotY
      }
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
        <group position={[0, 2, cameraDistance]}>
          <Root
            ref={view}
            sizeX={20} sizeY={3}
            transformTranslateX={route === Route.TV ? 175 : 0}
            flexDirection="column"
            borderRadius={6}
            pixelSize={0.008}
          >
            <Container
              flexDirection="row"
              height={"auto"}
              alignSelf={"center"}
            >
              <Container
                marginRight={50}
                alignSelf={"center"}
                ref={tabs}
                marginTop={keyboardVisible ? -223 : 0}
              >
                <Tabs setSelectedRoute={handleTabSelection} selectedRoute={route} />
              </Container>
              <Container flexDirection={"column"} height={"auto"} alignItems={"center"}>
                <Container height={"auto"}>
                  {route === "HOME" && <Home />}
                  {route === "TV" && <Tv viewRef={view} handleRef={bar} tabsRef={tabs} />}
                  {route === "GUIDE" && <GuideView viewRef={view} handleRef={handle} tabsRef={tabs} />}
                  {route === "SETTINGS" && <SettingsView />}
                </Container>
            <Container
              ref={bar}
              alignSelf={"center"}
              alignItems={"center"}
              height={25}
              marginLeft={route === Route.TV ? -300 : 0}
            >
              <BottomBar
                environmentControls={true}
                setEnvironmentValue={setImmersionLevel}
                environmentValue={immersionLevel}
                handleReference={handle}
                dragHandlers={{
                  onPointerDown: handlePointerDown,
                  onPointerUp: handlePointerUp,
                  onPointerMove: handlePointerMove

                }}
              />
            </Container>
            {keyboardVisible && <Container
              alignSelf={"center"}
              alignItems={"center"}
              marginTop={30}
              transformRotateX={-20}
            >
              <KeyboardUI />
            </Container>}
            </Container>
            </Container>
          </Root>
        </group>
        <Environment immersionLevel={immersionLevel} nightMode={biTheme === BiTheme.DARK} />
        <NonImmersiveCamera position={[0, 1.5, 4]} />
        <ImmersiveSessionOrigin position={[0, 0, 4]}>
          <Hands type="pointer" />
          <Controllers type="pointer" />
        </ImmersiveSessionOrigin>

        <color attach="background" args={["#bfbebe"]} />
      </XRCanvas>
    </div>
  );
}