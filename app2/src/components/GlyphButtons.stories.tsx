import type { Meta, StoryObj } from '@storybook/react';
import GlyphButton from './GlyphButtons'
import { ButtonType } from './GlyphButtons';
import StoryHelper from './StoryHelper';

const meta = {
  title: 'Components/GlyphButtons',
  component: GlyphButton,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    type: ButtonType.ChevronDown,
    onClick: () => { console.log("hi!") },
  },
} as Meta<typeof GlyphButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderWrapped = (args: any) => {
  return (
    <StoryHelper>
      <GlyphButton {...args} />
    </StoryHelper>
  );
}

export const Default: Story = {
  render: (args) => renderWrapped(args)
};


export const HomeButtonActive: Story = {
  args: {
    type: ButtonType.Home,
    active: true,
  },render: (args) => renderWrapped(args)
};

export const CaptionsButtonDisabled: Story = {
  args: {
    type: ButtonType.Captions,
    disabled: true,
  },render: (args) => renderWrapped(args)
};

export const ChevronDownButton: Story = {
  args: {
    type: ButtonType.ChevronDown,
  },render: (args) => renderWrapped(args)
};

export const SettingsBUtton: Story = {
  args: {
    type: ButtonType.Settings,
  },render: (args) => renderWrapped(args)
};

export const HeartButton: Story = {
  args: {
    type: ButtonType.Heart,
  },render: (args) => renderWrapped(args)
};

export const HeartFillButton: Story = {
  args: {
    type: ButtonType.HeartFill,
  },render: (args) => renderWrapped(args)
};

export const ChannelListButton: Story = {
  args: {
    type: ButtonType.ChannelList,
  },render: (args) => renderWrapped(args)
};

export const GuideButton: Story = {
  args: {
    type: ButtonType.Guide,
  },render: (args) => renderWrapped(args)
};

export const SearchBUtton: Story = {
  args: {
    type: ButtonType.Search,
  },render: (args) => renderWrapped(args)
};


export const TVButton: Story = {
  args: {
    type: ButtonType.TV,
  },render: (args) => renderWrapped(args)
};

export const VolumeMutedButton: Story = {
  args: {
    type: ButtonType.VolumeMuted,
  },render: (args) => renderWrapped(args)
};

export const Volume0Button: Story = {
  args: {
    type: ButtonType.Volume0,
  },render: (args) => renderWrapped(args)
};


export const Volume1Button: Story = {
  args: {
    type: ButtonType.Volume1,
  },render: (args) => renderWrapped(args)
};

export const Volume2FillButton: Story = {
  args: {
    type: ButtonType.Volume2,
  },render: (args) => renderWrapped(args)
};