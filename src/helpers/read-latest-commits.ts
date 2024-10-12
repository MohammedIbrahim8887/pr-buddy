import { $, file, write } from "bun";
import { join } from "path";
import { commitFilePath } from "./constants";

export const readLatestCommits = async () => {
  try {
    // Get the current branch name
    const branchResult = await $`git rev-parse --abbrev-ref HEAD`.quiet();
    const currentBranch = branchResult.stdout
      ? branchResult.stdout.toString().trim()
      : null;

    if (!currentBranch) {
      throw new Error("Failed to get the current branch.");
    }

    // Get commits that have not been pushed to the remote, including diffs
    const result =
      await $`git log origin/${currentBranch}..HEAD -p --pretty=format:"%h - %an, %ar : %s"`.quiet();

    const unpushedCommitsWithDiffs = result.stdout
      ? result.stdout.toString().trim()
      : null;

    if (!unpushedCommitsWithDiffs) {
      throw new Error("No unpushed commits found or git command failed.");
    }

    const filePath = join(process.cwd(), commitFilePath);

    let lastSavedCommit = "";
    const fileExists = await file(filePath).exists();

    if (fileExists) {
      const fileContent = await file(filePath).text();
      if (fileContent) {
        lastSavedCommit = fileContent.trim();
      }
    }

    if (unpushedCommitsWithDiffs !== lastSavedCommit) {
      await write(filePath, unpushedCommitsWithDiffs + "\n");
      console.log(`Unpushed commits with diffs written to: ${filePath}`);
    } else {
      console.log("The unpushed commits with diffs are already saved.");
    }

    return unpushedCommitsWithDiffs;
  } catch (error: any) {
    throw new Error(
      "Error reading unpushed commits with diffs: " + error.message
    );
  }
};
