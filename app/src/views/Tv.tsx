import { useState } from 'react';
import { Container, ComponentInternals, Text } from "@react-three/uikit";
import DashPlayer from "../components/DashPlayer";
import { useServiceList } from '../hooks/useDVBI';
import ChannelList from '../components/ChannelList/ChannelList';
import useCurrentTime from '../hooks/useCurrentTime';
import useRoutingStore from '../hooks/useRoutingStore';
import useRecentChannelsStore from '../hooks/useRecentChannelsStore';
import { Card } from '../components/apfel/card';
import useColors from '../hooks/useColors';
import { Service } from '../lib/model/services';

interface TvProps {
    viewRef: React.RefObject<ComponentInternals>;
}

interface TvPanelMessageProps {
    title: string;
    description?: string;
    width: number;
    backgroundColor?: string;
}

const INITIAL_PLAYER_WIDTH = 900;
const MIN_PLAYER_WIDTH = 650;
const MAX_PLAYER_WIDTH = 1400;

function TvPanelMessage({ title, description, width, backgroundColor }: TvPanelMessageProps) {
    const colors = useColors();

    return (
        <Card
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            height={width * 2 / 3}
            width={width}
            backgroundColor={backgroundColor ?? colors.background}
        >
            <Text fontSize={30} fontWeight={"medium"} color={colors.primary}>{title}</Text>
            {description && <Text fontSize={28} fontWeight={"normal"} color={colors.primary}>{description}</Text>}
        </Card>
    );
}

export default function Tv({ viewRef }: TvProps) {
    const { tunedChannel, setTunedChannel } = useRoutingStore();
    const { addRecentChannelToFrontByID } = useRecentChannelsStore();

    const [showChannelList, setShowChannelList] = useState(true);
    const [playerWidth, setPlayerWidth] = useState(INITIAL_PLAYER_WIDTH);
    const currentTime = useCurrentTime();

    const { services, loading, error } = useServiceList(true, true);
    const [dashError, setDashError] = useState(false);

    function formatTime(date: Date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return (`${hours}:${minutes}`);
    }

    function getPreferredStream(service: Service) {
        return service.hlsStreams[0] ?? service.dashStreams[0];
    }

    const channels = services.filter(getPreferredStream).map((service) => {
        const stream = getPreferredStream(service);
        const programInfos = {
            description: "No Title Available",
            timeStart: "xx:xx",
            timeEnd: "xx:xx",
        }

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
            src: stream.manifestUrl,
        }
    });

    channels.sort((a, b) => a.number - b.number);
    let activeChannel = channels.find(channel => channel.id === tunedChannel);

    const handleChannelClick = (channelNumber: number, channelId: string) => {
        const service = services.find((service) => service.lcns[0].service?.serviceID === channelId);
        if (service && getPreferredStream(service)) {
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

    const toggleChannelList = () => {
        setShowChannelList(prev => !prev);
    }

    const renderPanel = () => {
        if (loading) {
            return <TvPanelMessage title={"Loading channels..."} description={"Fetching the DVB-I service list"} width={playerWidth} />;
        }

        if (error) {
            return <TvPanelMessage title={"Error loading channels"} description={"Please check the DVB-I service list URL"} width={playerWidth} backgroundColor={"red"} />;
        }

        if (dashError) {
            return (
                <DashPlayer
                    src={''}
                    statusTitle={"Error playing channel"}
                    statusDescription={"Please select a different channel"}
                    statusBackgroundColor={"red"}
                    channelTitle={activeChannel ? activeChannel.name : 'Unknown Title'}
                    channelDescription={activeChannel ? activeChannel.description : 'No Description Available'}
                    channelNumber={activeChannel ? activeChannel.number : 0}
                    width={playerWidth}
                    minWidth={MIN_PLAYER_WIDTH}
                    maxWidth={MAX_PLAYER_WIDTH}
                    onResize={setPlayerWidth}
                    channelImageSrc={activeChannel?.imageUrl || undefined}
                    viewRef={viewRef}
                    tuneUpDown={handleTuneUpDown}
                    toggleChannelList={toggleChannelList}
                    onPlaybackError={handleError}
                />
            );
        }

        return (
            <DashPlayer
                src={activeChannel ? activeChannel.src : ''}
                channelTitle={activeChannel ? activeChannel.name : 'Unknown Title'}
                channelDescription={activeChannel ? activeChannel.description : 'No Description Available'}
                channelNumber={activeChannel ? activeChannel.number : 0}
                width={playerWidth}
                minWidth={MIN_PLAYER_WIDTH}
                maxWidth={MAX_PLAYER_WIDTH}
                onResize={setPlayerWidth}
                channelImageSrc={activeChannel?.imageUrl || undefined}
                viewRef={viewRef}
                tuneUpDown={handleTuneUpDown}
                toggleChannelList={toggleChannelList}
                onPlaybackError={handleError}
            />
        );
    }

    return (
        <Container flexDirection={"row"} alignContent={"center"}>
            <Container height={"auto"} width={"auto"}>
                {renderPanel()}
            </Container>
            <Container alignSelf={"center"} marginLeft={50}>
                {showChannelList && !loading && !error &&
                    <ChannelList channels={channels} regions={["All Regions"]} time={currentTime} handleItemClick={handleChannelClick} selectedChannel={tunedChannel!} />
                }
            </Container>
        </Container>
    );
}
