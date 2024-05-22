// TODO: add interactivity to the story, see Tabselector story for example

import type { Meta, StoryObj } from '@storybook/react';
import SettingsWindow from './SettingsWindow';

const meta = {
  title: 'Windows/SettingsWindow',
  component: SettingsWindow,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    settings: [
      {
        title: "Theme",
        options: ["System", "Light", "Dark"],
        selected: 0,
        onSelect: (index: number) => { console.log("Theme: selected option "+ index) }
      },
      {
        title: "DVBI-API",
        options: ["Default", "Custom"],
        selected: 0,
        onSelect: (index: number) => { console.log("API: selected option "+ index) }
      }
    ],
  },
} as Meta<typeof SettingsWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};