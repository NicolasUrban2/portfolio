import * as THREE from 'three';
import { getFont } from './font';
import { TextGeometry } from 'three/examples/jsm/Addons.js';

export async function getGroundText(text: string): Promise<THREE.Mesh> {
    const font = await getFont('/fonts/Roboto_Mono_Regular.json');
    const textGeometry = new TextGeometry(text, {
        font: font,
        size: window.innerWidth / 4000,
        depth: 0.01,
    });
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    textGeometry.center();
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.rotateX(-Math.PI/2);
    return textMesh;
}