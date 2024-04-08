import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Start({ onStart }: { onStart: () => void }) {
    const startRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        gsap.timeline({ repeat: -1 })
            .to(buttonRef.current, {
                scale: 1.1,
                ease: "back.out",
            })
            .to(buttonRef.current, {
                scale: 1,
                ease: "back.out",
            });
    }, []);

    return (
        <div
            ref={startRef}
            className="w-screen h-screen flex items-center justify-center"
        >
            <button
                ref={buttonRef}
                className="bg-purple-500 w-[400px] h-[400px] text-[48px] rounded-[50%] hover:scale-[1.1]"
                onClick={() => {
                    const hideAnim = gsap
                        .timeline({ paused: true })
                        .to(startRef.current, {
                            scale: 0,
                        })
                        .to(startRef.current, {
                            display: "none",
                            onComplete: () => {
                                onStart();
                            },
                        });
                    hideAnim.resume();
                }}
            >
                Старт
            </button>
        </div>
    );
}
