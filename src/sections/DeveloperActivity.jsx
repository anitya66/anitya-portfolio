import {
  Activity,
  Code2,
  ExternalLink,
  GitBranch,
  Layers3,
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
          A live view of public repositories, problem solving and the
          engineering domains shaping my work.
        </motion.p>
      </div>

      <motion.div className="activity-overview" variants={sectionVariants}>
        <motion.article
          className="activity-card activity-card--github"
          variants={cardVariants}
        >
          <div className="activity-card__topline">
            <span className="activity-card__icon">
              <GitBranch size={19} aria-hidden="true" />
            </span>
            <span className="metadata">PUBLIC PROFILE</span>
          </div>
          <h3>GitHub</h3>
          <p className="activity-card__value">
            @{githubData.profile?.login ?? developerProfile.github.username}
          </p>
          <a
            className="activity-card__link"
            href={developerProfile.github.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open profile <ExternalLink size={14} aria-hidden="true" />
          </a>
        </motion.article>

        <motion.article
          className="activity-card activity-card--leetcode"
          variants={cardVariants}
        >
          <div className="activity-card__topline">
            <span className="activity-card__icon">
              <Code2 size={19} aria-hidden="true" />
            </span>
            <span className="metadata">VERIFIED SIGNAL</span>
          </div>
          <h3>LeetCode</h3>
          <p className="activity-card__metric">
            {developerProfile.leetcode.solved}
          </p>
          <p className="activity-card__metric-label">Problems solved</p>
          <a
            className="activity-card__link"
            href={developerProfile.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Data structures &amp; algorithms{" "}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </motion.article>

        <motion.article
          className="activity-card activity-card--focus"
          variants={cardVariants}
        >
          <div className="activity-card__topline">
            <span className="activity-card__icon">
              <Layers3 size={19} aria-hidden="true" />
            </span>
            <span className="metadata">ENGINEERING FOCUS</span>
          </div>
          <h3>Systems I build with</h3>
          <ul className="activity-focus-list">
            {developerProfile.engineeringFocus.map((focus) => (
              <li key={focus}>{focus}</li>
            ))}
          </ul>
        </motion.article>
      </motion.div>

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
