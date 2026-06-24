import { XR, XROrigin, createXRStore, useXRControllerState } from '@react-three/xr';
const rayOptions = { rayPointer: { cursorModel: { color: "blue", opacity: 1, size: 0.2 }, rayModel: { opacity: 0.7, maxLength: 5 } } };
const store = createXRStore({ controller: rayOptions, hand: rayOptions });

import { useState, useRef } from 'react';
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { Root, Container, ComponentInternals } from "@react-three/uikit";

import { Group as ThreeGroup, Vector3 } from "three";

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
import useSettingsStore, { BiTheme, MovementMode, SettingsState } from "./hooks/useSettingsStore.ts";

const getNumberProperty = (value: unknown, fallback = 0) =>
  typeof value === "number" ? value : fallback;


/**
 * The main application component.
 * It contains the main structure of the application and handles the routing between different views.
 * Basically the entry point of the application that contains everything.
 */
export default function App() {
  const cameraDistance = -3;

  const [immersionLevel, setImmersionLevel] = useState(0);

  const { route, setRoute } = useRoutingStore();
  const { biTheme, movementMode } = useSettingsStore((state) => state) as SettingsState;

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
  const groupRef = useRef<ThreeGroup>();
  const moveDistanceOffset = useRef(new Vector3(0, 0, 0));


  /**
   * Setup everything upon pointer down event.
   * This includes capturing the pointer, setting the initial position and rotation of the view to be used in pointer move.
   */
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (
      view.current != null &&
      downState.current == null
    ) {
      console.log("Also here");
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);

      let x = getNumberProperty(view.current.getComputedProperty("transformTranslateX"));
      let y = getNumberProperty(view.current.getComputedProperty("transformTranslateY"));
      let z = getNumberProperty(view.current.getComputedProperty("transformTranslateZ"));

      let pos = new Vector3(x, y, z);

      let rotX = getNumberProperty(view.current.getComputedProperty("transformRotateX"));
      let rotY = getNumberProperty(view.current.getComputedProperty("transformRotateY"));
      let rotZ = getNumberProperty(view.current.getComputedProperty("transformRotateZ"));

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
    moveDistanceOffset.current.set(0, 0, 0);
  };

  /**
   * Handles the pointer move event, so that the view can be moved around.
   */
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (
      handle.current == null ||
      view.current == null ||
      downState.current == null ||
      e.pointerId != downState.current.pointerId
    ) {
      return;
    }
    // Decide which movement mode to use from the settings
    if (movementMode === MovementMode.CURSOR_BASED) {
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
    } else if (movementMode === MovementMode.CONTROLLER_BASED && groupRef.current) {
      groupRef.current.position.copy(e.point.add(moveDistanceOffset.current));
      groupRef.current.setRotationFromQuaternion((e.pointer as any).intersection.pointerQuaternion);
    }
  };

  /**
   * Component that returns the XROrigin but enables using the controller in various ways.
   * Currently only used for moving the window closer or further away when moving it around
   * with the controller.
   */
  const Locomotion = (props: any) => {
    // Get the controller state for the right controller
    const controller = useXRControllerState('right');
    // If we want to reference the XROrigin later
    const ref = useRef<ThreeGroup>(null);

    // Called every frame, including delta
    // Mainly useful for controller input because of that
    useFrame((_, delta) => {
      // Make sure everything is available
      if (ref.current == null || controller == null) {
        return
      }
      // Get the thumbstick state from the controller
      const thumstickState = controller.gamepad['xr-standard-thumbstick']
      if (thumstickState == null) {
        return
      }
      if (!downState.current || !groupRef.current) {
        return;
      }
      // Calculate the amount to move based on the thumbstick state
      const moveAmount = (thumstickState.yAxis ?? 0) * delta * 10;
      const direction = new Vector3();
      // Make sure we're moving in the right direction
      // FIXME: This can be problematic and the vector often doesn't align perfectly.
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: 8,
          background: "rgba(255, 255, 255, 0.86)",
          color: "#222",
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
          lineHeight: 1.35,
          zIndex: 1
        }}
      >
        <button onClick={() => store.enterAR()}>Enter AR</button>
        <button onClick={() => store.enterVR()}>Enter VR</button>
        <span>
          Note: because publicly available DVB-I data is imperfect and many streams are geoblocked,
          several channels may not play. Please try a few; channels 53 and 54 are recommended.
        </span>
      </div>
      {/* localClippingEnabled is required for images to be able to be cut off, 
      e.g. when being partially visible while scrolling*/}
      <Canvas gl={{ localClippingEnabled: true }}> 
        <XR store={store}>
          {/* <OrbitControls /> */}
          <group position={[0, 2, cameraDistance]} ref={groupRef}>
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
                    {route === "TV" && <Tv viewRef={view} />}
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
