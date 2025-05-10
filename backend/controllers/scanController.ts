import { Request, Response } from "express";
import Scan from "../models/Scan";

// This function handles the creation of a new scan entry in the database
// And store it in the MongoDB database
export const createScan = async (req: Request, res: Response): Promise<void> => {
  const { serial, section, shelfNumber, shelfLevel, productType, timestamp } = req.body;

  if (!serial || !section || !shelfNumber || !shelfLevel || !productType || !timestamp) {
    res.status(400).json({ error: "Missing fields" });
    return
  }

  try {
    const scan = new Scan({ serial, section, shelfNumber, shelfLevel, productType, timestamp });
    await scan.save();
    res.status(201).json({ message: "Scan saved successfully" });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
