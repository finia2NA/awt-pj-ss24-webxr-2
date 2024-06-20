import { Container } from "@react-three/uikit";
import ChannelNumber from "../components/PlaybackControls/ChannelNumber";
import PlaybackInfo from "../components/PlaybackControls/PlaybackInfo";
import { Card } from "../components/apfel/card";
import GlyphButton, { ButtonType } from "../components/GlyphButtons";


export interface PlaybackControlsProps {
  channel: number;
  // eslint-disable-next-line no-unused-vars
  setChannel: (channel: number) => void;
  togglePlayPause: () => void;
  toggleChannelList: () => void;
  toggleCaptions: () => void;
  channelImageSrc: string;
  channelTitle: string;
  channelDescription: string;
  isPlaying: boolean;
}

const PlaybackControls = ({ channel, setChannel, togglePlayPause, toggleChannelList, toggleCaptions, channelImageSrc, channelTitle, channelDescription, isPlaying }: PlaybackControlsProps) => {
  return (
    <Card
      height={80}
      justifyContent={"space-around"}
      alignItems={"center"}
      paddingX={22}
      gap={10}
      alignSelf={"flex-start"}>

      <ChannelNumber channel={channel} setChannel={setChannel} />
      <PlaybackInfo imageSrc={channelImageSrc} title={channelTitle} description={channelDescription} />

      <Container gapColumn={8}>
        <GlyphButton type={isPlaying ? ButtonType.Pause : ButtonType.Play} onClick={togglePlayPause} />
        <GlyphButton type={ButtonType.ChannelList} onClick={toggleChannelList} />
        <GlyphButton type={ButtonType.Captions} onClick={toggleCaptions} />
        <GlyphButton type={ButtonType.Volume2} />
      </Container>

    </Card>
  )
}

export default PlaybackControls;