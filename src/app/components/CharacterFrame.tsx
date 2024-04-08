import { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";

import styles from "./CharacterFrame.module.scss";
import gsap from "gsap";

export interface FrameData {
    text: string;
    voice: string;
    img: StaticImageData;
    imgStyle: string;
}

interface CharacterFrame {
    frameIndex: number;
    frameData: FrameData;
    toNextFrame: () => void;
    isEndOfScene?: boolean;
    endScene: () => void;
}

export default function CharacterFrame({
    frameIndex,
    frameData,
    toNextFrame,
    isEndOfScene = false,
    endScene,
}: CharacterFrame) {
    const imgRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        gsap.timeline()
            .to(imgRef.current, {
                opacity: 1,
                duration: 1,
            })
            .to(textRef.current, {
                opacity: 1,
                duration: 0.5,
            });
    }, []);

    const onClickHandle = () => {
        audioRef.current?.pause();

        if (isEndOfScene) {
            gsap.timeline()
                .to(textRef.current, {
                    opacity: 0,
                    duration: 0.5,
                })
                .to(imgRef.current, {
                    opacity: 0,
                    duration: 1,
                    onComplete: () => {
                        setIsActive(false);
                        endScene();
                    },
                });
        } else {
            gsap.timeline().to(textRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    toNextFrame();
                },
            });
        }
    };

    useEffect(() => {
        gsap.timeline().to(textRef.current, {
            opacity: 1,
            duration: 0.5,
        });
    }, [frameIndex]);

    const textStyle = `opacity-0 absolute right-[50vw] translate-x-[50%] top-[7vh] bg-white p-4 text-black text-[24px] ${styles["character-text"]}`;
    const imgStyle = `absolute ${frameData.imgStyle}`;

    return (
        isActive && (
            <div className="w-screen h-screen relative" onClick={onClickHandle}>
                <p ref={textRef} className={textStyle}>
                    {frameData.text}
                </p>
                <div className="opacity-0" ref={imgRef}>
                    <Image
                        className={imgStyle}
                        src={frameData.img}
                        alt="sanboy"
                    />
                </div>
                <audio ref={audioRef} src={frameData.voice} autoPlay></audio>
            </div>
        )
    );
}
