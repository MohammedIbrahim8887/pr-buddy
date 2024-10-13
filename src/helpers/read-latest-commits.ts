import { $, file, write } from "bun";
import { join } from "path";
import { commitFilePath } from "./constants";

export const readLatestCommits = async () => {
  try {
    const branchResult = await $`git rev-parse --abbrev-ref HEAD`.quiet();
    const currentBranch = branchResult.stdout
      ? branchResult.stdout.toString().trim()
      : null;

    if (!currentBranch) {
      throw new Error("Failed to get the current branch.");
    }

    const trackingResult =
      await $`git rev-parse --abbrev-ref --symbolic-full-name @{u}`
        .quiet()
        .catch(() => null);

    let result;

    if (trackingResult && trackingResult.stdout) {
      const remoteBranch = trackingResult.stdout.toString().trim();
      console.log(`Comparing with remote branch: ${remoteBranch}`);
      result =
        await $`git log ${remoteBranch}..HEAD -p --pretty=format:"%h - %an, %ar : %s"`.quiet();
    } else {
      console.log(`No remote tracking branch. Comparing with local HEAD.`);
      result =
        await $`git log HEAD -p --pretty=format:"%h - %an, %ar : %s"`.quiet();
    }

    const commitsWithDiffs = result.stdout
      ? result.stdout.toString().trim()
      : null;

    if (!commitsWithDiffs) {
      throw new Error("No commits found or git command failed.");
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

    if (commitsWithDiffs !== lastSavedCommit) {
      await write(filePath, commitsWithDiffs + "\n");
      console.log(`Commits with diffs written to: ${filePath}`);
    } else {
      console.log("The commits with diffs are already saved.");
    }

    return commitsWithDiffs;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error reading commits with diffs: " + error.message);
  }
};
