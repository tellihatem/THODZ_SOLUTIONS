import React, { useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import './TeamCard.css';

const Scene = ({ type, color }) => {
    const mesh = useRef();

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += delta * 0.2;
            mesh.current.rotation.y += delta * 0.3;
        }
    });

    const Material = type === 'sphere' ? MeshDistortMaterial : 'meshStandardMaterial';
    const materialProps = type === 'sphere'
        ? { color: color, speed: 2, distort: 0.4, roughness: 0.2 }
        : { color: color, roughness: 0.1, metalness: 0.8, emissive: color, emissiveIntensity: 0.2 };

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
            <mesh ref={mesh} scale={type === 'torus' ? 1 : 1.8}>
                {type === 'cube' && <boxGeometry args={[1, 1, 1]} />}
                {type === 'sphere' && <sphereGeometry args={[1, 64, 64]} />}
                {type === 'torus' && <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />}
                {type === 'octahedron' && <octahedronGeometry args={[1]} />}

                {type === 'sphere' ? (
                    <MeshDistortMaterial {...materialProps} />
                ) : (
                    <meshStandardMaterial {...materialProps} />
                )}
            </mesh>
        </Float>
    );
};

export default function TeamCard({ name, role, bio, type, color }) {
    return (
        <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            scale={1.02}
            transitionSpeed={1500}
            className="team-card"
        >
            <div className="card-3d-container">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                    <pointLight position={[-10, -10, -5]} intensity={1} color={color} />

                    <Scene type={type} color={color} />
                </Canvas>
            </div>

            <div className="card-content">
                <h3 className="member-name">{name}</h3>
                <p className="member-role">{role}</p>
                <p className="member-bio">{bio}</p>
            </div>
        </Tilt>
    );
}
