import { Story, Meta } from '@storybook/react';

import SettingsWindow from './SettingsWindow';

export default {
  title: 'Windows/SettingsWindow',
  component: SettingsWindow,
} as Meta;

const Template: Story = () => <SettingsWindow />;

export const Default = Template.bind({});
Default.args = {};