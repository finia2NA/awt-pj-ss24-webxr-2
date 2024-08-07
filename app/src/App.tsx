import { XR, XROrigin, createXRStore, useXRControllerState } from '@react-three/xr';
const rayOptions = { rayPointer: { cursorModel: { color: "blue", opacity: 1, size: 0.2 }, rayModel: { opacity: 0.7, maxLength: 5 } } };
const store = createXRStore({ controller: rayOptions, hand: rayOptions });

import { isXIntersection } from "@coconut-xr/xinteraction";

import { useState, useRef, useEffect, forwardRef } from 'react';
import { Canvas, GroupProps, ThreeEvent, useFrame } from "@react-three/fiber";
import { Root, Container, ComponentInternals } from "@react-three/uikit";

import { Group as ThreeGroup, Mesh, Vector3 } from "three";

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
import { Group } from '@react-three/uikit-lucide';



const sessionOptions = {
  requiredFeatures: ["local-floor", "hand-tracking"]
};

export default function App() {
  const cameraDistance = -3;

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
  }>();
  const movedParent = useRef<ThreeGroup>();
  const moveDistanceOffset = useRef(new Vector3(0, 0, 0));


  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (
      view.current != null &&
      downState.current == null
    ) {
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);

      downState.current = {
        pointerId: e.pointerId,
        point: e.point
      };
    }
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (downState.current?.pointerId != e.pointerId) {
      return;
    }
    downState.current = undefined;
    moveDistanceOffset.current.set(0, 0, 0);
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (
      handle.current == null ||
      view.current == null ||
      downState.current == null ||
      e.pointerId != downState.current.pointerId
    ) {
      return;
    }
    if (movedParent.current) {
      movedParent.current.position.copy(e.point.add(moveDistanceOffset.current));
      movedParent.current.setRotationFromQuaternion(e.pointer.intersection.pointerQuaternion);
    }


  };

  const Locomotion = (props: any) => {
    const controller = useXRControllerState('right')
    const ref = useRef<ThreeGroup>(null)
    useFrame((_, delta) => {
      if (ref.current == null || controller == null) {
        return
      }
      const thumstickState = controller.gamepad['xr-standard-thumbstick']
      if (thumstickState == null) {
        return
      }
      if (!downState.current || !movedParent.current) {
        return;
      }
      const moveAmount = (thumstickState.yAxis ?? 0) * delta * 10;
      const direction = new Vector3();
      controller.object?.getWorldDirection(direction);
      direction.multiplyScalar(moveAmount);
      moveDistanceOffset.current.add(direction);
    })
    return <XROrigin ref={ref} {...props} />
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
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <button onClick={() => store.enterVR()}>Enter VR</button>
      <Canvas>
        <XR store={store}>
          {/* <OrbitControls /> */}
          <group position={[0, 2, cameraDistance]} ref={movedParent}>
            <Root
              ref={view}
              sizeX={20} sizeY={3}
              transformTranslateX={route === Route.TV ? 210 : 0}
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
                    marginLeft={route === Route.TV ? -400 : 0}
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
          <Locomotion position={[0, 0, 4]} />
          <color attach="background" args={["#bfbebe"]} />
        </XR>
      </Canvas>
    </div>
  );
}