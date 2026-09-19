import {
  BookOpen,
  Brackets,
  Code2,
  ExternalLink,
  Mail,
  MessageCircle,
  Network,
  Phone,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { contactDetails, socialLinks } from "../data/social";

const revealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const socialIcons = {
  code: Code2,
  network: Network,
  brackets: Brackets,
  book: BookOpen,
};

function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div className="contact-section__intro" variants={revealVariants}>
        <p className="technical-label">07 / CONTACT</p>
        <h2 className="section-heading" id="contact-title">
          LET&apos;S
          <span>CONNECT.</span>
        </h2>
        <p className="body-copy">
          Have an opportunity, technical discussion, or something worth
          building? Reach out directly and let&apos;s talk through the system.
        </p>
        <a
          className="hero-button hero-button--primary contact-section__email-cta"
          href={contactDetails.emailHref}
        >
          Send email
          <Mail size={17} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </motion.div>

      <motion.div className="contact-section__panel" variants={revealVariants}>
        <div className="contact-section__panel-header">
          <div>
            <span className="technical-label">DIRECT CHANNELS</span>
            <h3>Reach me through</h3>
          </div>
          <MessageCircle size={20} aria-hidden="true" />
        </div>

        <div className="contact-details">
          <div className="contact-detail">
            <span className="contact-detail__label">
              <Mail size={15} aria-hidden="true" /> EMAIL
            </span>
            <a
              className="contact-detail__value"
              href={contactDetails.emailHref}
            >
              {contactDetails.email}
            </a>
          </div>
          <div className="contact-detail">
            <span className="contact-detail__label">
              <Phone size={15} aria-hidden="true" /> PHONE / WHATSAPP
            </span>
            <span className="contact-detail__value">
              {contactDetails.phone}
            </span>
          </div>
        </div>

        <a
          className="contact-section__whatsapp"
          href={contactDetails.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
          <ExternalLink size={15} aria-hidden="true" />
        </a>

        <nav className="contact-socials" aria-label="Social profiles">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.icon];

            return (
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                key={social.id}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{social.label}</span>
                <ExternalLink
                  className="contact-socials__arrow"
                  size={13}
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </nav>
      </motion.div>
    </motion.section>
  );
}

export default Contact;
