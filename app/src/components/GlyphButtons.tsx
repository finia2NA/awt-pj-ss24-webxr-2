import { useEffect, useState } from "react";

import captionsBubbleFillIcon from "../assets/glyphs/captions.bubble.fill.svg";
import chevronDownIcon from "../assets/glyphs/chevron.down.svg";
import gearIcon from "../assets/glyphs/gear.svg";
import heartFillIcon from "../assets/glyphs/heart.fill.svg";
import heartIcon from "../assets/glyphs/heart.svg";
import houseFillIcon from "../assets/glyphs/house.fill.svg";
import listBulletRectangleFillIcon from "../assets/glyphs/list.bullet.rectangle.fill.svg";
import listBulletIcon from "../assets/glyphs/list.bullet.svg";
import magnifyingglassIcon from "../assets/glyphs/magnifyingglass.svg";
import speakerFillIcon from "../assets/glyphs/speaker.fill.svg";
import speakerSlashFillIcon from "../assets/glyphs/speaker.slash.fill.svg";
import speakerWave1FillIcon from "../assets/glyphs/speaker.wave.1.fill.svg";
import speakerWave2FillIcon from "../assets/glyphs/speaker.wave.2.fill.svg";
import speakerWave3FillIcon from "../assets/glyphs/speaker.wave.3.fill.svg";
import tvFillIcon from "../assets/glyphs/tv.fill.svg";
import useDarkMode from "../hooks/useDarkmode";


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
  [ButtonType.Home, houseFillIcon],
  [ButtonType.Captions, captionsBubbleFillIcon],
  [ButtonType.ChevronDown, chevronDownIcon],
  [ButtonType.Settings, gearIcon],
  [ButtonType.Heart, heartIcon],
  [ButtonType.HeartFill, heartFillIcon],
  [ButtonType.ChannelList, listBulletIcon],
  [ButtonType.Guide, listBulletRectangleFillIcon],
  [ButtonType.Search, magnifyingglassIcon],
  [ButtonType.TV, tvFillIcon],
  [ButtonType.VolumeMuted, speakerSlashFillIcon],
  [ButtonType.Volume0, speakerFillIcon],
  [ButtonType.Volume1, speakerWave1FillIcon],
  [ButtonType.Volume2, speakerWave2FillIcon],
  [ButtonType.Volume3, speakerWave3FillIcon]
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

  const isDarkMode = useDarkMode();

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
          src={theSVGPath} alt="icon" />
      </div>
    </button>
  );
}

export default GlyphButton;