import { TempData } from "../models/TempData";
import { Request, Response } from "express";
import SendResponse from "../utils/SendResponse";

class TempDataController {
  async register(req: Request, res: Response) {
    try {
      const {
        internalTemperature,
        externalTemperature,
        internalHumidity,
        externalHumidity,
      } = req.body;

      if (
        typeof internalTemperature !== "number" ||
        typeof externalTemperature !== "number" ||
        typeof internalHumidity !== "number" ||
        typeof externalHumidity !== "number"
      ) {
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

      const createdTempData = await TempData.create(newTempData);

      return SendResponse.success(
        res,
        201,
        "Registro criado com sucesso",
        createdTempData
      );
    } catch (error) {
      console.log("🚀 ~ TempData ~ error:", error);

      return SendResponse.error(res, 500, "Erro ao cadastrar temperatura");
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { limit = "10", skip = "0" }: any = req.query;

      const skipNumber = parseInt(skip, 10);
      const limitNumber = parseInt(limit, 10);

      const count = await TempData.countDocuments();
      const temps = await TempData.find().limit(limit).skip(skip);

      return SendResponse.success(res, 200, "Sucesso ao listar registros", {
        temps,
        count,
      });
    } catch (error) {
      console.log("🚀 ~ TempController ~ error:", error);
      SendResponse.error(res, 500, "Erro ao listar registros");
    }
  }

  async getByMonth(req: Request, res: Response) {
    try {
      const { month, year }: { month?: string; year?: string } = req.query;

      let query = {};

      if (month && year) {
        const monthNumber = parseInt(month, 10);
        const yearNumber = parseInt(year, 10);

        if (isNaN(monthNumber) || isNaN(yearNumber)) {
          return SendResponse.error(
            res,
            400,
            "Mês e ano devem ser números válidos"
          );
        }

        const startDate = new Date(
          Date.UTC(yearNumber, monthNumber - 1, 1, 0, 0, 0, 0)
        );
        const endDate = new Date(
          Date.UTC(yearNumber, monthNumber, 0, 23, 59, 59, 999)
        );

        query = {
          date: { $gte: startDate, $lte: endDate },
        };
      }

      const count = await TempData.countDocuments(query);
      const temps = await TempData.find(query);

      return SendResponse.success(res, 200, "Sucesso ao listar registros", {
        count,
        temps,
      });
    } catch (error) {
      console.log("🚀 ~ TempController ~ error:", error);
      return SendResponse.error(res, 500, "Erro ao listar registros");
    }
  }
}

export { TempDataController };
