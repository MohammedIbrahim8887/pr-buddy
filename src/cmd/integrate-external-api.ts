import chalk from "chalk";
import { Spinner } from "cli-spinner";
import inquirer from "inquirer";
import addAIModel from "../db/add-ai-model";
import { addGptApiKey } from "../db/add-gpt-api-key";

export const integrateExternalApi = async (apiName: string) => {
  const spinner = new Spinner();
  console.log(chalk.cyan("Enter your open ai key"));
  try {
    inquirer
      .prompt([
        {
          type: "input",
          name: apiName,
          message: "Enter your open ai key",
        },
      ])
      .then((answer) => {
        spinner.start()
        console.log(chalk.cyan("Adding Your API Key..."))
        addGptApiKey(apiName, answer.geminiAI);
        spinner.stop()
        console.log(chalk.cyan(`setting ${apiName} as default AI model`));
        spinner.start()
        addAIModel(apiName, true);
        spinner.stop()
      });
  } catch (err: any) {
    console.log(chalk.red(err.message));
  }
};
