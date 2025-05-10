import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import scanRoutes from "./routes/scanRoutes";
import searchRoutes from "./routes/searchRoutes";


const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Connect to MongoDB
app.use("/api/scan", scanRoutes);
app.use("/api/search", searchRoutes);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
