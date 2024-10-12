import { GoogleGenerativeAI } from "@google/generative-ai";
import getApiKey from "../db/get-default-api-key";
import { file } from "bun";
import { prSummaryFilePath } from "./constants";

export const generateGeminiPr = async (prompt: string) => {
  const apiKey = await getApiKey("geminiAI");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    const writer = file(prSummaryFilePath).writer();
    writer.write(result.response.text());
    writer.flush();
  } catch (error: any) {
    throw new Error("Error sending prompt: " + error.message);
  }
};
