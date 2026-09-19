import { ArrowRight, Download, FileText } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/profile";

const revealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Resume() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="career-section"
      id="career"
      aria-labelledby="career-title"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div className="career-section__content" variants={revealVariants}>
        <p className="technical-label">06 / CAREER</p>
        <h2 className="section-heading" id="career-title">
          OPEN TO
          <span>BUILDING WHAT&apos;S NEXT</span>
        </h2>
        <p className="body-copy career-section__description">
          {profile.positioning} My focus spans modern backend systems,
          full-stack React applications, AI-powered applications and real-time
          systems.
        </p>
        <div className="career-section__actions">
          <a className="hero-button hero-button--primary" href="/resume.pdf">
            Download resume
            <Download size={17} strokeWidth={1.8} aria-hidden="true" />
          </a>
          <a className="hero-button hero-button--secondary" href="#projects">
            View projects
            <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </motion.div>

      <motion.aside
        className="career-focus-panel"
        variants={revealVariants}
        aria-label="Career focus areas"
      >
        <div className="career-focus-panel__header">
          <div>
            <span className="technical-label">CAREER FOCUS</span>
            <h3>{profile.role}</h3>
          </div>
          <FileText size={20} aria-hidden="true" />
        </div>
        <ul className="career-focus-panel__list">
          {profile.identityAreas.map((area, index) => (
            <li key={area.label}>
              <span className="career-focus-panel__index">0{index + 1}</span>
              <div>
                <strong>{area.label}</strong>
                <span>{area.stack}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="career-document" aria-hidden="true">
          <strong>ANITYA ANAND</strong>
          <span>JAVA FULL STACK DEVELOPER</span>
          <div className="career-document__bar" />
          <div className="career-document__line career-document__line--long" />
          <div className="career-document__line" />
          <div className="career-document__line career-document__line--short" />
          <small>JAVA / SPRING BOOT / REACT</small>
          <small>AI / REAL-TIME SYSTEMS</small>
        </div>
      </motion.aside>
    </motion.section>
  );
}

export default Resume;
