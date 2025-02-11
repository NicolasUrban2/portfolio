'use client';

import clsx from "clsx";
import { useEffect, useState } from "react";
import { MainTextContent } from "../text/MainTextContent";
import { MainScene } from "../3d/MainScene";
import { WebGL } from "three/examples/jsm/Addons.js";

export type MainContentWrapperProps = {
    className?: string,
    breakpoint: number,
    contents: {
        [locale: string]: {
            [code: string]: string,
        },
    },
}

export function MainContentWrapper(props: MainContentWrapperProps) {
    const { className, breakpoint, contents } = props;

    const [display3DScene, setDisplay3DScene] = useState(false);

    useEffect(() => {
        if (window.innerWidth >= breakpoint && WebGL.isWebGL2Available()) {
            setDisplay3DScene(true);
        }
    }, [breakpoint]);

    if (display3DScene) {
        return <MainScene className={clsx('absolute', className)} contents={contents} />;
    }
    return <MainTextContent className={className} contents={contents} />;
}