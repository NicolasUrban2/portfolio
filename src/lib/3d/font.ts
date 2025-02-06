import { Font, FontLoader } from "three/examples/jsm/Addons.js";

const fonts: {
    [fontName: string]: Font,
} = {};

export async function getFont(fontName: '/fonts/Roboto_Mono_Regular.json'): Promise<Font> {
    if (fonts[fontName]) {
        return fonts[fontName];
    }

    const loader = new FontLoader();
    return new Promise((resolve, reject) => {
        loader.load(fontName,
            (font) => {
                fonts[fontName] = font;
                resolve(font);
            },
            undefined,
            (error) => {
                reject(error);
            }
        );
    });
}