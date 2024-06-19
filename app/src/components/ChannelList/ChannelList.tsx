import { Container, Image, Text } from "@react-three/uikit";
import { Card } from "../apfel/card";

export interface ChannelListElementProps {
    number: number;
    name: string;
    description: string;
    timeStart: string;
    timeEnd: string;
    imageUrl: string;
}

const ChannelList = ({ number, name, description, timeStart, timeEnd, imageUrl }: ChannelListElementProps) => {
    return (
        <Card flexDirection="column" gapRow={16} paddingY={25} paddingX={10} width={250} height={450}>
            <Card height={90} padding={0}>
                <Container width={30} paddingLeft={10} borderRightWidth={2} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"}>
                    <Text>{number.toString()}</Text>
                    <Image width={20} height={20} src={imageUrl}></Image>
                </Container>
                <Container paddingLeft={8} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"}>
                    <Text paddingBottom={10}>{name}</Text>
                    <Text>{description}</Text>
                    <Text>{timeStart + " - " + timeEnd}</Text>
                </Container>
            </Card>
        </Card>
    );
}

export default ChannelList;