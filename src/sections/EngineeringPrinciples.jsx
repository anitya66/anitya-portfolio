import {
  ArrowDown,
  Braces,
  Layers3,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { engineeringPrinciples } from "../data/engineering";

const revealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const diagramIcons = {
  layers: Layers3,
  modules: Braces,
  api: Waypoints,
  security: ShieldCheck,
  realtime: Waypoints,
  testing: Braces,
};

function PrincipleDiagram({ principle }) {
  const Icon = diagramIcons[principle.diagramType];

  return (
    <div
      className={`engineering-diagram engineering-diagram--${principle.diagramType}`}
      aria-hidden="true"
    >
      <Icon className="engineering-diagram__icon" size={18} strokeWidth={1.6} />
      <div className="engineering-diagram__nodes">
        {principle.technologies.map((technology, index) => (
          <div className="engineering-diagram__step" key={technology}>
            <span className="engineering-diagram__node">{technology}</span>
            {index < principle.technologies.length - 1 && (
              <span className="engineering-diagram__connector">
                <ArrowDown size={13} aria-hidden="true" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EngineeringPrinciples() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="engineering-section"
      id="engineering"
      aria-labelledby="engineering-title"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      <motion.header
        className="engineering-section__header"
        variants={revealVariants}
      >
        <p className="technical-label">05 / ENGINEERING PRINCIPLES</p>
        <h2 className="section-heading" id="engineering-title">
          HOW
          <span>I BUILD.</span>
        </h2>
        <p className="body-copy">
          Engineering decisions focused on clarity, maintainability, security
          and real-world system behavior.
        </p>
      </motion.header>

      <div className="engineering-grid">
        {engineeringPrinciples.map((principle) => (
          <motion.article
            className={`engineering-card engineering-card--${principle.diagramType}`}
            variants={revealVariants}
            key={principle.id}
          >
            <div className="engineering-card__topline">
              <span className="engineering-card__number">
                {principle.number}
              </span>
              <span className="metadata">ENGINEERING SIGNAL</span>
            </div>
            <h3>{principle.title}</h3>
            <p className="engineering-card__description">
              {principle.description}
            </p>
            <PrincipleDiagram principle={principle} />
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

export default EngineeringPrinciples;
