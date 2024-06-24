import { Container, Image, Text } from "@react-three/uikit";
import useColors from "../../hooks/useColors";
import Backdrop from "../Backdrop";

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
        <Backdrop height={90} paddingLeft={0} paddingRight={0} paddingY={0} gap={0} borderRadius={30} width={240} margin={0} marginTop={0}>
            <Container width={30} paddingLeft={10} borderRightWidth={2} borderColor={colors.foreground} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} height={90} >
                <Text>{number.toString()}</Text>
                <Image width={20} height={20} src={imageUrl}></Image>
            </Container>
            <Container paddingLeft={8} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} width={150}>
                <Text paddingBottom={10}>{name}</Text>
                <Text>{description}</Text>
                <Text>{timeStart + " - " + timeEnd}</Text>
            </Container>
        </Backdrop>
    )
}

export default ChannelListElement;