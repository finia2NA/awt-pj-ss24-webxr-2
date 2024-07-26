import type { Meta, StoryObj } from '@storybook/react';
import useRecentChannelsStore from './useRecentChannelsStore';

/**
 * Helper component to display channel information and provide actions to watch, delete, and print the index of a channel.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.id - The unique identifier of the channel.
 * @param {number | string} props.index - The index of the channel in the recent channels list.
 * @param {function} props.onAdd - Function to add the channel to the recent channels list.
 * @param {function} props.onRemove - Function to remove the channel from the recent channels list.
 * @param {function} props.onPrintIndex - Function to print the index of the channel in the console.
 * @returns {JSX.Element} The rendered component.
 */
const Helper = ({ id, index, onAdd, onRemove, onPrintIndex }: { id: string, index: number | string, onAdd: () => void, onRemove: () => void, onPrintIndex: () => void }) => {
  return (
    <div>
      <span>id: {id}   |   </span>
      <span>index: {index}   |   </span>
      <button onClick={onAdd}>Watch</button>
      <button onClick={onRemove}>Delete</button>
      <button onClick={onPrintIndex}>Print Index</button>
    </div>
  )
}

/**
 * Metadata for the Storybook story, defining the title, tags, and layout parameters.
 */
const meta: Meta = {
  title: 'hooks/useRecentChannelsStore',
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story for the `useRecentChannelsStore` hook, demonstrating its functionality.
 * 
 * @returns {JSX.Element} The rendered story component.
 */
export const Default: Story = {
  render: () => {
    const { recentChannels, addRecentChannelToFrontByID, removeRecentChannelByID, getIndexByID } = useRecentChannelsStore();

    const availableIDs = ['1', '2', '3', '4'];

    return <>
      <div>
        <h3>Recent Channels</h3>
        <div>
          {recentChannels.map((id) =>
            <Helper key={id} id={id} index={getIndexByID(id) ?? "null"}
              onAdd={() => addRecentChannelToFrontByID(id)}
              onRemove={() => removeRecentChannelByID(id)}
              onPrintIndex={() => console.log(getIndexByID(id))}
            />)}
        </div>

        <h3>Available Channels</h3>
        <div>
          {availableIDs.filter(x => getIndexByID(x) === null).map((id) =>
            <Helper key={id} id={id} index={getIndexByID(id) ?? "null"}
              onAdd={() => addRecentChannelToFrontByID(id)}
              onRemove={() => removeRecentChannelByID(id)}
              onPrintIndex={() => console.log(getIndexByID(id))}
            />)}
        </div>
      </div>
    </>
  }
};
