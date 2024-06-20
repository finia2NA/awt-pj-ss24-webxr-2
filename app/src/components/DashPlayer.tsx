import {
    Container,
    Video as VideoImpl,
    useVideoElement as useVideoElement,
} from '@react-three/uikit';
import dashjs from 'dashjs';
import { MediaPlayerClass } from 'dashjs';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PlaybackControls from '../windows/PlaybackControls';

// Here we should also define the props properly
// Currently, this is somewhat badly typed
const DashPlayer = forwardRef(({ src, width, playing = true }: { src: string, width: number, playing: boolean }) => {
    const [isPlaying, setIsPlaying] = useState(true); // State to track if the video is playing
    const playerRef = useRef<MediaPlayerClass | null>(null); // Reference to the Dash player instance

    // This should then be done based on state changes
    // so playing should be a state in the parent component
    // and we react to changes in the state using useEffect
    const togglePlayPause = () => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.pause(); // Pause the video if it's currently playing
            } else {
                playerRef.current.play(); // Play the video if it's currently paused
            }
            setIsPlaying(!isPlaying); // Toggle the playing state
        }
    };

    const toggleChannelList = () => {
        throw new Error('Not implemented');
    }

    const toggleCaptions = () => {
        throw new Error('Not implemented');
    }

    useEffect(() => {
        playing ? playerRef.current?.play() : playerRef.current?.pause();
    }, [playing]);

    return (
        <Container flexDirection={"column"} alignContent={"center"}>
            <Container width={width} height={"auto"} alignSelf={"center"}>
                <Container width={width} display={"flex"} flexDirection={"column"} alignContent={"center"}>
                    <VideoImpl borderRadius={6}>
                        <Container>
                            <InsideVideo src={src} ref={playerRef} />
                        </Container>
                    </VideoImpl>
                </Container>
            </Container>
            <Container alignSelf={"center"} height={"auto"} marginTop={-20}>
                <PlaybackControls channel={0} setChannel={() => { }} channelImageSrc={""} channelTitle={"Big Buck Bunny"} channelDescription={"Description"} togglePlayPause={togglePlayPause} isPlaying={isPlaying} toggleChannelList={toggleChannelList} toggleCaptions={toggleCaptions} />
            </Container>
        </Container>
    );
});

interface InsideVideoRef {
    play: () => void;
    pause: () => void;
}

export const InsideVideo = forwardRef(({ src }: { src: string }, ref: React.Ref<InsideVideoRef>) => {
    const videoElement = useVideoElement(); // Hook to get the video element
    const videoRef = useRef<HTMLVideoElement | null>(null); // Reference to the HTML video element
    const playerRef = useRef<MediaPlayerClass | null>(null); // Reference to the Dash player instance

    useImperativeHandle(ref, () => ({
        play: () => {
            playerRef.current?.play(); // Expose play method to the parent component
        },
        pause: () => {
            playerRef.current?.pause(); // Expose pause method to the parent component
        },
    }));

    useEffect(() => {
        videoRef.current = videoElement;
        if (videoRef.current) {
            playerRef.current = dashjs.MediaPlayer().create(); // Create Dash player instance
            playerRef.current.initialize(videoRef.current, src, true); // Initialize the Dash player with the video source
            playerRef.current.setMute(true); // Mute the video
        }
    }, [src, videoElement]); // Re-run effect when src or videoElement changes

    return <></>; // Return an empty fragment as this component does not render anything itself
});

export default DashPlayer;