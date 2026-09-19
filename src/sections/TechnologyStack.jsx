import { Cpu, Database, LayoutPanelTop, Server, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { skills } from "../data/skills";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const categoryIcons = {
  server: Server,
  layout: LayoutPanelTop,
  database: Database,
  wrench: Wrench,
  cpu: Cpu,
};

function TechnologyStack() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="stack-section"
      id="stack"
      aria-labelledby="stack-title"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.14 }}
      variants={sectionVariants}
    >
      <motion.header className="stack-section__header" variants={cardVariants}>
        <p className="technical-label">03 / TECHNOLOGY ECOSYSTEM</p>
        <h2 className="section-heading" id="stack-title">
          THE STACK
          <span>BEHIND THE SYSTEMS</span>
        </h2>
        <p className="body-copy">
          The tools, platforms and engineering fundamentals I use to shape
          reliable digital systems.
        </p>
      </motion.header>

      <motion.div className="stack-grid" variants={sectionVariants}>
        {skills.slice(0, 4).map((group, index) => {
          const Icon = categoryIcons[group.icon];

          return (
            <motion.article
              className={`stack-card stack-card--${group.id}`}
              key={group.id}
              variants={cardVariants}
            >
              <div className="stack-card__header">
                <span className="stack-card__icon">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="metadata">0{index + 1} / SYSTEM LAYER</span>
              </div>
              <h3>{group.category}</h3>
              <ul className="stack-card__items">
                {group.items.map((item) => (
                  <li
                    className={item.featured ? "is-featured" : ""}
                    key={item.name}
                  >
                    <strong>{item.name}</strong>
                    <span>{item.context}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </motion.div>

      {skills.slice(4).map((group) => {
        const Icon = categoryIcons[group.icon];

        return (
          <motion.article
            className="stack-principles"
            key={group.id}
            variants={cardVariants}
          >
            <div className="stack-principles__header">
              <div>
                <span className="technical-label">
                  05 / ENGINEERING FOUNDATIONS
                </span>
                <h3>{group.category}</h3>
              </div>
              <Icon size={20} aria-hidden="true" />
            </div>
            <ul className="stack-principles__list" aria-label={group.category}>
              {group.items.map((item) => (
                <li
                  className={item.featured ? "is-featured" : ""}
                  key={item.name}
                >
                  <strong>{item.name}</strong>
                  <span>{item.context}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        );
      })}
    </motion.section>
  );
}

export default TechnologyStack;
