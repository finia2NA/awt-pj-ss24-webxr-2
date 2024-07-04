import { useState, useRef } from 'react';
import { Container, ComponentInternals, Text } from "@react-three/uikit";
import DashPlayer from "../components/DashPlayer";
import { useServiceList } from '../hooks/useDVBI';
import ChannelList from '../components/ChannelList/ChannelList';
import useCurrentTime from '../hooks/useCurrentTime';

interface TvProps {
    viewRef: React.RefObject<ComponentInternals>;
    handleRef: React.RefObject<ComponentInternals>;
    tabsRef: React.RefObject<ComponentInternals>;
}

export default function Tv({ viewRef, handleRef, tabsRef }: TvProps) {
    const list = useRef<ComponentInternals>(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [selectedChannelNumber, setSelectedChannelNumber] = useState(13);
    const currentTime = useCurrentTime();

    const { services, loading, error } = useServiceList(true, true, new Date("2022-09-10T13:10:00Z"), new Date("2022-09-10T22:10:00Z"));

    if (loading) {
        return <Text>Loading</Text>
    }
    if (error) {
        return <Text>Error</Text>
    }

    function formatTime(date: Date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return (`${hours}:${minutes}`);
    }

    const channels = services.map((service) => {
        console.log(service.contentGuide?.programDescriptions[0]?.start);
        return {
            number: service.lcns[0].channelNumber,
            name: service.serviceName,
            description: service.contentGuide?.programDescriptions[0]?.title || "No Title Available",
            timeStart: service.contentGuide?.programDescriptions[0] ? formatTime(service.contentGuide?.programDescriptions[0]?.start) : "xx:xx",
            timeEnd: service.contentGuide?.programDescriptions[0] 
                ? formatTime(new Date(new Date(service.contentGuide?.programDescriptions[0]?.start).getTime() + service.contentGuide?.programDescriptions[0]?.durationMinutes * 60000)) 
                : "xx:xx",
            imageUrl: "TODO",
            src: service.dashStreams[0].manifestUrl,
        }
    });

    channels.sort((a, b) => a.number - b.number);
    let activeChannel = channels.find(channel => channel.number === selectedChannelNumber);
    
    const handleChannelClick = (channelID: number) => {
        const service = services.find((service) => service.lcns[0].channelNumber === channelID);
        if (service && service.dashStreams[0]) {
            setSelectedChannelNumber(channelID);
            activeChannel = channels.find(channel => channel.number === selectedChannelNumber);
        }
    }

    return (
        <Container flexDirection={"row"}>
            <Container flexDirection="column" alignContent={"center"}>
                <Container height={"auto"}>
                    <DashPlayer
                        src={activeChannel ? activeChannel.src : ''}
                        channelTitle={activeChannel ? activeChannel.name : 'Unknown Title'}
                        channelDescription={activeChannel ? activeChannel.description : 'No Description Available'}
                        channelNumber={activeChannel ? activeChannel.number : 0}
                        width={900}
                        playing={isPlaying}
                        viewRef={viewRef}
                        handleRef={handleRef}
                        tabsRef={tabsRef}
                        listRef={list} />
                </Container>
            </Container>
            <Container alignSelf={"center"} marginLeft={50} ref={list}>
                <ChannelList channels={channels} regions={["All Regions"]} time={currentTime} handleItemClick={handleChannelClick} selectedChannel={selectedChannelNumber} />
            </Container>
        </Container>
    );
}