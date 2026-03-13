export interface RiskItem {
  type: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  description: string;
  recommendation: string;
  riskScore?: number;
}

export interface DevOpsAnalysis {
  securityRisks: RiskItem[];
  ciCdIssues: RiskItem[];
  dependencyRisks: RiskItem[];
  testingIssues: RiskItem[];
}

export interface DevOpsAgentResponse {
  repository: string;
  analyzedFiles: number;
  analysis: DevOpsAnalysis;
}