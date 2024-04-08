import img from "../../../public/tsukiko.png";
import song from "../../../public/happy-birthday.mp3";

import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { NavButtonContext } from "../page";

gsap.registerPlugin(MotionPathPlugin);

export default function TsukikoSong() {
    const songRef = useRef<HTMLAudioElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const { setIsNextButtonAllowed } = useContext(NavButtonContext);

    const [subtitleText, setSubtitleText] = useState("");

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
            duration: 1,
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

        // gsap.to(imgRef.current, {
        //     opacity: 1,
        //     duration: 1,
        //     onComplete: () => {
        //         songRef.current?.play();
        //     },
        // });

        if (songRef.current) {
            songRef.current.volume = 0.01;

            // songRef.current.addEventListener("play", () =>
            //     // danceAnimation.play()
            // );
            songRef.current.addEventListener("pause", () =>
                danceAnimation.pause()
            );

            const startListener = () => {
                if (
                    songRef.current?.currentTime &&
                    songRef.current?.currentTime >= 3.5
                ) {
                    showAnimation.play();
                    removeEventListener("timeupdate", startListener);
                }
            };

            const slowingListener = () => {
                if (
                    songRef.current?.currentTime &&
                    songRef.current?.currentTime >= 25
                ) {
                    danceAnimation.timeScale(0.8);
                    removeEventListener("timeupdate", slowingListener);
                }
            };

            const stopingListener = () => {
                if (
                    songRef.current?.currentTime &&
                    songRef.current?.currentTime >= 27
                ) {
                    danceAnimation.timeScale(0);
                    removeEventListener("timeupdate", stopingListener);
                }
            };

            const startingListener = () => {
                if (
                    songRef.current?.currentTime &&
                    songRef.current?.currentTime >= 29
                ) {
                    danceAnimation.timeScale(0.6);
                    removeEventListener("timeupdate", startingListener);
                }
            };

            const endListener = () => {
                if (
                    songRef.current?.currentTime &&
                    songRef.current?.currentTime >= 33.7
                ) {
                    showAnimation.reverse();
                    setIsNextButtonAllowed(true);
                    removeEventListener("timeupdate", endListener);
                }
            };

            songRef.current.addEventListener("timeupdate", startListener);
            songRef.current.addEventListener("timeupdate", slowingListener);
            songRef.current.addEventListener("timeupdate", stopingListener);
            songRef.current.addEventListener("timeupdate", startingListener);
            songRef.current.addEventListener("timeupdate", endListener);

            let track = songRef.current.addTextTrack("subtitles");

            track.addCue(new VTTCue(5.5, 8.7, "С днем рождения тебя!"));
            track.addCue(new VTTCue(9, 11.3, "С днем рождения тебя!"));
            track.addCue(new VTTCue(11.8, 15, "С днем рождения, Настюха!"));
            track.addCue(new VTTCue(15.3, 17.6, "С днем рождения тебя!"));
            track.addCue(new VTTCue(18.1, 20.5, "С днем рождения тебя!"));
            track.addCue(new VTTCue(20.9, 22.9, "С днем рождения тебя!"));
            track.addCue(new VTTCue(23.7, 27, "С днем рождения, Настюха!"));
            track.addCue(new VTTCue(29.1, 32.9, "С днем рождения тебя!"));

            track.addEventListener("cuechange", (e) => {
                if (e.target?.activeCues.length !== 0) {
                    setSubtitleText(e.target?.activeCues[0].text);
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

    return (
        <div className="w-screen h-screen overflow-hidden max-w-[100vw] max-h-[100vh] relative">
            <p
                ref={textRef}
                className="absolute opacity-0 scale-[1.4] left-[50vw] translate-x-[-50%] top-[10vh] text-[48px]"
            >
                {subtitleText}
            </p>
            <div>
                <Image
                    ref={imgRef}
                    className="absolute opacity-0 left-[20vw] bottom-0 h-[80vh] w-auto"
                    src={img}
                    alt="tsukiko"
                />
            </div>
            <audio
                className="hidden"
                ref={songRef}
                src={song}
                controls
                autoPlay
            ></audio>
        </div>
    );
}
