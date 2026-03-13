import * as devops from "./devopsRiskAgent";
import * as cicd from "./cicdAuditor";
import * as quality from "./CodeQualityAgent";

function parseOwnerRepo(input: string) {
  // Accept formats like "owner/repo" or full URLs
  try {
    if (input.includes("github.com")) {
      const url = new URL(input);
      const parts = url.pathname.replace(/^\//, "").split("/");
      return { owner: parts[0], repo: parts[1] };
    }
  } catch (e) {
    // fallthrough
  }

  const parts = input.split("/");
  return { owner: parts[0], repo: parts[1] };
}

function normalizeAgentResponse(name: string, res: any) {
  const feedback = res?.analysis?.summary || res?.analysis || res?.summary || JSON.stringify(res);
  return {
    agent: name,
    feedback: typeof feedback === "string" ? feedback : JSON.stringify(feedback)
  };
}

export const riskAgent = {
  analyze: async (repoData: string) => {
    const { owner, repo } = parseOwnerRepo(repoData);
    const res = await devops.run(owner, repo);
    return normalizeAgentResponse("riskAgent", res);
  }
};

export const cicdAgent = {
  analyze: async (repoData: string) => {
    const { owner, repo } = parseOwnerRepo(repoData);
    const res = await cicd.run(owner, repo);
    return normalizeAgentResponse("cicdAgent", res);
  }
};

export const qualityAgent = {
  analyze: async (repoData: string) => {
    const { owner, repo } = parseOwnerRepo(repoData);
    const res = await quality.run(owner, repo);
    return normalizeAgentResponse("qualityAgent", res);
  }
};

export default { riskAgent, cicdAgent, qualityAgent };
