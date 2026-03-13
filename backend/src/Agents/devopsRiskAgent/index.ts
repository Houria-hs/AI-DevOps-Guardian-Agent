import { getAzureCompletion } from "../../services/azureClient";
import { getRepositoryContext } from "../../services/repositoryService";
import { buildDevOpsPrompt } from "./prompt";

export async function run(owner: string, repo: string) {
  // 1. Fetch repository context 
  const filesWithContent = await getRepositoryContext(owner, repo, 8);

  // 2. Build the prompt
  const prompt = buildDevOpsPrompt(filesWithContent);

  // 3. Define the Persona for the System Message
  const systemMessage = "You are an elite DevOps Security and Architecture AI Agent. You strictly output valid JSON.";

  // 4. Call Azure 
  const analysis = await getAzureCompletion(systemMessage, prompt);

  return {
    repository: `${owner}/${repo}`,
    analyzedFiles: filesWithContent.length,
    analysis: {
      ...analysis,
      overallRiskScore: analysis.overallRiskScore || 0,
      summary: analysis.summary || "Security scan completed with no summary."
    }
  };
}