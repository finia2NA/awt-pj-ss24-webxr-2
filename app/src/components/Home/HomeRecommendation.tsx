import { Container, Image, Text } from "@react-three/uikit";
import useColors from "../../hooks/useColors";
import Backdrop from "../Backdrop";
import { Service } from "dvbi-lib/src/model/services";
import { formatTime } from "../../utils/dateHelpers";
import useRoutingStore, { Route } from "../../hooks/useRoutingStore";
import { useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import MyImage from "../../utils/MyImage";

export interface HomeRecommendationProps {
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

    /**
     * Service ID
     */
    serviceID: string;
}

export const homeRecommPropsFromService = (service: Service): HomeRecommendationProps => {
    const guideLoaded = service.contentGuide !== undefined;
    let description = "";
    let timeStart = "";
    let timeEnd = "";
    let imageUrl = "";

    // finding out what's there...
    const descriptionAvailable = guideLoaded && service.contentGuide?.programDescriptions[0]?.title !== undefined;
    const startTimeAvailable = guideLoaded && service.contentGuide?.programDescriptions[0]?.start !== undefined;
    const endTimeAvailable = guideLoaded && service.contentGuide?.programDescriptions[0]?.durationMinutes !== undefined;
    const imageUrlAvailable = guideLoaded && service.logoUrl !== undefined;

    if (descriptionAvailable) {
        description = service.contentGuide?.programDescriptions[0]?.title || "";
    }
    if (startTimeAvailable) {
        const startTime = service.contentGuide?.programDescriptions[0]?.start;
        if (startTime) {
            timeStart = formatTime(startTime);
        }
    }
    if (startTimeAvailable && endTimeAvailable) {
        const programDescription = service.contentGuide?.programDescriptions[0];
        if (programDescription) {
            const endTime = new Date(programDescription.start.getTime() + programDescription.durationMinutes * 60000);
            timeEnd = formatTime(endTime);
        }
    }
    if (imageUrlAvailable) {
        imageUrl = service.logoUrl;
    }

    return {
        name: service.serviceName,
        description: description,
        timeStart: timeStart,
        timeEnd: timeEnd,
        imageUrl: imageUrl,
        serviceID: service.serviceID
    };
}

/**
 * Renders a home recommendation component.
 */
const HomeRecommendation = ({ name, description, timeStart, timeEnd, imageUrl, serviceID }: HomeRecommendationProps) => {
    const colors = useColors();
    const { setRoute, setTunedChannel } = useRoutingStore();
    const [pointerPosition, setPointerPosition] = useState<[number, number]>([0, 0]);

    /*
    More complex pointer handling as onClick seems to be too trigger happy which could quickly get annoying
    */
    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        setPointerPosition([e.point.x,e.point.y]);
    }

    // TODO: These values might need fine tuning
    // Or maybe even put this into a generic function that could be used in other components?
    const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
        if (Math.abs(pointerPosition[0] - e.point.x) < 0.05 && Math.abs(pointerPosition[1] - e.point.y) < 0.05) {
            setRoute(Route.TV);
            setTunedChannel(serviceID);
        }
    }

    return (
        <Backdrop height={90} paddingLeft={0} paddingRight={0} paddingY={0} gap={0} borderRadius={20} width={240} margin={0} marginTop={0} flexShrink={0} flexGrow={0}
            hover={{ backgroundColor: colors.hover }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}>
            <Container width={55} paddingLeft={10} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} height={90} >
                <MyImage width={45} src={imageUrl}></MyImage>
            </Container>
            <Container width={140} paddingLeft={8} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} height={90}>
                <Text color={colors.primary} paddingBottom={10}>{name}</Text>
                <Text color={colors.primary}>
                  {description.length > 22 ? `${description.substring(0, 22)}...` : description}
                </Text>
                <Text color={colors.primary}>{timeStart + " - " + timeEnd}</Text>
            </Container>
        </Backdrop>
    );
}

export default HomeRecommendation;