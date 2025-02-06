'use client'

import { cameraIso } from "@/lib/3d/cameraMovements";
import { getComputer } from "@/lib/3d/computer";
import { getMainPlane } from "@/lib/3d/plane";
import { createClient } from "@/lib/supabase/client";
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
    const supabase = createClient();

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
        }).catch(console.error);

        /* Camera movements */
        const removeCameraEventListener = cameraIso(camera, refContainer.current);

        /* Light */
        const light = new THREE.PointLight(0xffffff, 100, 500, 1.5);
        light.castShadow = true;
        light.position.set(0, 20, 0);
        light.lookAt(0, 0, 0);
        scene.add(light);

        /* Plane */
        supabase.from('portfolio_contents').select('*').eq('code', 'main_description').then(({ data }) => {
            if (data && data.length > 0) {
                const plane = getMainPlane(data[0].content ?? '');
                plane.receiveShadow = true;
                scene.add(plane);
            }
        });

        const animate = () => {
            computer?.rotateY(0.001);
            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animate);

        return () => {
            removeCameraEventListener();
            renderer.setAnimationLoop(null);
        };

    }, [props.height, props.width, refContainer, supabase]);


    return (
        <div className={clsx(
            'flex flex-col w-full',
            className
        )} ref={refContainer} >

        </div>
    );
}
