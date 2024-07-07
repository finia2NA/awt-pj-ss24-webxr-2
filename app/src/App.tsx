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
import GuideView from "./views/GuideView";
import SettingsView from "./views/SettingsView";

import Environment from "./3D/Environment";
import useRoutingStore, { Route } from './hooks/useRoutingStore';

import KeyboardUI from "./components/KeyboardUI";
import useKeyboardStore from './hooks/useKeyboardStore.ts';


const sessionOptions = {
  requiredFeatures: ["local-floor", "hand-tracking"]
};

export default function App() {
  const enterAR = useEnterXR("immersive-ar", sessionOptions);
  const enterVR = useEnterXR("immersive-vr", sessionOptions);

  const { route, setRoute } = useRoutingStore();
  const [selectedTab, setSelectedTab] = useState(Tab.HOME);
  const handleTabSelection = (tab: Tab) => {
    if (tab === Tab.TV) {
      setRoute(Route.TV);
      setSelectedTab(Tab.TV);
    } else if (tab === Tab.GUIDE) {
      setRoute(Route.GUIDE);
      setSelectedTab(Tab.GUIDE);

    } else if (tab === Tab.SETTINGS) {
      setRoute(Route.SETTINGS);
      setSelectedTab(Tab.SETTINGS);
    } else {
      setRoute(Route.HOME);
      setSelectedTab(Tab.HOME);
    }
  }

  const { visible: keyboardVisible } = useKeyboardStore((state) => state);

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

  const shrinkTabsMargin = () => {
    if (tabs.current != null) {
      const tabsWidth = tabs.current.size.v[0];
      const currentMargin = tabs.current.getComputedProperty("marginRight") || 0;
      const newMargin = currentMargin - tabsWidth;
      tabs.current.setStyle({ marginRight: newMargin });
    }
  };

  const enlargeTabsMargin = () => {
    if (tabs.current != null) {
      tabs.current.setStyle({ marginRight: 50 });
    }
  }

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
          <Root ref={view} sizeX={20} sizeY={3} flexDirection="column" borderRadius={6} pixelSize={0.008}>
            <Container
              flexDirection="row"
              height={"auto"}
              alignSelf={"center"}
            >
              <Container
                marginRight={50}
                alignSelf={"center"}
                ref={tabs}
              >
                <Tabs setSelectedTab={handleTabSelection} /> 
              </Container>
              <Container flexDirection={"column"} height={"auto"}>
                <Container height={"auto"}>
                  {route === Route.HOME && <Home />}
                  {route === Route.TV && <Tv viewRef={view} handleRef={handle} tabsRef={tabs} />}
                  {route === Route.GUIDE && <GuideView viewRef={view} handleRef={handle} tabsRef={tabs} />}
                  {route === Route.SETTINGS && <SettingsView />}
                </Container>
              </Container>
            </Container>
            <Container
              alignSelf={"center"}
              alignItems={"center"}
              height={25}
              marginLeft={route === Route.TV ? -300 : 0}

              ref={handle}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerMove={handlePointerMove}
            >
              <BottomBar />
            </Container>
            {keyboardVisible && <Container 
              alignSelf={"center"}
              alignItems={"center"} 
              height={500} width={800}
              marginTop={30}
              transformRotateX={-20}
            >
              <KeyboardUI />
            </Container>}
          </Root>
        </group>
        <Environment immersionLevel={1} nightMode={false} />
        <NonImmersiveCamera position={[0, 1.5, 4]} />
        <ImmersiveSessionOrigin position={[0, 0, 4]}>
          <Hands type="pointer" />
          <Controllers type="pointer" />
        </ImmersiveSessionOrigin>
        <ambientLight intensity={2} />
        <pointLight position={[-3, 3, 0]} intensity={8} />

        {/* I'm using this stuff for color tuning and stuff - R */}
        {/* <axesHelper />
        <mesh position={[-3, 3, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color="red" />
        </mesh> */}
        {/* <gridHelper /> */}
        <color attach="background" args={["#bfbebe"]} />
      </XRCanvas>
    </div>
  );
}