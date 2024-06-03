import UIElement from "./UIElement";

interface PlaybackInfoProps {
  imageSrc: string;
  title: string;
  description: string;
}

function PlaybackInfo({ imageSrc, title, description }: PlaybackInfoProps) {
  return (
    // TODO: right now, the text is centered in the text div, and not in the whole component
    <UIElement roundTop roundBottom className="py-2">
      <div className="flex flex-row items-center">
        <div className="h-full">
          <img src={imageSrc} alt={title} />
        </div>
        <div className="flex flex-col text-center w-full">
          <span className="text-lg font-normal">{title}</span>
          <span className="text-xl font-medium">{description}</span>
        </div>
      </div>
    </UIElement>
  );
}

export default PlaybackInfo;
