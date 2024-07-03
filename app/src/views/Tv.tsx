import { useState, useRef } from 'react';
import { Container, ComponentInternals, Text } from "@react-three/uikit";
import DashPlayer from "../components/DashPlayer";
import { ProgramList, ProgramItem } from "../windows/ProgramList"
import { useServiceList } from '../hooks/useDVBI';

interface TvProps {
    viewRef: React.RefObject<ComponentInternals>;
    handleRef: React.RefObject<ComponentInternals>;
    tabsRef: React.RefObject<ComponentInternals>;
}

export default function Tv({ viewRef, handleRef, tabsRef }: TvProps) {
    const list = useRef<ComponentInternals>(null);

    const [isPlaying, setIsPlaying] = useState(true);

    const { services, loading, error } = useServiceList(true, false);

    if (loading) {
        return <Text>Loading</Text>
    }
    if (error) {
        return <Text>Error</Text>
    }

    const programs = services.map((service) => {
        return {
            title: service.serviceName,
            src: service.dashStreams[0].manifestUrl,
            selected: false
        }
    });

    // const [dashPlayerSrc, setDashPlayerSrc] = useState(programs[0].src);
    // const [programSelected, setProgramSelected] = useState(true);

    // const handleItemClick = (item: ProgramItem) => {
    //     setDashPlayerSrc(item.src); // Assuming each ProgramItem has a 'src' property
    //     setProgramSelected(true);
    // };

    const dashPlayerSrc = programs[1].src;
    const handleItemClick = (item: ProgramItem) => {
    };

    return (
        <Container flexDirection={"row"}>
            <Container flexDirection="column" alignContent={"center"}>
                <Container height={"auto"}>
                    <DashPlayer src={dashPlayerSrc} width={900} playing={isPlaying} viewRef={viewRef} handleRef={handleRef} tabsRef={tabsRef} listRef={list} />
                </Container>
            </Container>
            <Container alignSelf={"center"} marginLeft={50} ref={list}>
                <ProgramList items={programs} onItemClick={handleItemClick} />
            </Container>
        </Container>
    );
}