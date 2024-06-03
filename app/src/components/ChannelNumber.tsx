import UIElement from "./UIElement";

export interface ChannelNumberProps {
  channel: number;
  // eslint-disable-next-line no-unused-vars
  setChannel: (channel: number) => void;
}

function ChannelNumber({ channel, setChannel }: ChannelNumberProps) {
  return (
    <UIElement className="pl-0 pr-0 py-0">
      <div className="flex flex-row items-center text-center">
        <span className="text-2xl font-medium w-9 px-2">{channel}</span>

        <UIElement noRound className="w-6 pl-0 pr-0 py-0">
          <div className="flex flex-col text-center py-1 space-y-1 font-mono">
            {/* TODO: maybe make the spans actual html buttons,
            expand clickable area of buttons to while shape above/below line */}
            <span
              onClick={() => setChannel(channel + 1)}
              className="cursor-pointer"
            >
              ▲
            </span>
            <hr className="border-primary dark:border-dark-primary" />
            <span
              onClick={() => setChannel(channel - 1)}
              className="cursor-pointer"
            >
              ▼
            </span>
          </div>
        </UIElement>
      </div>
    </UIElement>
  );
}

export default ChannelNumber;