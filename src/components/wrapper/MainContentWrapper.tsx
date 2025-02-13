'use client';

import clsx from "clsx";
import { useEffect, useState } from "react";
import { MainTextContent } from "../text/MainTextContent";
import { MainScene } from "../3d/MainScene";
import { WebGL } from "three/examples/jsm/Addons.js";
import { createClient } from "@/lib/supabase/client";

export type MainContentWrapperProps = {
    className?: string,
    breakpoint: number,
}

export function MainContentWrapper(props: MainContentWrapperProps) {
    const { className, breakpoint } = props;

    // TODO: choose locale based on user's preference
    const locale = 'en';

    const [display3DScene, setDisplay3DScene] = useState(false);
    const [contents, setContents] = useState<{ [code: string]: string }>({});

    const supabase = createClient();
    useEffect(() => {
        const shouldDisplay3DScene = window.innerWidth >= breakpoint && WebGL.isWebGL2Available();
        setDisplay3DScene(shouldDisplay3DScene);

        supabase.from('portfolio_contents')
            .select('*')
            .eq('display_type', shouldDisplay3DScene ? '3d' : 'markdown')
            .eq('locale', locale)
            .then(({ data }) => {
                if (data) {
                    const newContents: typeof contents = {};
                    data.forEach((content) => {
                        newContents[content.code] = content.content ?? '';
                    });
                    setContents(newContents);
                }
            });
    }, [breakpoint]);

    if (display3DScene) {
        return <MainScene className={clsx('absolute', className)} contents={contents} />;
    }
    return <MainTextContent className={className} contents={contents} />;
}