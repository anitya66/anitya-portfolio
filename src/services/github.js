const GITHUB_API_URL = "https://api.github.com";

async function requestJson(endpoint, signal) {
  const response = await fetch(`${GITHUB_API_URL}${endpoint}`, {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`);
  }

  return response.json();
}

export const githubService = {
  getProfile: (username, signal) => requestJson(`/users/${username}`, signal),
  getRepositories: async (username, signal) => {
    const repositories = await requestJson(
      `/users/${username}/repos?per_page=30&sort=updated&direction=desc&type=owner`,
      signal,
    );

    return repositories.map((repository) => ({
      name: repository.name,
      description: repository.description,
      htmlUrl: repository.html_url,
      language: repository.language,
      stars: repository.stargazers_count,
      updatedAt: repository.updated_at,
    }));
  },
};
