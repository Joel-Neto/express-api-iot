import { Schema, model } from "mongoose";

const TempDataSchema = new Schema({
  temperature: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const TempData = model("TempData", TempDataSchema);

export { TempData };
