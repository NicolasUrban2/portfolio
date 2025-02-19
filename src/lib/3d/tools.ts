import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export async function getTools(onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D> {
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
        loader.load(
            '/3d_models/tools.glb',
            (gltf) => {
                const toolbox = gltf.scene;
                toolbox.receiveShadow = true;
                toolbox.scale.set(2, 2, 2);
                
                const light = new THREE.PointLight(0xffffff, 5, 10, 1);
                light.position.set(0, 3, 0);
                light.castShadow = true;
                toolbox.add(light);

                resolve(toolbox);
            },
            onProgress,
            reject,
        );
    });
}