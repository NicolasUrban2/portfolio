'use client'

import clsx from "clsx";

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
            <h1 className="text-2xl mb-3">Hello there</h1>
            <p>{en['main_description']}</p>
        </article>

        <article>
            <h1 className="text-2xl mb-3">Known languages</h1>
            <p>{en['tools_description']}</p>
        </article>

        <article>
            <h1 className="text-2xl mb-3">Frontend knowledge</h1>
            <p>{en['frontend_description']}</p>
        </article>

        <article>
            <h1 className="text-2xl mb-3">Backend knowledge</h1>
            <p>{en['backend_description']}</p>
        </article>

        <article>
            <h1 className="text-2xl mb-3">Mobile development</h1>
            <p>{en['mobile_dev_description']}</p>
        </article>
    </div>;
}