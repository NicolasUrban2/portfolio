'use client'

import { cameraIso } from "@/lib/3d/cameraMovements";
import { getComputer } from "@/lib/3d/computer";
import { getPhone } from "@/lib/3d/phone";
import { getMainPlane } from "@/lib/3d/plane";
import { getServer } from "@/lib/3d/server";
import { getGroundText } from "@/lib/3d/text";
import { getTools } from "@/lib/3d/tools";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import * as THREE from 'three';

export type MainSceneProps = {
    className?: string,
    width?: number,
    height?: number,
    contents: {
        [code: string]: string,
    },
}

export function MainScene(props: MainSceneProps) {
    const { className, contents } = props;

    const refContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const width = props.width ?? window.innerWidth;
        const height = props.height ?? window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        if (refContainer.current) {
            while (refContainer.current.firstChild) {
                refContainer.current.removeChild(refContainer.current.firstChild);
            }
            refContainer.current.appendChild(renderer.domElement);
        }

        /* Computer */
        let computer: THREE.Object3D | null = null;
        getComputer().then(object => {
            computer = object;
            computer.castShadow = true;
            const box = new THREE.Box3().setFromObject(computer);
            const height = box.getSize(new THREE.Vector3()).y;
            computer.position.set(0, height / 2, 13);
            scene.add(computer);

            const text = contents['frontend_description'] ?? null;
            if (text) {
                getGroundText(text).then(textMesh => {
                    textMesh.position.set(3, 0, 17);
                    scene.add(textMesh);
                });
            }
        }).catch(console.error);

        /* Server */
        let server: THREE.Object3D | null = null;
        getServer().then(object => {
            server = object;
            server.castShadow = true;
            const box = new THREE.Box3().setFromObject(server);
            const height = box.getSize(new THREE.Vector3()).y;
            server.position.set(22, height / 2, 5);
            scene.add(server);

            const text = contents['backend_description'] ?? null;
            if (text) {
                getGroundText(text).then(textMesh => {
                    textMesh.position.set(22, 0, 10);
                    scene.add(textMesh);
                });
            }
        }).catch(console.error);

        /* Smartphone */
        let phone: THREE.Object3D | null = null;
        getPhone().then(object => {
            phone = object;
            const box = new THREE.Box3().setFromObject(phone);
            const height = box.getSize(new THREE.Vector3()).y;
            phone.position.set(-22, height / 2, 5);
            scene.add(phone);

            const text = contents['mobile_dev_description'] ?? null;
            if (text) {
                getGroundText(text).then(textMesh => {
                    textMesh.position.set(-22, 0, 10);
                    scene.add(textMesh);
                });
            }
        });

        /* Tools */
        let tools: THREE.Object3D | null = null;
        getTools().then(object => {
            tools = object;
            const box = new THREE.Box3().setFromObject(tools);
            const height = box.getSize(new THREE.Vector3()).y;
            tools.position.set(-10, height / 2, -25);
            scene.add(tools);

            const text = contents['tools_description'] ?? null;
            if (text) {
                getGroundText(text).then(textMesh => {
                    textMesh.position.set(-7, 0, -20);
                    scene.add(textMesh);
                });
            }
        });

        /* Camera movements */
        const removeCameraEventListener = cameraIso(camera, refContainer.current);

        /* Light */
        const light = new THREE.PointLight(0xffffff, 100, 500, 1.5);
        light.castShadow = true;
        light.position.set(0, 20, 0);
        light.lookAt(0, 0, 0);
        scene.add(light);

        /* Plane */
        const mainDescription = contents['main_description'] ?? '';
        const plane = getMainPlane(mainDescription);
        plane.receiveShadow = true;
        scene.add(plane);

        const animate = () => {
            computer?.rotateY(0.001);
            server?.rotateY(0.001);
            phone?.rotateZ(0.001);
            phone?.rotateY(0.001);
            tools?.rotateY(0.001);
            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animate);

        return () => {
            removeCameraEventListener();
            renderer.setAnimationLoop(null);
        };

    }, [props.height, props.width, refContainer, contents]);


    return (
        <div className={clsx(
            'flex flex-col w-full',
            className
        )} ref={refContainer} >

        </div>
    );
}
