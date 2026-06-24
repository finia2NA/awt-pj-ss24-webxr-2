import {
    Container,
    Image,
    Text,
    Video as VideoImpl,
    useVideoElement as useVideoElement,
    ComponentInternals
} from '@react-three/uikit';
import dashjs from 'dashjs';
import { MediaPlayerClass } from 'dashjs';
import Hls from 'hls.js';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PlaybackControls from '../windows/PlaybackControls';
import { ThreeEvent } from "@react-three/fiber";
import { Card } from './apfel/card';
import useColors from '../hooks/useColors';

const clampVolume = (value: number) => Math.min(1, Math.max(0, value));
const VOLUME_STEP = 0.1;

interface DashPlayerProps {

    // Info
    src: string;
    channelTitle: string;
    channelDescription: string;
    channelNumber: number;
    channelImageSrc?: string;
    statusTitle?: string;
    statusDescription?: string;
    statusBackgroundColor?: string;

    // Internal
    width: number;
    minWidth: number;
    maxWidth: number;
    onResize: React.Dispatch<React.SetStateAction<number>>;
    viewRef: React.RefObject<ComponentInternals>;

    // Channel control
    tuneUpDown: (direction: number) => void;
    toggleChannelList?: () => void;

    // Event handling
    onPlaybackError?: (error: unknown) => void;
}

const DashPlayer = forwardRef<unknown, DashPlayerProps>(({ src, channelTitle, channelDescription, channelNumber, channelImageSrc, statusTitle, statusDescription, statusBackgroundColor, width, minWidth, maxWidth, onResize, viewRef, tuneUpDown, toggleChannelList, onPlaybackError = () => { } }, _ref) => {
    const [isPlaying, setIsPlaying] = useState(true); // State to track if the video is playing
    const [isMuted, setIsMuted] = useState(false); // State to track if the video is muted
    const [volume, setVolume] = useState(1); // State to track the volume of the video
    const colors = useColors();

    // This should then be done based on state changes
    // so playing should be a state in the parent component
    // and we react to changes in the state using useEffect
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying); // Toggle the playing state
    };

    const toggleMute = () => {
        setIsMuted(curr => !curr); // Toggle the muted state
    };

    const volumeDown = () => {
        setVolume(curr => clampVolume(Math.round((curr - VOLUME_STEP) * 10) / 10)); // Decrease the volume by 10%
    }

    const volumeUp = () => {
        setVolume(curr => clampVolume(Math.round((curr + VOLUME_STEP) * 10) / 10)); // Increase the volume by 10%
    }

    const resize = useRef<ComponentInternals>(null);
    const downState = useRef<{
        pointerId: number;
        clientX: number;
        width: number;
    }>();

    const handleResizePointerDown = (e: ThreeEvent<PointerEvent>) => {
        if (
            resize.current != null &&
            viewRef.current != null &&
            downState.current == null
        ) {
            e.stopPropagation();
            (e.target as HTMLElement).setPointerCapture(e.pointerId);

            downState.current = {
                pointerId: e.pointerId,
                clientX: e.nativeEvent.clientX,
                width
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
            resize.current == null ||
            viewRef.current == null ||
            downState.current == null ||
            e.pointerId != downState.current.pointerId
        ) {
            return;
        }

        const dragDelta = e.nativeEvent.clientX - downState.current.clientX;
        const newWidth = Math.min(maxWidth, Math.max(minWidth, downState.current.width + dragDelta));
        onResize(newWidth);
    };

    const renderVideoSurface = () => {
        if (statusTitle) {
            return (
                <Card
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={width * 2 / 3}
                    width={width}
                    backgroundColor={statusBackgroundColor ?? colors.background}
                >
                    <Text fontSize={30} fontWeight={"medium"} color={colors.primary}>{statusTitle}</Text>
                    {statusDescription && <Text fontSize={28} fontWeight={"normal"} color={colors.primary}>{statusDescription}</Text>}
                </Card>
            );
        }

        return (
            <VideoImpl borderRadius={6}>
                <InsideVideo src={src} isMuted={isMuted} isPlaying={isPlaying} setIsMuted={setIsMuted} onError={onPlaybackError} volume={volume}/>
            </VideoImpl>
        );
    };

    return (
        <Container flexDirection={"column"} alignContent={"center"}>
            <Container flexDirection={"column"} width={width} height={"auto"} alignSelf={"center"}>
                <Container width={width} display={"flex"} flexDirection={"column"} alignContent={"center"}>
                    {renderVideoSurface()}
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
            <Container alignSelf={"center"} height={"auto"} marginTop={-20}>
                <PlaybackControls channel={channelNumber} setChannel={() => { }} channelImageSrc={channelImageSrc} channelTitle={channelTitle} channelDescription={channelDescription} togglePlayPause={togglePlayPause} isPlaying={isPlaying} toggleChannelList={toggleChannelList} isMuted={isMuted} toggleMute={toggleMute} tuneUpDown={tuneUpDown} currentVolume={volume * 100} volumeDown={volumeDown} volumeUp={volumeUp}/>
            </Container>
        </Container>
    );
});

