import { Router } from "express";
import { run as runDevOps } from "../Agents/devopsRiskAgent";

const router = Router();

router.get("/", async (req, res) => {
  const { owner, repo } = req.query as { owner?: string; repo?: string };

  if (!owner || !repo) {
    return res.status(400).json({ error: "owner & repo query params required" });
  }

  try {
    // For now, only DevOps agent
    const devOpsResult = await runDevOps(owner, repo);

    res.json({
      agents: {
        devOps: devOpsResult
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

