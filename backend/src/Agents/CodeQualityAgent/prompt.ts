export function buildCodeQualityPrompt(
  files: { name: string; path: string; content: string }[]
) {
  const repoContext = files
    .map(file => `FILE: ${file.path}\n${file.content}`)
    .join("\n\n---------------------\n\n");

  return `
You are a principal-level software architecture and code quality auditor reviewing a production codebase.

### EVALUATION CRITERIA
1. **Structural Architecture**: File sizing, coupling, and modularization.
2. **Code Smells**: Logic duplication, magic values, and naming conventions.
3. **Tooling**: Presence of ESLint, Prettier, or TypeScript configurations.
4. **Testing**: Analysis of test coverage and testing patterns.
5. **Maintainability**: Error handling and type safety.

### SOURCE CODE CONTEXT
${repoContext}

### TASK
Analyze the files above. For every issue, identify severity (Critical, High, Medium, Low), a specific recommendation, and the relevant file path.

### OUTPUT FORMAT
Return the results as a JSON object with this structure:
{
  "structuralIssues": [{ "type": "string", "severity": "string", "description": "string", "file": "string", "recommendation": "string" }],
  "lintingIssues": [],
  "testingQualityIssues": [],
  "maintainabilityIssues": [],
  "overallCodeQualityScore": number,
  "summary": "professional executive summary"
}
  CRITICAL INSTRUCTIONS:
1. Every single finding MUST include a detailed "description" (at least 2 sentences).
2. Every single finding MUST include a "recommendation" field with a clear step-by-step fix.
3. Do not leave any fields null or empty.
4. Use the exact key names: "description" and "recommendation".

IMPORTANT: Your response must be a single valid JSON object. Do not include any text outside the JSON.


`;
}