interface InsideVideoProps {
    src: string;
    isMuted: boolean;
    isPlaying: boolean;
    volume: number;
    setIsMuted: (isMuted: boolean) => void;
    onError?: (error: unknown) => void;
}
const InsideVideo = ({ src, isMuted, isPlaying, volume, setIsMuted, onError = () => { } }: InsideVideoProps) => {
    const videoElement = useVideoElement(); // Hook to get the video element
    const playerRef = useRef<MediaPlayerClass | null>(null); // Reference to the Dash player instance
    const hlsRef = useRef<Hls | null>(null);
    const expectVolumeChange = useRef(false);
    const isHlsSource = src.includes(".m3u8");

    const playVideo = () => {
        videoElement?.play().catch((error) => {
            if (error.name === "AbortError") {
                return;
            }

            console.log('Playback did not start due to auto play restrictions. Muting audio and retrying', error);
            if (!videoElement) {
                return;
            }

            videoElement.muted = true;
            setIsMuted(true);
            videoElement.play().catch((retryError) => {
                if (retryError.name !== "AbortError") {
                    onError(retryError);
                }
            });
        });
    };

    // Effect that initializes the Dash player
    // This effect will run when the component is mounted or when src changes
    // It considers isMuted and isPlaying states
    useEffect(() => {
        if (!src || !videoElement) {
            return;
        }

        videoElement.volume = volume;
        videoElement.muted = isMuted;

        if (isHlsSource) {
            if (Hls.isSupported()) {
                hlsRef.current = new Hls();
                hlsRef.current.loadSource(src);
                hlsRef.current.attachMedia(videoElement);
                hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
                    if (isPlaying) {
                        playVideo();
                    }
                });
                hlsRef.current.on(Hls.Events.ERROR, (_event, data) => {
                    console.error('An HLS playback error occurred', data);
                    if (data.fatal) {
                        onError(data);
                    }
                });
            } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
                videoElement.src = src;
                videoElement.addEventListener("loadedmetadata", () => {
                    if (isPlaying) {
                        playVideo();
                    }
                }, { once: true });
            } else {
                onError(new Error("HLS playback is not supported in this browser"));
                return;
            }
        } else {
            playerRef.current = dashjs.MediaPlayer().create(); // Create Dash player instance
            playerRef.current.initialize(videoElement, src, true); // Initialize the Dash player with the video source
            playerRef.current.setVolume(volume); // Set the volume of the video
            playerRef.current.setMute(isMuted); // Mute the video if asked to do so

            playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_NOT_ALLOWED, () => {
                console.log('Playback did not start due to auto play restrictions. Muting audio and reloading');
                if (playerRef.current && videoElement) {
                    playerRef.current.setMute(true);
                    setIsMuted(true);
                    playerRef.current.initialize(videoElement, src, true);
                }
            });

            // Add event listener for when there is an error. PLAYBACK_ERROR doesn't work here with a 404 apparently
            // Important to note: It tries four times to load the video before giving up and throwing an error
            // Error codes from testing (didn't find any documentation on this):
            // 25: Not Found (404)
            playerRef.current.on(dashjs.MediaPlayer.events.ERROR, (e) => {
                console.error('A playback error occurred', e);
                onError(e);
            });

            // Try to remedy the fact that the player sometimes unmutes itself
            playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_VOLUME_CHANGED, (e) => {
                handleVolumeChange(e);
            });
        }

        // Cleanup function
        // This will be called when the component is unmounted and destroys the player instance
        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
            videoElement.removeAttribute("src");
            videoElement.load();
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
                expectVolumeChange.current = true;
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
        if (playerRef.current) {
            expectVolumeChange.current = true; // Set the expectVolumeChange to true
            playerRef.current.setMute(isMuted); // Mute or unmute the video based on the isMuted state
            // Update the video playback based on the isPlaying state
            // just to make sure the video is in the correct state
            if (isPlaying) {
                playerRef.current.play(); // Play the video if the isPlaying state is true
            } else {
                playerRef.current.pause(); // Pause the video if the isPlaying state is false
            }
        } else if (videoElement) {
            videoElement.muted = isMuted;
            isPlaying ? videoElement.play().catch(onError) : videoElement.pause();
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
                playerRef.current.setVolume(volume); // Set the volume of the video if it is not muted
            }
        } else if (videoElement) {
            isPlaying ? videoElement.play().catch(onError) : videoElement.pause();
            videoElement.muted = isMuted;
            if (!isMuted) {
                videoElement.volume = volume;
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (playerRef.current) {
            expectVolumeChange.current = true; // Set the expectVolumeChange to true
            playerRef.current.setVolume(volume); // Set the volume of the video
        } else if (videoElement) {
            videoElement.volume = volume;
        }
    }, [volume]);

    return <></>; // Return an empty fragment as this component does not render anything itself
};

export default DashPlayer;
