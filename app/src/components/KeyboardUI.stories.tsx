import type { Meta, StoryObj } from '@storybook/react';
import KeyboardUI from './KeyboardUI';
import StoryHelper from '../StoryHelper'
import useKeyboardStore, { KeyboardListeners } from '../hooks/useKeyboardStore.ts';
import { useEffect } from 'react';


const meta = {
  title: 'Components/Keyboard',
  component: KeyboardUI,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof KeyboardUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

  render: (args) => {
    useEffect(() => {
      // Define listeners
      const onKeyPress = (key: string) => console.log("pressed key: " + key);
      const onBackspace = () => console.log('pressed backspace');
      const onHide = () => console.log('pressed hide');
      const onSearch = () => console.log('pressed search');

      const listeners: KeyboardListeners = {
        onKeyPress,
        onBackspace,
        onHide,
        onSearch,
      };

      // Get store, add listeners
      const store = useKeyboardStore.getState();
      store.addEventListeners(listeners);
      store.setIsVisible(true);

      // Cleanup
      return () => {
        store.removeEventListeners(listeners);
        store.setIsVisible(false);
      };
    }, []);

    return (
      <>
        <StoryHelper wide>
          <KeyboardUI {...args} />
        </StoryHelper>
      </>
    );
  }
};