import { $ } from "bun";
import chalk from "chalk";
import { Spinner } from "cli-spinner";
import addAIModel from "../db/add-ai-model";

const installModel = async () => {
  const spinner = new Spinner();
  try {
    await $`ollama -v`;
    await $`ollama run phi:latest`;
    console.log(
      chalk.cyan("AI installation complete please type /bye to exit")
    );
    spinner.stop();
    addAIModel("phi3:latest", true);
  } catch {
    console.log(chalk.red("Ollama is not installed. Installing Ollama"));
    console.log(chalk.red("Installing"));
    const { text } =
      await $`sudo curl -fsSL https://ollama.com/install.sh | sh`;
    console.log(chalk.cyan.bold("Please enter your password"));
    console.log(chalk.green(text));

    await $`ollama run phi:latest`;
    console.log(
      chalk.cyan("AI installation complete please type /bye to exit")
    );
    spinner.stop();
    addAIModel("phi3:latest", true);
    console.log(chalk.green("Model installed successfully"));
  }
};

export default installModel;
