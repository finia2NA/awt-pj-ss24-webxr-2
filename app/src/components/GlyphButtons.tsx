import { Button } from "./apfel/button";

import { ChevronDownIcon, Tv2Icon, HomeIcon, CaptionsIcon, SettingsIcon, HeartIcon, ListIcon, LayoutListIcon, SearchIcon, VolumeXIcon, VolumeIcon, Volume1Icon, Volume2Icon } from "@react-three/uikit-lucide";
import HeartFilledIcon from "../assets/HeartFilledIcon";

import { ReactElement } from "react";


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
}

const buttonIcons = new Map<ButtonType, ReactElement>([
  [ButtonType.Home, <HomeIcon />],
  [ButtonType.Captions, <CaptionsIcon />],
  [ButtonType.ChevronDown, <ChevronDownIcon />],
  [ButtonType.Settings, <SettingsIcon />],
  [ButtonType.Heart, <HeartIcon />],
  [ButtonType.HeartFill, <HeartFilledIcon />], // TODO: check the correctness of the SVG
  [ButtonType.ChannelList, <ListIcon />],
  [ButtonType.Guide, <LayoutListIcon />],
  [ButtonType.Search, <SearchIcon />],
  [ButtonType.TV, <Tv2Icon />],
  [ButtonType.VolumeMuted, <VolumeXIcon />],
  [ButtonType.Volume0, <VolumeIcon />],
  [ButtonType.Volume1, <Volume1Icon />],
  [ButtonType.Volume2, <Volume2Icon />],
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
  return (
    <Button variant="icon" size="md" platter disabled={disabled} onClick={onClick} selected={active}>
      {icon}
    </Button >
  )
}

export default GlyphButton;