import { Router } from "express";
import {
  fetchRepoContents,
  filterImportantFiles,
  fetchFileContent
} from "../services/githubService";
import { analyzeRepository } from "../services/llmService";

const router = Router();

router.get("/", async (req, res) => {
  const { owner, repo } = req.query as { owner?: string; repo?: string };

  if (!owner || !repo) {
    return res.status(400).json({
      error: "Query parameters 'owner' and 'repo' are required"
    });
  }

  try {
    // 1️⃣ Fetch full repository tree
    const allFiles = await fetchRepoContents(owner, repo);

    // 2️⃣ Filter important DevOps-related files
    const importantFiles = filterImportantFiles(allFiles);

    // 3️⃣ Prioritize strategic files
    const strategicFiles = [];
    const otherFiles = [];

    for (const file of importantFiles) {
      if (
        file.name === "package.json" ||
        file.name === "Dockerfile" ||
        file.path.startsWith(".github/workflows/")
      ) {
        strategicFiles.push(file);
      } else {
        otherFiles.push(file);
      }
    }

    // 4️⃣ Limit total files to avoid token overflow
    const MAX_FILES = 8;

    const selectedFiles = [
      ...strategicFiles,
      ...otherFiles.slice(0, MAX_FILES - strategicFiles.length)
    ].slice(0, MAX_FILES);

    // 5️⃣ Fetch file contents
    const filesWithContent = [];

    for (const file of selectedFiles) {
      if (!file.download_url) continue;

      const content = await fetchFileContent(file.download_url);

      filesWithContent.push({
        name: file.name,
        path: file.path,
        content
      });
    }

    // 6️⃣ Send to Gemini agent
    const analysis = await analyzeRepository(filesWithContent);

    return res.json({
      repository: `${owner}/${repo}`,
      analyzedFiles: filesWithContent.length,
      analysis
    });

  } catch (error: any) {
    console.error("Analysis error:", error.message);

    return res.status(500).json({
      error: "Repository analysis failed",
      details: error.message
    });
  }
});

export default router;
