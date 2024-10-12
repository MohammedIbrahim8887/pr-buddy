import db from "./init-db"

const getDefaultAI = async ():Promise<string> => {
    try {
        const query = db().query("SELECT * FROM models WHERE isDefault = TRUE");
        const result = await query.get("name") as {name:string, id: number, isDefault: boolean};
        return result?.name;
    } catch(err:any){
        throw new Error('Error getting default AI: ' + err.message);
    }
}

export default getDefaultAI;