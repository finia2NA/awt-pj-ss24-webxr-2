import type { Meta, StoryObj } from '@storybook/react';
import useRecentChannelsStore from './useRecentChannelsStore';


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

const meta: Meta = {
  title: 'hooks/useRecentChannelsStore',
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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