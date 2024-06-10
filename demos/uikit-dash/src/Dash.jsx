import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import dashjs, { MediaPlayerClass } from 'dashjs';

function Dash({ src }) {
    /*const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<MediaPlayerClass | null>(null);

    if (videoRef.current) {
        playerRef.current = dashjs.MediaPlayer().create();
        playerRef.current.initialize(videoRef.current, src, false);
        playerRef.current.setMute(true);
    }*/
    return (
        <video src={src} controls>
            Your browser does not support the video tag.
        </video>
    );
}

Dash.propTypes = {
    src: PropTypes.string.isRequired,
};

export default Dash;
