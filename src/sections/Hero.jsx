import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Download,
  Network,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { socialLinks } from "../data/social";
import profileImage from "../assets/profile.jpg";

const technologies = ["JAVA", "SPRING BOOT", "REACT", "AI", "REAL-TIME"];
const specializations = [
  "Spring Boot backend",
  "React applications",
  "AI-powered systems",
  "Real-time systems",
];

const revealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const sequenceVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [specializationIndex, setSpecializationIndex] = useState(0);
  const github = socialLinks.find((social) => social.id === "github");
  const linkedin = socialLinks.find((social) => social.id === "linkedin");

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const interval = window.setInterval(() => {
      setSpecializationIndex((index) => (index + 1) % specializations.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <motion.section
      className="hero-section"
      id="hero"
      aria-labelledby="hero-title"
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      variants={sequenceVariants}
    >
      <div className="hero-section__content">
        <motion.p
          className="technical-label hero-section__eyebrow"
          variants={revealVariants}
        >
          <span className="hero-section__availability">
            <span aria-hidden="true" /> AVAILABLE FOR OPPORTUNITIES
          </span>
          <span className="hero-section__identity">
            JAVA FULL STACK DEVELOPER
          </span>
        </motion.p>

        <motion.h1
          className="display-heading hero-section__title"
          id="hero-title"
          variants={revealVariants}
        >
          <span className="hero-section__title-lead">BUILDING FULL-STACK</span>
          <span>SYSTEMS.</span>
        </motion.h1>

        <motion.div
          className="hero-section__specialization"
          variants={revealVariants}
          aria-live="polite"
        >
          <span className="metadata">CURRENTLY FOCUSED ON</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={specializations[specializationIndex]}
              className="hero-section__specialization-value"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {specializations[specializationIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="body-copy hero-section__description"
          variants={revealVariants}
        >
          {profile.positioning} I work across Java, Spring Boot, React, AI and
          real-time systems.
        </motion.p>

        <motion.div className="hero-section__actions" variants={revealVariants}>
          <a className="hero-button hero-button--primary" href="#projects">
            Explore projects
            <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </a>
          <a
            className="hero-button hero-button--secondary"
            href={github.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <Code2 size={16} strokeWidth={1.8} aria-hidden="true" />
          </a>
          <a
            className="hero-button hero-button--secondary"
            href={linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <Network size={16} strokeWidth={1.8} aria-hidden="true" />
          </a>
          <a className="hero-button hero-button--secondary" href="/resume.pdf">
            Resume
            <Download size={16} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          className="hero-section__technology"
          variants={revealVariants}
          aria-label="Technology domains"
        >
          <span className="metadata">CORE SYSTEMS</span>
          <div className="hero-section__technology-list">
            {technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.aside
        className="profile-panel"
        aria-label={`${profile.name} developer profile`}
        variants={revealVariants}
      >
        <div className="profile-panel__frame">
          <div className="profile-panel__header">
            <span className="metadata">IDENTITY / 001</span>
            <span
              className="profile-panel__status"
              aria-label="Available for opportunities"
            >
              <span aria-hidden="true" /> AVAILABLE
            </span>
          </div>
          <div className="profile-panel__image-wrap">
            <img
              className="profile-panel__image"
              src={profileImage}
              alt="Anitya Anand — Java Full Stack Developer"
            />
            <div className="profile-panel__image-label">AN / FULL STACK</div>
          </div>
          <div className="profile-panel__footer">
            <div>
              <p className="profile-panel__name">{profile.name}</p>
              <p className="metadata">{profile.role}</p>
            </div>
            <div className="profile-panel__floating-card profile-panel__floating-card--stack">
              <span className="metadata">STACK</span>
              <strong>JAVA + REACT</strong>
            </div>
            <div className="profile-panel__floating-card profile-panel__floating-card--focus">
              <span className="metadata">FOCUS</span>
              <strong>SPRING BOOT</strong>
            </div>
            <ArrowUpRight
              className="profile-panel__signal"
              size={22}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.aside>
    </motion.section>
  );
}

export default Hero;
