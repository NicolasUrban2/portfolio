'use client'

import clsx from "clsx";
import { MarkdownContent } from "./MarkdownContent";

export type MainTextContentProps = {
    className?: string,
    contents: {
        [locale: string]: {
            [code: string]: string,
        },
    },
}

export function MainTextContent(props: MainTextContentProps) {
    // TODO: get user defined locale
    const { className, contents: { en } } = props;

    return <div className={clsx(
        'flex flex-col gap-9 mx-5 mt-20',
        className,
    )}>
        <article>
            <MarkdownContent markdown={en['main_description']} />
        </article>

        <article>
            <MarkdownContent markdown={en['tools_description']} />
        </article>

        <article>
            <MarkdownContent markdown={en['frontend_description']} />
        </article>

        <article>
            <MarkdownContent markdown={en['backend_description']} />
        </article>

        <article>
            <MarkdownContent markdown={en['mobile_dev_description']} />
        </article>
    </div>;
}