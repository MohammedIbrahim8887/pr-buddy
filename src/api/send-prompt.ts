import { file } from "bun";
import ollama from "ollama";
import getDefaultAI from "../db/get-default-ai";
import { prSummaryFilePath } from "../helpers/constants";
const sendPropmt = async (prompt: string) => {
    const message = { role: 'user', content: prompt};
    const model = await getDefaultAI()

    if(!model) {
        throw new Error('No default AI model found');
    }

    const writer = file(prSummaryFilePath).writer()
    try {
       const resp = await ollama.chat({
            model: model,
            messages: [message],
            stream: true,
        });

        for await (const part of resp) {
            writer.write(part.message.content)
        }
        writer.flush()

    } catch (error:any) {
        throw new Error('Error sending prompt: ' + error.message);
    }
}

export default sendPropmt;