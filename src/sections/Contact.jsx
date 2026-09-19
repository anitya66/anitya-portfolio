import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brackets,
  Code2,
  Download,
  ExternalLink,
  Mail,
  MessageCircle,
  Network,
  Phone,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/profile";
import { contactDetails, socialLinks } from "../data/social";

const revealVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const channelActions = {
  email: "Send email",
  whatsapp: "Chat on WhatsApp",
  linkedin: "Connect on LinkedIn",
  github: "View GitHub",
  leetcode: "View profile",
  gfg: "View profile",
};

function ContactChannel({ channel }) {
  const Icon = channel.icon;

  return (
    <a
      className={`contact-channel contact-channel--${channel.id}`}
      href={channel.href}
      target={channel.external ? "_blank" : undefined}
      rel={channel.external ? "noopener noreferrer" : undefined}
    >
      <div className="contact-channel__header">
        <span className="contact-channel__icon">
          <Icon size={17} aria-hidden="true" />
        </span>
        <span className="metadata">
          {channel.index} / {channel.label}
        </span>
        <ArrowUpRight
          className="contact-channel__arrow"
          size={15}
          aria-hidden="true"
        />
      </div>
      <strong>{channel.value}</strong>
      <span className="contact-channel__action">
        {channelActions[channel.id]}{" "}
        <ExternalLink size={13} aria-hidden="true" />
      </span>
    </a>
  );
}

function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const socialById = Object.fromEntries(
    socialLinks.map((social) => [social.id, social]),
  );
  const channels = [
    {
      id: "email",
      index: "01",
      label: "EMAIL",
      value: contactDetails.email,
      href: contactDetails.emailHref,
      icon: Mail,
    },
    {
      id: "whatsapp",
      index: "02",
      label: "WHATSAPP",
      value: contactDetails.phone,
      href: contactDetails.whatsappHref,
      icon: MessageCircle,
      external: true,
    },
    {
      id: "linkedin",
      index: "03",
      label: "LINKEDIN",
      value: "Professional profile",
      href: socialById.linkedin.href,
      icon: Network,
      external: true,
    },
    {
      id: "github",
      index: "04",
      label: "GITHUB",
      value: "@anitya66",
      href: socialById.github.href,
      icon: Code2,
      external: true,
    },
    {
      id: "leetcode",
      index: "05",
      label: "LEETCODE",
      value: "@codewithanitya",
      href: socialById.leetcode.href,
      icon: Brackets,
      external: true,
    },
    {
      id: "gfg",
      index: "06",
      label: "GEEKSFORGEEKS",
      value: "Profile",
      href: socialById.gfg.href,
      icon: BookOpen,
      external: true,
    },
  ];

  return (
    <motion.section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.14 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.header
        className="contact-section__intro"
        variants={revealVariants}
      >
        <p className="technical-label">07 / CONTACT</p>
        <h2 className="section-heading" id="contact-title">
          LET&apos;S
          <span>CONNECT.</span>
        </h2>
        <p className="body-copy">
          Open to conversations about Java full-stack development, software
          projects and opportunities to build meaningful systems.
        </p>
      </motion.header>

      <motion.div className="contact-identity-panel" variants={revealVariants}>
        <div className="contact-identity-panel__header">
          <div>
            <span className="technical-label">DIRECT CONTACT</span>
            <h3>{profile.name}</h3>
            <p>{profile.role}</p>
          </div>
          <Mail size={21} aria-hidden="true" />
        </div>
        <a
          className="contact-identity-panel__email"
          href={contactDetails.emailHref}
        >
          {contactDetails.email}
        </a>
        <div className="contact-identity-panel__phone">
          <Phone size={15} aria-hidden="true" />
          <span>{contactDetails.phone}</span>
        </div>
        <div className="contact-identity-panel__actions">
          <a
            className="hero-button hero-button--primary"
            href={contactDetails.emailHref}
          >
            Send email <Mail size={16} aria-hidden="true" />
          </a>
          <a className="hero-button hero-button--secondary" href="/resume.pdf">
            View resume <Download size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="contact-connection-visual" aria-hidden="true">
          <span>CONTACT</span>
          <ArrowRight size={13} />
          <span>DISCUSSION</span>
          <ArrowRight size={13} />
          <span>BUILD</span>
          <ArrowRight size={13} />
          <span>SHIP</span>
        </div>
      </motion.div>

      <motion.div className="contact-channels" variants={revealVariants}>
        {channels.map((channel) => (
          <ContactChannel channel={channel} key={channel.id} />
        ))}
      </motion.div>
    </motion.section>
  );
}

export default Contact;
