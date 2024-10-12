import chalk from "chalk";
import inquirer from "inquirer";
import existingModel from "./existing-model";
import installModel from "./install-model";
import { integrateExternalApi } from "./integrate-external-api";

const setup = async () => {
  console.log(chalk.cyan("Getting ready to setup your pr buddy..."));

  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message:
          "Choose which method you would like to use to setup your pr buddy",
        choices: [
          "Install a model",
          "Use an existing model",
          // "Integrate ChatGPT",
          // "Integrate Claude-AI",
          "Integrate Gemini-AI",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "Install a model":
          installModel();
          break;
        case "Use an existing model":
          existingModel();
          break;
        /**
         * ? Test out with when getting openAI and claudeAI api key
         */
        // case "Integrate ChatGPT":
        //   integrateExternalApi("openAI");
        //   break;
        // case "Integrate Claude-AI":
        //   integrateExternalApi("claudeAI");
        //   break;
        case "Integrate Gemini-AI":
          console.log(
            chalk.cyan(
              "Get your API key for free from https://aistudio.google.com/app/apikey",
            ),
          );
          integrateExternalApi("geminiAI");
          break;
        default:
          console.log(chalk.red("Invalid option"));
      }
    });
};

export default setup;
