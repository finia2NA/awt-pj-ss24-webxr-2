import RoundButton from "./RoundButton";
import UIElement from "./UIElement";


interface ButtonGroupProps {
  title: string;
  options: string[];
  selected: number;
  // eslint-disable-next-line no-unused-vars
  onSelect: (index: number) => void;
  roundTop?: boolean;
  roundBottom?: boolean;
  uniformWidth?: boolean;
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const { title, options, selected, onSelect: onClick, roundTop, roundBottom, uniformWidth } = props;



  return (
    <UIElement roundTop={roundTop} roundBottom={roundBottom}>
      <div className="flex flex-row justify-start items-center">
        <h3 className="font-bold text-xl ml-2 mr-10 w-24">{title}</h3>

        <div className="flex space-x-4">
          {options.map((option, index) => {
            const active = selected === index;

            return (
              <RoundButton className={uniformWidth ? "w-28" : ""} key={index} active={active} onClick={() => onClick(index)}>
                {option}
              </RoundButton>
            );
          })}
        </div>
      </div>
    </UIElement>
  );
}

export default ButtonGroup;