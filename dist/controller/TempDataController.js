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
            const { internalTemperature, externalTemperature, internalHumidity, externalHumidity, } = req.body;
            if (typeof internalTemperature !== "number" ||
                typeof externalTemperature !== "number" ||
                typeof internalHumidity !== "number" ||
                typeof externalHumidity !== "number") {
                return res.status(400).json({
                    success: false,
                    message: "Campos obrigatórios não preenchidos",
                });
            }
            const newTempData = {
                internalTemperature,
                externalTemperature,
                internalHumidity,
                externalHumidity,
            };
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
            const count = await TempData_1.TempData.countDocuments();
            const temps = await TempData_1.TempData.find().limit(limit).skip(skip);
            return SendResponse_1.default.success(res, 200, "Sucesso ao listar registros", {
                temps,
                count,
            });
        }
        catch (error) {
            console.log("🚀 ~ TempController ~ error:", error);
            SendResponse_1.default.error(res, 500, "Erro ao listar registros");
        }
    }
    async getByMonth(req, res) {
        try {
            const { month, year } = req.query;
            let query = {};
            if (month && year) {
                const monthNumber = parseInt(month, 10);
                const yearNumber = parseInt(year, 10);
                if (isNaN(monthNumber) || isNaN(yearNumber)) {
                    return SendResponse_1.default.error(res, 400, "Mês e ano devem ser números válidos");
                }
                const startDate = new Date(Date.UTC(yearNumber, monthNumber - 1, 1, 0, 0, 0, 0));
                const endDate = new Date(Date.UTC(yearNumber, monthNumber, 0, 23, 59, 59, 999));
                query = {
                    date: { $gte: startDate, $lte: endDate },
                };
            }
            const count = await TempData_1.TempData.countDocuments(query);
            const temps = await TempData_1.TempData.find(query);
            return SendResponse_1.default.success(res, 200, "Sucesso ao listar registros", {
                count,
                temps,
            });
        }
        catch (error) {
            console.log("🚀 ~ TempController ~ error:", error);
            return SendResponse_1.default.error(res, 500, "Erro ao listar registros");
        }
    }
}
exports.TempDataController = TempDataController;
//# sourceMappingURL=TempDataController.js.map