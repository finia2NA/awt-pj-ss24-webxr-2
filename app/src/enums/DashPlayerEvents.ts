export enum DashPlayerEvents {
    PLAYBACK_PAUSED,
    PLAYBACK_PLAYING,
    MUTED,
    UNMUTED,
    VOLUME_CHANGED,
    ERROR,
    PLAYBACK_RATE_CHANGED,
    PLAYBACK_SEEKING,
}

export interface DashPlayerEventData {
    type: "volume" | "time" | "rate",
    data: string | number
}