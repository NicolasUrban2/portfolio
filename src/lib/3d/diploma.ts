import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export async function getDiploma(onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D> {
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
        loader.load(
            '/3d_models/diploma.glb',
            (gltf) => {
                const diploma = gltf.scene;
                
                const light = new THREE.PointLight(0xffffff, 3, 5, 2);
                light.position.set(0, 2, 0);
                light.castShadow = true;
                diploma.add(light);

                resolve(diploma);
            },
            onProgress,
            reject,
        );
    });
}