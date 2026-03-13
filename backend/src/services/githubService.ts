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
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`,
      { headers: getHeaders() }
    );
    
    const items = response.data as any[];
    let allFiles: any[] = [];

    for (const item of items) {
      if (item.type === "file") {
        allFiles.push(item);
      } else if (item.type === "dir") {
        
        const nestedFiles = await fetchRepoContents(owner, repo, item.path);
        allFiles = allFiles.concat(nestedFiles);
      }
    }

    return allFiles;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error(`GitHub Repository not found: ${owner}/${repo}`);
    }
    throw error;
  }
}
/**
 * Filter only important DevOps-related files
 */
export function filterImportantFiles(files: any[]) {
  return files.filter(file => {
    // Ignore common heavy folders to prevent timeouts
    const isJunk = file.path.includes('node_modules') || 
                   file.path.includes('.git') || 
                   file.path.includes('dist');
                   
    if (isJunk) return false;

    return (
      file.name.endsWith(".ts") ||
      file.name.endsWith(".js") ||
      file.name.endsWith(".yml") ||
      file.name.endsWith(".yaml") ||
      file.name.endsWith(".json") ||
      file.name === "Dockerfile"
    );
  });
}

/**
 * Fetch raw file content
 */
export async function fetchFileContent(downloadUrl: string): Promise<string> {
  const response = await axios.get(downloadUrl);
  return typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
}