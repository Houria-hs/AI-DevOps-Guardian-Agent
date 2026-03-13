export interface CiCdIssue {
  category: "Pipeline" | "Testing" | "Deployment" | "Security";
  severity: "Critical" | "High" | "Medium" | "Low";
  description: string;
  recommendation: string;
  file?: string;
}

export interface CiCdAnalysis {
  staticFindings: CiCdIssue[];
  llmFindings: CiCdIssue[];
  overallMaturityScore: number;
  summary: string;
}

export interface CiCdAgentResponse {
  repository: string;
  analyzedFiles: number;
  analysis: CiCdAnalysis;
}