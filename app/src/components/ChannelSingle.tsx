import { useEffect, useState } from "react";
import HeartIcon from "../assets/glyphs/heart.svg";
import useDarkMode from "../hooks/useDarkmode";

interface ChannelSingleProps {
    /**
     * The source of the channel's logo that is used as the img src.
     */
    src: string;
    /**
     * The title of the channel.
     */
    title: string;
    /**
     * The description of the channel.
     * Will most likely be the show that is currently on.
     */
    description: string;
    /**
     * The time that the program is on.
     */
    time: string;
}

/**
 * A single channel in the channel list.
 */
const ChannelSingle = ({ src, title, description, time }: ChannelSingleProps) => {
    const isDarkMode = useDarkMode();
    const [favorite, setFavorite] = useState(false);

    function toggleFavorite() {
        setFavorite((favorite) => !favorite);
    }

    // TODO: Actually change the color of the heart icon when it's favorited
    return (
        <div className="w-72 h-full bg-darkerUIElem flex rounded-lg mb-3">
            <div className="w-1/5 border-r-2 border-white flex flex-col justify-center gap-5 items-center p-1">
                <p>1</p>
                <img src={src}></img>
            </div>
            <div className="w-full relative flex flex-col items-start m-2">
                <h1 className="text-lg font-semibold pb-1">{title}</h1>
                <h2 className="text-base">{description}</h2>
                <h2 className="text-base">{time}</h2>
                <button className="absolute top-0 right-0 p-2 bg-transparent" onClick={toggleFavorite}>
                    <img src={HeartIcon} style={{
                        WebkitFilter: isDarkMode ? 'invert(1)' : 'invert(0)',
                        filter: isDarkMode ? 'invert(1)' : 'invert(0)',
                    }} />
                </button>
            </div>
        </div>
    )
}

export default ChannelSingle;