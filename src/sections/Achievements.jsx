import { Code2, ExternalLink, GraduationCap, Layers3 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { achievements } from "../data/achievements";

const revealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const icons = {
  leetcode: Code2,
  education: GraduationCap,
  systems: Layers3,
};

function CredentialCard({ credential }) {
  const Icon = icons[credential.type];

  return (
    <motion.article
      className={`credential-card credential-card--${credential.type}`}
      variants={revealVariants}
    >
      <div className="credential-card__topline">
        <span className="credential-card__icon">
          <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
        </span>
        <span className="metadata">
          {credential.type === "leetcode"
            ? "01 / VERIFIED SIGNAL"
            : credential.type === "education"
              ? "02 / EDUCATION"
              : "03 / ENGINEERING"}
        </span>
      </div>

      <div className="credential-card__body">
        <span className="credential-card__eyebrow">
          {credential.type === "leetcode"
            ? "DSA / ALGORITHMIC THINKING"
            : credential.type === "education"
              ? "EDUCATION / FOUNDATION"
              : "PROOF / SYSTEMS BUILT"}
        </span>
        <p className="credential-card__number">{credential.number}</p>
        <h3>{credential.title}</h3>

        {credential.type === "leetcode" && (
          <>
            <p className="credential-card__category">{credential.category}</p>
            <p className="credential-card__description">
              {credential.description}
            </p>
          </>
        )}

        {credential.type === "education" && (
          <>
            <p className="credential-card__institution">
              {credential.institution}
            </p>
            <p className="credential-card__location">{credential.location}</p>
            <div className="credential-card__education-meta">
              <span>{credential.period}</span>
              <span>{credential.metric}</span>
            </div>
          </>
        )}

        {credential.type === "systems" && (
          <>
            <p className="credential-card__description">
              {credential.description}
            </p>
            <div className="credential-card__domains">
              {credential.domains.map((domain) => (
                <span key={domain}>{domain}</span>
              ))}
            </div>
            <span className="credential-card__systems-note">
              03 DOMAINS / MARKETPLACE + AI + MICROSERVICES
            </span>
          </>
        )}
      </div>

      {credential.url && (
        <a
          className="credential-card__link"
          href={credential.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View LeetCode profile <ExternalLink size={15} aria-hidden="true" />
        </a>
      )}
    </motion.article>
  );
}

function Achievements() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="credentials-section"
      id="achievements"
      aria-labelledby="credentials-title"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.14 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.header
        className="credentials-section__header"
        variants={revealVariants}
      >
        <p className="technical-label">05 / CREDENTIALS</p>
        <h2 className="section-heading" id="credentials-title">
          PROGRESS
          <span>BACKED BY WORK</span>
        </h2>
        <p className="body-copy">
          Evidence of deliberate learning, engineering practice and systems
          built from the ground up.
        </p>
      </motion.header>

      <div className="credentials-grid">
        {achievements.map((credential) => (
          <CredentialCard credential={credential} key={credential.id} />
        ))}
      </div>
    </motion.section>
  );
}

export default Achievements;
