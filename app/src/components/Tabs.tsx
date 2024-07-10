import { TabBar, TabBarItem } from './apfel/tab-bar'
import { Text } from '@react-three/uikit'

import { HomeIcon, SettingsIcon, Tv2Icon, LayoutListIcon } from '@react-three/uikit-lucide';
import { Route } from '../hooks/useRoutingStore';

export interface TabSelectorProps {
  selectedRoute: Route;
  // eslint-disable-next-line no-unused-vars
  setSelectedRoute: (route: Route) => void;
}


const Tabs = ({ selectedRoute, setSelectedRoute }: TabSelectorProps) => {

  let currentValue;
  if (selectedRoute === Route.HOME) {
    currentValue = 'HOME';
  } else if (selectedRoute === Route.TV) {
    currentValue = 'TV';
  } else if (selectedRoute === Route.GUIDE) {
    currentValue = 'GUIDE';
  } else if (selectedRoute === Route.SETTINGS) {
    currentValue = 'SETTINGS';
  }

  // Todo: Specify the height
  return (
    <TabBar defaultValue={Route.HOME} value={currentValue} height={230} positionType={"absolute"} positionTop={-120} positionLeft={-80} zIndexOffset={10}
      onValueChange={(newValue) =>
        setSelectedRoute(Route[newValue as keyof typeof Route])}
    >
      <TabBarItem value={Route.HOME} icon={<HomeIcon />}>
        <Text>Home</Text>
      </TabBarItem>
      <TabBarItem value={Route.TV} icon={<Tv2Icon />}>
        <Text>TV</Text>
      </TabBarItem>
      <TabBarItem value={Route.GUIDE} icon={<LayoutListIcon />}>
        <Text>Guide</Text>
      </TabBarItem>
      <TabBarItem value={Route.SETTINGS} icon={<SettingsIcon />}>
        <Text>Settings</Text>
      </TabBarItem>
    </TabBar>
  );
};

export default Tabs;