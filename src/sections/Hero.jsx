import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/profile";
import profileImage from "../assets/profile.jpg";

const technologies = ["JAVA", "SPRING BOOT", "REACT", "AI", "REAL-TIME"];

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

  return (
    <motion.section
      className="hero-section"
      id="about"
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
          / 01 - ENGINEERING PROFILE
        </motion.p>

        <motion.h1
          className="display-heading hero-section__title"
          id="hero-title"
          variants={revealVariants}
        >
          <span className="hero-section__title-lead">BUILDING DIGITAL</span>
          <span>SYSTEMS THAT MATTER.</span>
        </motion.h1>

        <motion.p
          className="body-copy hero-section__description"
          variants={revealVariants}
        >
          {profile.positioning} I work across Java, Spring Boot, React, AI and
          real-time systems.
        </motion.p>

        <motion.div className="hero-section__actions" variants={revealVariants}>
          <a className="hero-button hero-button--primary" href="#projects">
            View projects
            <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </a>
          <a className="hero-button hero-button--secondary" href="/resume.pdf">
            Download resume
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
