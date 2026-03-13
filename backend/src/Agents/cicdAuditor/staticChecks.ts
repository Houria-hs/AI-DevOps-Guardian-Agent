import { CiCdIssue } from "./types";

export function runStaticChecks(
  files: { name: string; path: string; content: string }[]
): CiCdIssue[] {

  const issues: CiCdIssue[] = [];

  const hasWorkflow = files.some(f =>
    f.path.startsWith(".github/workflows/")
  );

  if (!hasWorkflow) {
    issues.push({
      category: "Pipeline",
      severity: "High",
      description: "No GitHub Actions workflow detected.",
      recommendation: "Implement CI pipeline using GitHub Actions.",
    });
  }

  const packageJson = files.find(f => f.name === "package.json");

  if (packageJson) {
    try {
      const parsed = JSON.parse(packageJson.content);
      const scripts = parsed.scripts || {};

      if (!scripts.test) {
        issues.push({
          category: "Testing",
          severity: "High",
          description: "No test script defined in package.json.",
          recommendation: "Add automated testing before deployment.",
          file: "package.json"
        });
      }

      if (!scripts.build) {
        issues.push({
          category: "Pipeline",
          severity: "Medium",
          description: "No build script defined.",
          recommendation: "Add build step to CI pipeline.",
          file: "package.json"
        });
      }

    } catch {
      issues.push({
        category: "Pipeline",
        severity: "Medium",
        description: "Unable to parse package.json.",
        recommendation: "Ensure package.json is valid JSON.",
        file: "package.json"
      });
    }
  }

  const hasDockerfile = files.some(f => f.name === "Dockerfile");

  if (!hasDockerfile) {
    issues.push({
      category: "Deployment",
      severity: "Low",
      description: "No Dockerfile detected.",
      recommendation: "Consider containerizing the application.",
    });
  }

  const hasCodeQL = files.some(f =>
    f.content.includes("codeql")
  );

  if (!hasCodeQL) {
    issues.push({
      category: "Security",
      severity: "Medium",
      description: "No security scanning (CodeQL) detected.",
      recommendation: "Enable GitHub Advanced Security or Azure DevOps Security scanning.",
    });
  }

  return issues;
}