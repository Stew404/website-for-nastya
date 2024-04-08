"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createContext } from "react";
import TsukikoHappyBirthday from "./components/TsukikoHappyBirthday";
import "./page.scss";
import Start from "./components/Start";
import Sanboy from "./components/Sanboy";
import SanboyEnd from "./components/SanboyEnd";
import Nikolai from "./components/Nikolai";
import Sanya from "./components/Sanya";
import Polina from "./components/Polina";
import Maks from "./components/Maks";
import Artem from "./components/Artem";
import Jeka from "./components/Jeka";
import TsukikoDespacito from "./components/TsukikoDespasito";
import Kadnikov from "./components/Kadnikov";

interface NavButtonContextType {
    isNextButtonAllowed: boolean | null;
    setIsNextButtonAllowed: Dispatch<SetStateAction<boolean>>;
}

export const NavButtonContext = createContext({
    isNextButtonAllowed: null,
    setIsNextButtonAllowed: () => {},
} as NavButtonContextType);

const components = [
    <Sanboy key="comp-sanboy" />,
    <TsukikoHappyBirthday key="comp-hp" />,
    <Polina key="comp-polina" />,
    <Maks key="comp-maks" />,
    <Nikolai key="comp-nikolai" />,
    <Jeka key="comp-jeka" />,
    <Artem key="comp-artem" />,
    <Kadnikov key="comp-kadnikov" />,
    <Sanya key="comp-sanya" />,
    <SanboyEnd key="comp-sanboy-end" />,
    <TsukikoDespacito key="comp-despacito" />,
];

export default function Home() {
    const [elemIndex, setElemIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    const [isNextButtonAllowed, setIsNextButtonAllowed] =
        useState<boolean>(true);

    const onClickHandle = () => {
        if (isNextButtonAllowed) {
            setElemIndex((state) => {
                return state === components.length - 1 ? 0 : state + 1;
            });
        }
    };

    return (
        <NavButtonContext.Provider
            value={{
                isNextButtonAllowed: isNextButtonAllowed,
                setIsNextButtonAllowed: setIsNextButtonAllowed,
            }}
        >
            <main className="w-screen h-screen select-none">
                <Start
                    onStart={() => {
                        setIsStarted(true);
                    }}
                />
                {isStarted && (
                    <>
                        {components[elemIndex]}
                        <button
                            className="fixed flex justify-center items-center w-[100px] h-[40px] bottom-[10px] right-[50px] bg-purple-500 disabled:opacity-40 pixel-border onhover"
                            onClick={onClickHandle}
                            disabled={!isNextButtonAllowed}
                        >
                            <svg
                                fill="#ffffff"
                                width="50px"
                                height="50px"
                                viewBox="0 0 22 22"
                                xmlns="http://www.w3.org/2000/svg"
                                id="memory-arrow-right"
                            >
                                <path d="M17 10V12H16V13H15V14H14V15H13V16H11V14H12V13H13V12H4V10H13V9H12V8H11V6H13V7H14V8H15V9H16V10" />
                            </svg>
                        </button>
                    </>
                )}
            </main>
        </NavButtonContext.Provider>
    );
}
