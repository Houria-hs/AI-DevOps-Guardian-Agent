import axios from "axios";

const GITHUB_API_BASE = "https://api.github.com";



function getHeaders() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("Missing GITHUB_TOKEN in environment variables");
  }

  return {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github.v3+json"
  };
}


/**
 * Fetch contents of a repository path (recursive)
 */
export async function fetchRepoContents(
  owner: string,
  repo: string,
  path: string = ""
): Promise<any[]> {

  const response = await axios.get(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`,
    { headers: getHeaders() }
  );

  const items = response.data;

  let allFiles: any[] = [];

  for (const item of items) {
    if (item.type === "file") {
      allFiles.push(item);
    }

    if (item.type === "dir") {
      const nestedFiles = await fetchRepoContents(owner, repo, item.path);
      allFiles = allFiles.concat(nestedFiles);
    }
  }

  return allFiles;
}

/**
 * Filter only important DevOps-related files
 */
export function filterImportantFiles(files: any[]) {
  return files.filter(file =>
    file.name.endsWith(".ts") ||
    file.name.endsWith(".js") ||
    file.name.endsWith(".yml") ||
    file.name.endsWith(".yaml") ||
    file.name.endsWith(".json") ||
    file.name === "Dockerfile"
  );
}

/**
 * Fetch raw file content
 */
export async function fetchFileContent(downloadUrl: string) {
  const response = await axios.get(downloadUrl);
  return response.data;
}