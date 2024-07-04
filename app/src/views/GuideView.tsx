import { useState, useRef } from 'react';
import { Container, ComponentInternals, Text } from "@react-three/uikit";
import DashPlayer from "../components/DashPlayer";
import { useServiceList } from '../hooks/useDVBI';
import ChannelList from '../components/ChannelList/ChannelList';
import useCurrentTime from '../hooks/useCurrentTime';
import GuideWindow from '../components/Guide/GuideWindow';
import { ProgramSchedule } from '../components/Guide/Guide';

interface TvProps {
    viewRef: React.RefObject<ComponentInternals>;
    handleRef: React.RefObject<ComponentInternals>;
    tabsRef: React.RefObject<ComponentInternals>;
}

export default function GuideView({ viewRef, handleRef, tabsRef }: TvProps) {
    const list = useRef<ComponentInternals>(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [selectedChannelNumber, setSelectedChannelNumber] = useState(13);
    const currentTime = useCurrentTime();

    const { services, loading, error } = useServiceList(true, true, new Date("2022-09-10T13:10:00Z"), new Date("2022-09-10T21:59:59Z"));

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

    services.sort((a, b) => a.lcns[0].channelNumber - b.lcns[0].channelNumber);

    const schedule: ProgramSchedule[] = services.map((service) => {
        let scheduleEntries = service.contentGuide?.programDescriptions.map((program) => {
            if (program.title.startsWith('Der Humboldtstrom')) console.log(new Date(new Date(program.start)));
            if (program.title.startsWith('Der Humboldtstrom')) console.log(formatTime(program.start));
            return {
                title: program.title,
                startTime: formatTime(program.start),
                endTime: formatTime(new Date(new Date(program.start).getTime() + program.durationMinutes * 60000)),
            }
        });

        let generatedSchedule: ProgramSchedule = {
            imageUrl: "",
            fallbackText: service.serviceName || "No name available",
            schedule: scheduleEntries || [],
        }

        return generatedSchedule;
    });

    return (
        <GuideWindow time={currentTime} regions={["All Regions"]} schedule={schedule} width={900} zoomLevel={1}/>
    );
}