import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compiler.router";

// Load environment variables from .env file
config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/compiler", compilerRouter)

dbConnect()
app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});
