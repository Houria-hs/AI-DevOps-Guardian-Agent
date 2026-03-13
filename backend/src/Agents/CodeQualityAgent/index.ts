import { getAzureCompletion } from "../../services/azureClient"; // Import your new Azure utility
import { getRepositoryContext } from "../../services/repositoryService";
import { buildCodeQualityPrompt } from "./prompt";
import { CodeQualityAgentResponse, CodeQualityAnalysis } from "./types";

export async function run(owner: string, repo: string): Promise<CodeQualityAgentResponse> {
  
  // 1. Get shared repository context (keeping limit of 20)
  const repoFiles = await getRepositoryContext(owner, repo, 20);

  // 2. Filter only code-relevant files
  const codeFiles = repoFiles.filter(file =>
    file.name.endsWith(".js") ||
    file.name.endsWith(".ts") ||
    file.name.endsWith(".tsx") ||
    file.name.endsWith(".jsx") ||
    file.name === "package.json"
  ).slice(0, 10); 

  // 3. Build prompt
  const prompt = buildCodeQualityPrompt(codeFiles);

  // 4. Call Azure LLM
  const systemMessage = "You are a principal-level software architecture and code quality auditor. You always output valid JSON.";
  
  const analysis: CodeQualityAnalysis = await getAzureCompletion(systemMessage, prompt);

  return {
    repository: `${owner}/${repo}`,
    analyzedFiles: codeFiles.length,
    analysis
  };
}