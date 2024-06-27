import { Container, Image, Text } from "@react-three/uikit";
import useColors from "../../hooks/useColors";
import Backdrop from "../Backdrop";

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
}

/**
 * Renders a home recommendation component.
 */
const HomeRecommendation = ({ name, description, timeStart, timeEnd, imageUrl }: HomeRecommendationProps) => {
    const colors = useColors();

    return (
        <Backdrop height={75} paddingLeft={0} paddingRight={0} paddingY={0} gap={0} borderRadius={20} width={240} margin={0} marginTop={0} flexShrink={0} flexGrow={0}>
            <Container width={55} paddingLeft={10} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} height={90} >
                <Image width={45} src={imageUrl}></Image>
            </Container>
            <Container width={140} paddingLeft={8} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"}>
                <Text color={colors.foreground} paddingBottom={10}>{name}</Text>
                <Text color={colors.foreground}>{description}</Text>
                <Text color={colors.foreground}>{timeStart + " - " + timeEnd}</Text>
            </Container>
        </Backdrop>
    );
}

export default HomeRecommendation;