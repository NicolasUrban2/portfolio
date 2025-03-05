import * as THREE from 'three';
import { getFont } from './font';
import { TextGeometry } from 'three/examples/jsm/Addons.js';

export async function getText(text: string, centered?: boolean): Promise<THREE.Mesh> {
    const font = await getFont('/fonts/Roboto_Mono_Regular.json');
    const textGeometries: TextGeometry[] = [];
    const size = window.innerWidth / 4000;
    if (!centered) {
        const textGeometry = new TextGeometry(text, {
            font: font,
            size,
            depth: 0.01,
        });
        textGeometry.center();
        textGeometries.push(textGeometry);
    } else {
        const textLines = text.split('\n');
        textLines.forEach((textLine, index) => {
            const textGeometry = new TextGeometry(textLine, {
                font: font,
                size,
                depth: 0.01,
            });
            textGeometry.center();
            textGeometry.translate(0, -index * size * 2, 0);
            textGeometries.push(textGeometry);
        });
    }

    const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const fullTextMesh = new THREE.Mesh();
    textGeometries.forEach(textGeometry => {
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        fullTextMesh.add(textMesh);
    });

    return fullTextMesh;
}

export async function getGroundText(text: string, centered?: boolean): Promise<THREE.Mesh> {
    const textMesh = await getText(text, centered);
    textMesh.rotateX(-Math.PI / 2);
    return textMesh;
}