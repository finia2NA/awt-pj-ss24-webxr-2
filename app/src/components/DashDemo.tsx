import { useState } from 'react';
import DashPlayer from './DashPlayer';
import { DashPlayerEventData, DashPlayerEvents } from '../enums/DashPlayerEvents';

const DashDemo = () => {
    const [isPaused, setPaused] = useState<boolean>(true);
    const [isMuted, setMuted] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(1);

    function handlePlaybackUpdate(eventType: DashPlayerEvents, data?: DashPlayerEventData) {
        switch (eventType) {
            case DashPlayerEvents.MUTED:
                setMuted(true);
                break;
            case DashPlayerEvents.UNMUTED:
                setMuted(false);
                break;
            case DashPlayerEvents.PLAYBACK_PAUSED:
                setPaused(true);
                break;
            case DashPlayerEvents.PLAYBACK_PLAYING:
                setPaused(false);
                break;
            case DashPlayerEvents.VOLUME_CHANGED:
                if (!data || data?.type !== 'volume') return;
                setVolume(data!.data as number);
                console.log(`Volume changed to: ${data!.data}`)
                break;
            default:
                // Handle any other cases or do nothing
                break;
        }
    }

    return (
        <>
            <button onClick={() => setPaused(!isPaused)}>Pause / unpause</button>
            <button onClick={() => setMuted(!isMuted)}>Mute / unmute</button>
            <DashPlayer src="https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd" paused={isPaused} muted={isMuted} handlePlaybackUpdate={handlePlaybackUpdate} />
        </>
    )
};

export default DashDemo;