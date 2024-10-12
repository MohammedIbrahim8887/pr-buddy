import { file } from "bun";
import chalk from "chalk";
import { Spinner } from "cli-spinner";
import sendPropmt from "../api/send-prompt";
import getDefaultAI from "../db/get-default-ai";
import { commitFilePath, prTemplate } from "./constants";
import { generateGeminiPr } from "./generate-gemeni-pr";

const generatePrSummary = async () => {
  try {
    const spinner = new Spinner();
    spinner.setSpinnerTitle(chalk.cyan("Generatig PR summary..."));
    spinner.start();
    const commitFile = await file(commitFilePath).text();
    const template = await file(prTemplate).text();
    const propmt = `Please create a pull request summary in markdown format based on the provided git diff. Ensure that the summary adheres strictly to the template given and focuses solely on the content without including any code examples. Here is the git diff: ${commitFile}. Additionally, please follow this template for your summary: ${template}`;

    switch (await getDefaultAI()) {
      case "geminiAI":
        await generateGeminiPr(propmt);
        break;
      case "openAI":
        await sendPropmt(propmt);
        break;
      case "claudeAI":
        await sendPropmt(propmt);
        break;
      default:
        await sendPropmt(propmt);
        break;
    }
    spinner.stop();
    console.log(chalk("Your PR is ready. checkout pr-summary.md"));
  } catch (error: any) {
    throw new Error("Error generating PR summary: " + error.message);
  }
};

export default generatePrSummary;
getDefaultAI();
