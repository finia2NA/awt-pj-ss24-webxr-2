import { Container, Text } from "@react-three/uikit";
import { Card } from "../components/apfel/card";
import GlyphButton, { ButtonType } from "../components/GlyphButtons";
import TextInput from "../components/TextInput";
import { useState } from "react";
import useKeyboardStore from "../hooks/useKeyboardStore.ts";
import useCurrentTime from "../hooks/useCurrentTime.ts";
import HomeSection from "../components/Home/HomeSection.tsx";
import { HomeRecommendationProps } from "../components/Home/HomeRecommendation.tsx";


interface HomeWindowProps {
  loading?: boolean;
  hearted: HomeRecommendationProps[];
  recent: HomeRecommendationProps[];
}

const HomeWindow = ({ loading, hearted, recent }: HomeWindowProps) => {

  const [searchString, setSearchString] = useState("")
  const { toggleVisibility: toggleKeyboard } = useKeyboardStore();
  const timeString = useCurrentTime();

  return (
    <Card alignSelf={"flex-start"} paddingY={14} paddingX={10} flexDirection={"column"} gap={20} maxWidth={600}>
      {/* Top Layout */}
      <Container justifyContent={"space-between"} marginX={10}>
        {/* Searching */}
        <Container>
          <GlyphButton type={ButtonType.Search} onClick={toggleKeyboard} />
          <TextInput placeholder="Search Channels" value={searchString} setValue={setSearchString} />
        </Container>
        {/* Time */}
        <Text>{timeString}</Text>
      </Container>

      {/* Loading Layout */}
      {loading &&
        <Container margin={100}>
          <Text fontSize={20}> Loading...</Text>
        </Container >
      }

      {/* Content Layout */}
      {
        !loading &&
        <Container marginY={10} marginX={20} flexDirection={"column"} gap={20}>
          <HomeSection title="Your Favorite Channels" channels={hearted} altText="Heart Channels to display them here" />
          <HomeSection title="Recently watched channels" channels={recent} altText="Watch Channels to display them here" />
        </Container>
      }
    </Card >
  );
}

export default HomeWindow;