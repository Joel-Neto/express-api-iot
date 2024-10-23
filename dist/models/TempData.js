"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempData = void 0;
const mongoose_1 = require("mongoose");
const TempDataSchema = new mongoose_1.Schema({
    temperature: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const TempData = (0, mongoose_1.model)("TempData", TempDataSchema);
exports.TempData = TempData;
//# sourceMappingURL=TempData.js.map