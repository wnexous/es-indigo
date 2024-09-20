import AuthController from "./auth.controller";
import DataController from "./data.controller";
import DatabaseController from "./database.controller";

export default {
    auth: new AuthController(),
    database: new DatabaseController(),
    data: new DataController()
}