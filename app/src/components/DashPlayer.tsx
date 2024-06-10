import { useEffect, useRef } from 'react';
import dashjs, { MediaPlayerClass } from 'dashjs';
import { DashPlayerEventData, DashPlayerEvents } from '../enums/DashPlayerEvents';

export interface DashPlayerProps {
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
   * Custom class names for the video element (for Tailwind)
   */
  className?: string;
  /**
   * Whether the video should be only controlled by the parent component
   */
  onlyControlled?: boolean;
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
}

/**
 * A simple DASH player component that uses the dash.js library.
 * Note that the `paused` prop is also used for the autoplay feature upon initialization.
 */
const DashPlayer = ({ src, paused = true, controls = true, muted = false, handlePlaybackUpdate = () => { }, className = '', onlyControlled = false, playbackTime = 0, playbackRate = 1 }: DashPlayerProps) => {
  /**
   * Ref to the actual video element that will be used by the dash.js player
   */
  const videoRef = useRef<HTMLVideoElement | null>(null);
  /**
   * Ref to the dash.js MediaPlayer instance
   */
  const playerRef = useRef<MediaPlayerClass | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = dashjs.MediaPlayer().create();
      playerRef.current.initialize(videoRef.current, src, !paused);
      playerRef.current.setMute(muted);
      console.log("Player Ref: " + playerRef);
      console.log(playerRef);

      if (!onlyControlled) {
        /*
        --------------------------------
        Handle events emitted by the player
        --------------------------------
        */
        // This event is emitted when the player encounters an error
        // (e.g. the video file is not found or the manifest is invalid)
        // Maybe we should handle this event in a more user-friendly way
        playerRef.current.on(dashjs.MediaPlayer.events.ERROR, (e) => {
          console.error('Dash.js error:', e);
        });

        playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_PAUSED, () => {
          handlePlaybackUpdate(DashPlayerEvents.PLAYBACK_PAUSED)
        });

        // We use PLAYBACK_PLAYING instead of PLAYBACK_STARTED as the latter is only
        // emitted when playback is resumed after a prior pause event
        playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, () => {
          handlePlaybackUpdate(DashPlayerEvents.PLAYBACK_PLAYING);
        });

        playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_VOLUME_CHANGED, () => {
          // PLAYBACK_VOLUME_CHANGED is emitted when the volume is changed in any way, so also when
          // the video is muted or unmuted. This has to be detected manually however.
          handlePlaybackUpdate(playerRef.current?.isMuted() ? DashPlayerEvents.MUTED : DashPlayerEvents.UNMUTED);

          // Send the updated volume to the parent component
          const updateData: DashPlayerEventData = {
            type: 'volume',
            data: playerRef.current!.getVolume()
          }
          handlePlaybackUpdate(DashPlayerEvents.VOLUME_CHANGED, updateData);
        });

        // We don't use PLAYBACK_TIME_UPDATED since it is called too infrequently
        // and makes the background player lag
        // We also don't use PLAYBACK_SEEKED since it doesn't contain
        // any information about the new time
        playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_SEEKING, (e) => {
          const updateData: DashPlayerEventData = {
            type: 'time',
            data: e.seekTime!
          }
          handlePlaybackUpdate(DashPlayerEvents.PLAYBACK_SEEKING, updateData);
        });

        playerRef.current.on(dashjs.MediaPlayer.events.PLAYBACK_RATE_CHANGED, (e) => {
          const updateData: DashPlayerEventData = {
            type: 'rate',
            data: e.playbackRate!
          }
          handlePlaybackUpdate(DashPlayerEvents.PLAYBACK_RATE_CHANGED, updateData);
        });

      }
      // --------------------------------

      // This is a cleanup function that gets called when the component unmounts.
      return () => {
        playerRef.current?.reset();
      };
    }
  }, [src]); // Only reinitialize the player when the src prop changes

  /*
  Handle changes to the muted and paused props after the component is mounted
  */
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setMute(muted);
      if (paused) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
    }
  }, [muted, paused]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seek(playbackTime);
    }
  }, [playbackTime]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(playbackRate);
    }
  }, [playbackRate]);

  // The video element itself
  return (
    <video ref={videoRef} controls={controls} className={className}>
      Your browser does not support the video tag.
    </video>
  );
};

export default DashPlayer;
