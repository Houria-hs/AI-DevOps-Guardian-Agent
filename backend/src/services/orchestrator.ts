

import { run as runRisk } from "../Agents/devopsRiskAgent";
import { run as runQuality } from "../Agents/CodeQualityAgent";
import { run as runCiCd } from "../Agents/cicdAuditor";


    export async function orchestrateFullAudit(owner: string, repo: string) {
    console.log("🛠️ Starting Sequential Audit...");

    const runAgent = async (name: string, fn: Function) => {
        try {
            console.log(`Running ${name}...`);
            const result = await fn(owner, repo);
            return result;
        } catch (err: any) {
            console.error(`❌ ${name} failed:`, err.message);
            return { analysis: { summary: `${name} was unable to complete.`, overallRiskScore: 0 } };
        }
    };

    const devOps = await runAgent("Risk Agent", runRisk);
    const codeQuality = await runAgent("Quality Agent", runQuality);
    const ciCd = await runAgent("CI/CD Agent", runCiCd);

    return {
        repository: `${owner}/${repo}`,
        agents: { devOps, codeQuality, ciCd }
    };
}