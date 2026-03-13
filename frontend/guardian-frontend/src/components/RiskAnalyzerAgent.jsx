import { parseAnalysis } from "../utils/parseAnalysis";
import RiskScore from "./RiskScore";
import RiskSection from "./RiskSection";
import Summary from "./Summary";

export default function RiskAnalyzer({ analysis }) {
  const data = parseAnalysis(analysis);

  if (!data) {
    return (
      <div className="text-red-400">
        Failed to load analysis.
      </div>
    );
  }

  return (

    
    <div className="space-y-10">

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 mb-10">
            <div className="text-sm uppercase tracking-widest opacity-60 mb-2">
             DevOps Risk Assessment
            </div>

            <div className="flex items-center justify-between">
                <div>
                  <div className="text-5xl font-bold">
                    {data.overallRiskScore}/10
                  </div>
                  <div className="text-red-400 font-medium mt-2">
                    {data.overallRiskScore >= 8 ? "High Risk" :
                     data.overallRiskScore >= 5 ? "Moderate Risk" :
                     "Low Risk"}
                  </div>
                </div>

                <div className="w-1/2">
                  <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-600"
                      style={{ width: `${data.overallRiskScore * 10}%` }}
                    />
                  </div>
                </div>
            </div>
        </div>
      {/* 2️⃣ Category Summary Grid — ADD IT HERE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Security", count: data.securityRisks?.length },
          { label: "CI/CD", count: data.ciCdIssues?.length },
          { label: "Dependencies", count: data.dependencyRisks?.length },
          { label: "Testing", count: data.testingIssues?.length }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 hover:border-blue-500 transition-all duration-300"
          >
            <div className="text-sm opacity-60">
              {item.label}
            </div>
            <div className="text-2xl font-bold">
              {item.count || 0}
            </div>
          </div>
        ))}
      </div>
      
      <RiskSection title="Security Risks" items={data.securityRisks} />
      <RiskSection title="CI/CD Issues" items={data.ciCdIssues} />
      <RiskSection title="Dependency Risks" items={data.dependencyRisks} />
      <RiskSection title="Testing Issues" items={data.testingIssues} />
      <RiskSection title="Docker Issues" items={data.dockerIssues} />

      <Summary text={data.summary} />
    </div>
  );
}
