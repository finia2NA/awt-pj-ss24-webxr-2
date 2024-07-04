import { useState, useRef } from 'react';
import { Container, ComponentInternals, Text } from "@react-three/uikit";
import DashPlayer from "../components/DashPlayer";
import { useServiceList } from '../hooks/useDVBI';
import ChannelList from '../components/ChannelList/ChannelList';
import useCurrentTime from '../hooks/useCurrentTime';
import GuideWindow from '../components/Guide/GuideWindow';
import { ProgramSchedule } from '../components/Guide/Guide';
import { alterDateDays, getDateISO } from '../utils/dateHelpers';

interface TvProps {
    viewRef: React.RefObject<ComponentInternals>;
    handleRef: React.RefObject<ComponentInternals>;
    tabsRef: React.RefObject<ComponentInternals>;
}

export default function GuideView({ viewRef, handleRef, tabsRef }: TvProps) {
    /**
     * Hardcoded date for testing purposes
     * since we don't have real-time data
     */
    const [date, setDate] = useState(new Date("2022-09-10"));
    
    const currentTime = useCurrentTime();

    const { services, loading, error } = useServiceList(true, true, new Date(getDateISO(alterDateDays(date, -1)) + "T22:00:00Z"), new Date(getDateISO(date) + "T21:59:59Z"));

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
        const scheduleEntries = service.contentGuide?.programDescriptions.map((program) => {
            return {
                title: program.title,
                startTime: formatTime(program.start),
                endTime: formatTime(new Date(new Date(program.start).getTime() + program.durationMinutes * 60000)),
            }
        });

        const generatedSchedule: ProgramSchedule = {
            imageUrl: "",
            fallbackText: service.serviceName || "No name available",
            schedule: scheduleEntries || [],
        }

        return generatedSchedule;
    });

    return (
        <GuideWindow time={currentTime} regions={["All Regions"]} schedule={schedule} width={900} zoomLevel={1} overrideStartTime='15:00' />
    );
}