import { Container, Text } from "@react-three/uikit"
import { Card } from "../apfel/card";
import Guide, { GuideProps } from "./Guide";
import Dropdown from "../ChannelList/Dropdown";
import { useState } from "react";

export interface GuideWindowProps extends GuideProps {
    time: string;
    regions: string[];
}
const GuideWindow = ({time, regions, ...rest}: GuideWindowProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Card>
            <Container display={"flex"} flexDirection={"column"} gap={10} paddingX={20} paddingY={20} padding={20}>
                <Container display={"flex"} flexDirection={"row"} justifyContent={"space-between"} >
                    <Container display={"flex"} flexDirection={"row"} gap={10}>
                        <Text fontWeight={"bold"} fontSize={20}>TV Guide for: </Text>
                        <Dropdown activeIndex={activeIndex} items={regions} onSelectItem={(index) => setActiveIndex(index)} />
                    </Container>
                    <Text>{time}</Text>
                </Container>
                <Guide {...rest} />
            </Container>
        </Card>
    )
}

export default GuideWindow;