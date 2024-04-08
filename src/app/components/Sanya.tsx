import { useContext, useEffect, useRef, useState } from "react";
import sanboyPic from "../../../public/sanboy.png";
import { NavButtonContext } from "../page";
import CharacterScene from "./CharacterScene";

import sanyaImg from "../../../public/sanya.png";
import sanyaRapSong from "../../../public/sanya-rap.mp3";
import sanboy from "../../../public/sanya-sanboy.ogg";

import Image from "next/image";

import gsap from "gsap";

const sanboyImgStyle = "right-[15vw] bottom-0 max-h-[75vh] w-auto";

const scenes = [
    [
        {
            text: "А теперь посмотрим что подготовил мой фанат. Очень приятно, очень приятно что, все-таки, понимают музыку Солнцебоя. У этого парня явно хороший вкус музыкальный... Ну посмотрим, что подготовил нам Александр",
            voice: sanboy,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
    ],
];

export default function Sanya() {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [isShowing, setIsShowing] = useState(true);
    const [isShowingRap, setIsShowingRap] = useState(false);

    const { setIsNextButtonAllowed } = useContext(NavButtonContext);

    const audioRef = useRef<HTMLAudioElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setIsNextButtonAllowed(false);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            gsap.to(imgRef.current, {
                startAt: {
                    y: -100,
                    opacity: 0,
                },

                y: 0,
                opacity: 1,
            });

            gsap.to(audioRef.current, {
                startAt: {
                    y: 100,
                    opacity: 0,
                },

                y: 0,
                opacity: 1,
            });

            const beatAnimation = gsap
                .timeline({ repeat: -1, paused: true })
                .to(imgRef.current, {
                    scale: 1.1,
                    duration: 0.2,
                })
                .to(imgRef.current, {
                    scale: 1,
                    duration: 0.1,
                });

            const startListener = () => {
                if (
                    audioRef.current?.currentTime &&
                    audioRef.current?.currentTime >= 6
                ) {
                    beatAnimation.resume();
                    removeEventListener("timeupdate", startListener);
                }
            };

            audioRef.current.addEventListener("timeupdate", startListener);
            audioRef.current.addEventListener("pause", () => {
                beatAnimation.pause();
            });

            audioRef.current.addEventListener("play", () => {
                if (
                    audioRef.current?.currentTime &&
                    audioRef.current?.currentTime >= 6
                ) {
                    beatAnimation.resume();
                }
            });
        }
    }, [isShowingRap]);

    const onComplete = () => {
        setIsShowing(false);
        setCurrentSceneIndex((state) => {
            if (state === scenes.length - 1) {
                setIsShowingRap(true);
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
            {isShowingRap && (
                <div className="w-screen h-screen py-[10vh] overflow-hidden">
                    <Image
                        ref={imgRef}
                        className="mx-auto mb-[100px] max-h-[70vh] w-auto opacity-0"
                        src={sanyaImg}
                        alt="sanya"
                    />
                    <audio
                        ref={audioRef}
                        className="mx-auto w-[80vw] opacity-0"
                        src={sanyaRapSong}
                        controls
                    ></audio>
                </div>
            )}
        </>
    );
}
