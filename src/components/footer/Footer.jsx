import {
  ArrowUpRight,
  BookOpen,
  Brackets,
  Code2,
  ExternalLink,
  FileText,
  Mail,
  MessageCircle,
  Network,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { contactDetails, socialLinks } from "../../data/social";

const footerNavigation = [
  { label: "About", href: "#about" },
  { label: "Activity", href: "#activity" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Engineering", href: "#engineering" },
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

function FloatingSocialDock() {
  const dockLinks = [
    ...socialLinks,
    {
      id: "email",
      label: "Email",
      href: contactDetails.emailHref,
      icon: "email",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: contactDetails.whatsappHref,
      icon: "whatsapp",
      external: true,
    },
    { id: "resume", label: "Resume", href: "/resume.pdf", icon: "resume" },
  ];
  const dockIcons = {
    ...socialIcons,
    email: Mail,
    whatsapp: MessageCircle,
    resume: FileText,
  };

  return (
    <motion.nav
      className="social-dock"
      aria-label="Professional links"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
    >
      {dockLinks.map((link) => {
        const Icon = dockIcons[link.icon];

        return (
          <a
            className="social-dock__link"
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            data-tooltip={link.label}
            key={link.id}
          >
            <Icon size={17} aria-hidden="true" />
          </a>
        );
      })}
    </motion.nav>
  );
}

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
            Building modern full-stack systems with Java, Spring Boot and React.
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
        <div className="premium-footer__metadata">
          <span>JAVA FULL STACK DEVELOPER</span>
          <span aria-hidden="true">/</span>
          <span>REACT + SPRING BOOT</span>
        </div>
        <span>© {currentYear} Anitya Anand</span>
      </div>
      <FloatingSocialDock />
    </motion.footer>
  );
}

export default Footer;
