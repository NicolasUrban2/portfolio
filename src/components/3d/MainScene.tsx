'use client'

import { cameraOrbit } from "@/lib/3d/cameraMovements";
import { getComputer } from "@/lib/3d/computer";
import { getMainPlane } from "@/lib/3d/plane";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import * as THREE from 'three';

export type MainSceneProps = {
    className?: string,
    width?: number,
    height?: number,
}

export function MainScene(props: MainSceneProps) {
    const { className } = props;

    const refContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const width = props.width ?? window.innerWidth;
        const height = props.height ?? window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;

        refContainer.current && refContainer.current.appendChild(renderer.domElement);

        let computer: THREE.Object3D | null = null;
        getComputer().then(object => {
            computer = object;
            computer.castShadow = true;
            const box = new THREE.Box3().setFromObject(computer);
            const height = box.getSize(new THREE.Vector3()).y;
            computer.position.set(0, height / 2, 0);
            scene.add(computer);
        }).catch(console.error);
        const removeCameraEventListener = cameraOrbit(camera, scene, refContainer.current);


        const light = new THREE.PointLight(0xffffff, 100, 500);
        light.castShadow = true;
        light.position.set(0, 20, 0);
        light.lookAt(0, 0, 0);
        scene.add(light);

        const plane = getMainPlane('Hello, World!');
        plane.receiveShadow = true;
        scene.add(plane);

        camera.position.set(0, 10, 0);

        const animate = () => {
            computer?.rotateY(0.001);
            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animate);

        return () => {
            removeCameraEventListener();
            renderer.setAnimationLoop(null);
        };

    }, [props.height, props.width, refContainer]);


    return (
        <div className={clsx(
            'flex flex-col w-full',
            className
        )} ref={refContainer} >

        </div>
    );
}
