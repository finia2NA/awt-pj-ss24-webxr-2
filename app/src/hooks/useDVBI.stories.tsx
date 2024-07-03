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
    const { dvbi, loading: dvbiLoading, error: dvbiFailure } = useDVBI();
    const { services, loading: servicesLoading, error: servicesFailure } = useServiceList();
    const { services: filteredServices, loading: filteredServicesLoading, error: filteredServicesFailure } = useServiceList(true);
    const { services: filteredServicesWithGuide, loading: filteredServicesWithGuideLoading, error: filteredServicesWithGuideFailure } = useServiceList(true, true);
    const { service, loading: serviceLoading, error: serviceFailure } = useService('tag:mitxp.com,2021:1.1021.28334');
    const { service: serviceWithGuide, loading: serviceWithGuideLoading, error: serviceWithGuideFailure } = useService('tag:mitxp.com,2021:1.1021.28334', true);

    return (
      <>
        {dvbiLoading ? <p>Loading DVBI...</p> : dvbiFailure ? <p>Error loading DVBI</p> :
          <button onClick={() => {
            console.log(dvbi);
          }}
          >print DVBI</button>}
        {servicesLoading ? <p>Loading services...</p> : servicesFailure ? <p>Error loading services</p> :
          <button onClick={() => {
            console.log(services);
          }}
          >print services</button>}
        {filteredServicesLoading ? <p>Loading filtered services...</p> : filteredServicesFailure ? <p>Error loading filtered services</p> :
          <button onClick={() => {
            console.log(filteredServices);
          }}
          >print filteredServices</button>}
        {filteredServicesWithGuideLoading ? <p>Loading filtered services with guide...</p> : filteredServicesWithGuideFailure ? <p>Error loading filtered services with guide</p> :
          <button onClick={() => {
            console.log(filteredServicesWithGuide);
          }}
          >print filteredServicesWithGuide</button>}
        {serviceLoading ? <p>Loading service...</p> : serviceFailure ? <p>Error loading service</p> :
          <button onClick={() => {
            console.log(service);
          }}
          >print WDR</button>}
        {serviceWithGuideLoading ? <p>Loading service with guide...</p> : serviceWithGuideFailure ? <p>Error loading service with guide</p> :
          <button onClick={() => {
            console.log(serviceWithGuide);
          }}
          >print WDR with guide</button>}

      </>
    );
  }
};