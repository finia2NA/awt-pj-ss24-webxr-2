import { Container } from "@react-three/uikit";
import ChannelNumber from "../components/PlaybackControls/ChannelNumber";
import PlaybackInfo from "../components/PlaybackControls/PlaybackInfo";
import { Card } from "../components/apfel/card";
import GlyphButton, { ButtonType } from "../components/GlyphButtons";


export interface PlaybackControllsProps {
  channel: number;
  // eslint-disable-next-line no-unused-vars
  setChannel: (channel: number) => void;
  channelImageSrc: string;
  channelTitle: string;
  channelDescription: string;
}

const PlaybackControlls = ({ channel, setChannel, channelImageSrc, channelTitle, channelDescription }: PlaybackControllsProps) => {
  return (
    <Card width={700} height={100} justifyContent={"space-around"} alignItems={"center"} paddingX={10}>
      <ChannelNumber channel={channel} setChannel={setChannel} />
      <PlaybackInfo imageSrc={channelImageSrc} title={channelTitle} description={channelDescription} />
      <Container gapColumn={10}>
        <GlyphButton type={ButtonType.ChannelList} />
        <GlyphButton type={ButtonType.Captions} />
        <GlyphButton type={ButtonType.Volume2} />
      </Container>
    </Card>
  )
}

export default PlaybackControlls;