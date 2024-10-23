import { TempData } from "../models/TempData";
import { Request, Response } from "express";
import SendResponse from "../utils/SendResponse";

class TempDataController {
  async register(req: Request, res: Response) {
    try {
      const { temp } = req.body;

      if (!temp || typeof temp !== "number") {
        return res.status(400).json({
          success: false,
          message: "Campos obrigatórios não preenchidos",
        });
      }

      const newTempData = { temperature: temp }; // Corrigido para corresponder ao campo definido no modelo

      const createdTempData = await TempData.create(newTempData);

      // return res.status(201).json({
      //   success: true,
      //   message: "Registro criado com sucesso",
      //   data: createdTempData,
      // });

      return SendResponse.success(
        res,
        201,
        "Registro criado com sucesso",
        createdTempData
      );
    } catch (error) {
      console.log("🚀 ~ TempData ~ error:", error);
      // return res.status(500).json({
      //   success: false,
      //   message: "Erro ao cadastrar usuário",
      // });

      return SendResponse.error(res, 500, "Erro ao cadastrar usuário");
    }
  }
}

export { TempDataController };
