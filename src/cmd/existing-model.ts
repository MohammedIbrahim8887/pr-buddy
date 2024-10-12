import chalk from "chalk";
import getAIModels from "../api/get-ai-models";
import inquirer from "inquirer";
import { Spinner } from "cli-spinner";
import addAIModel from "../db/add-ai-model";

const existingModel = async () => {
    const models = await getAIModels();
    if(!models) {
        console.log(chalk.red("No models found. Please install a model first."))
    }
    const modelChoices: string[] = models?.map((model)=> (
        `Model Name :${model.name}, Model Size: ${model.size}`
    ))

    const spinnner = new Spinner()

    inquirer.prompt([
        {
            type: "list",
            name: "model",
            message: "Choose a model to use as a default AI model",
            choices: modelChoices
        }
    ]).then(async (answers) => {
        for (const model of models) {
            if (answers.model === `Model Name :${model.name}, Model Size: ${model.size}`) {
                console.log(chalk.green(`You have selected ${model.name}`))
                console.log(chalk.cyan(`Setting ${model.name}`))
                spinnner.start()
                await addAIModel(model.name)
                spinnner.stop()
                console.log(chalk.cyan(`${model.name} has been set as the default AI model. Let's start creating PRs`))
            }
        }
    })
}

export default existingModel