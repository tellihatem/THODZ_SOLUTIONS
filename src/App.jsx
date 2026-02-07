import React from 'react'
import { motion } from 'framer-motion'
import TeamCard from './TeamCard'
import ThreeBackground from './ThreeBackground'
import './App.css'

const teamMembers = [
    {
        id: 1,
        name: 'Mehdi',
        role: 'Lead Architect',
        bio: 'Sculpting the digital void into habitable spaces. Obsessed with clean code and cleaner geometry.',
        type: 'sphere',
        color: '#00f0ff' // Cyan
    },
    {
        id: 2,
        name: 'Hachem',
        role: 'Creative Director',
        bio: 'From wireframes to worlds. Believes that every pixel should tell a story.',
        type: 'torus',
        color: '#ff0055' // Neon Pink
    },
    {
        id: 3,
        name: 'Hatem',
        role: 'Security Specialist',
        bio: 'Protecting the core. Seeing patterns in the chaos where others see noise.',
        type: 'octahedron',
        color: '#ffd700' // Gold
    },
    {
        id: 4,
        name: 'Abdallah',
        role: 'Product Strategist',
        bio: 'Navigating the market currents. Ensuring the vision aligns with the user reality.',
        type: 'cube',
        color: '#00ff66' // Neon Green
    }
];

const services = [
    { title: "Website Application", description: "High-performance, scalable web applications built with modern technologies." },
    { title: "Mobile Application", description: "Native and cross-platform mobile experiences for iOS and Android." },
    { title: "Desktop Application", description: "Robust desktop software designed for power and efficiency." },
    { title: "Machine Learning & Deep Learning Models", description: "Custom AI models to extract insights and automate decision-making." },
    { title: "Cybersecurity Consult", description: "Comprehensive security audits and strategies to safeguard your infrastructure." },
    { title: "AI Agents & Automation", description: "Intelligent autonomous agents to streamline complex workflows." },
    { title: "Blockchain Development", description: "Secure smart contracts and decentralized application (dApp) development." }
];

const TextReveal = ({ text, className, delay = 0, type = "char" }) => {
    const letters = Array.from(text);
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay * i }, // Faster stagger
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            x: -10,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    if (type === 'word') {
        return (
            <motion.div
                style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }} // Added flex-wrap
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }} // Trigger slightly before full view
                className={className}
            >
                {words.map((word, index) => (
                    <motion.span variants={child} style={{ marginRight: "0.4em" }} key={index}>
                        {word}
                    </motion.span>
                ))}
            </motion.div>
        );
    }

    return (
        <motion.div
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }} // Center chars
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

// Variants for larger blocks to slide up
const blockVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

function App() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="app-container">
            <ThreeBackground />

            {/* Navigation Bar */}
            <motion.nav
                className="navbar"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
            >
                <div className="logo" onClick={() => scrollToSection('hero')}>Thodz Squad</div>
                <ul className="nav-links">
                    {['Home', 'About', 'Services', 'Team', 'Contacts'].map((item) => (
                        <li
                            key={item}
                            className="nav-link"
                            onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </motion.nav>

            {/* Hero Section */}
            <section id="hero" className="hero-section">
                <TextReveal
                    text="THODZ SQUAD"
                    className="hero-title gradient-text"
                    delay={0.2}
                />

                <TextReveal
                    text="The future is built by those who dare to dream in 3D."
                    className="hero-subtitle"
                    type="word"
                    delay={0.8}
                />

                <motion.button
                    className="cta-button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 25px var(--primary)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    onClick={() => scrollToSection('contacts')}
                >
                    Start a Project
                </motion.button>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <TextReveal text="About Us" className="section-title" />
                <motion.div
                    className="about-content"
                    variants={blockVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <TextReveal
                        text="We are a collective of visionaries, engineers, and artists dedicated to pushing the boundaries of digital interaction. At Thodz Squad, we don't just build software; we craft immersive experiences. From the depths of blockchain security to the peaks of interactive 3D web design, our multidisciplinary team merges creativity with technical excellence to deliver products that are not only functional but unforgettable."
                        type="word"
                        delay={0.2}
                    />
                </motion.div>
            </section>

            {/* Services Section */}
            <section id="services" className="services-section">
                <TextReveal text="Services" className="section-title" />
                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="service-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        >
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section id="team" className="team-section">
                <div className="team-container">
                    <TextReveal text="The Team" className="section-title" />
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <TeamCard
                                    name={member.name}
                                    role={member.role}
                                    bio={member.bio}
                                    type={member.type}
                                    color={member.color}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contacts Section */}
            <section id="contacts" className="contacts-section">
                <TextReveal text="Contact Us" className="section-title" />

                <motion.div
                    className="contact-container"
                    variants={blockVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="contact-info">
                        <p>Email Us At</p>
                        <motion.a
                            href="mailto:contact@thodzsquad.com"
                            whileHover={{ color: "#fff", textShadow: "0 0 10px var(--primary)" }}
                        >
                            contact@thodzsquad.com
                        </motion.a>
                    </div>
                    <div className="contact-info">
                        <p>Follow Us</p>
                        <motion.a
                            href="#"
                            whileHover={{ color: "#fff", textShadow: "0 0 10px var(--primary)" }}
                        >
                            @ThodzSquad
                        </motion.a>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Thodz Squad. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App

