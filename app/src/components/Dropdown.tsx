import { useState } from "react";
import useDarkMode from "../hooks/useDarkmode";
import chevronDownIcon from "../assets/glyphs/chevron.down.svg";


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
                <button
                    type="button"
                    className="inline-flex justify-between w-full rounded-3xl border items-center border-gray-300 shadow-sm px-4 py-2 bg-darkerUIElem text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                >
                    {selected}
                    <img src={chevronDownIcon} alt="chevron down" className="ml-2" style={{
                        WebkitFilter: isDarkMode ? 'invert(1)' : 'invert(0)',
                        filter: isDarkMode ? 'invert(1)' : 'invert(0)',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }} />

                </button>
            </div>

            {
                isOpen && (
                    <div
                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                    >
                        <div className="py-1" role="none">
                            {items.map((item: string, index: number) => (
                                <a
                                    key={index}
                                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    role="menuitem"
                                    onClick={() => handleSelect(item)}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Dropdown;