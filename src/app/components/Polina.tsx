import { useContext, useEffect, useRef, useState } from "react";
import sanboyPic from "../../../public/sanboy.png";
import illustration from "../../../public/polina-illustration.png";
import illustration2 from "../../../public/polina-illustration-2.png";
import illustration3 from "../../../public/polina-illustration-3.png";
import { NavButtonContext } from "../page";
import CharacterScene from "./CharacterScene";

import sanboy0 from "../../../public/polina-sanboy-0.ogg";
import sanboy1 from "../../../public/polina-sanboy-1.ogg";
import sanboy2 from "../../../public/polina-sanboy-2.ogg";

import tsukGif from "../../../public/polina-tsuk.gif";
import shaiGif from "../../../public/polina-shai.gif";
import starGif1 from "../../../public/polina-star1.gif";
import starGif2 from "../../../public/polina-star2.gif";

import soundtrack from "../../../public/omsk.mp3";

import Image from "next/image";

import LightGallery from "lightgallery/react";

import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";

import lgZoom from "lightgallery/plugins/zoom";

import gsap from "gsap";

import "./Polina.scss";

const sanboyImgStyle = "right-[15vw] bottom-0 max-h-[75vh] w-auto";

const scenes = [
    [
        {
            text: "Хахахахах! А этот пушистый зверь умеет завести толпу! Надо будет позвать его к себе на выступление",
            voice: sanboy0,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
        {
            text: "В загадочном лесу неподалёку было обнаружено поздравление от Полины",
            voice: sanboy1,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
        {
            text: "Надо бы его изучить, внимание на экран",
            voice: sanboy2,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
    ],
];

export default function Polina() {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [isShowing, setIsShowing] = useState(true);
    const [isShowingGallery, setIsShowingGallery] = useState(false);

    const { setIsNextButtonAllowed } = useContext(NavButtonContext);

    useEffect(() => setIsNextButtonAllowed(false), []);

    const galleryRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const onComplete = () => {
        setIsShowing(false);
        setCurrentSceneIndex((state) => {
            if (state === scenes.length - 1) {
                setIsShowingGallery(true);
                setIsNextButtonAllowed(true);
                return state;
            }
            return state + 1;
        });
    };

    useEffect(() => {
        setIsShowing(true);
    }, [currentSceneIndex]);

    useEffect(() => {
        if (isShowingGallery) {
            gsap.to(".lg-react-element", {
                opacity: 1,
                onComplete: () => {
                    if (audioRef.current) {
                        audioRef.current.volume = 0.1;
                        audioRef.current.play();
                    }
                },
            });
        }
    }, [isShowingGallery]);

    return (
        <>
            {isShowing && (
                <CharacterScene
                    frames={scenes[currentSceneIndex]}
                    onComplete={onComplete}
                />
            )}
            {isShowingGallery && (
                <div ref={galleryRef}>
                    <div className="flex justify-around items-center h-[25vh] py-[30px]">
                        <Image
                            className="h-full w-auto"
                            src={starGif2}
                            alt="star"
                        />
                        <Image
                            className="h-full w-auto"
                            src={tsukGif}
                            alt="tsuk"
                        />
                        <Image
                            className="h-full w-auto"
                            src={starGif1}
                            alt="star"
                        />
                        <Image
                            className="h-full w-auto"
                            src={shaiGif}
                            alt="shai"
                        />
                        <Image
                            className="h-full w-auto scale-x-[-1]"
                            src={starGif2}
                            alt="star"
                        />
                    </div>
                    <LightGallery
                        plugins={[lgZoom]}
                        infiniteZoom={true}
                        showZoomInOutIcons={true}
                        actualSize={false}
                    >
                        <a href={illustration.src}>
                            <img src={illustration.src} alt="test" />
                        </a>
                        <a href={illustration2.src}>
                            <img src={illustration2.src} alt="test" />
                        </a>
                        <a href={illustration3.src}>
                            <img src={illustration3.src} alt="test" />
                        </a>
                    </LightGallery>
                    <audio
                        ref={audioRef}
                        className="mx-auto mt-[100px] w-[80vh]"
                        src={soundtrack}
                        controls
                    ></audio>
                </div>
            )}
        </>
    );
}
