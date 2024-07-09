import {
    Container,
    Video as VideoImpl,
    useVideoElement as useVideoElement,
    ComponentInternals
} from '@react-three/uikit';
import dashjs from 'dashjs';
import { MediaPlayerClass } from 'dashjs';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PlaybackControls from '../windows/PlaybackControls';
import { Vector3 } from 'three';
import { ThreeEvent } from "@react-three/fiber";
import { isXIntersection } from "@coconut-xr/xinteraction";


interface DashPlayerProps {

    // Info
    src: string;
    channelTitle: string;
    channelDescription: string;
    channelNumber: number;
    channelImageSrc?: string;

    // Internal
    width: number;
    viewRef: React.RefObject<ComponentInternals>;
    handleRef: React.RefObject<ComponentInternals>;
    tabsRef: React.RefObject<ComponentInternals>;
    listRef: React.RefObject<ComponentInternals>;
    playing?: boolean;

    // Channel control
    tuneUpDown: (direction: number) => void;
    toggleChannelList?: () => void;

    // Event handling
    onPlaybackError?: (error: dashjs.ErrorEvent) => void;
}

// Here we should also define the props properly
// Currently, this is somewhat badly typed
const DashPlayer = forwardRef(({ src, channelTitle, channelDescription, channelNumber, channelImageSrc, width, viewRef, handleRef, tabsRef, listRef, tuneUpDown, toggleChannelList, playing = true, onPlaybackError = () => { } }: DashPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(true); // State to track if the video is playing
    const [isMuted, setIsMuted] = useState(true); // State to track if the video is muted
    const playerRef = useRef<InsideVideoRef | null>(null); // Reference to the Dash player instance

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

    const toggleMute = () => {
        if (playerRef.current) {
            if (isMuted) {
                playerRef.current.unmute(); // Unmute the video if it's currently muted
            } else {
                playerRef.current.mute(); // Mute the video if it's currently unmuted
            }
            setIsMuted(!isMuted); // Toggle the muted state
        }
    }

    const toggleCaptions = () => {
        throw new Error('Not implemented');
    }

    useEffect(() => {
        playing ? playerRef.current?.play() : playerRef.current?.pause();
    }, [playing]);

    const video = useRef<ComponentInternals>(null);
    const controls = useRef<ComponentInternals>(null);
    const resize = useRef<ComponentInternals>(null);
    const downState = useRef<{
        pointerId: number;
        point: Vector3;
        scale: Vector3;
    }>();

    const handleResizePointerDown = (e: ThreeEvent<PointerEvent>) => {
        if (
            resize.current != null &&
            viewRef.current != null &&
            downState.current == null &&
            isXIntersection(e)
        ) {
            e.stopPropagation();
            (e.target as HTMLElement).setPointerCapture(e.pointerId);

            let x = viewRef.current.getComputedProperty("transformScaleX") || 1;
            let y = viewRef.current.getComputedProperty("transformScaleY") || 1;
            let z = viewRef.current.getComputedProperty("transformScaleZ") || 1;

            let scale = new Vector3(x, y, z);

            downState.current = {
                pointerId: e.pointerId,
                point: e.point,
                scale: scale
            };
        }
    };

    const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
        if (downState.current?.pointerId != e.pointerId) {
            return;
        }
        downState.current = undefined;
    };

    const handleResizePointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (
            handleRef.current == null ||
            resize.current == null ||
            viewRef.current == null ||
            video.current == null ||
            controls.current == null ||
            tabsRef.current == null ||
            listRef.current == null ||
            downState.current == null ||
            e.pointerId != downState.current.pointerId ||
            !isXIntersection(e)
        ) {
            return;
        }

        const ratio = video.current.size.v[0] / video.current.size.v[1];

        let delta = downState.current.point.clone().sub(e.point)

        let scaledDelta = new Vector3(-delta.x, delta.y, delta.z);
        let newScale = downState.current.scale.clone().add(scaledDelta);
        newScale.y = newScale.x / 2 * ratio;

        // enforce min/max size
        const newSizeX = newScale.x * viewRef.current.size.v[0];
        if ((newSizeX < 2000) || (newSizeX > 3500)) {
            return;
        }

        viewRef.current.setStyle({
            ...viewRef.current.getStyle(),  // Preserve other styles
            ...{ transformScaleX: newScale.x, transformScaleY: newScale.y, transformScaleZ: 1 }
        });

        let deltaY = (controls.current.size.v[1] - (controls.current.size.v[1] * 1 / newScale.y)) / 2;
        let listDeltaX = (listRef.current.size.v[0] - (listRef.current.size.v[0] * 1 / newScale.x)) / 2;
        let tabsDeltaX = (tabsRef.current.size.v[0] - (tabsRef.current.size.v[0] * 1 / newScale.x)) / 2;
        // ^-NOTE: (old width/height - new width/height) / 2 (because it grows/shrinks from both directions)

        // preserve size of other components
        handleRef.current.setStyle({ transformTranslateY: -deltaY, transformScaleX: 1 / newScale.x, transformScaleY: 1 / newScale.y, transformScaleZ: 1 });
        resize.current.setStyle({ transformScaleX: 1 / newScale.x, transformScaleY: 1 / newScale.y, transformScaleZ: 1 });
        controls.current.setStyle({ transformScaleX: 1 / newScale.x, transformScaleY: 1 / newScale.y, transformScaleZ: 1 });
        tabsRef.current.setStyle({ transformTranslateX: tabsDeltaX, transformScaleX: 1 / newScale.x, transformScaleY: 1 / newScale.y, transformScaleZ: 1 });
        listRef.current.setStyle({ transformTranslateX: -listDeltaX, transformScaleX: 1 / newScale.x, transformScaleY: 1 / newScale.y, transformScaleZ: 1 });
    };

    return (
        <Container flexDirection={"column"} alignContent={"center"}>
            <Container flexDirection={"column"} width={width} height={"auto"} alignSelf={"center"}>
                <Container ref={video} width={width} display={"flex"} flexDirection={"column"} alignContent={"center"}>
                    <VideoImpl borderRadius={6}>
                        <Container>
                            <InsideVideo src={src} ref={playerRef} isMuted={isMuted} setIsMuted={setIsMuted} onError={onPlaybackError} />
                        </Container>
                    </VideoImpl>
                </Container>
            </Container>
            <Container
                backgroundColor={"red"}
                height={25} width={25}
                alignSelf={"flex-end"}
                marginTop={-25}
                zIndexOffset={1}
                ref={resize}
                onPointerDown={handleResizePointerDown}
                onPointerUp={handlePointerUp}
                onPointerMove={handleResizePointerMove}
            />
            <Container alignSelf={"center"} height={"auto"} marginTop={-20} ref={controls}>
                <PlaybackControls channel={channelNumber} setChannel={() => { }} channelImageSrc={channelImageSrc} channelTitle={channelTitle} channelDescription={channelDescription} togglePlayPause={togglePlayPause} isPlaying={isPlaying} toggleChannelList={toggleChannelList} toggleCaptions={toggleCaptions} isMuted={isMuted} toggleMute={toggleMute} tuneUpDown={tuneUpDown} />
            </Container>
        </Container>
    );
});

