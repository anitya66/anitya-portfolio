import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const navigationItems = [
  { label: "About", href: "#about" },
  { label: "Activity", href: "#activity" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a
          className="navbar__brand"
          href="#main-content"
          aria-label="Anitya Dev home"
        >
          <span>ANITYA</span>
          <span className="navbar__slash" aria-hidden="true">
            /
          </span>
          <span className="navbar__role">DEV</span>
        </a>

        <nav className="navbar__desktop-nav" aria-label="Primary navigation">
          <ul className="navbar__links">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a className="navbar__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="navbar__resume" href="/resume.pdf">
            Resume
            <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </nav>

        <button
          className="navbar__menu-button"
          type="button"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X size={20} aria-hidden="true" />
          ) : (
            <Menu size={20} aria-hidden="true" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="navbar__mobile-panel"
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <nav
              className="container navbar__mobile-nav"
              aria-label="Mobile navigation"
            >
              <ul className="navbar__mobile-links">
                {navigationItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: index * 0.025 }}
                  >
                    <a
                      className="navbar__mobile-link"
                      href={item.href}
                      onClick={closeMenu}
                    >
                      <span className="navbar__mobile-index">0{index + 1}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.18,
                    delay: navigationItems.length * 0.025,
                  }}
                >
                  <a
                    className="navbar__mobile-resume"
                    href="/resume.pdf"
                    onClick={closeMenu}
                  >
                    Resume
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </a>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
