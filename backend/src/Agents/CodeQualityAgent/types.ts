export interface CodeIssue {
  type: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  description: string;
  recommendation: string;
  file?: string;
}

export interface CodeQualityAnalysis {
  structuralIssues: CodeIssue[];
  lintingIssues: CodeIssue[];
  testingQualityIssues: CodeIssue[];
  maintainabilityIssues: CodeIssue[];
  overallCodeQualityScore: number; 
  summary: string;
}

export interface CodeQualityAgentResponse {
  repository: string;
  analyzedFiles: number;
  analysis: CodeQualityAnalysis;
}