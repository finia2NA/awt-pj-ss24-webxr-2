import { Container, Image, Text } from "@react-three/uikit";
import { Card } from "../apfel/card";
import useColors from "../../hooks/useColors";

export interface ChannelListElementProps {
    number: number;
    name: string;
    description: string;
    timeStart: string;
    timeEnd: string;
    imageUrl: string;
}

/**
 * Renders a single channel inside the list of channels.
 */
const ChannelListElement = ({ number, name, description, timeStart, timeEnd, imageUrl }: ChannelListElementProps) => {
    const colors = useColors()

    return (
        <Card height={90} padding={0}>
                <Container width={30} paddingLeft={10} borderRightWidth={2} borderColor={colors.foreground} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"}>
                    <Text>{number.toString()}</Text>
                    <Image width={20} height={20} src={imageUrl}></Image>
                </Container>
                <Container paddingLeft={8} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} width={220}>
                    <Text paddingBottom={10}>{name}</Text>
                    <Text>{description}</Text>
                    <Text>{timeStart + " - " + timeEnd}</Text>
                </Container>
            </Card>
    )
}

export default ChannelListElement;