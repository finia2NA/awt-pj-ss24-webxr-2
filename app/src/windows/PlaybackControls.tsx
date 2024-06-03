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

  console.log(channelImageSrc);

  return (
    <XRWindow small className="pt-2 pb-2">
      <div className="flex flex-row mx-14 space-x-4 items-center">
        <ChannelNumber channel={channel} setChannel={setChannel} />
        <PlaybackInfo imageSrc={channelImageSrc} title={channelTitle} description={channelDescription} />
        <div className="flex flex-row h-fit space-x-1">
          <GlyphButton type={ButtonType.ChannelList} />
          <GlyphButton type={ButtonType.Captions} />
          <GlyphButton type={ButtonType.Volume3} />
        </div>
      </div>
    </XRWindow>
  );
}

export default PlaybackControlls;