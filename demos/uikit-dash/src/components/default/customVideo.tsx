import {
    Container,
    Video as VideoImpl,
    VideoProperties as BaseVideoProperties,
    Text,
    useVideoElement,
} from '@react-three/uikit';
import dashjs from 'dashjs';
import { MediaPlayerClass } from 'dashjs';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Button } from '../apfel/button';

export const DashVideo = forwardRef(({ src }: { src: string }) => {
    const [isPlaying, setIsPlaying] = useState(true); // State to track if the video is playing
    const playerRef = useRef<MediaPlayerClass | null>(null); // Reference to the Dash player instance

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

    return (
        <Container display="flex" flexDirection="column" backgroundColor="green" width={400}>
            <VideoImpl>
                <InsideVideo src={src} ref={playerRef} /> {/* Pass the player reference to InsideVideo */}
            </VideoImpl>
            <Button variant="pill" size="lg" platter onClick={togglePlayPause}>
                <Text>{isPlaying ? 'Pause' : 'Play'}</Text> {/* Button text changes based on the playing state */}
            </Button>
        </Container>
    );
});

export const InsideVideo = forwardRef(({ src }: { src: string }, ref: React.Ref<any>) => {
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
