'use client'

import clsx from "clsx";
import { MarkdownContent } from "./MarkdownContent";

export type MainTextContentProps = {
    className?: string,
    contents: {
        [code: string]: string,
    },
}

export function MainTextContent(props: MainTextContentProps) {
    const { className, contents } = props;

    return <div className={clsx(
        'flex flex-col gap-9 mx-5 mt-20',
        className,
    )}>
        <article>
            <MarkdownContent markdown={contents['main_description']} />
        </article>

        <article>
            <MarkdownContent markdown={contents['tools_description']} />
        </article>

        <article>
            <MarkdownContent markdown={contents['frontend_description']} />
        </article>

        <article>
            <MarkdownContent markdown={contents['backend_description']} />
        </article>

        <article>
            <MarkdownContent markdown={contents['mobile_dev_description']} />
        </article>
    </div>;
}