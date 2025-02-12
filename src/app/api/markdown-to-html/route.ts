import { markdownToHtml } from "@/lib/markdown/markdownToHtml";

export async function POST(
    request: Request,
): Promise<Response> {
    const { markdown } = await request.json();

    if (typeof markdown !== 'string') {
        return Response.json({
            error: 'Invalid request',
            html: '',
        }, {
            status: 400,
        });
    }

    const cleanHtml = markdownToHtml(markdown);
    return Response.json({
        error: null,
        html: cleanHtml,
    });
}