export function buildCiCdPrompt(
  files: { name: string; path: string; content: string }[],
  staticFindings: any[]
) {
  const repoContext = files
    .map(f => `FILE: ${f.path}\n${f.content}`)
    .join("\n\n---------------------\n\n");

  return `
You are a senior DevOps CI/CD architecture auditor. 

### CONTEXT
The following static analysis findings have already been identified:
${JSON.stringify(staticFindings, null, 2)}

### SOURCE CODE
${repoContext}

### TASK
Perform a deep architectural evaluation based on the source code provided. Analyze:
1. Pipeline structure quality and environment separation.
2. Testing integration depth and security automation.
3. Deployment maturity (Blue/Green, Canary, etc.).

### OUTPUT DATA
Return the analysis as a JSON object with the following structure:
{
  "llmFindings": [
    { "type": "string", "severity": "low|medium|high", "description": "string" }
  ],
  "overallMaturityScore": number,
  "summary": "professional executive summary"
}

CRITICAL INSTRUCTIONS:
1. Every single finding MUST include a detailed "description" (at least 2 sentences).
2. Every single finding MUST include a "recommendation" field with a clear step-by-step fix.
3. Do not leave any fields null or empty.
4. Use the exact key names: "description" and "recommendation".

IMPORTANT: Your response must be a single valid JSON object.


`;
}