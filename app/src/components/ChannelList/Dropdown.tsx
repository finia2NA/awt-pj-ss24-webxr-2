import { Container, Text } from "@react-three/uikit";
import Backdrop from "../Backdrop";
import useColors from "../../hooks/useColors";
import { ChevronDown } from "@react-three/uikit-lucide";
import { useState } from "react";

export interface DropdownProps {
    /**
     * The index of the active item.
     */
    activeIndex: number;
    /**
     * The items to display in the dropdown.
     */
    items: string[];
    /**
     * Callback for when an item is selected.
     */
    onSelectItem: (index: number) => void;
}

/**
 * Dropdown component for selecting items from a list in the proper styling for the app.
 * We also need this since *select* from HTML likely doesn't work anyway in three.
 */
const Dropdown = ({ activeIndex, items, onSelectItem }: DropdownProps) => {
    const colors = useColors();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleSelect = (index: number) => {
        setIsOpen(false);
        onSelectItem(index);
    }

    const openDropdownMenu = () => {
        return (
            <Backdrop paddingLeft={15} paddingRight={5} display={"flex"} positionType={"absolute"} positionTop={44} borderRadius={20} flexDirection={"column"} maxWidth={280} minWidth={185} width={"auto"} alignItems={"flex-start"} gap={14} maxHeight={200} overflow={"hidden"} backgroundOpacity={.9} zIndexOffset={1} gapRow={20}>
                <Container display={"flex"} borderRadius={20} flexDirection={"column"} maxWidth={280} minWidth={185} width={"auto"} alignItems={"flex-start"} gap={14} overflow={"scroll"} gapRow={20} scrollbarWidth={8} scrollbarBorderRadius={4} scrollbarColor={colors.scrollbar}>
                    {items.map((item, index) => (
                        <Container key={index} display={"flex"} flexDirection={"column"} justifyContent={"center"} gapRow={20} paddingTop={20} onClick={() => handleSelect(index)} cursor={"pointer"}>
                            <Container maxWidth={280} minWidth={180} width={"auto"}>
                                <Text color={activeIndex == index ? colors.accentForeground : colors.primary} fontSize={16} fontWeight={"medium"} hover={{ color: colors.accentForeground }}>{item.length > 20 ? `${item.slice(0, 30)}...` : item}</Text>
                            </Container>
                            <Container borderColor={colors.primary} borderWidth={0} borderBottomWidth={1.5} maxWidth={280} minWidth={180} width={"auto"}></Container>
                        </Container>
                    ))}
                </Container>
            </Backdrop>
        )
    }

    return (
        <>
            <Backdrop borderRadius={20} width={185} display={"flex"} justifyContent={"space-between"} overflow={"hidden"} height={44} onClick={handleClick} cursor={"pointer"}>
                <Text color={colors.primary} wordBreak={"break-all"} fontSize={14} fontWeight={"bold"}>{items[activeIndex].length > 11 ? `${items[activeIndex].slice(0, 11)}..` : items[activeIndex]}</Text>
                <ChevronDown transformRotateZ={isOpen ? 180 : 0} margin={0} padding={0} color={colors.primary}></ChevronDown>
            </Backdrop>
            {isOpen && openDropdownMenu()}
        </>
    )
}

export default Dropdown;