import { useState, useRef } from 'react';
import { Container, ComponentInternals, Text } from "@react-three/uikit";
import DashPlayer from "../components/DashPlayer";
import { useServiceList } from '../hooks/useDVBI';
import ChannelList from '../components/ChannelList/ChannelList';
import useCurrentTime from '../hooks/useCurrentTime';
import { alterDateDays, getDateISO } from '../utils/dateHelpers';
import useRoutingStore from '../hooks/useRoutingStore';
import useRecentChannelsStore from '../hooks/useRecentChannelsStore';
import { Card } from '../components/apfel/card';
import useColors from '../hooks/useColors';

interface TvProps {
    viewRef: React.RefObject<ComponentInternals>;
    handleRef: React.RefObject<ComponentInternals>;
    tabsRef: React.RefObject<ComponentInternals>;
}

export default function Tv({ viewRef, handleRef, tabsRef }: TvProps) {
    const { tunedChannel, setTunedChannel } = useRoutingStore();
    const { addRecentChannelToFrontByID } = useRecentChannelsStore();
    const list = useRef<ComponentInternals>(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const currentTime = useCurrentTime();
    const colors = useColors();

    // Note to F: I set those dates as default when no date is given now, so no more need to pass them here. (I did this so we always use the same dates) - R
    const { services, loading, error } = useServiceList(true, true);
    //const { services, loading, error } = useServiceList(true, true, new Date("2022-09-10T13:10:00Z"), new Date("2022-09-10T22:10:00Z"));
    const [dashError, setDashError] = useState(false);

    if (loading) {
        return (
            <Card display={"flex"} justifyContent={"center"} alignItems={"center"} height={600} width={800} backgroundColor={colors.background} >
                <Text fontSize={30} fontWeight={"medium"} color={colors.primary} >Loading...</Text>
            </Card>
        )
    }
    if (error) {
        return (
            <Card display={"flex"} justifyContent={"center"} alignItems={"center"} height={600} width={800} backgroundColor={"red"} >
                <Text fontSize={30} fontWeight={"medium"} color={colors.primary}>Error loading channels</Text>
            </Card>
        )
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

        // debugger;
        service.contentGuide?.programDescriptions.forEach((program) => {
            if (formatTime(program.start) <= currentTime && currentTime < formatTime(new Date(new Date(program.start).getTime() + program.durationMinutes * 60000))) {
                programInfos.description = program.title;
                programInfos.timeStart = formatTime(program.start);
                programInfos.timeEnd = formatTime(new Date(new Date(program.start).getTime() + program.durationMinutes * 60000));
            }
        });

        return {
            number: service.lcns[0].channelNumber,
            id: service.serviceID,
            name: service.serviceName,
            description: programInfos.description,
            timeStart: programInfos.timeStart,
            timeEnd: programInfos.timeEnd,
            imageUrl: service.logoUrl,
            src: service.dashStreams[0].manifestUrl,
        }
    });

    channels.sort((a, b) => a.number - b.number);
    let activeChannel = channels.find(channel => channel.id === tunedChannel);

    const handleChannelClick = (channelNumber: number, channelId: string) => {
        const service = services.find((service) => service.lcns[0].service?.serviceID === channelId);
        if (service && service.dashStreams[0]) {
            activeChannel = channels.find(channel => channel.id === channelId);
            setDashError(false);
            setTunedChannel(channelId);
            addRecentChannelToFrontByID(channelId);
        }
    }

    const handleTuneUpDown = (direction: number) => {
        if (!activeChannel) return;
        const index = channels.findIndex(channel => activeChannel && channel.id === activeChannel.id);
        const newIndex = index + direction % channels.length;
        const newChannel = channels[newIndex];
        setDashError(false);
        setTunedChannel(newChannel.id);
        addRecentChannelToFrontByID(newChannel.id);
    }

    const handleError = () => {
        setDashError(true);
    }


    return (
        <Container flexDirection={"row"} alignContent={"center"}>
            <Container height={"auto"} width={"auto"}>
                {dashError ? 
                    <Card display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={600} width={800} backgroundColor={"red"} >
                        <Text fontSize={30} fontWeight={"medium"}>Error playing channel</Text>
                        <Text fontSize={28} fontWeight={"normal"}>Please select a different channel</Text>
                    </Card> :
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
                        listRef={list}
                        tuneUpDown={handleTuneUpDown}
                        onPlaybackError={handleError}
                    />
                }
            </Container>
            <Container alignSelf={"center"} marginLeft={50} ref={list}>
                <ChannelList channels={channels} regions={["All Regions"]} time={currentTime} handleItemClick={handleChannelClick} selectedChannel={tunedChannel!} />
            </Container>
        </Container>
    );
}