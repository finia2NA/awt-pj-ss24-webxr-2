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


export const HouseButton: Story = {
  args: {
    type: ButtonType.House,
  },
};

export const CaptionsBubbleButton: Story = {
  args: {
    type: ButtonType.CaptionsBubble,
  },
};

export const ChevronDownButton: Story = {
  args: {
    type: ButtonType.ChevronDown,
  },
};

export const GearButton: Story = {
  args: {
    type: ButtonType.Gear,
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

export const ListBulletButton: Story = {
  args: {
    type: ButtonType.ListBullet,
  },
};

export const ListBulletRectangleFillButton: Story = {
  args: {
    type: ButtonType.ListBulletRectangleFill,
  },
};

export const MagnifyingglassButton: Story = {
  args: {
    type: ButtonType.Magnifyingglass,
  },
};

export const SpeakerFillButton: Story = {
  args: {
    type: ButtonType.SpeakerFill,
  },
};

export const SpeakerSlashFillButton: Story = {
  args: {
    type: ButtonType.SpeakerSlashFill,
  },
};

export const SpeakerWave1FillButton: Story = {
  args: {
    type: ButtonType.SpeakerWave1Fill,
  },
};

export const SpeakerWave2FillButton: Story = {
  args: {
    type: ButtonType.SpeakerWave2Fill,
  },
};

export const SpeakerWave3FillButton: Story = {
  args: {
    type: ButtonType.SpeakerWave3Fill,
  },
};

export const TvFillButton: Story = {
  args: {
    type: ButtonType.TvFill,
  },
};