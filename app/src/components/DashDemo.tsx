import { useState } from 'react';
import DashPlayer from './DashPlayer';

const DashDemo = () => {
    const [isPaused, setPaused] = useState<boolean>(true);
    const [isMuted, setMuted] = useState<boolean>(false);
    
    return (
        <>
        <button onClick={() => setPaused(!isPaused)}>Pause / unpause</button>
        <button onClick={() => setMuted(!isMuted)}>Mute / unmute</button>
        <DashPlayer src="https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd" paused={isPaused} muted={isMuted} />
        </>
    )
};

export default DashDemo;