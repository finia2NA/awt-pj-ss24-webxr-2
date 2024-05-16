export enum DashPlayerEvents {
    PLAYBACK_PAUSED,
    PLAYBACK_PLAYING,
    MUTED,
    UNMUTED,
    VOLUME_CHANGED,
    ERROR
}

export interface DashPlayerEventData {
    type: "volume",
    data: string | number
}