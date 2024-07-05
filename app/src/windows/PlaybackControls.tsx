import { Container } from "@react-three/uikit";
import ChannelNumber from "../components/PlaybackControls/ChannelNumber";
import PlaybackInfo from "../components/PlaybackControls/PlaybackInfo";
import { Card } from "../components/apfel/card";
import GlyphButton, { ButtonType } from "../components/GlyphButtons";


export interface PlaybackControlsProps {
  // Info
  channelImageSrc: string;
  channelTitle: string;
  channelDescription: string;

  // Channel control
  channel: number;
  // eslint-disable-next-line no-unused-vars
  setChannel?: (channel: number) => void;

  // Play/Pause control
  isPlaying: boolean;
  togglePlayPause?: () => void;

  isMuted?: boolean;
  toggleMute?: () => void;

  // Toggle channel list
  toggleChannelList?: () => void;

  // captions
  captionsAvailable?: boolean;
  toggleCaptions?: () => void;

  // tuning
  // eslint-disable-next-line no-unused-vars
  tuneUpDown?: (direction: number) => void;

}

const PlaybackControls = ({ channel, tuneUpDown, togglePlayPause, toggleChannelList, captionsAvailable, toggleCaptions, channelImageSrc, channelTitle, channelDescription, isPlaying, toggleMute, isMuted }: PlaybackControlsProps) => {
  return (
    <Card
      height={80}
      justifyContent={"space-around"}
      alignItems={"center"}
      paddingX={22}
      gap={10}
      alignSelf={"flex-start"}>

      <ChannelNumber channel={channel} tuneUpDown={tuneUpDown} />
      <PlaybackInfo imageSrc={channelImageSrc} title={channelTitle} description={channelDescription} />

      <Container gapColumn={8}>
        <GlyphButton type={isPlaying ? ButtonType.Pause : ButtonType.Play} onClick={togglePlayPause} />
        <GlyphButton type={ButtonType.ChannelList} onClick={toggleChannelList} />
        {captionsAvailable && <GlyphButton type={ButtonType.Captions} onClick={toggleCaptions} />}
        <GlyphButton type={isMuted ? ButtonType.VolumeMuted : ButtonType.Volume2} onClick={toggleMute} />
      </Container>

    </Card>
  )
}

export default PlaybackControls;