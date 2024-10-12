import addAIModel from "./add-ai-model";
import db from "./init-db";

export const addGptApiKey = async (modelName: string, apiKey: string) => {
  db().query("BEGIN");

  try {
    const modelQuery = db().query("SELECT id FROM models WHERE name = $name");
    modelQuery.run({ $name: modelName });
    const modelResult = (await modelQuery.get()) as { id: number };

    let modelId: number;

    if (modelResult) {
      console.log("JUST FOINDD ITTTT", modelResult.id);
      modelId = modelResult.id;
    } else {
      await addAIModel(modelName);
      const modelQuery = db().query("SELECT id FROM models WHERE name = $name");
      modelQuery.run({ $name: modelName });
      const modelResult = (await modelQuery.get()) as { id: number };
      modelId = modelResult.id;
    }

    const insertQuery = db().query(
      "INSERT INTO api_keys (modelId, key) VALUES ($modelId, $key);"
    );
    console.log(apiKey)
    insertQuery.run({ $modelId: modelId, $key: apiKey });

    db().query("COMMIT");

    return apiKey;
  } catch (err: any) {
    db().query("ROLLBACK");
    console.error(err);
    throw new Error("Error adding GPT API key: " + err.message);
  }
};
