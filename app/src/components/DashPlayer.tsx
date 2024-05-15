import { useEffect, useRef } from 'react';
import dashjs, { MediaPlayerClass } from 'dashjs';

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
}

/**
 * A simple DASH player component that uses the dash.js library.
 * Note that the `paused` prop is also used for the autoplay feature upon initialization.
 */
const DashPlayer = ({ src, paused = true, controls = true, muted = false }: DashPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<MediaPlayerClass | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = dashjs.MediaPlayer().create();
      playerRef.current.initialize(videoRef.current, src, !paused);
      playerRef.current.setMute(muted);

      playerRef.current.on(dashjs.MediaPlayer.events.ERROR, (e) => {
        console.error('Dash.js error:', e);
      });

      return () => {
        playerRef.current?.reset();
      };
    }
  }, [src]);

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

  return (
    <video ref={videoRef} controls={controls}>
      Your browser does not support the video tag.
    </video>
  );
};

export default DashPlayer;
