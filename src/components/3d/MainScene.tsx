'use client'

import { cameraIso } from "@/lib/3d/cameraMovements";
import { getComputer } from "@/lib/3d/computer";
import { getPhone } from "@/lib/3d/phone";
import { getMainPlane } from "@/lib/3d/plane";
import { getServer } from "@/lib/3d/server";
import { getGroundText } from "@/lib/3d/text";
import { getTools } from "@/lib/3d/tools";
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
            supabase.from('portfolio_contents').select('content').eq('code', 'frontend_description').then(({ data }) => {
                if (!data || !data.length) return;
                const text = data[0].content ?? '';
                getGroundText(text).then(textMesh => {
                    textMesh.position.set(3, 0, 17);
                    scene.add(textMesh);
                });
            });
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
            supabase.from('portfolio_contents').select('content').eq('code', 'backend_description').then(({ data }) => {
                if (!data || !data.length) return;
                const text = data[0].content ?? '';
                getGroundText(text).then(textMesh => {
                    textMesh.position.set(22, 0, 10);
                    scene.add(textMesh);
                });
            });
        }).catch(console.error);
        
        /* Smartphone */
        let phone: THREE.Object3D | null = null;
        getPhone().then(object => {
            phone = object;
            const box = new THREE.Box3().setFromObject(phone);
            const height = box.getSize(new THREE.Vector3()).y;
            phone.position.set(-22, height / 2, 5);
            scene.add(phone);
            supabase.from('portfolio_contents').select('content').eq('code', 'mobile_dev_description').then(({ data }) => {
                if (!data || !data.length) return;
                const text = data[0].content ?? '';
                getGroundText(text).then(textMesh => {
                    textMesh.position.set(-22, 0, 10);
                    scene.add(textMesh);
                });
            });
        });

        /* Tools */
        let tools: THREE.Object3D | null = null;
        getTools().then(object => {
            tools = object;
            const box = new THREE.Box3().setFromObject(tools);
            const height = box.getSize(new THREE.Vector3()).y;
            tools.position.set(-10, height / 2, -25);
            scene.add(tools);
            supabase.from('portfolio_contents').select('content').eq('code', 'tools_description').then(({ data }) => {
                if (!data || !data.length) return;
                const text = data[0].content ?? '';
                getGroundText(text).then(textMesh => {
                    textMesh.position.set(-7, 0, -20);
                    scene.add(textMesh);
                });
            });
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
        supabase.from('portfolio_contents').select('*').eq('code', 'main_description').then(({ data }) => {
            if (data && data.length > 0) {
                const plane = getMainPlane(data[0].content ?? '');
                plane.receiveShadow = true;
                scene.add(plane);
            }
        });

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

    }, [props.height, props.width, refContainer, supabase]);


    return (
        <div className={clsx(
            'flex flex-col w-full',
            className
        )} ref={refContainer} >

        </div>
    );
}
