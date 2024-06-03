import ChannelNumber from "../components/ChannelNumber";
import GlyphButton, { ButtonType } from "../components/GlyphButtons";
import PlaybackInfo from "../components/PlaybackInfo";
import XRWindow from "../components/XRWindow";


export interface PlaybackControllsProps {
  channel: number;
  // eslint-disable-next-line no-unused-vars
  setChannel: (channel: number) => void;
  channelImageSrc: string;
  channelTitle: string;
  channelDescription: string;
}

function PlaybackControlls({ channel, setChannel, channelImageSrc, channelTitle, channelDescription }: PlaybackControllsProps) {
  return (
    <XRWindow small>
      <div className="flex flex-row m-4 space-x-5">
        <ChannelNumber channel={channel} setChannel={setChannel} />
        <PlaybackInfo imageSrc={channelImageSrc} title={channelTitle} description={channelDescription} />
        <div className="flex flex-row h-fit">
          <GlyphButton type={ButtonType.ChannelList} />
          <GlyphButton type={ButtonType.Captions} />
          <GlyphButton type={ButtonType.Volume3} />
        </div>
      </div>
    </XRWindow>
  );
}

export default PlaybackControlls;