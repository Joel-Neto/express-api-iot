"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TempDataController_1 = require("../controller/TempDataController");
const routes = (0, express_1.Router)();
const tempDataController = new TempDataController_1.TempDataController();
routes.post("/temp", tempDataController.register);
routes.get("/temp", tempDataController.getAll);
routes.get("/temp/dates", tempDataController.getByMonth);
exports.default = routes;
//# sourceMappingURL=tempData.routes.js.map