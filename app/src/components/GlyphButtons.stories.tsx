import type { Meta, StoryObj } from '@storybook/react';
import GlyphButton from './GlyphButtons'
import { ButtonType } from './GlyphButtons';

const meta = {
  title: 'Components/GlyphButtons',
  component: GlyphButton,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    type: ButtonType.ChevronDown,
  },
} as Meta<typeof GlyphButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};


export const HomeButton: Story = {
  args: {
    type: ButtonType.Home,
  },
};

export const CaptionsButton: Story = {
  args: {
    type: ButtonType.Captions,
  },
};

export const ChevronDownButton: Story = {
  args: {
    type: ButtonType.ChevronDown,
  },
};

export const SettingsBUtton: Story = {
  args: {
    type: ButtonType.Settings,
  },
};

export const HeartButton: Story = {
  args: {
    type: ButtonType.Heart,
  },
};

export const HeartFillButton: Story = {
  args: {
    type: ButtonType.HeartFill,
  },
};

export const ChannelListButton: Story = {
  args: {
    type: ButtonType.ChannelList,
  },
};

export const GuideButton: Story = {
  args: {
    type: ButtonType.Guide,
  },
};

export const SearchBUtton: Story = {
  args: {
    type: ButtonType.Search,
  },
};


export const TVButton: Story = {
  args: {
    type: ButtonType.TV,
  },
};

export const VolumeMutedButton: Story = {
  args: {
    type: ButtonType.VolumeMuted,
  },
};

export const Volume0Button: Story = {
  args: {
    type: ButtonType.Volume0,
  },
};


export const Volume1Button: Story = {
  args: {
    type: ButtonType.Volume1,
  },
};

export const Volume2FillButton: Story = {
  args: {
    type: ButtonType.Volume2,
  },
};

export const Volume3FillButton: Story = {
  args: {
    type: ButtonType.Volume3,
  },
};