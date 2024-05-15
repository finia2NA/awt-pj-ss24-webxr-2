import { useEffect, useRef } from 'react';
import dashjs from 'dashjs';

export interface DashPlayerProps {
  /**
   * The URL of the DASH manifest (MPD file)
   */
  src: string;
  /**
   * Whether the video should play automatically
   */
  autoplay?: boolean;
  /**
   * Whether the video controls should be displayed
   */
  controls?: boolean;
  /**
   * Whether the video should be muted by default
   */
  muted?: boolean;
}

const DashPlayer = ({ src, autoplay = true, controls = true, muted = false }: DashPlayerProps) => {
  const videoRef = useRef(null);

useEffect(() => {
  if (videoRef.current) {
    const player = dashjs.MediaPlayer().create();
    player.initialize(videoRef.current, src, autoplay);
    player.setMute(muted);

    player.on(dashjs.MediaPlayer.events.ERROR, (e) => {
      console.error('Dash.js error:', e);
    });

    return () => {
      player.reset();
    };
  }
}, [src, autoplay]);

  return (
    <video ref={videoRef} controls={controls}>
      Your browser does not support the video tag.
    </video>
  );
};

export default DashPlayer;
