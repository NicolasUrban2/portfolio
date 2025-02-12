import 'server-only'

import sanitizeHtml from 'sanitize-html';
import Showdown from 'showdown';

const converter = new Showdown.Converter();

export function markdownToHtml(markdown: string): string {
    const dirtyHtml = converter.makeHtml(markdown);
    return sanitizeHtml(dirtyHtml, {
        allowedTags: ['b', 'i', 'em', 'strong', 'p', 'h1', 'h2', 'h3'],
        allowedAttributes: {
            'a': ['href'],
        },
    });
}