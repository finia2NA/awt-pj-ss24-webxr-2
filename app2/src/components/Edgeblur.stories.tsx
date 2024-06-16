import type { Meta, StoryObj } from '@storybook/react';
import StoryHelper from './StoryHelper';
import Edgeblur from './Edgeblur';
import { Container } from '@react-three/uikit';

const meta: Meta<typeof Edgeblur> = {
  title: 'Components/Edgeblur',
  component: Edgeblur,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
  args: {
    // children: [<Container />]
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

  render: (args) =>
    <>
      <StoryHelper>
        <Edgeblur {...args} />
      </StoryHelper >
    </>
};