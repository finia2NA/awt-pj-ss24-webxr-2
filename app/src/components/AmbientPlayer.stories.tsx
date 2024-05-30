import type { Meta, StoryObj } from '@storybook/react';
import AmbientPlayer, { AmbientPlayerBlur } from './AmbientPlayer';

const meta = {
    title: 'Components/AmbientPlayer',
    component: AmbientPlayer,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
        
    },
} satisfies Meta<typeof AmbientPlayer>;

export default meta;

/**
 * Everything is default, only the src is set to a test video.
 */
export const Default: StoryObj<typeof meta> = {
    args: {
        src: 'https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd',
    },
};

/**
 * The blurToggle is set to false
 */
export const WithoutBlur: StoryObj<typeof meta> = {
    args: {
        src: 'https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd',
        blurToggle: false,
    },
};

/**
 * The blurAmount is set to AmbientPlayerBlur.xs
 * The blurToggle would be set to true by default
 */
export const LowBlur: StoryObj<typeof meta> = {
    args: {
        src: 'https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd',
        blurAmount: AmbientPlayerBlur.xs,
        blurToggle: true,
    },
};