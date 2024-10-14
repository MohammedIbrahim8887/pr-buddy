import { $ } from "bun";
import chalk from "chalk";
import { Spinner } from "cli-spinner";

const downloadTemplate = async () => {
  const spinner = new Spinner();
  const url = "https://raw.githubusercontent.com/MohammedIbrahim8887/pr-buddy/main/template.md";
  spinner.start();
  console.log(chalk.cyan("Downloading template.md from GitHub..."));

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to download template.md");
    }

    const data = await res.text();
    await Bun.write("template.md", data);
    console.log("template.md downloaded and saved in the root directory.");
  } catch (error) {
    console.error(chalk.red(`Error during template download: ${error}`));
  } finally {
    spinner.stop();
  }
};

export const setupDirectory = async () => {
  try {
    const { stdout } = await $`git rev-parse --is-inside-work-tree`;

    if (!stdout.toString().trim()) {
      console.error(chalk.red("Git is not initialized in this folder."));
      throw new Error("Git is not initialized in this folder.");
    }

    console.log(chalk.green("Git is initialized."));
    const gitignore = Bun.file(".gitignore");

    if (!await gitignore.exists()) {
      console.log(chalk.yellow(".gitignore not found in the root directory."));
      await Bun.write(".gitignore", "commits-log.txt\npr-buddy.sqlite\npr-summary.md\n");
      console.log(chalk.green(".gitignore created with default values."));
    } else {
      const gitignoreContent = await Bun.file(".gitignore").text();
      const requiredFiles = ["commits-log.txt", "pr-buddy.sqlite", "pr-summary.md"];
      const missingFiles = requiredFiles.filter(file => !gitignoreContent.includes(file));

      if (missingFiles.length > 0) {
        console.log(chalk.yellow(`Warning: The following files are missing from .gitignore: ${missingFiles.join(", ")}`));
      } else {
        console.log(chalk.green("All required files are present in .gitignore."));
      }
    }

    const template = Bun.file("template.md");
    if (!await template.exists()) {
      console.log(chalk.yellow("template.md not found in the root directory."));
      await downloadTemplate();
    } else {
      console.log(chalk.green("template.md already exists."));
    }

  } catch (error) {
    console.error(chalk.red(`Error: ${error}`));
    process.exit(1);
  }
};
