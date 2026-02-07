import React, { useRef, useLayoutEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function WarpStars({ count = 2000 }) {
    const mesh = useRef();
    const light = useRef();

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random positions and colors
    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const colorPalette = [
            new THREE.Color('#00f0ff'), // Cyan
            new THREE.Color('#ff0055'), // Pink
            new THREE.Color('#ffffff'), // White
            new THREE.Color('#ffd700'), // Gold
        ];

        for (let i = 0; i < count; i++) {
            // x, y, z
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200; // Spread deeper along Z

            // Colors
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        return [positions, colors];
    }, [count]);

    useFrame((state, delta) => {
        if (!mesh.current) return;

        // Access existing attributes
        const positionAttribute = mesh.current.geometry.getAttribute('position');
        const positions = positionAttribute.array;

        for (let i = 0; i < count; i++) {
            // Move stars towards camera (positive Z)
            positions[i * 3 + 2] += delta * 15;

            // Reset start if it passes the camera or goes too far
            if (positions[i * 3 + 2] > 20) {
                positions[i * 3 + 2] = -150;
                // Randomize X and Y slightly on reset for variety
                positions[i * 3] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            }
        }
        positionAttribute.needsUpdate = true;

        // Gentle rotation of the whole field + Parallax
        mesh.current.rotation.z += delta * 0.05;

        // Smooth parallax based on mouse position
        mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, state.pointer.y * 0.2, 0.05);
        mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, state.pointer.x * 0.2, 0.05);
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function Moon() {
    const groupRef = useRef();
    const { camera } = useThree();

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // Scale the moon group up significantly
        tl.to(groupRef.current.scale, {
            x: 5,
            y: 5,
            z: 5,
            ease: "power1.inOut"
        }, 0);

        // Move camera closer and slightly down to simulate flying over/into it
        tl.to(camera.position, {
            z: 5,
            y: -2,
            ease: "power1.inOut"
        }, 0);

        // Rotate the moon group
        tl.to(groupRef.current.rotation, {
            y: Math.PI * 0.5,
            x: Math.PI * 0.1,
            ease: "none"
        }, 0);

        return () => {
            tl.kill();
        };
    }, [camera]);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05; // Idle spin
            groupRef.current.rotation.z += delta * 0.02;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={groupRef}>
                {/* Outer Wireframe Shell with Glow */}
                <mesh>
                    <icosahedronGeometry args={[2, 2]} />
                    <meshStandardMaterial
                        color="#00f0ff"
                        emissive="#00f0ff"
                        emissiveIntensity={0.5}
                        wireframe={true}
                        transparent
                        opacity={0.3}
                    />
                </mesh>

                {/* Inner Complex Geometry */}
                <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    <torusGeometry args={[1.5, 0.05, 16, 100]} />
                    <meshBasicMaterial color="#ff0055" />
                </mesh>

                <mesh rotation={[-Math.PI / 4, -Math.PI / 4, 0]}>
                    <torusGeometry args={[1.8, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#ffd700" />
                </mesh>

                {/* Solid Core (Black Hole effect) */}
                <mesh scale={[0.95, 0.95, 0.95]}>
                    <sphereGeometry args={[1.9, 64, 64]} />
                    <meshBasicMaterial color="#000000" />
                </mesh>

                {/* Glow Sprite or Halo? Using a simple rim mesh maybe */}
            </group>
        </Float>
    );
}

function FloatingParticles() {
    return (
        <Sparkles
            count={100}
            scale={12}
            size={4}
            speed={0.4}
            opacity={0.5}
            color="#00f0ff"
        />
    )
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[20, 10, 10]} intensity={2} color="#00f0ff" />
            <pointLight position={[-20, -10, -10]} intensity={1} color="#ff0055" />

            {/* Background Layers */}
            <WarpStars count={3000} />
            <FloatingParticles />

            {/* Distant Fog for depth */}
            <fog attach="fog" args={['#050510', 10, 50]} />

            <Moon />
        </>
    );
}

const ThreeBackground = () => {
    return (
        <div className="three-background" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(to bottom, #020205, #050510)'
        }}>
            <Canvas
                camera={{ position: [0, 0, 15], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]} // Optimize pixel ratio
            >
                <Scene />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
