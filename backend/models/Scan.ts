// models/Scan.ts
import mongoose from "mongoose";

const scanSchema = new mongoose.Schema({
  serial: { type: String, required: true },
  section: { type: String, required: true },
  shelfNumber: { type: Number, required: true },
  shelfLevel: { type: Number, required: true },
  productType: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

export default mongoose.model("Scan", scanSchema);