interface InsideVideoRef {
    play: () => void;
    pause: () => void;
    mute: () => void;
    unmute: () => void;
}

interface InsideVideoProps {
    src: string;
    isMuted: boolean;
    setIsMuted: (isMuted: boolean) => void;
    onError?: (error: dashjs.ErrorEvent) => void;
}
const InsideVideo = forwardRef(({ src, isMuted, setIsMuted, onError = () => { } }: InsideVideoProps, ref: React.Ref<InsideVideoRef>) => {
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
        mute: () => {
            playerRef.current?.setMute(true); // Expose mute method to the parent component
            setIsMuted(true); // Update the isMuted state
        },
        unmute: () => {
            playerRef.current?.setMute(false); // Expose unmute method to the parent component
            setIsMuted(false); // Update the isMuted state
        }
    }));

    useEffect(() => {
        videoRef.current = videoElement;
        if (videoRef.current) {
            playerRef.current = dashjs.MediaPlayer().create(); // Create Dash player instance
            playerRef.current.initialize(videoRef.current, src, true); // Initialize the Dash player with the video source
            playerRef.current.setMute(isMuted); // Mute the video

            playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_NOT_ALLOWED, function () {
                console.log('Playback did not start due to auto play restrictions. Muting audio and reloading');
                if (playerRef.current && videoRef.current) {
                    playerRef.current.setMute(true);
                    setIsMuted(true);
                    playerRef.current.initialize(videoRef.current, src, true);
                }
            });

            // Add event listener for when there is an error. PLAYBACK_ERROR doesn't work here with a 404 apparently
            // Important to note: It tries four times to load the video before giving up and throwing an error
            // Error codes from testing (didn't find any documentation on this):
            // 25: Not Found (404)
            playerRef.current.on(dashjs.MediaPlayer.events.ERROR, function (e) {
                console.error('A playback error occurred', e);
                onError(e);
            });
        }
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy(); // Destroy the Dash player instance
                playerRef.current = null;
            }
        };
    }, [isMuted, onError, setIsMuted, src, videoElement]);

    return <></>; // Return an empty fragment as this component does not render anything itself
});

export default DashPlayer;