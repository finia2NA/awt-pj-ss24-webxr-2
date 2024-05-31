import { useState } from "react";
import UIElement from "./UIElement";
import chevronDownIcon from "../assets/glyphs/chevron.down.svg";
import useDarkMode from "../hooks/useDarkmode";
import XRWindow from "./XRWindow";


interface DropdownProps {
  options: string[];
  selectedOption: string;
  disabled?: boolean;
  onSelect?: (option: string) => void;
}

export default function Dropdown({ options, selectedOption, disabled }: DropdownProps) {

  const [expanded, setExpanded] = useState(false)

  const isDarkMode = useDarkMode();

  return (
    <UIElement roundTop roundBottom fullRound className={`py-2
    border-[1px] border-transparent hover:border-primary hover:dark:border-dark-primary hover:scale-105 transition-transform
    focus:outline-none
    w-fit
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
      onClick={() => setExpanded((prev) => !prev)}>
      <div className={`
      flex flex-row
      font-semibold text-primary dark:text-dark-primary
      space-x-4`}
      >
        <span>{selectedOption}</span>
        <img src={chevronDownIcon} alt="chevron down" className="ml-2" style={{
          WebkitFilter: isDarkMode ? 'invert(1)' : 'invert(0)',
          filter: isDarkMode ? 'invert(1)' : 'invert(0)',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
        }} />

        {
          expanded && (
            // FIXME: positioning of the dropdown
            <div className="absolute z-10">
              <UIElement roundBottom roundTop className="py-3 pl-4 pr-4" >
                <div className="flex flex-col space-y-1">
                  {options.map((option, index) => (
                    <div key={index}
                      className={`
                        bg-red-600
                        p-1
                        ${index === options.length - 1 ? 'rounded-b-md' : ''}
                        ${index === 0 ? 'rounded-t-md' : ''}
                        
                        `}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </UIElement>
            </div>
          )
        }
        {/* {props.options.map((option, index) => (
        <div key={index} onClick={() => props.onSelect?.(option)}>
          {option}
        </div>
      ))} */}
      </div>
    </UIElement >
  )
}