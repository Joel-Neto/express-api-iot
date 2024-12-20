import { Router } from "express";

import { TempDataController } from "../controller/TempDataController";

const routes = Router();
const tempDataController = new TempDataController();

routes.post("/temp", tempDataController.register);

routes.get("/temp", tempDataController.getAll);

routes.get("/temp/dates", tempDataController.getByMonth);

export default routes;
