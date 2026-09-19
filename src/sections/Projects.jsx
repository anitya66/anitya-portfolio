import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  GitBranch,
  Radio,
  Search,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "../data/projects";

const revealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const visualIcons = {
  ai: Search,
  marketplace: Code2,
  emergency: Radio,
  delivery: GitBranch,
};

function ProjectVisual({ project }) {
  const VisualIcon = visualIcons[project.visualVariant];

  return (
    <div className={`project-visual project-visual--${project.visualVariant}`}>
      {project.image ? (
        <img
          className="project-visual__image"
          src={project.image}
          alt={project.imageAlt}
          loading={project.featured ? "eager" : "lazy"}
        />
      ) : (
        <div className="project-visual__fallback" aria-hidden="true">
          <div className="project-visual__grid" />
          <div className="project-visual__signal project-visual__signal--one" />
          <div className="project-visual__signal project-visual__signal--two" />
          <div className="project-visual__core">
            <VisualIcon size={24} strokeWidth={1.5} />
          </div>
          <div className="project-visual__data project-visual__data--one">
            {project.visualVariant === "ai"
              ? "VECTOR / SEARCH"
              : "SYSTEM / SIGNAL"}
          </div>
          <div className="project-visual__data project-visual__data--two">
            {project.number} // SYSTEM LAYER
          </div>
          <div className="project-visual__nodes">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectLinks({ project }) {
  return (
    <div className="project-card__links">
      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
        Source code <GitBranch size={15} aria-hidden="true" />
      </a>
      {project.hasLiveDemo && project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
          View live <ExternalLink size={15} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className={`project-card project-card--${project.visualVariant} ${index % 2 === 1 ? "project-card--reverse" : ""}`}
      variants={revealVariants}
    >
      <div className="project-card__visual">
        <ProjectVisual project={project} />
      </div>
      <div className="project-card__content">
        <div className="project-card__topline">
          <span className="project-card__number">{project.number}</span>
          <span className="metadata">{project.category}</span>
        </div>
        <h3>{project.name}</h3>
        <p className="project-card__description">{project.shortDescription}</p>
        <div className="project-card__signal">
          <span className="metadata">ENGINEERING SIGNAL</span>
          <p>{project.engineeringSignal}</p>
        </div>
        <ul
          className="project-card__highlights"
          aria-label={`${project.name} engineering highlights`}
        >
          {project.capabilities.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <div className="project-card__footer">
          <div
            className="project-card__tags"
            aria-label={`${project.name} technologies`}
          >
            {project.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="projects-section"
      id="projects"
      aria-labelledby="projects-title"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={sectionVariants}
    >
      <motion.header
        className="projects-section__header"
        variants={revealVariants}
      >
        <p className="technical-label">04 / SELECTED WORK</p>
        <h2 className="section-heading" id="projects-title">
          SYSTEMS
          <span>I&apos;VE BUILT</span>
        </h2>
        <p className="body-copy">
          Substantial full-stack, AI and real-time systems shaped around useful
          engineering problems.
        </p>
      </motion.header>

      <motion.div className="projects-list" variants={sectionVariants}>
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.id} />
        ))}
      </motion.div>

      <motion.div
        className="projects-section__footer"
        variants={revealVariants}
      >
        <span className="metadata">SELECTED SYSTEMS / 04</span>
        <ArrowUpRight size={19} aria-hidden="true" />
      </motion.div>
    </motion.section>
  );
}

export default Projects;
