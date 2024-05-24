import { useState } from 'react';
import DashPlayer from './DashPlayer';
import { DashPlayerEventData, DashPlayerEvents } from '../enums/DashPlayerEvents';

const DashDemo = () => {
    const [isPaused, setPaused] = useState<boolean>(false);
    const [isMuted, setMuted] = useState<boolean>(true);
    const [volume, setVolume] = useState<number>(1);
    // TODO: Add playback sync between the two players

    // TODO: Change this for the background player
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
            <div className="w-[800px] h-[500px] relative">
                <DashPlayer className="absolute z-10 w-full h-auto top-0 bottom-0 left-0 right-0 m-auto blur-3xl" src="https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd" paused={isPaused} muted={true} handlePlaybackUpdate={handlePlaybackUpdate} />
                <DashPlayer className="absolute z-20 w-11/12 h-auto top-0 bottom-0 left-0 right-0 m-auto" src="https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd" paused={isPaused} muted={isMuted} handlePlaybackUpdate={handlePlaybackUpdate} />
            </div>
        </>
    )
};

export default DashDemo;