import { Container, Text } from "@react-three/uikit";
import { Card } from "../components/apfel/card";
import GlyphButton, { ButtonType } from "../components/GlyphButtons";
import TextInput from "../components/TextInput";
import { useState } from "react";
import useKeyboardStore from "../hooks/useKeyboardStore.ts";
import useCurrentTime from "../hooks/useCurrentTime.ts";
import useRecentChannelsStore from "../hooks/useRecentChannelsStore.ts";
import useHeartedChannelsStore from "../hooks/useHeartedChannelsStore.ts";
import HomeSection from "../components/Home/HomeSection.tsx";



const HomeWindow = () => {

  const [searchString, setSearchString] = useState("")
  const { toggleVisibility: toggleKeyboard } = useKeyboardStore();
  const timeString = useCurrentTime();

  const { recentChannels } = useRecentChannelsStore();
  const { heartedChannels } = useHeartedChannelsStore();

  return (
    <Card alignSelf={"flex-start"} padding={10} flexDirection={"column"} gap={10}>

      {/* Top Layout */}
      <Container justifyContent={"space-between"} width={480}>
        {/* Searching */}
        <Container>
          <GlyphButton type={ButtonType.Search} onClick={toggleKeyboard} />
          <TextInput placeholder="Search Channels" value={searchString} setValue={setSearchString} />
        </Container>
        {/* Time */}
        <Text>{timeString}</Text>
      </Container>

      {/* Content Layout */}
      <Container marginX={20} flexDirection={"column"} gap={14}>
        {
          heartedChannels.size > 0 &&
          <HomeSection title="Your Favorite Channels" channels={[]} />
        }
        {
          recentChannels.length > 0 &&
          <HomeSection title="Recently watched channels" channels={[]} />
        }

      </Container>
    </Card>
  );
}

export default HomeWindow;