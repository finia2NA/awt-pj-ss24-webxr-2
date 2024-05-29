import { useEffect, useState } from "react";
import { DashPlayerEventData, DashPlayerEvents } from "../enums/DashPlayerEvents";
import DashPlayer from "./DashPlayer";

export enum AmbientPlayerBlur {
    xs = "blur-[10px]",
    sm = "blur-[20px]",
    md = "blur-[40px]",
    lg = "blur-[60px]",
    xl = "blur-[80px]",
    "2xl" = "blur-[100px]",
    "3xl" = "blur-[120px]",
    "4xl" = "blur-[140px]",
    "5xl" = "blur-[160px]",
}

export interface AmbientPlayerProps {
    /**
   * The URL of the DASH manifest (MPD file)
   */
    src: string;
    /**
     * Whether the video should be paused, also functions as autoplay setting
     * Can be updated after the component is mounted
     */
    paused?: boolean;
    /**
     * Whether the video controls should be displayed
     */
    controls?: boolean;
    /**
     * Whether the video should be muted
     * Can be updated after the component is mounted
     */
    muted?: boolean;
    /**
     * Callback function that will be called when the playback state changes (e.g. pause/unpause or mute)
     */
    handlePlaybackUpdate?: (eventType: DashPlayerEvents, data?: DashPlayerEventData) => void
    /**
   * The current playback time of the video
   * Should only be included when onlyControlled is true
   * and this component effectively is a slave to another DashPlayer component (ambient player)
   */
    playbackTime?: number;
    /**
     * The playback rate of the video
     * Should only be included when onlyControlled is true
     * and this component effectively is a slave to another DashPlayer component (ambient player)
     */
    playbackRate?: number;
    /**
     * The amount of blur to apply to the background video in pixels
     * Default is Medium
     */
    blurAmount?: AmbientPlayerBlur;
    /**
     * Whether the blur effect should be toggled on or off
     * Default is true
     * Large performance impact since the video is rendered twice
     */
    blurToggle?: boolean;
}

// TODO: Add blur parameter so it can be changed from the parent component
const AmbientPlayer = ({ src, paused = true, controls = true, muted = false, handlePlaybackUpdate = () => { }, playbackTime = 0, playbackRate = 1, blurAmount = AmbientPlayerBlur.md, blurToggle = true }: AmbientPlayerProps) => {
    const [isPaused, setPaused] = useState<boolean>(paused);
    const [internalPlaybackTime, setPlaybackTime] = useState<number>(playbackTime);
    const [internalPlaybackRate, setPlaybackRate] = useState<number>(playbackRate);

    useEffect(() => {
        setPaused(paused);
    }, [paused]);

    useEffect(() => {
        setPlaybackTime(playbackTime);
    }, [playbackTime]);

    useEffect(() => {
        setPlaybackRate(playbackRate);
    }, [playbackRate]);

    function internalPlaybackUpdate(eventType: DashPlayerEvents, data?: DashPlayerEventData) {
        switch (eventType) {
            case DashPlayerEvents.PLAYBACK_PAUSED:
                setPaused(true);
                break;
            case DashPlayerEvents.PLAYBACK_PLAYING:
                setPaused(false);
                break;
            case DashPlayerEvents.PLAYBACK_SEEKING:
                if (!data || data?.type !== 'time') return;
                setPlaybackTime(data!.data as number);
                break;
            case DashPlayerEvents.PLAYBACK_RATE_CHANGED:
                if (!data || data?.type !== 'rate') return;
                setPlaybackRate(data!.data as number);
                break;
            default:
                // Handle any other cases or do nothing
                break;
        }
        handlePlaybackUpdate(eventType, data);
    }

    const blurClassName = `absolute z-10 w-full h-auto top-0 bottom-0 left-0 right-0 m-auto ${blurAmount}`
    const blurPlayer = (blurToggle ?
        <DashPlayer className={blurClassName} src={src} paused={isPaused} muted={true} handlePlaybackUpdate={internalPlaybackUpdate} onlyControlled={true} playbackTime={internalPlaybackTime} playbackRate={internalPlaybackRate} controls={false} />
        : null)

    return (
        <div className="w-[800px] h-[500px] relative">
            {blurPlayer}
            <DashPlayer className="absolute z-20 w-11/12 h-auto top-0 bottom-0 left-0 right-0 m-auto" src={src} paused={isPaused} muted={muted} handlePlaybackUpdate={internalPlaybackUpdate} controls={controls} playbackTime={internalPlaybackTime} playbackRate={internalPlaybackRate} />
        </div>
    )
}

export default AmbientPlayer;