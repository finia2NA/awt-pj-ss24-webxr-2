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
import { OrbitControls } from "@react-three/drei";
import { Root, Container } from "@react-three/uikit";
import DashPlayer from "./components/DashPlayer";
import { ProgramList, ProgramItem } from "./windows/ProgramList"
import Tabs, {Tab} from "./components/Tabs";
import { useState } from 'react';

const sessionOptions = {
  requiredFeatures: ["local-floor", "hand-tracking"]
};

export default function Index() {
  const [isPlaying, setIsPlaying] = useState(true);

  const programs = [
    {
      title: "Big Buck Bunny",
      src: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
      selected: true
    },
    {
      title: "Elephants Dream",
      src: "https://vod-dash-ww-rd-live.akamaized.net/elephants_dream/1/client_manifest-all.mpd",
      selected: false
    },
    {
      title: "Sintel",
      src: "https://bitdash-a.akamaihd.net/content/sintel/sintel.mpd",
      selected: false
    }
  ];

  const [dashPlayerSrc, setDashPlayerSrc] = useState(programs[0].src);
  const [programSelected, setProgramSelected] = useState(true);

  const handleItemClick = (item: ProgramItem) => {
      setDashPlayerSrc(item.src); // Assuming each ProgramItem has a 'src' property
      setProgramSelected(true);
  };

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
        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      </Container>
      <DashPlayer src={dashPlayerSrc} width={900} playing={isPlaying}/>
      <Container alignSelf={"center"} paddingLeft={50}>
        <ProgramList items={programs} onItemClick={handleItemClick} />
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
