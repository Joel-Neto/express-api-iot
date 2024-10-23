import { Router } from "express";

import { TempDataController } from "../controller/TempDataController";

const routes = Router();
const tempDataController = new TempDataController();

routes.post("/cadastro", tempDataController.register);

export default routes;
