import { useContext, useEffect, useRef } from "react";
import video from "../../../public/artem.webm";

import gsap from "gsap";
import { NavButtonContext } from "../page";

// const scenes = [
//     [
//         {
//             text: "",
//             voice: "/",
//             img: sanboyPic,
//             imgStyle: sanboyImgStyle,
//         },
//         {
//             text: "Внимание на экран",
//             voice: "/",
//             img: sanboyPic,
//             imgStyle: sanboyImgStyle,
//         },
//     ],
// ];

export default function Artem() {
    const { setIsNextButtonAllowed } = useContext(NavButtonContext);

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        gsap.to(videoRef.current, {
            opacity: 1,
            duration: 2,
            onComplete: () => {
                videoRef.current?.play();
            },
        });

        setIsNextButtonAllowed(false);

        videoRef.current?.addEventListener("ended", () => {
            gsap.to(videoRef.current, {
                opacity: 0,
                onComplete: () => {
                    setIsNextButtonAllowed(true);
                },
            });
        });
    }, []);

    return (
        <video ref={videoRef} className="w-screen h-screen opacity-0">
            <source src={video} />
        </video>
    );
}
