import { useContext, useEffect, useRef, useState } from "react";
import sanboyPic from "../../../public/sanboy.png";
import { NavButtonContext } from "../page";
import CharacterScene from "./CharacterScene";

import sanboy0 from "../../../public/artem-sanboy.ogg";
import sanboy1 from "../../../public/kadnikov-sanboy-1.ogg";
import sanboy2 from "../../../public/kadnikov-sanboy-2.ogg";

import gsap from "gsap";

import "./Jeka.scss";

const sanboyImgStyle = "right-[15vw] bottom-0 max-h-[75vh] w-auto";

const scenes = [
    [
        {
            text: "Да уж! Бомбануло знатно!",
            voice: sanboy0,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
        {
            text: "За рубежом его зовут Denis, но здесь его называют Кадников",
            voice: sanboy1,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
        {
            text: "Денис Кадников со своим горячим анонсом!",
            voice: sanboy2,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
    ],
];

export default function Kadnikov() {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [isShowing, setIsShowing] = useState(true);
    const [isShowingVideo, setIsShowingVideo] = useState(false);

    const { setIsNextButtonAllowed } = useContext(NavButtonContext);

    const videoRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        setIsNextButtonAllowed(false);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            gsap.to(videoRef.current, {
                opacity: 1,
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
                    <iframe
                        ref={videoRef}
                        width="1280"
                        height="720"
                        src="https://www.youtube.com/embed/AUwSG3SdkJE"
                        title="Утомлённые бухлом - Балтика бесконечности (Тизер)"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </>
    );
}
