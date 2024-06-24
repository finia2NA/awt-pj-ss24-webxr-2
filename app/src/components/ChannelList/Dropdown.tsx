import { Container, Image, Text } from "@react-three/uikit";
import Backdrop from "../Backdrop";
import useColors from "../../hooks/useColors";
import { ChevronDown } from "@react-three/uikit-lucide";
import { useState } from "react";

export interface DropdownProps {
    activeIndex: number;
    items: string[];
    onSelectItem: (index: number) => void;
}

const Dropdown = ({ activeIndex, items, onSelectItem }: DropdownProps) => {
    const colors = useColors();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleSelect = (index: number) => {
        setIsOpen(false);
        onSelectItem(index);
        console.log("Selected item: ", index)
    }

    const openDropdownMenu = () => {
        return (
            <Backdrop display={"flex"} positionType={"absolute"} positionTop={53} borderRadius={20} flexDirection={"column"} maxWidth={280} minWidth={185} width={"auto"} alignItems={"flex-start"} gap={14}>
                {items.map((item, index) => (
                    <>
                        <Container maxWidth={280} minWidth={180} width={"auto"}>
                            <Text key={index} color={activeIndex == index ? colors.accentForeground : colors.foreground} hover={{color: colors.accentForeground}} cursor={"pointer"} onClick={() => handleSelect(index)}>{item.length > 20 ? `${item.slice(0, 30)}...` : item}</Text>
                        </Container>
                        <Container borderColor={colors.foreground} borderWidth={0} borderBottomWidth={1.5} maxWidth={280} minWidth={180} width={"auto"}></Container>
                    </>
                ))}
            </Backdrop>
        )
    }

    return (
        <>
            <Backdrop borderRadius={20} width={185} display={"flex"} justifyContent={"space-between"} overflow={"hidden"} height={44} onClick={handleClick} cursor={"pointer"}>
                <Text color={colors.foreground} wordBreak={"break-all"} fontSize={14} fontWeight={"medium"}>{items[activeIndex].length > 11 ? `${items[activeIndex].slice(0, 11)}..` : items[activeIndex]}</Text>
                <ChevronDown transformRotateZ={isOpen ? 180 : 0} margin={0} padding={0} color={colors.foreground}></ChevronDown>
            </Backdrop>
            {isOpen && openDropdownMenu()}
        </>
    )
}

export default Dropdown;