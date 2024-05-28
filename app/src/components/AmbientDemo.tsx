import AmbientPlayer from "./AmbientPlayer"

export interface AmbientDemoProps {
    /**
     * The amount of blur to apply to the background video in pixels
     * Default is 100px
     */
    blurAmount?: number;
    /**
     * Whether the blur effect should be toggled on or off
     * Default is true
     * Large performance impact since the video is rendered twice
     */
    blurToggle?: boolean;
}

const AmbientDemo = ({ blurAmount = 100, blurToggle = true }: AmbientDemoProps) => {
    return (
        <AmbientPlayer src="https://dash.akamaized.net/dash264/TestCasesIOP33/adapatationSetSwitching/5/manifest.mpd" blurAmount={blurAmount} blurToggle={blurToggle} />
    )
}

export default AmbientDemo;