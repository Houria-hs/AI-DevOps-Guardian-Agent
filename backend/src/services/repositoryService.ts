import {
  fetchRepoContents,
  filterImportantFiles,
  fetchFileContent 
} from "./githubService";

export interface RepositoryFile {
  name: string;
  path: string;
  content: string;
}

export async function getRepositoryContext(
  owner: string,
  repo: string,
  maxFiles = 10
): Promise<RepositoryFile[]> {

  // 1. Fetch full repository tree
  const allFiles = await fetchRepoContents(owner, repo);

  // 2. Filter relevant files
  const importantFiles = filterImportantFiles(allFiles);

  // 3. Prioritize strategic files
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

  const selectedFiles = [
    ...strategicFiles,
    ...otherFiles.slice(0, maxFiles - strategicFiles.length)
  ].slice(0, maxFiles);

  // 4. Fetch file contents
  const filesWithContent: RepositoryFile[] = [];

  for (const file of selectedFiles) {
    if (!file.download_url) continue;

    // Use the imported function directly
    const content = await fetchFileContent(file.download_url);

    // Inside getRepositoryContext
const allFiles = await fetchRepoContents(owner, repo);

if (!allFiles || allFiles.length === 0) {
    throw new Error("The repository appears to be empty or inaccessible.");
}

    filesWithContent.push({
      name: file.name,
      path: file.path,
      content: content as string
    });
  }

  return filesWithContent;
}