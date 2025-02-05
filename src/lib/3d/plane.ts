import * as THREE from 'three';

export function getMainPlane(
    welcomeText: string,
) {
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xb0b0b0, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, 0);
    plane.rotation.x = Math.PI / 2;
    return plane;
}