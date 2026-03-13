import { getRepositoryContext } from "../../services/repositoryService";
import { getAzureCompletion } from "../../services/azureClient"; // Use the new utility
import { runStaticChecks } from "./staticChecks";
import { buildCiCdPrompt } from "./prompt";
import {
  CiCdAgentResponse,
  CiCdAnalysis
} from "./types";

export async function run(
  owner: string, 
  repo: string
): Promise<CiCdAgentResponse> {

  // 1 Fetch shared repository context
  const repoFiles = await getRepositoryContext(owner, repo, 15);

  // 2 Run deterministic static checks
  const staticFindings = runStaticChecks(repoFiles);

  // 3 Build the prompt 
  const prompt = buildCiCdPrompt(repoFiles, staticFindings);

  // 4 Call Azure LLM 
  const systemMessage = "You are a senior DevOps CI/CD architecture auditor. You always return valid JSON.";
  
  const parsed = await getAzureCompletion(systemMessage, prompt);

  // 5 Merge results into final structured output
  const analysis: CiCdAnalysis = {
    staticFindings,
    llmFindings: parsed.llmFindings || [],
    overallMaturityScore: parsed.overallMaturityScore || 1,
    summary: parsed.summary || "No summary provided."
  };

  return {
    repository: `${owner}/${repo}`,
    analyzedFiles: repoFiles.length,
    analysis
  };
}