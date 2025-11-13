import { useState, useEffect } from "react";
import { Github, Star, GitFork } from "lucide-react";

export default function ProjectTracker() {
  const [repoData, setRepoData] = useState(null);
  const [commitData, setCommitData] = useState({
    lastPushDate: null,
    commitsToday: 0,
    daysSincePush: null,
  });

  const repoOwner = "arrowboy47"; 
  const repoName = "campSearch"; 

  const githubRepoUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;
  const githubCommitsUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits`;

  useEffect(() => {
    async function fetchRepoInfo() {
      try {
        const [repoRes, commitsRes] = await Promise.all([
          fetch(githubRepoUrl),
          fetch(githubCommitsUrl),
        ]);

        // Handle potential API errors gracefully
        if (!repoRes.ok || !commitsRes.ok) {
          console.error("GitHub API request failed");
          return;
        }

        const repo = await repoRes.json();
        const commits = await commitsRes.json();

        // Make sure the commits result is an array
        if (!Array.isArray(commits) || commits.length === 0) {
          console.warn("No commits returned or API rate limit hit.");
          return;
        }

        const lastCommit = commits[0];
        const lastPush = new Date(lastCommit.commit.author.date);
        const today = new Date();
        const diffDays = Math.floor((today - lastPush) / (1000 * 60 * 60 * 24));

        const todayString = lastPush.toISOString().split("T")[0];
        const commitsToday = commits.filter((c) =>
          c.commit.author.date.startsWith(todayString)
        ).length;

        setRepoData(repo);
        setCommitData({
          lastPushDate: lastPush.toDateString(),
          commitsToday,
          daysSincePush: diffDays,
        });
      } catch (err) {
        console.error("GitHub fetch error:", err);
      }
    }

    fetchRepoInfo();
  }, []);

  // Determine color based on days since last push
  const getStatusColor = () => {
    const d = commitData.daysSincePush;
    if (d === null) return "bg-latte-overlay2 dark:bg-mocha-overlay2"; // unknown
    if (d <= 0) return "bg-latte-green dark:bg-mocha-green";
    if (d <= 2) return "bg-latte-yellow dark:bg-mocha-yellow";
    if (d <= 6) return "bg-latte-peach dark:bg-mocha-peach";
    return "bg-latte-red dark:bg-mocha-red";
  };

  return (
    <div className="h-[15rem] border border-latte-surface2 dark:border-mocha-surface2 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0 shadow-md p-5 w-full flex flex-col justify-between overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-latte-mauve dark:text-mocha-mauve flex items-center gap-2">
          <Github className="w-6 h-6" />
          Current Project
        </h2>
        <span className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
      </div>

      {/* Repo link */}
      <a
        href={`https://github.com/${repoOwner}/${repoName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-semibold text-latte-mauve dark:text-mocha-mauve hover:underline break-all"
      >
        {repoName}
      </a>

      {/* Activity info */}
      <div className="text-base space-y-2 mt-2 flex-grow">
        <p>
          <span className="font-semibold">Last Push:</span>{" "}
          {commitData.lastPushDate || "Loading..."}
        </p>
        <p>
          <span className="font-semibold">Commits that day:</span>{" "}
          {commitData.commitsToday}
        </p>

        {repoData && (
          <>
            <p>
              <span className="font-semibold">Primary Language:</span>{" "}
              {repoData.language || "N/A"}
            </p>

            <div className="flex items-center gap-6 mt-2">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-latte-yellow dark:text-mocha-yellow" />
                {repoData.stargazers_count ?? 0}
              </span>

              <span className="flex items-center gap-1">
                <GitFork className="w-4 h-4 text-latte-peach dark:text-mocha-peach" />
                {repoData.forks_count ?? 0}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}