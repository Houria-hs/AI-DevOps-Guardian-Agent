import React from "react";
import RiskSection from "./RiskSection";
import Summary from "./Summary";

export default function AnalysisDisplay({ data, type }) {
  if (!data) return <div className="text-zinc-500">No data available for this agent.</div>;

const getGridItems = () => {
  if (type === 'risk') return [
    { label: "Security", count: data.securityRisks?.length || 0 },
    { label: "CI/CD", count: data.ciCdIssues?.length || 0 },
    { label: "Deps", count: data.dependencyRisks?.length || 0 },
    { label: "Total", count: (data.securityRisks?.length || 0) + (data.ciCdIssues?.length || 0) }
  ];
  if (type === 'quality') return [
    { label: "Structure", count: data.structuralIssues?.length || 0 },
    { label: "Linting", count: data.lintingIssues?.length || 0 },
    { label: "Testing", count: data.testingQualityIssues?.length || 0 },
    { label: "Maint.", count: data.maintainabilityIssues?.length || 0 }
  ];
  return [
    { label: "Findings", count: data.llmFindings?.length || 0 },
    { label: "Static", count: data.staticFindings?.length || 0 },
    { label: "Critical", count: [...(data.llmFindings || []), ...(data.staticFindings || [])].filter(i => i.severity?.toLowerCase() === 'high').length },
    { label: "Score", count: displayScore }
  ];
};

const sections = {
    risk: [
      { title: "Security Risks", items: data.securityRisks || [] },
      { title: "Infrastructure Issues", items: data.ciCdIssues || [] },
      { title: "Dependency Risks", items: data.dependencyRisks || [] },
    ],
    quality: [
      { title: "Structural Architecture", items: data.structuralIssues || [] },
      { title: "Linting & Styling", items: data.lintingIssues || [] },
      { title: "Testing Quality", items: data.testingQualityIssues || [] },
      { title: "Maintainability", items: data.maintainabilityIssues || [] },
    ],
    cicd: [
      { title: "Pipeline Analysis", items: data.llmFindings || [] },
      { title: "Static Checks", items: data.staticFindings || [] }, 
    ]
  };


  const activeSections = sections[type] || [];
  const rawScore = data.overallRiskScore || data.overallMaturityScore || data.overallCodeQualityScore || data.score || 0;
  const displayScore = rawScore > 10 ? (rawScore / 10).toFixed(1) : rawScore;

const gridItems = getGridItems();
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. The Header Card */}
      <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
        <div className="text-sm uppercase tracking-widest opacity-60 mb-2">
          {type === 'risk' ? 'Security Health' : type === 'quality' ? 'Code Health' : 'Pipeline Health'}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-5xl font-black italic">
            {displayScore}<span className="text-2xl opacity-30">/10</span>
          </div>
    
          <div className="flex flex-col items-end gap-2 w-1/2">
            <div className="text-xs font-mono opacity-50 uppercase">Integrity Level</div>
            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden border border-white/5">
              <div 
                className={`h-full transition-all duration-1000 ${
                  displayScore <= 3 ? 'bg-rose-500' : displayScore >= 8 ? 'bg-emerald-500' : 'bg-amber-500'
                }`} 
                style={{ width: `${Math.min(displayScore * 10, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Universal Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gridItems.map((item, i) => (
          <div key={i} className="bg-zinc-900/80 p-5 rounded-2xl border border-zinc-800 hover:border-blue-500/50 transition-all">
            <div className="text-xs uppercase tracking-tighter opacity-50 mb-1">{item.label}</div>
            <div className="text-2xl font-bold">{item.count || 0}</div>
          </div>
        ))}
      </div>

      {/* 3. The Dynamic Accordion Sections */}
      <div className="space-y-4">
        {activeSections.map((section, idx) => {
  console.log(`Section ${section.title} items:`, section.items); 
  return <RiskSection key={idx} title={section.title} items={section.items} />;
})}
      </div>

      {/* 4. The AI Summary */}
      <Summary text={data.summary} />
    </div>
  );
}