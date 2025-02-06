import * as THREE from 'three';

export function cameraIso(camera: THREE.Camera, container: HTMLDivElement | null): () => void {
    camera.position.set(0, 10, 5);
    camera.lookAt(0, 0, 0);

    let isLocked = false; // Track if the pointer is locked

    const onMouseMove = (event: MouseEvent) => {
        if (!isLocked) return; // Only move when locked
        moveDiagonaly(camera, event.movementX, event.movementY);
    };
    window.addEventListener("mousemove", onMouseMove);

    const onWheel = (event: WheelEvent) => {
        if(!isLocked) return;
        console.log(event.deltaY);
        const scale = 0.3;
        const newPos = camera.position.y + scale * (event.deltaY > 0 ? 1 : -1);
        if (newPos < 1 || newPos > 20) return;
        camera.position.y = newPos;
    }
    window.addEventListener("wheel", onWheel);

    const removeEventListeners = managePointerLock(container, (locked) => isLocked = locked);

    return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("wheel", onWheel);
        removeEventListeners();
    };
}

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

    const removeEventListeners = managePointerLock(container, (locked) => isLocked = locked);

    return () => {
        window.removeEventListener("mousemove", onMouseMove);
        removeEventListeners();
    };
}

function managePointerLock(container: HTMLDivElement | null, onPointerLockChange: (isLocked: boolean) => void): () => void {
    const onCLick = () => {
        container?.requestPointerLock();
    }
    // Click to lock cursor
    container?.addEventListener("click", onCLick);

    const onPointerLockChangeLocal = () => onPointerLockChange(document.pointerLockElement === container)
    // Detect pointer lock changes
    document.addEventListener("pointerlockchange", onPointerLockChangeLocal);

    const onKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            document.exitPointerLock();
        }
    };
    container?.addEventListener("keydown", onKeydown);

    return () => {
        container?.removeEventListener("click", onCLick);
        document.removeEventListener("pointerlockchange", onPointerLockChangeLocal);
        container?.removeEventListener("keydown", onKeydown);
    }
}

function moveDiagonaly(camera: THREE.Camera, x: number, y: number) {
    const maxRadius = 40;
    const angle = THREE.MathUtils.degToRad(0);
    const v = new THREE.Vector2(x, y);
    const xNew = v.x * Math.cos(angle) - v.y * Math.sin(angle);
    const yNew = v.x * Math.sin(angle) + v.y * Math.cos(angle);
    const scaleX = 0.01;
    const scaleY = 0.01;
    const newX = camera.position.x + xNew * scaleX;
    const newY = camera.position.z + yNew * scaleY;
    if((new THREE.Vector2(newX, newY)).length() > maxRadius) return;
    camera.position.x = newX;
    camera.position.z = newY;
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