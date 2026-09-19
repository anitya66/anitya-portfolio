import { BrainCircuit, Code2, Radio, Server } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/profile";

const icons = [Server, Code2, BrainCircuit, Radio];

function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="about-section"
      id="about"
      aria-labelledby="about-title"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="about-section__heading">
        <p className="technical-label">01 / DEVELOPER IDENTITY</p>
        <h2 className="section-heading" id="about-title">
          ENGINEERING
          <span>WITH PURPOSE.</span>
        </h2>
      </div>
      <div className="about-section__body">
        <p className="body-copy">
          {profile.positioning} I build systems where dependable backend
          foundations meet clear interfaces, useful AI and real-time
          interaction.
        </p>
        <div className="about-section__cards">
          {profile.identityAreas.map((area, index) => {
            const Icon = icons[index];

            return (
              <article className="identity-card" key={area.label}>
                <Icon size={19} aria-hidden="true" />
                <h3>{area.label}</h3>
                <p>{area.stack}</p>
              </article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export default About;
