import { Router, Request, Response } from "express";
import { orchestrateFullAudit } from "../services/orchestrator";

const router = Router();

router.post("/analyze", async (req: Request, res: Response) => {
    

    const owner = req.body.owner?.trim();
    const repo = req.body.repo?.trim();

    if (!owner || !repo) {
        return res.status(400).json({ error: "Owner and Repo are required." });
    }

    try {
        console.log(`[Azure AI Foundry] Initiating multi-agent audit for: ${owner}/${repo}`);
        const results = await orchestrateFullAudit(owner, repo);        
        res.setHeader("X-Audit-Engine", "Azure-OpenAI-GPT4o");
        res.json(results);
    } catch (error: any) {
        console.error("❌ AZURE ORCHESTRATION ERROR:", error.stack);
        res.status(500).json({ 
            error: "Audit failed", 
            details: error.message 
        });
    }
});

export default router;



