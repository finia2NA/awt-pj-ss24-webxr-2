import { useState, useRef } from 'react';
import { Container, ComponentInternals } from "@react-three/uikit";
import DashPlayer from "../components/DashPlayer";
import { ProgramList, ProgramItem } from "../windows/ProgramList"

interface TvProps {
    viewRef: React.RefObject<ComponentInternals>;
    handleRef: React.RefObject<ComponentInternals>;
    tabsRef: React.RefObject<ComponentInternals>;
}

export default function Tv( {viewRef, handleRef, tabsRef}: TvProps) {
    const list = useRef<ComponentInternals>(null);
    
    const [isPlaying, setIsPlaying] = useState(true);

    const programs = [
        {
            title: "Big Buck Bunny",
            src: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
            selected: true
        },
        {
            title: "Elephants Dream",
            src: "https://vod-dash-ww-rd-live.akamaized.net/elephants_dream/1/client_manifest-all.mpd",
            selected: false
        },
        {
            title: "Sintel",
            src: "https://bitdash-a.akamaihd.net/content/sintel/sintel.mpd",
            selected: false
        }
    ];

    const [dashPlayerSrc, setDashPlayerSrc] = useState(programs[0].src);
    const [programSelected, setProgramSelected] = useState(true);

    const handleItemClick = (item: ProgramItem) => {
        setDashPlayerSrc(item.src); // Assuming each ProgramItem has a 'src' property
        setProgramSelected(true);
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