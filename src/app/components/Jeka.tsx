import { useContext, useEffect, useRef, useState } from "react";
import sanboyPic from "../../../public/sanboy.png";
import { NavButtonContext } from "../page";
import CharacterScene from "./CharacterScene";

import jekaVideo from "../../../public/jeka.mp4";
import jekaDance from "../../../public/jeka-dance.gif";

import sanboy1 from "../../../public/jeka-sanboy-1.ogg";
import sanboy2 from "../../../public/jeka-sanboy-2.ogg";

import gsap from "gsap";

import "./Jeka.scss";
import Image from "next/image";

const sanboyImgStyle = "right-[15vw] bottom-0 max-h-[75vh] w-auto";

const scenes = [
    [
        {
            text: "Если я скажу Же, другие скажут Ка!",
            voice: sanboy1,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
        {
            text: "Же-Ка! Же-Ка! Же-Ка!",
            voice: sanboy2,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
    ],
];

export default function Jeka() {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [isShowing, setIsShowing] = useState(true);
    const [isShowingVideo, setIsShowingVideo] = useState(false);

    const { setIsNextButtonAllowed } = useContext(NavButtonContext);

    const videoRef = useRef<HTMLVideoElement>(null);
    const dance1Ref = useRef<HTMLImageElement>(null);
    const dance2Ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setIsNextButtonAllowed(false);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            gsap.to(videoRef.current, {
                opacity: 1,
            });

            videoRef.current.volume = 0.5;

            videoRef.current?.addEventListener("play", () => {
                gsap.to(dance1Ref.current, {
                    startAt: {
                        y: -100,
                    },
                    y: 0,
                    opacity: 1,
                });
                gsap.to(dance2Ref.current, {
                    startAt: {
                        y: 100,
                    },
                    y: 0,
                    opacity: 1,
                });
            });

            videoRef.current?.addEventListener("pause", () => {
                gsap.to(dance1Ref.current, {
                    startAt: {
                        y: 0,
                    },
                    y: -100,
                    opacity: 0,
                });
                gsap.to(dance2Ref.current, {
                    startAt: {
                        y: 0,
                    },
                    y: 100,
                    opacity: 0,
                });
            });
        }
    }, [isShowingVideo]);

    const onComplete = () => {
        setIsShowing(false);
        setCurrentSceneIndex((state) => {
            if (state === scenes.length - 1) {
                setIsShowingVideo(true);
                setIsNextButtonAllowed(true);
                return state;
            }
            return state + 1;
        });
    };

    useEffect(() => {
        setIsShowing(true);
    }, [currentSceneIndex]);

    return (
        <>
            {isShowing && (
                <CharacterScene
                    frames={scenes[currentSceneIndex]}
                    onComplete={onComplete}
                />
            )}
            {isShowingVideo && (
                <div className="w-screen h-screen flex items-center justify-center">
                    <Image
                        ref={dance1Ref}
                        src={jekaDance}
                        alt="cat-dance"
                        className="opacity-0"
                    />
                    <video
                        className="opacity-0 w-[80vh] h-[80vh] mx-[150px]"
                        controls
                        ref={videoRef}
                    >
                        <source src={jekaVideo} />
                    </video>
                    <Image
                        ref={dance2Ref}
                        src={jekaDance}
                        className="opacity-0"
                        alt="cat-dance "
                    />
                </div>
            )}
        </>
    );
}
