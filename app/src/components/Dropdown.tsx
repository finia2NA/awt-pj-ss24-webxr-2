import { useState } from "react";
import useDarkMode from "../hooks/useDarkmode";
import chevronDownIcon from "../assets/glyphs/chevron.down.svg";
import UIElement from "./UIElement";


export interface DropdownProps {
    items: string[];
}

const Dropdown = ({ items }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(items[0]);
    const isDarkMode = useDarkMode();


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (item: string) => {
        setSelected(item);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <div className="flex flex-row items-center justify-center align-middle">
                <UIElement roundTop roundBottom fullRound className={`py-2
                    border-[1px] border-transparent hover:border-primary
                    hover:dark:border-dark-primary hover:scale-105 transition-transform
                    focus:outline-none w-fit flex cursor-pointer`}
                    onClick={toggleDropdown}>
                    {selected}
                    <img src={chevronDownIcon} alt="chevron down" className="ml-2" style={{
                        WebkitFilter: isDarkMode ? 'invert(1)' : 'invert(0)',
                        filter: isDarkMode ? 'invert(1)' : 'invert(0)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }} />
                </UIElement>
            </div>

            {
                isOpen && (
                    <UIElement
                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg
                        ring-1 ring-black ring-opacity-5 z-10 !p-2 backdrop-blur"
                        customColors="bg-moreOpaqueUIElem dark:bg-dark-moreOpaqueUIElem"
                    >
                        <div className="py-1" role="none">
                            {items.map((item: string, index: number) => (
                                <a
                                    key={index}
                                    className="text-primary dark:text-dark-primary block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    role="menuitem"
                                    onClick={() => handleSelect(item)}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </UIElement>
                )
            }
        </div >
    );
};

export default Dropdown;