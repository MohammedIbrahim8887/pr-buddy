import db from "./init-db";

const getApiKey = async (modelName: string): Promise<string> => {
  try {
    const modelQuery = db().query("SELECT id FROM models WHERE name = $name");
    modelQuery.run({ $name: modelName });
    const modelResult = (await modelQuery.get()) as { id: number };

    if (!modelResult) {
      throw new Error(`Model with name "${modelName}" not found.`);
    }

    const modelId = modelResult.id;

    const apiKeyQuery = db().query(
      "SELECT key FROM api_keys WHERE modelId = $modelId"
    );
    apiKeyQuery.run({ $modelId: modelId });
    const apiKeyResult = (await apiKeyQuery.get()) as { key: string };

    return apiKeyResult?.key;
  } catch (err: any) {
    throw new Error("Error getting API key: " + err.message);
  }
};

export default getApiKey;
