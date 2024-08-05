import {
    Container,
    Image,
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

    // Channel control
    tuneUpDown: (direction: number) => void;
    toggleChannelList?: () => void;

    // Event handling
    onPlaybackError?: (error: dashjs.ErrorEvent) => void;
}

const DashPlayer = forwardRef(({ src, channelTitle, channelDescription, channelNumber, channelImageSrc, width, viewRef, handleRef, tabsRef, listRef, tuneUpDown, toggleChannelList, onPlaybackError = () => { } }: DashPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(true); // State to track if the video is playing
    const [isMuted, setIsMuted] = useState(false); // State to track if the video is muted

    // This should then be done based on state changes
    // so playing should be a state in the parent component
    // and we react to changes in the state using useEffect
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying); // Toggle the playing state
    };

    const toggleMute = () => {
        setIsMuted(curr => !curr); // Toggle the muted state
    };

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
                            <InsideVideo src={src} isMuted={isMuted} isPlaying={isPlaying} setIsMuted={setIsMuted} onError={onPlaybackError} />
                        </Container>
                    </VideoImpl>
                </Container>
            </Container>
            <Image
                src={"src/assets/resize_chevron.png"}
                height={20} width={20}
                alignSelf={"flex-end"}
                marginTop={-15}
                marginRight={-5}
                zIndexOffset={1}
                ref={resize}
                onPointerDown={handleResizePointerDown}
                onPointerUp={handlePointerUp}
                onPointerMove={handleResizePointerMove}
            />
            <Container alignSelf={"center"} height={"auto"} marginTop={-20} ref={controls}>
                <PlaybackControls channel={channelNumber} setChannel={() => { }} channelImageSrc={channelImageSrc} channelTitle={channelTitle} channelDescription={channelDescription} togglePlayPause={togglePlayPause} isPlaying={isPlaying} toggleChannelList={toggleChannelList} isMuted={isMuted} toggleMute={toggleMute} tuneUpDown={tuneUpDown} />
            </Container>
        </Container>
    );
});

interface InsideVideoProps {
    src: string;
    isMuted: boolean;
    isPlaying: boolean;
    setIsMuted: (isMuted: boolean) => void;
    onError?: (error: dashjs.ErrorEvent) => void;
}
const InsideVideo = ({ src, isMuted, isPlaying, setIsMuted, onError = () => { } }: InsideVideoProps) => {
    const videoElement = useVideoElement(); // Hook to get the video element
    const videoRef = useRef<HTMLVideoElement | null>(null); // Reference to the HTML video element
    const playerRef = useRef<MediaPlayerClass | null>(null); // Reference to the Dash player instance
    const expectVolumeChange = useRef(false);

    // Effect that initializes the Dash player
    // This effect will run when the component is mounted or when src changes
    // It considers isMuted and isPlaying states
    useEffect(() => {
        videoRef.current = videoElement;
        if (videoRef.current) {
            playerRef.current = dashjs.MediaPlayer().create(); // Create Dash player instance
            playerRef.current.initialize(videoRef.current, src, true); // Initialize the Dash player with the video source
            playerRef.current.setMute(isMuted); // Mute the video if asked to do so

            console.log(playerRef.current); // Debug logging to be able to call functions on the DASH Player

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

            // Try to remedy the fact that the player sometimes unmutes itself
            playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_VOLUME_CHANGED, function (e) {
                handleVolumeChange(e);
            });
        }

        // Cleanup function
        // This will be called when the component is unmounted and destroys the player instance
        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [src]);

    /**
     * Function to handle volume change event from DASH
     * Is only needed to prevent the player from randomly unmuting itself. Sometimes it still does though
     * It isn't clear why this is happening, as it apparently isn't re-rendering
     */
    function handleVolumeChange(e: dashjs.Event) {
        console.log('Volume changed', e, 'expecting volume change:', expectVolumeChange.current, "isMuted:", isMuted);
        if (expectVolumeChange.current) {
            console.log("Expected volume change");
            expectVolumeChange.current = false;
        } else {
            console.log("Unexpected volume change");
            expectVolumeChange.current = false;
            if (playerRef.current) {
                console.log("Setting mute after unexpected volume change to ", isMuted);
                playerRef.current.setMute(isMuted);
                
                // Also make sure that the playing state is set correctly, just in case
                if (isPlaying) {
                    playerRef.current.play();
                } else {
                    playerRef.current.pause();
                }
            }
        }
    }

    useEffect(() => {
        console.log("Is Muted: ", isMuted);
        if (playerRef.current) {
            playerRef.current.setMute(isMuted); // Mute or unmute the video based on the isMuted state
            expectVolumeChange.current = true; // Set the expectVolumeChange to true
            // Update the video playback based on the isPlaying state
            // just to make sure the video is in the correct state
            if (isPlaying) {
                playerRef.current.play(); // Play the video if the isPlaying state is true
            } else {
                playerRef.current.pause(); // Pause the video if the isPlaying state is false
            }
        }
    }, [isMuted]);

    useEffect(() => {
        if (playerRef.current) {
            isPlaying ? playerRef.current.play() : playerRef.current.pause(); // Play or pause the video based on the isPlaying state
            // Update the video mute state based on the isMuted state
            // just to make sure because this can be a side effect
            if (isMuted) {
                playerRef.current.setMute(true); // Mute the video if the isMuted state is true
            } else {
                playerRef.current.setMute(false); // Unmute the video if the isMuted state is false
            }
        }
    }, [isPlaying]);

    return <></>; // Return an empty fragment as this component does not render anything itself
};

export default DashPlayer;