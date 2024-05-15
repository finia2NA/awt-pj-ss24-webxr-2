import type { Meta, StoryObj } from '@storybook/react';
import DashPlayer from './DashPlayer';

const meta = {
    title: 'Components/DashPlayer',
    component: DashPlayer,
    tags: ["autodocs"],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof DashPlayer>;

export default meta;

/**
 * This is the default story that renders the DashPlayer component.
 * The video will not play automatically, but the controls will be displayed.
 */
export const Default: StoryObj<typeof meta> = {
    args: {
        src: 'https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiResMPEG2.mpd',
        paused: true,
        controls: true,
        muted: false,
    },
};

/**
 * This story renders the DashPlayer component with the autoplay prop set to true.
 * The video will play automatically, and the controls will be displayed.
 * The video will be muted by default to make it less annoying when testing.
 */
export const Autoplay: StoryObj<typeof meta> = {
    args: {
        src: 'https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd',
        paused: false,
        controls: true,
        muted: true,
    },
};