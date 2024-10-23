"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempDataController = void 0;
const TempData_1 = require("../models/TempData");
const SendResponse_1 = __importDefault(require("../utils/SendResponse"));
class TempDataController {
    async register(req, res) {
        try {
            const { temp } = req.body;
            if (!temp || typeof temp !== "number") {
                return res.status(400).json({
                    success: false,
                    message: "Campos obrigatórios não preenchidos",
                });
            }
            const newTempData = { temperature: temp }; // Corrigido para corresponder ao campo definido no modelo
            const createdTempData = await TempData_1.TempData.create(newTempData);
            return SendResponse_1.default.success(res, 201, "Registro criado com sucesso", createdTempData);
        }
        catch (error) {
            console.log("🚀 ~ TempData ~ error:", error);
            return SendResponse_1.default.error(res, 500, "Erro ao cadastrar temperatura");
        }
    }
    async getAll(req, res) {
        try {
            const { limit = "10", skip = "0" } = req.query;
            const skipNumber = parseInt(skip, 10);
            const limitNumber = parseInt(limit, 10);
            const temps = await TempData_1.TempData.find().limit(limit).skip(skip);
            return SendResponse_1.default.success(res, 200, "Sucesso ao listar registros", temps);
        }
        catch (error) {
            console.log("🚀 ~ TempController ~ error:", error);
            SendResponse_1.default.error(res, 500, "Erro ao listar registros");
        }
    }
}
exports.TempDataController = TempDataController;
//# sourceMappingURL=TempDataController.js.map