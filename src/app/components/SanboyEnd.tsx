import { useContext, useEffect, useRef, useState } from "react";
import sanboyPic from "../../../public/sanboy.png";
import { NavButtonContext } from "../page";
import CharacterScene from "./CharacterScene";

import sanboy1 from "../../../public/sanboy-end-1.ogg";
import sanboy2 from "../../../public/sanboy-end-2.ogg";

const sanboyImgStyle = "right-[15vw] bottom-0 max-h-[75vh] w-auto";

const scenes = [
    [
        {
            text: "Совсем не такого мы ожидали... Но... Явно видно что паренёк отнесся к делу с душой.",
            voice: sanboy1,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
        {
            text: "Ну, вот такие у нас сегодня были поздравления! В конце скажем, с днем рождения Настя!!!",
            voice: sanboy2,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
    ],
];

export default function SanboyEnd() {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [isShowing, setIsShowing] = useState(true);

    const { setIsNextButtonAllowed } = useContext(NavButtonContext);

    useEffect(() => {
        setIsNextButtonAllowed(false);
    }, []);

    const onComplete = () => {
        setIsShowing(false);
        setCurrentSceneIndex((state) => {
            if (state === scenes.length - 1) {
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
        </>
    );
}
