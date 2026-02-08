import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import './TeamCard.css';

export default function TeamCard({ name, image, tags, color }) {
    return (
        <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            perspective={1000}
            scale={1.02}
            transitionSpeed={1500}
            className="team-card"
        >
            <div className="card-image-container">
                {image ? (
                    <img src={image} alt={name} className="card-image" />
                ) : (
                    <div className="card-image-placeholder" style={{ background: `linear-gradient(135deg, ${color}33, ${color}11)` }}>
                        <span className="placeholder-initial" style={{ color }}>{name.charAt(0)}</span>
                    </div>
                )}
                <div className="card-image-overlay" />
                <div className="card-glow" style={{ background: `radial-gradient(circle at 50% 100%, ${color}40, transparent 70%)` }} />
            </div>

            <div className="card-content">
                <h3 className="member-name" style={{ '--member-color': color }}>{name}</h3>
                <div className="member-tags">
                    {tags.map((tag, i) => (
                        <motion.span
                            key={i}
                            className="member-tag"
                            style={{
                                borderColor: `${color}66`,
                                background: `${color}15`,
                                color: color
                            }}
                            whileHover={{
                                background: `${color}33`,
                                boxShadow: `0 0 15px ${color}40`,
                                scale: 1.05
                            }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </div>
        </Tilt>
    );
}
