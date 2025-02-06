import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export async function getServer(onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D> {
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
        loader.load(
            '/3d_models/server.glb',
            (gltf) => {
                const server = gltf.scene;
                
                const light = new THREE.PointLight(0xffffff, 10, 4, 2);
                light.position.set(0, 0, 2);
                light.castShadow = true;
                server.add(light);

                resolve(server);
            },
            onProgress,
            reject,
        );
    });
}