declare module 'video-ambient' {
  export interface VideoAmbientChangeProps {
    // define the properties of this interface
  }

  export class VideoAmbient {
    constructor(
      video: HTMLVideoElement,
      size?: number,
      opacity?: number,
      onChange?: (props: VideoAmbientChangeProps) => void,
      mount?: HTMLElement,
      canvas?: HTMLCanvasElement
    );
  }
}