import {
  Activity,
  Code2,
  ExternalLink,
  GitBranch,
  Layers3,
  Network,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { developerProfile } from "../data/developer";
import { githubService } from "../services/github";

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

const verifiedStats = [
  {
    id: "leetcode",
    value: "250+",
    label: "DSA PROBLEMS",
    supporting: "Problems solved on LeetCode",
    tone: "cyan",
  },
  {
    id: "systems",
    value: "03+",
    label: "PRODUCTION-GRADE SYSTEMS",
    supporting: "Full-stack systems independently designed and built.",
    tone: "green",
  },
  {
    id: "stack",
    value: "JAVA / SPRING BOOT / REACT",
    label: "CORE STACK",
    supporting: "Primary full-stack engineering focus",
    tone: "blue",
  },
  {
    id: "domains",
    value: "AI / REAL-TIME SYSTEMS",
    label: "ENGINEERING DOMAINS",
    supporting: "AI-powered and real-time application development",
    tone: "violet",
  },
];

function formatUpdatedDate(date) {
  if (!date) return "RECENTLY UPDATED";

  return `UPDATED ${new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  })
    .format(new Date(date))
    .toUpperCase()}`;
}

function getCuratedRepositories(repositories) {
  const normalized = repositories.map((repository) => ({
    ...repository,
    normalizedName: repository.name.toLowerCase().replace(/[^a-z0-9]/g, ""),
  }));

  const prioritized = developerProfile.knownProjects
    .map((project) => {
      const projectName = project.toLowerCase().replace(/[^a-z0-9]/g, "");
      return normalized.find(
        (repository) =>
          repository.normalizedName.includes(projectName) ||
          projectName.includes(repository.normalizedName),
      );
    })
    .filter(Boolean);

  return [
    ...new Map(
      [...prioritized, ...normalized].map((repository) => [
        repository.htmlUrl,
        repository,
      ]),
    ).values(),
  ]
    .slice(0, 4)
    .map((repository) => {
      const cleanRepository = { ...repository };
      delete cleanRepository.normalizedName;
      return cleanRepository;
    });
}

function DeveloperActivity() {
  const shouldReduceMotion = useReducedMotion();
  const [githubData, setGithubData] = useState({
    profile: null,
    repositories: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    Promise.allSettled([
      githubService.getProfile(
        developerProfile.github.username,
        controller.signal,
      ),
      githubService.getRepositories(
        developerProfile.github.username,
        controller.signal,
      ),
    ]).then(([profileResult, repositoriesResult]) => {
      if (controller.signal.aborted) return;

      setGithubData({
        profile:
          profileResult.status === "fulfilled" ? profileResult.value : null,
        repositories:
          repositoriesResult.status === "fulfilled"
            ? repositoriesResult.value
            : [],
        loading: false,
        error:
          profileResult.status === "rejected" &&
          repositoriesResult.status === "rejected",
      });
    });

    return () => controller.abort();
  }, []);

  const repositories = getCuratedRepositories(githubData.repositories);
  const motionInitial = shouldReduceMotion ? false : "hidden";

  return (
    <motion.section
      className="activity-section"
      id="activity"
      aria-labelledby="activity-title"
      initial={motionInitial}
      whileInView="visible"
      viewport={{ once: true, amount: 0.14 }}
      variants={sectionVariants}
    >
      <div className="activity-section__header">
        <motion.p className="technical-label" variants={cardVariants}>
          02 / DEVELOPER ACTIVITY
        </motion.p>
        <motion.h2
          className="section-heading activity-section__title"
          id="activity-title"
          variants={cardVariants}
        >
          ENGINEERING
          <span>IN MOTION</span>
        </motion.h2>
        <motion.p
          className="body-copy activity-section__intro"
          variants={cardVariants}
        >
          Public engineering activity, problem solving and the systems shaping
          my work.
        </motion.p>
      </div>

      <motion.div className="activity-stat-grid" variants={sectionVariants}>
        {verifiedStats.map((stat, index) => (
          <motion.article
            className={`activity-stat activity-stat--${stat.tone}`}
            variants={cardVariants}
            key={stat.id}
          >
            <span className="activity-stat__index">
              0{index + 1} / VERIFIED
            </span>
            <span className="metadata">{stat.label}</span>
            <p
              className={`activity-stat__value activity-stat__value--${stat.id}`}
            >
              {stat.value}
            </p>
            <p className="activity-stat__supporting">{stat.supporting}</p>
          </motion.article>
        ))}
      </motion.div>

      <motion.div className="activity-profile-grid" variants={sectionVariants}>
        <motion.article
          className="activity-profile-card activity-profile-card--github"
          variants={cardVariants}
        >
          <div className="activity-profile-card__header">
            <span className="activity-card__icon">
              <GitBranch size={19} aria-hidden="true" />
            </span>
            <span className="metadata">PUBLIC PROFILE</span>
          </div>
          <div
            className="activity-profile-card__visual activity-profile-card__visual--github"
            aria-hidden="true"
          >
            <span className="activity-profile-card__node activity-profile-card__node--one" />
            <span className="activity-profile-card__node activity-profile-card__node--two" />
            <span className="activity-profile-card__node activity-profile-card__node--three" />
            <span className="activity-profile-card__connection activity-profile-card__connection--one" />
            <span className="activity-profile-card__connection activity-profile-card__connection--two" />
          </div>
          <h3>GitHub</h3>
          <p className="activity-profile-card__username">
            @{githubData.profile?.login ?? developerProfile.github.username}
          </p>
          <p className="activity-profile-card__description">
            Public repositories and engineering work available through the
            source profile.
          </p>
          <a
            className="activity-card__link"
            href={developerProfile.github.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub profile <ExternalLink size={14} aria-hidden="true" />
          </a>
        </motion.article>

        <motion.article
          className="activity-profile-card activity-profile-card--leetcode"
          variants={cardVariants}
        >
          <div className="activity-profile-card__header">
            <span className="activity-card__icon">
              <Code2 size={19} aria-hidden="true" />
            </span>
            <span className="metadata">VERIFIED SIGNAL</span>
          </div>
          <div
            className="activity-profile-card__visual activity-profile-card__visual--leetcode"
            aria-hidden="true"
          >
            <span>[</span>
            <span>_</span>
            <span>]</span>
            <i />
            <i />
            <i />
          </div>
          <h3>LeetCode</h3>
          <p className="activity-profile-card__username">
            @{developerProfile.leetcode.username}
          </p>
          <p className="activity-profile-card__metric">
            {developerProfile.leetcode.solved}
          </p>
          <p className="activity-profile-card__metric-label">Problems solved</p>
          <a
            className="activity-card__link"
            href={developerProfile.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View LeetCode <ExternalLink size={14} aria-hidden="true" />
          </a>
        </motion.article>
      </motion.div>

      <motion.article className="activity-focus-card" variants={cardVariants}>
        <div className="activity-focus-card__header">
          <div className="activity-focus-card__title">
            <Layers3 size={19} aria-hidden="true" />
            <div>
              <span className="metadata">ENGINEERING FOCUS</span>
              <h3>Systems I build with</h3>
            </div>
          </div>
          <Network size={20} aria-hidden="true" />
        </div>
        <div className="activity-focus-card__groups">
          {developerProfile.engineeringFocusGroups.map((group) => (
            <div className="activity-focus-group" key={group.label}>
              <span className="activity-focus-group__label">{group.label}</span>
              <div className="activity-focus-group__items">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.article>

      <motion.article className="activity-signal" variants={cardVariants}>
        <div className="activity-signal__heading">
          <div className="activity-signal__title-row">
            <Activity size={19} aria-hidden="true" />
            <h3>GitHub activity / engineering signal</h3>
          </div>
          <span className="metadata">LIVE SOURCE</span>
        </div>
        <div className="activity-signal__body">
          <p>
            Public repository activity is available directly through GitHub.
            This view uses verified profile and repository data without
            fabricating a contribution calendar.
          </p>
          <div className="activity-signal__status">
            <span
              className={
                githubData.error
                  ? "activity-signal__status-dot activity-signal__status-dot--error"
                  : "activity-signal__status-dot"
              }
            />
            {githubData.loading
              ? "SYNCING PUBLIC DATA"
              : githubData.error
                ? "LIVE DATA UNAVAILABLE"
                : "PUBLIC DATA CONNECTED"}
          </div>
          <a
            className="activity-card__link"
            href={developerProfile.github.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View activity on GitHub{" "}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </motion.article>

      <motion.article className="activity-work" variants={cardVariants}>
        <div className="activity-work__header">
          <div>
            <span className="technical-label">RECENT ENGINEERING WORK</span>
            <h3>Repositories and project signals</h3>
          </div>
          {githubData.loading && (
            <span className="activity-loading-label">SYNCING</span>
          )}
        </div>

        {githubData.loading ? (
          <div
            className="activity-repository-grid"
            aria-label="Loading repositories"
          >
            {[1, 2, 3].map((item) => (
              <div className="activity-skeleton" key={item} />
            ))}
          </div>
        ) : (
          <div className="activity-repository-grid">
            {(repositories.length
              ? repositories
              : developerProfile.knownProjects.map((name) => ({
                  name,
                  htmlUrl: developerProfile.github.url,
                }))
            ).map((repository) => (
              <a
                className="repository-item"
                href={repository.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={repository.name}
              >
                <div className="repository-item__topline">
                  <span className="repository-item__name">
                    {repository.name}
                  </span>
                  <ExternalLink size={14} aria-hidden="true" />
                </div>
                <p>
                  {repository.description ||
                    "Project reference available on the public GitHub profile."}
                </p>
                <div className="repository-item__meta">
                  <span>{repository.language || "PROJECT"}</span>
                  {repository.updatedAt && (
                    <span>{formatUpdatedDate(repository.updatedAt)}</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </motion.article>

      <div className="activity-external-links">
        <a
          href={developerProfile.geeksForGeeks.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          GeeksforGeeks profile <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </motion.section>
  );
}

export default DeveloperActivity;
