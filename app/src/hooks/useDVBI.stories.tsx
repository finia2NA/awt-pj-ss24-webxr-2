import type { Meta, StoryObj } from '@storybook/react';
import { useDVBI, useService, useServiceList } from './useDVBI';

const meta: Meta = {
  title: 'hooks/useDVBI',
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    // debugger;
    const dvbi = useDVBI();
    const services = useServiceList();
    const filteredServices = useServiceList(true);
    const service = useService('tag:mitxp.com,2021:1.1021.28334');

    return (
      <>
        <button onClick={() => {
          console.log(dvbi);
        }
        }>print DVBI</button>
        <button onClick={() => {
          console.log(services);
        }
        }>print services</button>
        <button onClick={() => {
          console.log(filteredServices);
        }
        }>print filtered services</button>
        <button onClick={() => {
          console.log(service);
        }
        }>print WDR</button>
      </>
    )
  }

};