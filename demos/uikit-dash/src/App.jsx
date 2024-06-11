import {
  XRCanvas,
  Hands,
  Controllers,
  Grabbable
} from "@coconut-xr/natuerlich/defaults";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin
} from "@coconut-xr/natuerlich/react";
import { OrbitControls } from "@react-three/drei";
import { Root, Text } from "@react-three/uikit";
import { DashVideo } from "./components/custom/customVideo";

const sessionOptions = {
  requiredFeatures: ["local-floor", "hand-tracking"]
};

export default function Index() {
  const enterAR = useEnterXR("immersive-ar", sessionOptions);
  const enterVR = useEnterXR("immersive-vr", sessionOptions);
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
    <OrbitControls />
    <group position={[-2, 1, 1]}>
    <Root backgroundColor="red" sizeX={3} sizeY={2} flexDirection="row" borderRadius={6}>
      <Text>This cannot be dragged but clicked</Text>
      <DashVideo src={"https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd"} width={400}/>
    </Root>
    </group>
    <Grabbable position={[2, 1, 1]}>
    <Root backgroundColor="red" sizeX={3} sizeY={2} flexDirection="row">
      <Text>This can be dragged but as of now not clicked</Text>
      <DashVideo src={"https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd"} width={400}/>
    </Root>
    </Grabbable>
        <NonImmersiveCamera position={[0, 1.5, 4]} />
        <ImmersiveSessionOrigin position={[0, 0, 4]}>
          <Hands type="pointer" />
          <Controllers type="pointer" />
        </ImmersiveSessionOrigin>
      </XRCanvas>
    </div>
  );
}
