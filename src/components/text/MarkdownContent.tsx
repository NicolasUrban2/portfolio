import clsx from "clsx";
import { useEffect, useState } from "react";

export type MarkdownContentProps = {
    className?: string,
    markdown: string,
}

export function MarkdownContent(props: MarkdownContentProps) {
    const { className, markdown } = props;

    const [markdownHtml, setMarkdownHtml] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/markdown-to-html', {
            method: 'POST',
            body: JSON.stringify({ markdown }),
        }).then(response => response.json()).then(data => {
            if (data && data.html && typeof data.html === 'string') {
                setMarkdownHtml(data.html);
            }
        });
    }, [markdown]);

    return (
        <div
            className={clsx(
                'markdown-content',
                className
            )}
            dangerouslySetInnerHTML={{ __html: markdownHtml ?? '' }}
        />
    );
}