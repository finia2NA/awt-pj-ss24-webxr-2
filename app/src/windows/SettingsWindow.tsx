import ButtonGroup from "../components/ButtonGroup";
import RoundButton from "../components/RoundButton";
import UIElement from "../components/UIElement";
import XRWindow from "../components/XRWindow";



interface Setting {
  title: string;
  options: string[];
  selected: number;
  // eslint-disable-next-line no-unused-vars
  onSelect: (index: number) => void;
}

interface SettingsWindowProps {
  settings: Setting[];
}

const SettingsWindow = (props: SettingsWindowProps) => {
  const { settings } = props;

  return (
    <XRWindow>
      <div className="flex flex-col">
        <h1 className="text-4xl pb-6">DVBI-XR</h1>

        <div className="flex flex-col space-y-1">
          {settings.map((setting, index) => (
            <ButtonGroup
              key={index}
              roundTop={index === 0}
              title={setting.title}
              options={setting.options}
              selected={setting.selected}
              onSelect={setting.onSelect}
              uniformWidth
            />
          ))}
          <UIElement roundBottom>
            <div className="flex flex-row justify-center font-light text-sm items-center">
              2024 by Group 2. MIT License. See the
              <RoundButton className="px-2 ml-1 font-normal">Projects we are using</RoundButton>
            </div>
          </UIElement>
        </div>
      </div>
    </XRWindow>
  );
}

export default SettingsWindow;