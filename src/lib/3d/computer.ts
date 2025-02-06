import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export async function getComputer(onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D> {
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
        loader.load(
            '/3d_models/computer.glb',
            (gltf) => {
                const computer = gltf.scene;
                const screenLight = new THREE.PointLight(0xffffff, 5, 5);
                screenLight.position.set(0.70, 0, 0.2);
                screenLight.castShadow = true;
                computer.add(screenLight);
                const towerLight = new THREE.PointLight(0xff0000, 20, 0.75, 0);
                towerLight.position.set(-1.3, 0.7, 1.75);
                towerLight.castShadow = false;
                computer.add(towerLight);
                resolve(computer);
            },
            onProgress,
            reject,
        );
    });
}