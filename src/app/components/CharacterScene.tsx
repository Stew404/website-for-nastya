import { useState, useEffect, useContext } from "react";

import { NavButtonContext } from "../page";
import CharacterFrame, { FrameData } from "./CharacterFrame";

export default function CharacterScene({
    frames,
    onComplete = () => {
        return;
    },
}: {
    frames: FrameData[];
    onComplete: () => void;
}) {
    const [frameIndex, setFrameIndex] = useState(0);

    const currentFrame = frames[frameIndex];

    return (
        <CharacterFrame
            frameIndex={frameIndex}
            frameData={currentFrame}
            toNextFrame={() => {
                setFrameIndex((state) => {
                    return state === frames.length - 1 ? state : state + 1;
                });
            }}
            isEndOfScene={frameIndex === frames.length - 1}
            endScene={() => {
                onComplete();
            }}
        />
    );
}
