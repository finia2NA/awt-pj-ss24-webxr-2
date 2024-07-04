import { Container, Text } from "@react-three/uikit";
import { Card } from "../apfel/card";
import ChannelListElement, { ChannelListElementProps } from "./ChannelListElement";
import useColors from "../../hooks/useColors";
import Dropdown from "./Dropdown";
import { useState } from "react";

export interface ChannelListProps {
    channels: ChannelListElementProps[];
    regions: string[];
    time: string;
    handleItemClick?: (channelID: number) => void;
    selectedChannel?: number;
}

/**
 * Renders a list of channels.
 */
const ChannelList = ({ channels, regions, time, handleItemClick, selectedChannel }: ChannelListProps) => {
    const colors = useColors();
    const [activeIndex, setActiveIndex] = useState(0);

    const handleElementClick = (channelID: number) => {
        if (handleItemClick) {
            handleItemClick(channelID);
        }
    }

    return (
        <Card flexDirection="column" gapRow={16} paddingY={25} paddingX={4} width={380} height={650} overflow={"visible"}>
            <Container width={360} display={"flex"} justifyContent={"space-between"} alignItems={"space-evenly"} marginBottom={20} paddingRight={10} >
                <Dropdown activeIndex={activeIndex} items={regions} onSelectItem={(index) => setActiveIndex(index)} />
                <Text>{time}</Text>
            </Container>
            <Container flexDirection={"column"} display={"flex"} scrollbarWidth={8} scrollbarBorderRadius={4} scrollbarColor={colors.scrollbar} overflow={"scroll"} paddingX={10} gap={6}>
                {channels.map((channel, index) => (
                    <ChannelListElement key={index} {...channel} handleItemClick={handleElementClick} selected={selectedChannel === channel.number} />
                ))}
            </Container>
        </Card>
    );
}

export default ChannelList;