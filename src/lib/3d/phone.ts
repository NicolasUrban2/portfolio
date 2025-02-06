import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export async function getPhone(onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D> {
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
        loader.load(
            '/3d_models/android.glb',
            (gltf) => {
                const phone = gltf.scene;
                phone.castShadow = true;
                phone.receiveShadow = true;
                
                phone.rotateX(-Math.PI / 4);
                
                const light = new THREE.PointLight(0xffffff, 3, 5, 1);
                light.position.set(0, 0, 0.2);
                light.castShadow = true;
                phone.add(light);

                resolve(phone);
            },
            onProgress,
            reject,
        );
    });
}