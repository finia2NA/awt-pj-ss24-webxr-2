import { useEffect, useState } from "react";

import CaptionsBubbleFillIcon from "../assets/glyphs/captions.bubble.fill.svg";
import ChevronDownIcon from "../assets/glyphs/chevron.down.svg";
import GearIcon from "../assets/glyphs/gear.svg";
import HeartFillIcon from "../assets/glyphs/heart.fill.svg";
import HeartIcon from "../assets/glyphs/heart.svg";
import HouseFillIcon from "../assets/glyphs/house.fill.svg";
import ListBulletRectangleFillIcon from "../assets/glyphs/list.bullet.rectangle.fill.svg";
import ListBulletIcon from "../assets/glyphs/list.bullet.svg";
import MagnifyingglassIcon from "../assets/glyphs/magnifyingglass.svg";
import SpeakerFillIcon from "../assets/glyphs/speaker.fill.svg";
import SpeakerSlashFillIcon from "../assets/glyphs/speaker.slash.fill.svg";
import SpeakerWave1FillIcon from "../assets/glyphs/speaker.wave.1.fill.svg";
import SpeakerWave2FillIcon from "../assets/glyphs/speaker.wave.2.fill.svg";
import SpeakerWave3FillIcon from "../assets/glyphs/speaker.wave.3.fill.svg";
import TvFillIcon from "../assets/glyphs/tv.fill.svg";


// This is how you would get the colors from the tailwind config
// import resolveConfig from "tailwindcss/resolveConfig";
// import tailwindConfig from "../../tailwind.config";
// const fullConfig = resolveConfig(tailwindConfig);
// const colors = fullConfig.theme.colors;

// Disabling eslint things bc it says this is not used but.. it is? in this file? And it's exported? tslint is tripping.
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonType {
  Home,
  Captions,
  ChevronDown,
  Settings,
  Heart,
  HeartFill,
  ChannelList,
  Guide,
  Search,
  TV,
  VolumeMuted,
  Volume0,
  Volume1,
  Volume2,
  Volume3
}

const buttonIcons = new Map<ButtonType, string>([
  [ButtonType.Home, HouseFillIcon],
  [ButtonType.Captions, CaptionsBubbleFillIcon],
  [ButtonType.ChevronDown, ChevronDownIcon],
  [ButtonType.Settings, GearIcon],
  [ButtonType.Heart, HeartIcon],
  [ButtonType.HeartFill, HeartFillIcon],
  [ButtonType.ChannelList, ListBulletIcon],
  [ButtonType.Guide, ListBulletRectangleFillIcon],
  [ButtonType.Search, MagnifyingglassIcon],
  [ButtonType.TV, TvFillIcon],
  [ButtonType.VolumeMuted, SpeakerSlashFillIcon],
  [ButtonType.Volume0, SpeakerFillIcon],
  [ButtonType.Volume1, SpeakerWave1FillIcon],
  [ButtonType.Volume2, SpeakerWave2FillIcon],
  [ButtonType.Volume3, SpeakerWave3FillIcon]
]);

// eslint-disable-next-line react-refresh/only-export-components
/**
 * Props for the GlyphButton component.
 */
export interface GlyphButtonProps {
  /**
   * The type of button.
   */
  type: ButtonType;

  /**
   * Indicates if the button is active.
   */
  active?: boolean;

  /**
   * Indicates if the button is disabled.
   */
  disabled?: boolean;

  /**
   * The click event handler for the button.
   */
  onClick?: () => void;
  /**
   * Custom styles for the button.
   */
  customStyle?: string;
  /**
   * Whether to ignore the animation when the button is rendered.
   * This means that the button is always there and doesn't fade in.
   */
  ignoreAnimation?: boolean;
}


const GlyphButton = (props: GlyphButtonProps) => {
  const { active, disabled, onClick } = props;

  // Handle dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    // Immediately set dark mode based on the media query
    setIsDarkMode(mediaQuery.matches);

    // Define a function to handle changes in the media query
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };
    mediaQuery.addListener(handleChange);

    // Clean up the event listener when the component unmounts
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const theSVGPath = buttonIcons.get(props.type);

  return (
    <button className={`
    bg-uiElem dark:bg-dark-uiElem
    rounded-full p-2
    text-center
    focus:outline-none
    animate-[appear_150ms_cubic-bezier(0.4,_0,_0.2,_1)_300ms_forwards]
    ${props.ignoreAnimation ? 'opacity-100' : 'opacity-0'}
    hover:border-primary hover:dark:border-dark-primary
    hover:scale-105 transition-all
    ${props.customStyle}
    duration-300 ease-in-out
    ${active ? 'border-2 border-primary dark:border-dark-primary' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
      onClick={disabled ? undefined : onClick}
    >
      <div className="w-6 h-6 items-center justify-center flex">
        <img
          // NOTE: This hardcodes the color values for dark and light mode. I have not found a way to arbitrarily change the color of the SVGs when loaded in the image tag.
          style={{
            WebkitFilter: isDarkMode ? 'invert(1)' : 'invert(0)',
            filter: isDarkMode ? 'invert(1)' : 'invert(0)'
          }}
          src={theSVGPath} alt="icon"/>
      </div>
    </button>
  );
}

export default GlyphButton;