import { Container, Text } from "@react-three/uikit"
import { Card } from "../apfel/card";
import Guide, { GuideProps } from "./Guide";
import Dropdown from "../ChannelList/Dropdown";
import { useState } from "react";
import { Button } from "../apfel/button";
import { alterDateDays, getDateISO } from "../../utils/dateHelpers";

export interface GuideWindowProps extends Omit<GuideProps, 'zoomLevel'> {
    time: string;
    regions: string[];
    width?: number;
    defaultZoomLevel: number;
    date: Date;
    setDate?: (date: Date) => void;
    loading?: boolean;
}
const GuideWindow = ({ time, regions, width, defaultZoomLevel, date, setDate = () => {}, loading=false, ...rest }: GuideWindowProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(defaultZoomLevel);

    return (
        <Card width={width ? width : "auto"}>
            <Container display={"flex"} flexDirection={"column"} gap={10} paddingX={20} paddingY={20} padding={20}>
                <Container display={"flex"} flexDirection={"row"} justifyContent={"space-between"} >
                    <Container display={"flex"} flexDirection={"row"} gap={10}>
                        <Text fontWeight={"bold"} fontSize={20}>TV Guide for: </Text>
                        <Dropdown activeIndex={activeIndex} items={regions} onSelectItem={(index) => setActiveIndex(index)} />
                        <Container display={"flex"} flexDirection={"row"} alignItems={"baseline"}>
                            <Button onClick={() => {!loading ? setZoomLevel(zoomLevel - 0.1 > 0 ? zoomLevel - 0.1 : 0) : console.log("disabled")}} disabled={loading}>
                                <Text fontSize={20} fontWeight={"bold"}>-</Text>
                            </Button>
                            <Text>Zoom: {Math.floor(zoomLevel * 100).toString()}%</Text>
                            <Button onClick={() => {!loading ? setZoomLevel(zoomLevel + 0.1 < 10 ? zoomLevel + 0.1 : 10) : console.log("disabled")}} disabled={loading}>
                                <Text fontSize={20} fontWeight={"bold"}>+</Text>
                            </Button>
                            <Button onClick={() => {!loading ? setDate(alterDateDays(date, -1)) : console.log("disabled")}} disabled={loading}>
                                <Text fontSize={20} fontWeight={"bold"}>-</Text>
                            </Button>
                            <Text>{getDateISO(date)}</Text>
                            <Button onClick={() => {!loading ? setDate(alterDateDays(date, 1)) : console.log("disabled")}} disabled={loading}>
                                <Text fontSize={20} fontWeight={"bold"}>+</Text>
                            </Button>
                        </Container>
                    </Container>
                    <Text>{time}</Text>
                </Container>
                {loading ? 
                    <Container display={"flex"} justifyContent={"center"} alignItems={"center"} height={300} width={900}>
                        <Text fontSize={20}>Loading...</Text>
                    </Container>
                : <Guide zoomLevel={zoomLevel} {...rest} />}
            </Container>
        </Card>
    )
}

export default GuideWindow;