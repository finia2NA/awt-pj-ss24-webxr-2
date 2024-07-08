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
    handleItemClick?: (channelNumber: number, channelId: string) => void;
    selectedChannel?: string;
}

/**
 * Renders a list of channels.
 */
const ChannelList = ({ channels, regions, time, handleItemClick, selectedChannel }: ChannelListProps) => {
    const colors = useColors();
    const [activeIndex, setActiveIndex] = useState(0);

    const handleElementClick = (channelNumber: number, channelId: string) => {
        if (handleItemClick) {
            handleItemClick(channelNumber, channelId);
        }
    }

    return (
        <Card flexDirection="column" gapRow={16} paddingY={25} paddingX={4} width={390} height={450} overflow={"visible"}>
            <Container width={360} display={"flex"} justifyContent={"space-between"} alignItems={"space-evenly"} marginBottom={20} paddingRight={10} height={10} >
                <Dropdown activeIndex={activeIndex} items={regions} onSelectItem={(index) => setActiveIndex(index)} />
                <Text>{time}</Text>
            </Container>
            <Container flexDirection={"column"} display={"flex"} scrollbarWidth={8} scrollbarBorderRadius={4} scrollbarColor={colors.scrollbar} overflow={"scroll"} paddingX={10} gap={6} width={370}>
                {channels.map((channel, index) => (
                    <ChannelListElement key={index} {...channel} handleItemClick={handleElementClick} selected={selectedChannel === channel.id} id={channel.id} />
                ))}
            </Container>
        </Card>
    );
}

export default ChannelList;