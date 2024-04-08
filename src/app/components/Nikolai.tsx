import sanboyPic from "../../../public/sanboy.png";
import nikolaiPic from "../../../public/nikolai.png";
import nikolai1 from "../../../public/kolya1.mp3";
import nikolai2 from "../../../public/kolya2.mp3";
import sanboy1 from "../../../public/kolya-sanboy-1.ogg";
import sanboy2 from "../../../public/kolya-sanboy-2.ogg";
import CharacterScene from "./CharacterScene";
import { useContext, useEffect, useState } from "react";
import { NavButtonContext } from "../page";
import Image from "next/image";
import NikolaiBook from "./NikolaiBook";

const sanboyImgStyle = "right-[15vw] bottom-0 max-h-[75vh] w-auto";
const nikolaiImgStyle = "left-[15vw] bottom-0 max-h-[75vh] w-auto";

const scenes = [
    [
        {
            text: "Однажды на Земле родился необычный малыш",
            voice: sanboy1,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
        {
            text: "Этого малыша звали Коля и сейчас его очередь",
            voice: sanboy2,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
    ],
    [
        {
            text: "Настя ЙОУ! Настя ЙОУ!",
            voice: nikolai1,
            img: nikolaiPic,
            imgStyle: nikolaiImgStyle,
        },
        {
            text: "Еще не готово, вот тизер подарка",
            voice: nikolai2,
            img: nikolaiPic,
            imgStyle: nikolaiImgStyle,
        },
    ],
];

export default function Nikolai() {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [isShowing, setIsShowing] = useState(true);
    const [isShowingBook, setIsShowingBook] = useState(false);

    const { setIsNextButtonAllowed } = useContext(NavButtonContext);

    useEffect(() => setIsNextButtonAllowed(false), []);

    const onComplete = () => {
        setIsShowing(false);
        setCurrentSceneIndex((state) => {
            if (state === scenes.length - 1) {
                setIsShowingBook(true);
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
            {isShowingBook && (
                <NikolaiBook onComplete={() => setIsNextButtonAllowed(true)} />
            )}
        </>
    );
}
