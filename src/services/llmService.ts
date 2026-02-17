import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeRepository(files: { name: string; path: string; content: string }[]) {
  
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const repoContext = files
    .map(file => `FILE: ${file.path}\n${file.content}`)
    .join("\n\n---------------------\n\n");

  const prompt = `
You are an elite DevOps Security and Architecture AI Agent.

Analyze the following repository files.

Your job:
1. Detect security risks (hardcoded secrets, unsafe configs).
2. Detect missing CI/CD or GitHub Actions.
3. Analyze dependency risks from package.json.
4. Detect absence of testing.
5. Detect Docker misconfigurations.
6. Provide a structured JSON response.

Return response in this format:

{
  "securityRisks": [],
  "ciCdIssues": [],
  "dependencyRisks": [],
  "testingIssues": [],
  "dockerIssues": [],
  "overallRiskScore": number (1-10),
  "summary": "short professional summary"
}

Repository Files:
${repoContext}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}
