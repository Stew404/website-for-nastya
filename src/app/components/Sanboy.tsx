import { useContext, useEffect, useRef, useState } from "react";
import sanboyPic from "../../../public/sanboy.png";
import { NavButtonContext } from "../page";
import CharacterScene from "./CharacterScene";

import sanboy1 from "../../../public/sanboy-1.ogg";
import sanboy2 from "../../../public/sanboy-2.ogg";
import sanboy3 from "../../../public/sanboy-3.ogg";

const sanboyImgStyle = "right-[15vw] bottom-0 max-h-[75vh] w-auto";

const scenes = [
    [
        {
            text: "Пророк Санбой! Так. Три-четыре! Начинаем наше поздравление. А поздравляем сегодня Настю Шаг... ээээ... Как?? Настю Шагидуллину! И я - Пророк Санбой буду ведущим для этого, можно сказать, семейного альбома поздравлений!",
            voice: sanboy1,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
        {
            text: "Мда.. Последнее время стали часто приглашать Пророка Солнцебоя на мероприятия",
            voice: sanboy2,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
        {
            text: "И начнем с самого молодого представителя сегодняшней программы",
            voice: sanboy3,
            img: sanboyPic,
            imgStyle: sanboyImgStyle,
        },
    ],
];

export default function Sanboy() {
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
