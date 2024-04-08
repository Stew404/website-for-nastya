import Image from "next/image";
import nikolaiBook from "../../../public/nikolai-book.jpg";

import { useEffect, useRef } from "react";

import gsap from "gsap";

import "atropos/css";
import Atropos from "atropos/react";

export default function NikolaiBook({
    onComplete,
}: {
    onComplete: () => void;
}) {
    const descriptionRef = useRef<HTMLImageElement>(null);
    const descriptionSelector = gsap.utils.selector(descriptionRef);
    const titleAnim = gsap.to(descriptionSelector("#title"), {
        startAt: {
            opacity: 0,
            y: 50,
        },
        opacity: 1,
        y: 0,
        duration: 0.3,
    });
    const authorAnim = gsap.to(descriptionSelector("#author"), {
        startAt: {
            opacity: 0,
            y: 50,
        },
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 0.1,
    });
    const descAnim = gsap.to(descriptionSelector("#desc"), {
        startAt: {
            opacity: 0,
            y: 50,
        },
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 0.2,
    });

    const infoAnim = () => {
        gsap.to(descriptionRef.current, {
            opacity: 1,
            duration: 0.3,
        });
        titleAnim.play();
        authorAnim.play();
        descAnim.play();
    };

    useEffect(() => {
        gsap.to(".atropos", {
            startAt: {
                translateY: "-150%",
            },
            translateY: "0",
            ease: "back.out(1.3)",
            duration: 1,
            onComplete: () => {
                infoAnim();
                onComplete();
            },
        });
    }, []);

    return (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
            <Atropos className="flex w-fit" shadow={false}>
                <Image
                    src={nikolaiBook}
                    className="h-[80vh] w-auto"
                    alt="book"
                />
            </Atropos>
            <div
                ref={descriptionRef}
                className="opacity-0 max-w-[55vh] m-[50px] text-white bg-[#6526db54] p-[1em]"
            >
                <h2 className="opacity-0 text-[36px]" id="title">
                    Анастасия и Шайлушай
                </h2>
                <h3 className="opacity-0 text-[24px]" id="author">
                    Автор: Коля
                </h3>
                <p className="opacity-0" id="desc">
                    Книга о приключениях милого Шайлушая и не менее милой
                    Анастасии. Их поведет запутанная история с элементами драмы
                    и драм энд бейса. Скоро во всех книжных магазинах
                </p>
            </div>
        </div>
    );
}
