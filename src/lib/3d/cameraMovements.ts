import * as THREE from 'three';

export function cameraOrbit(camera: THREE.Camera, scene: THREE.Scene, container: HTMLDivElement | null): () => void {
    const orbit = new THREE.Object3D();
    orbit.rotation.order = 'YXZ';
    orbit.position.set(0, 1, 0);
    scene.add(orbit);

    camera.position.set(0, 10, 0);
    camera.lookAt(orbit.position);
    orbit.add(camera);

    let isLocked = false; // Track if the pointer is locked

    const onMouseMove = (event: MouseEvent) => {
        if (!isLocked) return; // Only move when locked
        rotateOrbit(event.movementY, event.movementX, orbit, camera);
    };
    window.addEventListener("mousemove", onMouseMove);

    const onCLick = () => {
        container?.requestPointerLock();
    }
    // Click to lock cursor
    container?.addEventListener("click", onCLick);

    const onPointerLockChange = () => {
        isLocked = document.pointerLockElement === container;
    };
    // Detect pointer lock changes
    document.addEventListener("pointerlockchange", onPointerLockChange);

    const onKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            document.exitPointerLock();
        }
    };
    container?.addEventListener("keydown", onKeydown);


    return () => {
        window.removeEventListener("mousemove", onMouseMove);
        container?.removeEventListener("click", onCLick);
        document.removeEventListener("pointerlockchange", onPointerLockChange);
        container?.removeEventListener("keydown", onKeydown);
    };
}

function rotateOrbit(x: number, y: number, orbit: THREE.Object3D, camera: THREE.Camera) {
    const scaleX = linearInterpolation(camera.position.y, 10, 20, 0.007, 0.00005);
    const scaleY = 0.001;

    const oldRotationX = orbit.rotation.x;
    orbit.rotateX(x * scaleX);
    const min = 0;
    const max = (Math.PI / 2);

    if (orbit.rotation.x < min || orbit.rotation.x > max) {
        orbit.rotation.x = oldRotationX;
    }

    orbit.rotateY(y * scaleY);
    orbit.rotation.z = 0;

    const minRadius = 10;
    const maxRadius = 20;
    camera.position.y = linearInterpolation(orbit.rotation.x, min, max, minRadius, maxRadius);
}

function linearInterpolation(x: number, x0: number, x1: number, y0: number, y1: number) {
    return y0 + (x - x0) * (y1 - y0) / (x1 - x0);
}