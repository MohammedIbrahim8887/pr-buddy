import ollama from "ollama";

const getAIModels = async () => {
  const resp = await ollama.list();
  return resp.models;
};

export default getAIModels;
