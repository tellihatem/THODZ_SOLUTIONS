import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Smartphone, Monitor, Palette, Brain, Bot, Shield, Link, Lightbulb, Mail, Twitter, Facebook, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'
import TeamCard from './TeamCard'
import ThreeBackground from './ThreeBackground'
import './App.css'

const teamMembers = [
    {
        id: 1,
        name: 'Mehdi',
        image: '/profile/Mehdi.png',
        tags: ['Blockchain Developer', 'AI Agents & Automation'],
        color: '#00f0ff'
    },
    {
        id: 2,
        name: 'Hachem',
        image: '/profile/hachem.png',
        tags: ['UI/UX', 'Mobile Developer', 'AI & ML'],
        color: '#ff0055'
    },
    {
        id: 3,
        name: 'Hatem',
        image: '/profile/hatem.jpg',
        tags: ['Software Engineer', 'CyberSecurity Specialist'],
        color: '#ffd700'
    },
    {
        id: 4,
        name: 'Abdallah',
        image: null,
        tags: ['Product Strategist', 'Marketing'],
        color: '#00ff66'
    }
];

const services = [
    { title: "Website Development", description: "High-performance, scalable web applications built with modern technologies.", icon: "Globe" },
    { title: "Mobile Application", description: "Native and cross-platform mobile experiences for iOS and Android.", icon: "Smartphone" },
    { title: "Desktop Application", description: "Robust desktop software designed for power and efficiency.", icon: "Monitor" },
    { title: "UI/UX Design", description: "Beautiful, intuitive interfaces that elevate user experiences.", icon: "Palette" },
    { title: "AI & ML Solutions", description: "Custom AI models to extract insights and automate decision-making.", icon: "Brain" },
    { title: "AI Agents & Automation", description: "Intelligent autonomous agents to streamline complex workflows.", icon: "Bot" },
    { title: "Cybersecurity Solutions", description: "Comprehensive security audits and strategies to safeguard your infrastructure.", icon: "Shield" },
    { title: "Blockchain Development", description: "Secure smart contracts and decentralized application (dApp) development.", icon: "Link" },
    { title: "Projects Consulting", description: "Expert guidance to transform your vision into successful digital products.", icon: "Lightbulb" }
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
    const formRef = useRef();
    const [formStatus, setFormStatus] = useState('');

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(() => {
            setFormStatus('success');
            formRef.current.reset();
            setTimeout(() => setFormStatus(''), 4000);
        }).catch(() => {
            setFormStatus('error');
            setTimeout(() => setFormStatus(''), 4000);
        });
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
                <div className="logo" onClick={() => scrollToSection('hero')}>THODZ SOLUTIONS</div>
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
                    text="THODZ SOLUTIONS"
                    className="hero-title gradient-text"
                    delay={0.2}
                />

                <TextReveal
                    text="The future is built by those who dare to dream in bold ideas and act with fearless determination."
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
                        text="THODZ SOLUTIONS is a cutting-edge technology company delivering innovative digital solutions. We specialize in Website Development, Mobile & Desktop Applications, UI/UX Design, AI & Machine Learning, AI Agents & Automation, Cybersecurity Solutions, Blockchain Development, and Project Consulting. We transform ideas into powerful digital realities."
                        type="word"
                        delay={0.2}
                    />
                </motion.div>
            </section>

            {/* Services Section */}
            <section id="services" className="services-section">
                <TextReveal text="Services" className="section-title" />
                <div className="services-grid">
                    {services.map((service, index) => {
                        const iconMap = {
                            Globe, Smartphone, Monitor, Palette, Brain, Bot, Shield, Link, Lightbulb
                        };
                        const IconComponent = iconMap[service.icon];
                        return (
                            <motion.div
                                key={index}
                                className="service-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                            >
                                <div className="service-icon">
                                    <IconComponent size={40} strokeWidth={1.5} />
                                </div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-desc">{service.description}</p>
                            </motion.div>
                        );
                    })}
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
                                    image={member.image}
                                    tags={member.tags}
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
                    className="contact-wrapper"
                    variants={blockVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="user_name">Name</label>
                                <input type="text" id="user_name" name="user_name" required placeholder="Your name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="user_email">Email</label>
                                <input type="email" id="user_email" name="user_email" required placeholder="Your email" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" required placeholder="Project inquiry" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows="5" required placeholder="Tell us about your project..." />
                        </div>
                        <motion.button
                            type="submit"
                            className="submit-button"
                            whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(0, 240, 255, 0.4)" }}
                            whileTap={{ scale: 0.97 }}
                            disabled={formStatus === 'sending'}
                        >
                            {formStatus === 'sending' ? 'Sending...' : (
                                <>Send Message <Send size={18} /></>
                            )}
                        </motion.button>
                        {formStatus === 'success' && (
                            <p className="form-message success">Message sent successfully!</p>
                        )}
                        {formStatus === 'error' && (
                            <p className="form-message error">Something went wrong. Please try again.</p>
                        )}
                    </form>

                    <div className="contact-sidebar">
                        <div className="contact-info-block">
                            <h4>Get in Touch</h4>
                            <p>Have a project in mind? Let's build something great together.</p>
                        </div>

                        <div className="social-links">
                            <motion.a
                                href="mailto:thoverdz@gmail.com"
                                className="social-link"
                                whileHover={{ y: -3, boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)" }}
                            >
                                <Mail size={20} />
                                <span>thoverdz@gmail.com</span>
                            </motion.a>
                            <motion.a
                                href="https://x.com/THODZSOLUTIONS"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                whileHover={{ y: -3, boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)" }}
                            >
                                <Twitter size={20} />
                                <span>@THODZSOLUTIONS</span>
                            </motion.a>
                            <motion.a
                                href="https://www.facebook.com/profile.php?id=61586755408614"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                whileHover={{ y: -3, boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)" }}
                            >
                                <Facebook size={20} />
                                <span>THODZ SOLUTIONS</span>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} THODZ SOLUTIONS. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App

