import { Container, Image, Text } from "@react-three/uikit";
import useColors from "../../hooks/useColors";
import Backdrop from "../Backdrop";
import HeartButton from "./HeartButton";
import { useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import CacheEnabledImage from "../CacheEnabledImage";
import { truncateText } from "../../utils/textHelpers";

export interface ChannelListElementProps {
    /**
     * Global channel ID (e.g. 1)
     */
    number: number;
    /**
     * Unique channel ID from the API
     */
    id: string;
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
const ChannelListElement = ({ number, name, description, timeStart, timeEnd, imageUrl, handleItemClick, selected, id }: ChannelListElementProps & { handleItemClick: (channelNumber: number, channelId: string) => void, selected: boolean }) => {
    const colors = useColors();

    const [pointerPosition, setPointerPosition] = useState<[number, number]>([0, 0]);

    /*
    More complex pointer handling as onClick seems to be too trigger happy which could quickly get annoying
    */
    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        setPointerPosition([e.point.x, e.point.y]);
    }

    // TODO: These values might need fine tuning
    // Or maybe even put this into a generic function that could be used in other components?
    const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
        if (Math.abs(pointerPosition[0] - e.point.x) < 0.05 && Math.abs(pointerPosition[1] - e.point.y) < 0.05) {
            handleItemClick(number, id);
        }
    }

    return (
        <Backdrop height={110} paddingLeft={0} paddingRight={0} paddingY={0} gap={0} borderRadius={30} width={340} margin={0} marginTop={0} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} hover={{ backgroundColor: colors.hover }}>
            <Container width={80} paddingLeft={10} borderRightWidth={2} borderColor={selected ? colors.accent : colors.primary} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} alignItems={"center"} height={90} >
                <Text color={selected ? colors.accent : colors.primary} fontSize={20} fontWeight={"medium"}>{number.toString()}</Text>
                <CacheEnabledImage width={50} src={imageUrl} />
            </Container>
            <Container paddingLeft={8} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} width={270}>
                <Text color={selected ? colors.accent : colors.primary} fontWeight={"semi-bold"} fontSize={18} paddingBottom={10}>{name}</Text>
                <Text color={colors.primary} fontWeight={"medium"}>
                    {truncateText(description, 50)}
                </Text>
                <Text color={colors.primary} fontWeight={"medium"}>{timeStart + " - " + timeEnd}</Text>
            </Container>
            <Container height={90} display={"flex"} justifyContent={"flex-start"} flexDirection={"column"} alignItems={"flex-start"}>
                <HeartButton channelID={id}></HeartButton>
            </Container>
        </Backdrop>
    )
}

export default ChannelListElement;