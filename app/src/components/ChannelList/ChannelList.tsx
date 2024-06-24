import { Container } from "@react-three/uikit";
import { Card } from "../apfel/card";
import ChannelListElement, { ChannelListElementProps } from "./ChannelListElement";
import useColors from "../../hooks/useColors";

export interface ChannelListProps {
    channels: ChannelListElementProps[];
}

/**
 * Renders a list of channels.
 */
const ChannelList = ({ channels }: ChannelListProps) => {
    const colors = useColors()

    return (
        <Card flexDirection="column" gapRow={16} paddingY={25} paddingX={4} width={280} height={450} overflow={"visible"}>
            <Container flexDirection={"column"} display={"flex"} scrollbarWidth={8} scrollbarBorderRadius={4} scrollbarColor={colors.scrollbar} overflow={"scroll"} paddingX={10} gap={6}>
                {channels.map((channel, index) => (
                    <ChannelListElement key={index} {...channel} />
                ))}
            </Container>
        </Card>
    );
}

export default ChannelList;