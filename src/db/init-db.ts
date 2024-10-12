import { localDB } from "../helpers/constants";
import { Database } from "bun:sqlite";

export const initDb = () => {
  const db = new Database(localDB, { create: true });

  const modelQuery = db.query(`CREATE TABLE IF NOT EXISTS models (
      id INTEGER PRIMARY KEY, 
      name TEXT NOT NULL UNIQUE,
      isDefault BOOLEAN DEFAULT FALSE
    );`);

  modelQuery.run();

  const apiKeyQuery = db.query(`CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY, 
      modelId INTEGER NOT NULL,
      key TEXT NOT NULL UNIQUE,
      FOREIGN KEY (modelId) REFERENCES models(id) ON DELETE CASCADE
    );`);

  apiKeyQuery.run();

  return db;
};

export default initDb;
