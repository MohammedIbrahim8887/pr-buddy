import chalk from "chalk";
import { Spinner } from "cli-spinner";
import generatePrSummary from "../helpers/generate-pr-summary";
import { readLatestCommits } from "../helpers/read-latest-commits";

const createPr = async () => {
  console.log(chalk.cyan("Waking up AI..."));
  const spinner = new Spinner();
  try {
    console.log(chalk.cyan("Waking up ollama..."));
    spinner.start();
    spinner.stop();
    console.log(chalk.cyan("Reading Commits..."));
    spinner.start();
    await readLatestCommits();
    spinner.stop();
    console.log(chalk("Parsing Commits..."));
    generatePrSummary();
  } catch (err: any) {
    console.error(chalk.red("Error creating PR: " + err.message));
    spinner.stop();
    return new Error(err);
  }
};

export default createPr;
