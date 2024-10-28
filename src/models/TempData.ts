import { Schema, model } from "mongoose";

const TempDataSchema = new Schema({
  internalTemperature: {
    type: Number,
    required: true,
  },
  externalTemperature: {
    type: Number,
    required: true,
  },
  internalHumidity: {
    type: Number,
    required: true,
  },
  externalHumidity: {
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
