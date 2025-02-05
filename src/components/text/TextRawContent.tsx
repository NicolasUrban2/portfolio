'use client'

import clsx from "clsx";

export type TextRawContentProps = {
    className?: string;
    content: string;
}

export function TextRawContent(props: TextRawContentProps) {
    const { className, content } = props;

    const splitedContent = content.split('\n');

    return (
        <div className={clsx(
            'text-sm md:text-lg',
            className
        )}>
            <article>
                {splitedContent.map((line, index) => (
                    <p key={index} className="mb-2">{line}</p>
                ))}
            </article>
        </div>
    );
}