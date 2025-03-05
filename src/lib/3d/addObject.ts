import * as THREE from 'three';
import { getComputer } from './computer';
import { getPhone } from './phone';
import { getTools } from './tools';
import { getServer } from './server';
import { getGroundText } from './text';
import { getContactPhone } from './contactPhone';
import { getDiploma } from './diploma';

const Objects: {
    [name: string]: (onProgress?: (event: ProgressEvent) => void) => Promise<THREE.Object3D>,
} = {
    computer: getComputer,
    phone: getPhone,
    tools: getTools,
    server: getServer,
    contactPhone: getContactPhone,
    diploma: getDiploma,
};

export async function addObject(
    name: keyof typeof Objects,
    scene: THREE.Scene,
    x: number,
    z: number,
    y?: number,
    onProgress?: (event: ProgressEvent) => void,
): Promise<THREE.Object3D> {
    const object = await Objects[name](onProgress);
    if (!y) {
        const box = new THREE.Box3().setFromObject(object);
        y = (box.getSize(new THREE.Vector3()).y) / 2;
    }
    object.position.set(x, y, z);
    scene.add(object);

    return object;
}

export async function addText(
    text: string,
    scene: THREE.Scene,
    x: number,
    z: number,
    y?: number,
    centered?: boolean,
): Promise<THREE.Object3D> {
    const textMesh = await getGroundText(text, centered);
    textMesh.position.set(x, y ?? 0, z);
    scene.add(textMesh);

    return textMesh;
}