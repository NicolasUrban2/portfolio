'use client'

import { addObject, addText } from "@/lib/3d/addObject";
import { cameraIso } from "@/lib/3d/cameraMovements";
import { getMainPlane } from "@/lib/3d/plane";
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
        addObject('computer', scene, 0, 13).then(object => {
            computer = object;
        });
        addText(contents['frontend_description'] ?? '', scene, 3, 17);

        /* Server */
        let server: THREE.Object3D | null = null;
        addObject('server', scene, 22, 5).then(object => {
            server = object;
        });
        addText(contents['backend_description'] ?? '', scene, 22, 10);

        /* Smartphone */
        let phone: THREE.Object3D | null = null;
        addObject('phone', scene, -22, 5).then(object => {
            phone = object;
        });
        addText(contents['mobile_dev_description'] ?? '', scene, -22, 10);

        /* Tools */
        let tools: THREE.Object3D | null = null;
        addObject('tools', scene, -10, -25).then(object => {
            tools = object;
        });
        addText(contents['tools_description'] ?? '', scene, -7, -20);

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
