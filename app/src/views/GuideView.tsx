import { useState, useRef, useEffect } from 'react';
import { Container, ComponentInternals, Text } from "@react-three/uikit";
import DashPlayer from "../components/DashPlayer";
import { useServiceList } from '../hooks/useDVBI';
import ChannelList from '../components/ChannelList/ChannelList';
import useCurrentTime from '../hooks/useCurrentTime';
import GuideWindow from '../components/Guide/GuideWindow';
import { ProgramSchedule } from '../components/Guide/Guide';
import { alterDateDays, getDateISO } from '../utils/dateHelpers';
import { formatTime } from '../utils/dateHelpers';

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
    const defaultDate = new Date("2022-09-10");
    const [date, setDate] = useState(new Date("2022-09-10"));

    const currentTime = useCurrentTime();

    let { services, loading, error } = useServiceList(true, true, new Date(getDateISO(alterDateDays(date, -1)) + "T22:00:00Z"), new Date(getDateISO(date) + "T21:59:59Z"));

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
            //imageUrl: service.logoUrl || "",
            fallbackText: service.serviceName || "No name available",
            schedule: scheduleEntries || [],
            serviceId: service.serviceID || "",
        }

        return generatedSchedule;
    });

    return (
        <GuideWindow time={currentTime} regions={["All Regions"]} schedule={schedule} width={900} defaultZoomLevel={1} overrideStartTime={currentTime} date={date} setDate={setDate} loading={loading} error={error ? true : false} defaultDate={defaultDate} />
    );
}