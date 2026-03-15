import React, { useState } from "react";
import AnalysisDisplay from './components/AnalysisDisplay'; 
import HealthCard from './components/HealthCard'; 


function App() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("devOps"); 
  const [status, setStatus] = useState(""); 


const handleAnalyze = async () => {
  if (!owner || !repo) return;
  setLoading(true);
  setError(null);
  setAnalysis(null);
  
  // 1. Initial Status
  setStatus("🔍 Fetching Repository Context...");

  try {
    // 2. Start the REAL backend process
    const analyzePromise = fetch('http://localhost:5000/api/agents/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ owner: owner.trim(), repo: repo.trim() })
    });

    const statusSteps = [
      { msg: " Security Agent: Scanning Vulnerabilities...", delay: 1500 },
      { msg: " Quality Agent: Checking Maintainability...", delay: 6000 },
      { msg: " CI/CD Agent: Verifying Pipelines...", delay: 11000 },
      { msg: " Finalizing Audit Report...", delay: 16000 }
    ];

    const timers = statusSteps.map(step => 
      setTimeout(() => setStatus(step.msg), step.delay)
    );

    const response = await analyzePromise; // The UI stays here until the backend is DONE

    // 4. Clean up timers if backend finishes early
    timers.forEach(t => clearTimeout(t));

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.details || "The server encountered an error.");
    }

    const data = await response.json();
    setAnalysis(data); 
    setStatus("Report Generated!");

  } catch (err) {
    setError(err.message);
    setStatus("❌ Audit Failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 mx-auto text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            DevOps Guardian
          </h1>
          
          <p className="text-zinc-500 mt-2">Multi-agent AI security & orchestration audit</p>
        </header>

        {/* Input Form */}
        <div className="relative group max-w-4xl mx-auto mb-16">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
  <div className="relative flex items-center gap-0 bg-zinc-900 rounded-2xl border border-zinc-800 p-2">
    <div className="flex-1 flex items-center px-4">
      <span className="text-zinc-500 mr-2 font-mono">owner/</span>
      <input
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        className="bg-transparent border-none outline-none text-white w-full py-3 font-medium placeholder:text-zinc-700"
        placeholder="microsoft"
      />
    </div>
    <div className="h-8 w-[1px] bg-zinc-800"></div>
    <div className="flex-1 flex items-center px-4">
      <span className="text-zinc-500 mr-2 font-mono">repo:</span>
      <input
        value={repo}
                onChange={(e) => setRepo(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full py-3 font-medium placeholder:text-zinc-700"
                placeholder="vscode"
              />
            </div>
            <button
              onClick={handleAnalyze}
              className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-blue-400 hover:text-white transition-all duration-300 shadow-lg active:scale-95"
            >
              {loading ? "SCANNING..." : "INITIALIZE AUDIT"}
            </button>
          </div>
        </div>

        {error && <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-4 rounded-xl mb-6">⚠️ {error}</div>}

        {!analysis && !loading && (
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50">
            <div className="p-6 border border-zinc-800 rounded-2xl">
              <h3 className="font-bold mb-2">1. Connect</h3>
              <p className="text-sm">Enter any public GitHub repository to begin the deep-scan.</p>
            </div>
            <div className="p-6 border border-zinc-800 rounded-2xl">
              <h3 className="font-bold mb-2">2. Analyze</h3>
              <p className="text-sm">Three specialized AI agents audit security, quality, and pipelines.</p>
            </div>
            <div className="p-6 border border-zinc-800 rounded-2xl">
              <h3 className="font-bold mb-2">3. Remediate</h3>
              <p className="text-sm">Receive step-by-step fix recommendations for every finding.</p>
            </div>
          </div>
        )}
        {/* PROGRESS VIEW */}
        {loading && (
          <div className="flex flex-col items-center justify-center p-12 bg-zinc-900/50 rounded-3xl border border-blue-500/20 shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)]">
            <div className="relative mb-8">
              {/* Outer Ping Effect */}
              <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
              {/* Inner Spinner Container */}
              <div className="relative bg-blue-500 p-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
          </div>
    
          <h2 className="text-2xl font-bold mb-2 tracking-tight">Analyzing Architecture</h2>
          {/* Fixed height p tag prevents layout jumping when text changes */}
          <p className="text-blue-400 font-mono text-sm tracking-widest h-6 transition-all duration-300">
            {status}
          </p>
    
    {/*  PROGRESS BARS */}
    <div className="flex gap-3 mt-8 w-72">
      {[1, 2, 3].map((i) => {
        const isStep1Active = status.includes('Security') || status.includes('Quality') || status.includes('CI/CD') || status.includes('Finalizing') || status.includes('✅');
        const isStep2Active = status.includes('Quality') || status.includes('CI/CD') || status.includes('Finalizing') || status.includes('✅');
        const isStep3Active = status.includes('CI/CD') || status.includes('Finalizing') || status.includes('✅');
        
        const isActive = (i === 1 && isStep1Active) || (i === 2 && isStep2Active) || (i === 3 && isStep3Active);

        return (
          <div key={i} className="relative flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                isActive 
                  ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]' 
                  : 'bg-transparent'
              }`} 
            />
          </div>
        );
      })}
    </div>
  </div>
)}

        {/* RESULTS VIEW */}
        {analysis && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                          {/* Summary Cards Row */}
            <div className="flex gap-4">
              <HealthCard 
                title="Security" 
                score={analysis.agents?.devOps?.analysis?.overallRiskScore || 0} 
                type="security"
                active={activeTab === "devOps"}
                onClick={() => setActiveTab("devOps")}
              />
              <HealthCard 
                title="Code Quality" 
                score={analysis.agents?.codeQuality?.analysis?.overallCodeQualityScore || 0} 
                type="code"
                active={activeTab === "codeQuality"}
                onClick={() => setActiveTab("codeQuality")}
              />
              <HealthCard 
                title="CI/CD Pipelines" 
                score={analysis.agents?.ciCd?.analysis?.overallMaturityScore || 0} 
                type="pipeline"
                active={activeTab === "ciCd"}
                onClick={() => setActiveTab("ciCd")}
              />
            </div>

            {/* Detail Section */}
            <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 p-8">
              {activeTab === "devOps" && <AnalysisDisplay data={analysis.agents?.devOps?.analysis} type="risk" />}
              {activeTab === "codeQuality" && <AnalysisDisplay data={analysis.agents?.codeQuality?.analysis} type="quality" />}
              {activeTab === "ciCd" && <AnalysisDisplay data={analysis.agents?.ciCd?.analysis} type="cicd" />}
            </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default App;