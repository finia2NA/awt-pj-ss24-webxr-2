import { Container, Image, Text } from "@react-three/uikit";
import useColors from "../../hooks/useColors";
import Backdrop from "../Backdrop";

export interface HomeRecommendationProps {
    name: string;
    description: string;
    timeStart: string;
    timeEnd: string;
    imageUrl: string;
}

const HomeRecommendation = ({ name, description, timeStart, timeEnd, imageUrl }: HomeRecommendationProps) => {
    const colors = useColors();

    return (
        <Backdrop height={75} paddingLeft={0} paddingRight={0} paddingY={0} gap={0} borderRadius={20} width={240} margin={0} marginTop={0}>
            <Container width={55} paddingLeft={10} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} height={90} >
                <Image width={45} src={imageUrl}></Image>
            </Container>
            <Container width={140} paddingLeft={8} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"}>
                <Text paddingBottom={10}>{name}</Text>
                <Text>{description}</Text>
                <Text>{timeStart + " - " + timeEnd}</Text>
            </Container>
        </Backdrop>
    );
}

export default HomeRecommendation;