import { useRef, useEffect } from 'react'
import Hls from 'hls.js'

export default function VideoPlayer(src: string) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        if(video.canPlayType('application/vnd.apple.mpegurl')){
            video.src = src;
        
        } else if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });

            return () => hls.destroy();
            
        }

    }, [src])

    return <div >
        <video ref={videoRef}  controls className="" />
    </div>
}