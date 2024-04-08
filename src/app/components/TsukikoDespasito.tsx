import img from "../../../public/tsukiko-despacito.png";
import song from "../../../public/despacito.mp3";

import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { NavButtonContext } from "../page";

gsap.registerPlugin(MotionPathPlugin);

export default function TsukikoDespacito() {
    const songRef = useRef<HTMLAudioElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const endRef = useRef<HTMLDivElement>(null);

    const { setIsNextButtonAllowed } = useContext(NavButtonContext);

    const [subtitleText, setSubtitleText] = useState("");
    const [isEnded, setIsEnded] = useState(false);

    useEffect(() => {
        setIsNextButtonAllowed(false);
        const danceAnimation = gsap.to(imgRef.current, {
            motionPath: {
                path: [
                    { x: -120, y: 50 },
                    { x: 0, y: 0 },
                    { x: 120, y: 50 },
                    { x: 0, y: 0 },
                ],
            },
            repeat: -1,
            duration: 1.4,
            ease: "none",
            paused: true,
        });

        const showAnimation = gsap.to(imgRef.current, {
            opacity: 1,
            paused: true,
            onComplete: () => {
                danceAnimation.play();
            },
        });

        if (songRef.current) {
            songRef.current.volume = 0.1;

            const startListener = () => {
                if (
                    songRef.current?.currentTime &&
                    songRef.current?.currentTime >= 1
                ) {
                    showAnimation.play();
                    removeEventListener("timeupdate", startListener);
                }
            };

            const endListener = () => {
                if (
                    songRef.current?.currentTime &&
                    songRef.current?.currentTime >= 77.5
                ) {
                    showAnimation.reverse();
                    removeEventListener("timeupdate", endListener);
                }
            };

            const showEndListener = () => {
                if (
                    songRef.current?.currentTime &&
                    songRef.current?.currentTime >= 88.5
                ) {
                    setIsEnded(true);
                    removeEventListener("timeupdate", showEndListener);
                }
            };

            songRef.current.addEventListener("timeupdate", startListener);
            songRef.current.addEventListener("timeupdate", endListener);
            songRef.current.addEventListener("timeupdate", showEndListener);

            let track = songRef.current.addTextTrack("subtitles");

            track.addCue(new VTTCue(1.9, 2.3, "¡Ay!"));
            track.addCue(new VTTCue(4.9, 5.3, "Fonsi, DY"));
            track.addCue(new VTTCue(5.8, 8.8, "Oh, oh no, oh no"));
            track.addCue(new VTTCue(9.1, 9.4, "Hey yeah"));
            track.addCue(new VTTCue(10.9, 12.1, "Diridiri, dirididi Daddy"));
            track.addCue(new VTTCue(12.7, 13.0, "Go!"));
            track.addCue(
                new VTTCue(
                    13.8,
                    17.6,
                    "Sí, sabes que ya llevo un rato mirándote"
                )
            );
            track.addCue(
                new VTTCue(18.8, 21.7, "Tengo que bailar contigo hoy")
            );
            track.addCue(
                new VTTCue(
                    24.2,
                    27.1,
                    "Oh, tú, tú eres el imán y yo soy el metal"
                )
            );
            track.addCue(
                new VTTCue(27.5, 29.8, "Me voy acercando y voy armando el plan")
            );
            track.addCue(
                new VTTCue(30.2, 32.9, "Solo con pensarlo se acelera el pulso")
            );
            track.addCue(new VTTCue(33.5, 35.8, "De-spa-cito"));
            track.addCue(
                new VTTCue(36.2, 37.9, "Quiero respirar tu cuello despacito")
            );
            track.addCue(
                new VTTCue(38.2, 40.8, "Deja que te diga cosas al oído")
            );
            track.addCue(
                new VTTCue(
                    41.1,
                    43.2,
                    "Para que te acuerdes si no estás conmigo"
                )
            );

            track.addCue(
                new VTTCue(44.9, 46.8, "Pasito a pasito, suave suavecito")
            );
            track.addCue(
                new VTTCue(47.4, 49.8, "Nos vamos pegando poquito a poquito")
            );
            track.addCue(
                new VTTCue(50.1, 52.8, "Cuando tú me besas con esa destreza")
            );
            track.addCue(
                new VTTCue(53.1, 55.8, "Veo que eres malicia con delicadeza")
            );

            track.addCue(
                new VTTCue(56.1, 57.9, "Pasito a pasito, suave suavecito")
            );
            track.addCue(
                new VTTCue(58.2, 60.7, "Nos vamos pegando, poquito a poquito")
            );
            track.addCue(
                new VTTCue(61, 63.2, "Y es que esa belleza es un rompecabezas")
            );
            track.addCue(
                new VTTCue(63.6, 65.8, "Pero pa' montarlo aquí tengo la pieza")
            );

            track.addCue(new VTTCue(67.4, 68.7, "De-spa-cito"));
            track.addCue(
                new VTTCue(69, 71.1, "Quiero respirar tu cuello despacito")
            );
            track.addCue(
                new VTTCue(71.6, 74.2, "Deja que te diga cosas al oído")
            );
            track.addCue(
                new VTTCue(
                    74.7,
                    76.9,
                    "Para que te acuerdes si no estás conmigo"
                )
            );

            track.addEventListener("cuechange", (e) => {
                if ((e.target as TextTrack).activeCues?.length !== 0) {
                    const cue: any = track.activeCues;

                    setSubtitleText(cue[0].text);

                    gsap.to(textRef.current, {
                        opacity: 1,
                        scale: 1.1,
                        duration: 0.2,
                    });
                } else {
                    gsap.to(textRef.current, {
                        opacity: 0,
                        scale: 1.4,
                        duration: 0.2,
                        onComplete: () => {
                            setSubtitleText("");
                        },
                    });
                }
            });
        }
    }, []);

    useEffect(() => {
        if (isEnded) {
            gsap.to(endRef.current, {
                opacity: 1,
                duration: 0.7,
            });
        }
    }, [isEnded]);

    return (
        <div className="w-screen h-screen overflow-hidden max-w-[100vw] max-h-[100vh] relative flex items-center justify-center">
            <p
                ref={textRef}
                className="absolute opacity-0 scale-[1.4] left-[50vw] translate-x-[-50%] top-[10vh] text-[36px]"
            >
                {subtitleText}
            </p>
            {!isEnded && (
                <div>
                    <Image
                        ref={imgRef}
                        className="absolute opacity-0 left-[20vw] bottom-0 h-[80vh] w-auto"
                        src={img}
                        alt="tsukiko"
                    />
                </div>
            )}
            <audio
                className="hidden"
                ref={songRef}
                src={song}
                controls
                autoPlay
            ></audio>
            {isEnded && (
                <div
                    ref={endRef}
                    className="opacity-0 flex items-center justify-center flex-col"
                >
                    <p className="text-[64px] mb-[50px]">
                        С днем рождения, Настя!!!
                    </p>
                    <button
                        className="bg-purple-500 pixel-border px-[10px] py-[5px] onhover"
                        onClick={() => {
                            location.reload();
                        }}
                    >
                        Вернуться в начало
                    </button>
                </div>
            )}
        </div>
    );
}
