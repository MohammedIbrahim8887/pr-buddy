import db from "./init-db";

const addAIModel = async (model: string, isDefault?: boolean) => {
    db().query("BEGIN");
    try {
        const defaultModelQuery = `SELECT id FROM models WHERE isDefault = TRUE LIMIT 1`;
        const defaultModelResult =  db().query(defaultModelQuery);
        const id = defaultModelResult.get("id")
        if(isDefault) {
            if (!defaultModelResult.values("not-found")) {
                const updateDefaultQuery = db().query("UPDATE models SET isDefault = FALSE WHERE id = $id;")
                updateDefaultQuery.run({$id: id as any});
                return model
            } else {
                const insertQuery = db().query("INSERT INTO models (name, isDefault) VALUES($name, TRUE) ON CONFLICT(name) DO UPDATE SET isDefault = TRUE RETURNING name;");
                const result = insertQuery.run({$name: model});
                const newDefaultModel = result;
                return newDefaultModel;
            }
        } 

        const insertQuery = db().query("INSERT INTO models (name, isDefault) VALUES($name, FALSE) ON CONFLICT(name) DO UPDATE SET isDefault = TRUE RETURNING name;");
        
        const result = insertQuery.run({$name: model});
        const newDefaultModel = result;

         db().query("COMMIT");

        return newDefaultModel;
    } catch (err: any) {
         db().query("ROLLBACK");
        throw new Error('Error setting default AI: ' + err.message);
    }
}

export default addAIModel;
