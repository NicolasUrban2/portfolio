'use client'

import { addObject, addText } from "@/lib/3d/addObject";
import { getButton } from "@/lib/3d/button";
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

        /* Fake button */
        const { object: fakeButton, animate: animateFakeButton } = getButton('Explore');
        scene.add(fakeButton);

        /* Computer */
        let computer: THREE.Object3D | null = null;
        addObject('computer', scene, 0, 13).then(object => {
            computer = object;
        });
        addText(contents['frontend_description'] ?? '', scene, 0, 17, undefined, true);

        /* Server */
        let server: THREE.Object3D | null = null;
        addObject('server', scene, 25, 5).then(object => {
            server = object;
        });
        addText(contents['backend_description'] ?? '', scene, 25, 10, undefined, true);

        /* Smartphone */
        let phone: THREE.Object3D | null = null;
        addObject('phone', scene, -25, 5).then(object => {
            phone = object;
        });
        addText(contents['mobile_dev_description'] ?? '', scene, -25, 10, undefined, true);

        /* Tools */
        let tools: THREE.Object3D | null = null;
        addObject('tools', scene, -20, -15).then(object => {
            tools = object;
        });
        addText(contents['tools_description'] ?? '', scene, -20, -10, undefined, true);

        /* Contact phone */
        let contactPhone: THREE.Object3D | null = null;
        addObject('contactPhone', scene, 0, -25).then(object => {
            contactPhone = object;
        });
        addText(contents['contact_description'] ?? '', scene, 0, -20, undefined, true);

        /* Diploma */
        let diploma: THREE.Object3D | null = null;
        addObject('diploma', scene, 20, -15).then(object => {
            diploma = object;
        });
        addText(contents['diploma_description'] ?? '', scene, 20, -10, undefined, true);

        /* Camera movements */
        const removeCameraEventListener = cameraIso(camera, refContainer.current);

        /* Light */
        const light = new THREE.PointLight(0xffffff, 70, 1000, 1.5);
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
            contactPhone?.rotateY(0.001);
            diploma?.rotateY(0.001);

            animateFakeButton(camera);

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
