import { Button } from "./apfel/button";
import { Text, Image, Container, DefaultProperties } from '@react-three/uikit'



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
  Play,
  Pause
}

import { ChevronDownIcon, Tv2Icon, HomeIcon, CaptionsIcon, SettingsIcon, HeartIcon, ListIcon, LayoutListIcon, SearchIcon, VolumeXIcon, VolumeIcon, Volume1Icon, Volume2Icon, Pause, Play } from "@react-three/uikit-lucide";

import { ReactElement } from "react";
import useColors from "../hooks/useColors";

const buttonIcons = new Map<ButtonType, ReactElement>([
  [ButtonType.Home, <HomeIcon />],
  [ButtonType.Captions, <CaptionsIcon />],
  [ButtonType.ChevronDown, <ChevronDownIcon />],
  [ButtonType.Settings, <SettingsIcon />],
  [ButtonType.Heart, <HeartIcon />],
  [ButtonType.HeartFill, <HeartIcon />], // TODO
  [ButtonType.ChannelList, <ListIcon />],
  [ButtonType.Guide, <LayoutListIcon />],
  [ButtonType.Search, <SearchIcon />],
  [ButtonType.TV, <Tv2Icon />],
  [ButtonType.VolumeMuted, <VolumeXIcon />],
  [ButtonType.Volume0, <VolumeIcon />],
  [ButtonType.Volume1, <Volume1Icon />],
  [ButtonType.Volume2, <Volume2Icon />],
  [ButtonType.Play, <Play />],
  [ButtonType.Pause, <Pause />]
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
}

const GlyphButton = (props: GlyphButtonProps) => {
  const { type, active, disabled, onClick } = props;
  const icon = buttonIcons.get(type);

  const colors = useColors();

  return (
    <Button variant="icon" size="md" alignSelf={"center"} platter disabled={disabled} onClick={onClick} selected={active} backgroundColor={colors.background} backgroundOpacity={colors.backgroundOpacity}>
      {icon}
    </Button >
  )
}

export default GlyphButton;