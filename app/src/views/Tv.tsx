import { useState, useRef } from 'react';
import { Container, ComponentInternals, Text } from "@react-three/uikit";
import DashPlayer from "../components/DashPlayer";
import { useServiceList } from '../hooks/useDVBI';
import ChannelList from '../components/ChannelList/ChannelList';
import useCurrentTime from '../hooks/useCurrentTime';
import { alterDateDays, getDateISO } from '../utils/dateHelpers';

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

    const date = new Date("2022-09-10");
    const { services, loading, error } = useServiceList(true, true, new Date(getDateISO(alterDateDays(date, -1)) + "T22:00:00Z"), new Date(getDateISO(date) + "T21:59:59Z"));
    //const { services, loading, error } = useServiceList(true, true, new Date("2022-09-10T13:10:00Z"), new Date("2022-09-10T22:10:00Z"));

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
        const programInfos = {
            description: "No Title Available",
            timeStart: "xx:xx",
            timeEnd: "xx:xx",
        }

        service.contentGuide?.programDescriptions.forEach((program) => {
            if (formatTime(program.start) < currentTime && currentTime < formatTime(new Date(new Date(program.start).getTime() + program.durationMinutes * 60000))) {
                programInfos.description = program.title;
                programInfos.timeStart = formatTime(program.start);
                programInfos.timeEnd = formatTime(new Date(new Date(program.start).getTime() + program.durationMinutes * 60000));
            }
        });

        return {
            number: service.lcns[0].channelNumber,
            name: service.serviceName,
            description: programInfos.description,
            timeStart: programInfos.timeStart,
            timeEnd: programInfos.timeEnd,
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