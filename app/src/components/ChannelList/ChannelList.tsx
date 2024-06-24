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
}

/**
 * Renders a list of channels.
 */
const ChannelList = ({ channels, regions, time }: ChannelListProps) => {
    const colors = useColors();
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Card flexDirection="column" gapRow={16} paddingY={25} paddingX={4} width={280} height={450} overflow={"visible"}>
            <Container width={260} display={"flex"} justifyContent={"space-between"} alignItems={"space-evenly"} marginBottom={20} paddingRight={10} >
                <Dropdown activeIndex={activeIndex} items={regions} onSelectItem={(index) => setActiveIndex(index)} />
                <Text>{time}</Text>
            </Container>
            <Container flexDirection={"column"} display={"flex"} scrollbarWidth={8} scrollbarBorderRadius={4} scrollbarColor={colors.scrollbar} overflow={"scroll"} paddingX={10} gap={6}>
                {channels.map((channel, index) => (
                    <ChannelListElement key={index} {...channel} />
                ))}
            </Container>
        </Card>
    );
}

export default ChannelList;