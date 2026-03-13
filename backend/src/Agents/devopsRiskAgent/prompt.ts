export function buildDevOpsPrompt(
  files: { name: string; path: string; content: string }[]
) {
  const repoContext = files
    .map(file => `FILE: ${file.path}\n${file.content}`)
    .join("\n\n---------------------\n\n");

  return `
You are an elite DevOps Security and Architecture AI Agent.

### AUDIT SCOPE
1. **Security Vulnerabilities**: Detect hardcoded secrets, unsafe configurations, or exposed API keys.
2. **Infrastructure-as-Code**: Identify missing or weak CI/CD configurations (GitHub Actions, etc.).
3. **Supply Chain**: Analyze dependency risks and outdated packages in package.json.
4. **Reliability**: Detect absence of automated testing or health checks.
5. **Containerization**: Identify Dockerfile misconfigurations or root-user risks.

### SOURCE CODE
${repoContext}

### TASK
Perform a deep-scan of the provided files. Assign an "overallRiskScore" where 1 is healthy and 10 is critical risk.

### OUTPUT SCHEMA
Return a JSON object:
{
  "securityRisks": [{ "type": "string", "severity": "High|Medium|Low", "description": "string" }],
  "ciCdIssues": [],
  "dependencyRisks": [],
  "testingIssues": [],
  "dockerIssues": [],
  "overallRiskScore": number,
  "summary": "Professional executive summary of the security posture."
}

CRITICAL INSTRUCTIONS:
1. Every single finding MUST include a detailed "description" (at least 2 sentences).
2. Every single finding MUST include a "recommendation" field with a clear step-by-step fix.
3. Do not leave any fields null or empty.
4. Use the exact key names: "description" and "recommendation".

IMPORTANT: Return ONLY valid JSON.
`;
}