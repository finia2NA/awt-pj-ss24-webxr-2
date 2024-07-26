/* eslint-disable no-unused-vars */
import { Container } from "@react-three/uikit";
import ChannelNumber from "../components/PlaybackControls/ChannelNumber";
import PlaybackInfo from "../components/PlaybackControls/PlaybackInfo";
import { Card } from "../components/apfel/card";
import GlyphButton, { ButtonType } from "../components/GlyphButtons";

/**
 * PlaybackControlsProps defines the properties for the PlaybackControls component.
 */
export interface PlaybackControlsProps {
  // Info
  channelImageSrc?: string; // Source URL for the channel image.
  channelTitle: string; // Title of the channel.
  channelDescription: string; // Description of the channel.

  // Channel control
  channel: number; // Current channel number.
  setChannel?: (channel: number) => void; // Function to set the current channel.

  // Play/Pause control
  isPlaying: boolean; // Indicates if the playback is currently playing.
  togglePlayPause?: () => void; // Function to toggle play/pause state.

  isMuted?: boolean; // Indicates if the playback is currently muted.
  toggleMute?: () => void; // Function to toggle mute state.

  // Toggle channel list
  toggleChannelList?: () => void; // Function to toggle the visibility of the channel list.

  // Captions
  captionsAvailable?: boolean; // Indicates if captions are available.
  toggleCaptions?: () => void; // Function to toggle captions.

  // Tuning
  tuneUpDown?: (direction: number) => void; // Function to tune up or down the channel.
}

/**
 * PlaybackControls component renders the UI controls for playback, including channel number,
 * playback info, play/pause button, channel list toggle, captions toggle, and volume control.
 * 
 * @param {PlaybackControlsProps} props - The properties for the PlaybackControls component.
 * @returns {JSX.Element} The rendered PlaybackControls component.
 */
const PlaybackControls = ({
  channel,
  tuneUpDown,
  togglePlayPause,
  toggleChannelList,
  captionsAvailable,
  toggleCaptions,
  channelImageSrc,
  channelTitle,
  channelDescription,
  isPlaying,
  toggleMute,
  isMuted
}: PlaybackControlsProps): JSX.Element => {

  return (
    <Card
      height={80}
      justifyContent={"space-around"}
      alignItems={"center"}
      paddingX={22}
      gap={10}
      alignSelf={"flex-start"}
    >
      <ChannelNumber channel={channel} tuneUpDown={tuneUpDown} />
      <PlaybackInfo imageSrc={channelImageSrc} title={channelTitle} description={channelDescription} />

      <Container gapColumn={8}>
        <GlyphButton type={isPlaying ? ButtonType.Pause : ButtonType.Play} onClick={togglePlayPause} />
        <GlyphButton type={ButtonType.ChannelList} onClick={toggleChannelList} />
        {captionsAvailable && <GlyphButton type={ButtonType.Captions} onClick={toggleCaptions} />}
        <GlyphButton type={isMuted ? ButtonType.VolumeMuted : ButtonType.Volume2} onClick={toggleMute} />
      </Container>
    </Card>
  );
}

export default PlaybackControls;
