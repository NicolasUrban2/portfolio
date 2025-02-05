import * as THREE from 'three';
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';

export function getMainPlane(
    welcomeText: string,
) {
    const geometry = new THREE.PlaneGeometry(200, 200);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);

    /* Add text */
    const loader = new FontLoader();
    loader.load('/fonts/Roboto_Mono_Regular.json', function (font) {
        const textGeometry = new TextGeometry(welcomeText, {
            font: font,
            size: window.innerWidth / 4000,
            depth: 0.01,
        });
        const textMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
        textGeometry.center();
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.rotateX(Math.PI);
        textMesh.position.set(0, 0, -1);
        plane.add(textMesh);
    });

    plane.position.set(0, 0, 0);
    plane.rotation.x = Math.PI / 2;
    return plane;
}