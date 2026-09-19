import {
  ArrowUpRight,
  BookOpen,
  Brackets,
  Code2,
  ExternalLink,
  Mail,
  MessageCircle,
  Network,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { contactDetails, socialLinks } from "../../data/social";

const footerNavigation = [
  { label: "Activity", href: "#activity" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Career", href: "#career" },
  { label: "Contact", href: "#contact" },
];

const socialIcons = {
  code: Code2,
  network: Network,
  brackets: Brackets,
  book: BookOpen,
};

function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="site-footer premium-footer"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container premium-footer__inner">
        <div className="premium-footer__brand">
          <a
            className="premium-footer__logo"
            href="#main-content"
            aria-label="Anitya Dev home"
          >
            <span>ANITYA</span>
            <span className="premium-footer__slash" aria-hidden="true">
              /
            </span>
            <span>DEV</span>
          </a>
          <p className="premium-footer__role">Java Full Stack Developer</p>
          <p className="premium-footer__summary">
            Building scalable full-stack systems with Java, Spring Boot and
            React.
          </p>
        </div>

        <nav
          className="premium-footer__navigation"
          aria-label="Footer navigation"
        >
          <span className="technical-label">NAVIGATE</span>
          <ul>
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="premium-footer__socials">
          <span className="technical-label">CONNECT</span>
          <div className="premium-footer__social-list">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.icon];

              return (
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={social.id}
                >
                  <Icon size={15} aria-hidden="true" />
                  <span>{social.label}</span>
                  <ArrowUpRight
                    className="premium-footer__link-arrow"
                    size={13}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
            <a href={contactDetails.emailHref}>
              <Mail size={15} aria-hidden="true" />
              <span>Email</span>
              <ArrowUpRight
                className="premium-footer__link-arrow"
                size={13}
                aria-hidden="true"
              />
            </a>
            <a
              href={contactDetails.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={15} aria-hidden="true" />
              <span>WhatsApp</span>
              <ExternalLink
                className="premium-footer__link-arrow"
                size={13}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="container premium-footer__bottom">
        <span>© {currentYear} Anitya Anand</span>
        <span>Java Full Stack Developer</span>
      </div>
    </motion.footer>
  );
}

export default Footer;
