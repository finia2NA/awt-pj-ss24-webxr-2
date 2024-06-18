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

import { useState } from 'react';
import { OrbitControls } from "@react-three/drei";
import { Root, Container } from "@react-three/uikit";

import Tabs, { Tab } from "./components/Tabs";
import BottomBar from "./windows/BottomBar";
import Tv from './views/Tv';
import Home from './views/Home';


const sessionOptions = {
  requiredFeatures: ["local-floor", "hand-tracking"]
};

export default function Index() {
  const [selectedTab, setSelectedTab] = useState(Tab.TV);

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
        <group position={[5.5, 2, -3]}>
          <Root sizeX={20} sizeY={3} flexDirection="row" borderRadius={6} pixelSize={0.008}>
            <Container paddingRight={50} alignSelf={"center"}>
              <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            </Container>
            <Container flexDirection={"column"} height={"auto"}>
              <Container height={"auto"}>
                {selectedTab === Tab.HOME && <Home />}
                {selectedTab === Tab.TV && <Tv />}
              </Container>
              <Container alignSelf={"center"} marginTop={10} marginLeft={-280}>
                <BottomBar />
              </Container>
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