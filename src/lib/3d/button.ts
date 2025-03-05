import * as THREE from 'three';
import { getText } from './text';

export function getButton(content: string): {
    animate: (camera: THREE.Camera) => void,
    object: THREE.Object3D,
} {
    const geometry = new THREE.PlaneGeometry(3, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const fakeButton = new THREE.Mesh(geometry, material);
    fakeButton.rotateX(-45);

    getText(content, true).then((text) => {
        fakeButton.add(text);
    });

    fakeButton.userData = { isHovered: false };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove(event: MouseEvent) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener('mousemove', onMouseMove, false);
    fakeButton.position.set(0, 0.5, 3);

    return {
        animate: (camera: THREE.Camera) => {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(fakeButton);

            if (intersects.length > 0) {
                if (!fakeButton.userData.isHovered) {
                    fakeButton.material.color.set(0xb8b8b8);
                    fakeButton.userData.isHovered = true;
                }
            } else {
                if (fakeButton.userData.isHovered) {
                    fakeButton.material.color.set(0xffffff);
                    fakeButton.userData.isHovered = false;
                }
            }
        },
        object: fakeButton,
    }
}