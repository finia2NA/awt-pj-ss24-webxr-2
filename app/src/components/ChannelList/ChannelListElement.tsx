import { Container, Image, Text } from "@react-three/uikit";
import useColors from "../../hooks/useColors";
import Backdrop from "../Backdrop";
import HeartButton from "./HeartButton";

export interface ChannelListElementProps {
    /**
     * Global channel ID (e.g. 1)
     */
    number: number;
    /**
     * Name of the channel
     */
    name: string;
    /**
     * Description (most likely show title)
     */
    description: string;
    /**
     * Time at which the show starts (e.g. 10:00)
     */
    timeStart: string;
    /**
     * Time at which the show ends (e.g. 11:00)
     */
    timeEnd: string;
    /**
     * URL of the image to display
     */
    imageUrl: string;
}

/**
 * Renders a single channel inside the list of channels.
 */
const ChannelListElement = ({ number, name, description, timeStart, timeEnd, imageUrl }: ChannelListElementProps) => {
    const colors = useColors();

    return (
        <Backdrop height={90} paddingLeft={0} paddingRight={0} paddingY={0} gap={0} borderRadius={30} width={240} margin={0} marginTop={0}>
            <Container width={30} paddingLeft={10} borderRightWidth={2} borderColor={colors.primary} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} height={90} >
                <Text color={colors.primary}>{number.toString()}</Text>
                <Image width={20} height={20} src={imageUrl}></Image>
            </Container>
            <Container paddingLeft={8} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} width={150}>
                <Text color={colors.primary} paddingBottom={10}>{name}</Text>
                <Text color={colors.primary}>{description}</Text>
                <Text color={colors.primary}>{timeStart + " - " + timeEnd}</Text>
            </Container>
            <Container height={90} display={"flex"} justifyContent={"flex-start"} flexDirection={"column"} alignItems={"flex-start"}>
                <HeartButton channelID={number.toString()}></HeartButton>
            </Container>
        </Backdrop>
    )
}

export default ChannelListElement;